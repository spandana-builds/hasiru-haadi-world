import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { blogs } from "../data/blogs";
import { fromDatabasePost, toDatabasePost } from "../lib/journal";
import "./admin.css";

const EMPTY = {
  slug: "", category: "GARDEN DIARIES", title: "", excerpt: "", readTime: "1 min read",
  cover: "", coverAlt: "", introduction: "", paragraphsText: "", closingThought: "",
  galleryText: "", published: false, isFeatured: false,
};

const BUCKET = "hasiru-haadi-media";

function fromBlog(blog) {
  return {
    slug: blog.slug, category: blog.category, title: blog.title, excerpt: blog.excerpt,
    readTime: blog.readTime, cover: blog.cover, coverAlt: blog.coverAlt,
    introduction: blog.introduction, paragraphs: blog.paragraphs,
    closingThought: blog.closingThought, gallery: blog.gallery,
    published: true, isFeatured: blog.slug === "yerigenahalli",
  };
}

function toForm(post) {
  return {
    slug: post.slug || "", category: post.category || "", title: post.title || "",
    excerpt: post.excerpt || "", readTime: post.readTime || "1 min read",
    cover: post.cover || "", coverAlt: post.coverAlt || "", introduction: post.introduction || "",
    paragraphsText: (post.paragraphs || []).join("\n\n"),
    closingThought: post.closingThought || "",
    galleryText: (post.gallery || []).map((item) => item.src + " | " + item.alt).join("\n"),
    published: Boolean(post.published), isFeatured: Boolean(post.isFeatured),
  };
}

function slugify(value) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseGallery(value) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [src, ...altParts] = line.split("|");
    return { src: src.trim(), alt: altParts.join("|").trim() || "Journal photograph" };
  });
}

const SQL = `create table if not exists public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  title text not null,
  excerpt text not null default '',
  read_time text not null default '1 min read',
  cover_url text not null default '',
  cover_alt text not null default '',
  introduction text not null default '',
  paragraphs text[] not null default '{}',
  closing_thought text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.journal_posts enable row level security;

drop policy if exists "Public can read published journal posts" on public.journal_posts;
create policy "Public can read published journal posts"
on public.journal_posts for select to anon, authenticated
using (published = true);

drop policy if exists "Hasiru Haadi admin can read all journal posts" on public.journal_posts;
create policy "Hasiru Haadi admin can read all journal posts"
on public.journal_posts for select to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

drop policy if exists "Hasiru Haadi admin can create journal posts" on public.journal_posts;
create policy "Hasiru Haadi admin can create journal posts"
on public.journal_posts for insert to authenticated
with check (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

drop policy if exists "Hasiru Haadi admin can update journal posts" on public.journal_posts;
create policy "Hasiru Haadi admin can update journal posts"
on public.journal_posts for update to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'))
with check (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

drop policy if exists "Hasiru Haadi admin can delete journal posts" on public.journal_posts;
create policy "Hasiru Haadi admin can delete journal posts"
on public.journal_posts for delete to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

create index if not exists journal_posts_published_created_idx
on public.journal_posts (published, created_at desc);`;

export default function JournalManager() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showSetup, setShowSetup] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase.from("journal_posts").select("*").order("created_at", { ascending: false });
    if (queryError) {
      setError(queryError.message.includes("journal_posts") ? "The Journal database table is not set up yet. Open the setup instructions below and run the SQL first." : queryError.message);
      setPosts([]);
    } else {
      setPosts((data || []).map(fromDatabasePost));
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startNew() {
    setEditingId(null);
    setForm(EMPTY);
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editPost(post) {
    setEditingId(post.id);
    setForm(toForm(post));
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function savePost(event) {
    event.preventDefault();
    if (!form.title.trim()) return setError("Please add a story title.");
    const slug = form.slug.trim() || slugify(form.title);
    if (!slug) return setError("Please add a valid story URL slug.");
    if (!form.cover.trim()) return setError("Please add a cover image URL. You can copy one from the Media Library.");
    const post = {
      slug, category: form.category, title: form.title, excerpt: form.excerpt,
      readTime: form.readTime, cover: form.cover, coverAlt: form.coverAlt,
      introduction: form.introduction,
      paragraphs: form.paragraphsText.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean),
      closingThought: form.closingThought, gallery: parseGallery(form.galleryText),
      published: form.published, isFeatured: form.isFeatured,
    };
    setSaving(true);
    setError("");
    setNotice("");
    const payload = toDatabasePost(post);
    const result = editingId
      ? await supabase.from("journal_posts").update(payload).eq("id", editingId)
      : await supabase.from("journal_posts").insert(payload);
    if (result.error) {
      setError(result.error.message);
    } else {
      setNotice(form.published ? "Story saved and published." : "Draft saved.");
      startNew();
      await loadPosts();
    }
    setSaving(false);
  }

  async function deletePost(post) {
    if (!window.confirm('Delete "' + post.title + '" permanently?')) return;
    const { error: deleteError } = await supabase.from("journal_posts").delete().eq("id", post.id);
    if (deleteError) setError(deleteError.message);
    else { setNotice("Story deleted."); await loadPosts(); }
  }

  async function seedExistingStories() {
    setSaving(true);
    setError("");
    const { data: existing, error: checkError } = await supabase.from("journal_posts").select("slug");
    if (checkError) { setError(checkError.message); setSaving(false); return; }
    const known = new Set((existing || []).map((row) => row.slug));
    const missing = blogs.filter((blog) => !known.has(blog.slug)).map((blog) => toDatabasePost(fromBlog(blog)));
    if (!missing.length) setNotice("Your original stories are already in the database.");
    else {
      const { error: insertError } = await supabase.from("journal_posts").insert(missing);
      if (insertError) setError(insertError.message);
      else setNotice(missing.length + " original stories imported. Their existing text and images are preserved.");
    }
    await loadPosts();
    setSaving(false);
  }

  return (
    <main className="admin-dashboard admin-journal-page">
      <header className="admin-topbar">
        <Link to="/" className="admin-brand">hasiru haadi<span>.</span></Link>
        <div className="admin-topbar-actions"><Link className="admin-back-dashboard" to="/admin/dashboard">← Dashboard</Link><span className="admin-status"><i /> Private admin</span></div>
      </header>

      <section className="admin-welcome admin-media-welcome">
        <p className="admin-kicker">HASIRU HAADI · YOUR STORIES</p>
        <h1>Journal studio.</h1>
        <p>Create, edit and publish the stories that make Hasiru Haadi yours.</p>
      </section>

      <section className="admin-journal-editor">
        <div className="admin-journal-editor-heading"><div><p className="admin-kicker">{editingId ? "EDIT YOUR STORY" : "WRITE SOMETHING NEW"}</p><h2>{editingId ? "A story in progress." : "Create a story."}</h2></div>{editingId && <button type="button" className="admin-text-button" onClick={startNew}>＋ New story</button>}</div>
        <form className="admin-journal-form" onSubmit={savePost}>
          <div className="admin-journal-form-grid">
            <label>Story title<input id="journal-title" name="title" value={form.title} onChange={(e) => update("title", e.target.value)} required placeholder="A little story…" /></label>
            <label>URL slug<input id="journal-slug" name="slug" value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="created-from-title-if-empty" /></label>
            <label>Category<input id="journal-category" name="category" value={form.category} onChange={(e) => update("category", e.target.value)} required placeholder="GARDEN DIARIES" /></label>
            <label>Read time<input id="journal-read-time" name="readTime" value={form.readTime} onChange={(e) => update("readTime", e.target.value)} placeholder="3 min read" /></label>
          </div>
          <label>Short excerpt<textarea id="journal-excerpt" name="excerpt" rows="2" value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="A short introduction shown on the Journal page." /></label>
          <label>Cover image URL <span className="admin-field-hint">Upload in the <Link to="/admin/media">Media Library</Link>, then copy its URL.</span><input id="journal-cover" name="cover" value={form.cover} onChange={(e) => update("cover", e.target.value)} placeholder="https://…" /></label>
          <label>Cover image description<input id="journal-cover-alt" name="coverAlt" value={form.coverAlt} onChange={(e) => update("coverAlt", e.target.value)} placeholder="Describe the photograph" /></label>
          <label>Opening paragraph<textarea id="journal-introduction" name="introduction" rows="3" value={form.introduction} onChange={(e) => update("introduction", e.target.value)} /></label>
          <label>Story paragraphs <span className="admin-field-hint">Separate each paragraph with one blank line.</span><textarea id="journal-paragraphs" name="paragraphs" rows="8" value={form.paragraphsText} onChange={(e) => update("paragraphsText", e.target.value)} placeholder="First paragraph…&#10;&#10;Second paragraph…" /></label>
          <label>Closing thought<textarea id="journal-closing" name="closingThought" rows="2" value={form.closingThought} onChange={(e) => update("closingThought", e.target.value)} /></label>
          <label>Photo diary <span className="admin-field-hint">One image per line: image URL | image description</span><textarea id="journal-gallery" name="gallery" rows="4" value={form.galleryText} onChange={(e) => update("galleryText", e.target.value)} placeholder="https://image-url.jpg | A leafy garden&#10;https://another-image.jpg | Fresh harvest" /></label>
          <div className="admin-journal-options">
            <label className="admin-check-label"><input id="journal-published" name="published" type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} /> Publish this story</label>
            <label className="admin-check-label"><input id="journal-featured" name="featured" type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} /> Feature on Journal homepage</label>
          </div>
          <div className="admin-journal-submit"><button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : editingId ? "Save changes" : "Save story"}</button><button type="button" className="admin-secondary-button" onClick={startNew}>Clear form</button></div>
        </form>
      </section>

      {notice && <p className="admin-feedback admin-feedback-success" role="status">{notice}</p>}
      {error && <p className="admin-feedback admin-feedback-error" role="alert">{error}</p>}

      <section className="admin-journal-list">
        <div className="admin-media-toolbar"><div><h2>Your stories <span>{posts.length}</span></h2><p>Published stories and private drafts</p></div><button type="button" className="admin-secondary-button" onClick={seedExistingStories} disabled={saving}>Import original stories</button></div>
        {loading ? <div className="admin-media-empty">Loading stories…</div> : posts.length ? <div className="admin-journal-post-list">{posts.map((post) => <article className="admin-journal-post-row" key={post.id}><img src={post.cover} alt="" /><div className="admin-journal-post-info"><span>{post.category} · {post.published ? "PUBLISHED" : "DRAFT"}{post.isFeatured ? " · FEATURED" : ""}</span><h3>{post.title}</h3><p>/journal/{post.slug}</p></div><div className="admin-journal-row-actions"><button type="button" onClick={() => editPost(post)}>Edit</button><button type="button" className="admin-danger-link" onClick={() => deletePost(post)}>Delete</button></div></article>)}</div> : <div className="admin-media-empty"><span className="admin-media-empty-icon">✿</span><h2>Your stories are waiting.</h2><p>Run the setup SQL, then import your existing four stories to start managing the Journal.</p></div>}
      </section>

      <section className="admin-storage-help">
        <button type="button" className="admin-storage-help-toggle" onClick={() => setShowSetup((value) => !value)} aria-expanded={showSetup}><span>Journal database setup & permissions</span><span>{showSetup ? "−" : "+"}</span></button>
        {showSetup && <div className="admin-storage-help-content"><p>In Supabase → SQL Editor, replace every <code>YOUR_ADMIN_EMAIL</code> with your admin login email, then run this SQL once:</p><pre>{SQL}</pre><p>After the table is created, click <strong>Import original stories</strong> above. This copies the four existing stories and their current image references into the database; it does not delete or change your existing files.</p></div>}
      </section>
    </main>
  );
}
