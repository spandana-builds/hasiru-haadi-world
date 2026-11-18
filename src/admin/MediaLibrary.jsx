import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import "./admin.css";

const BUCKET = "hasiru-haadi-media";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function readableError(error) {
  const message = error?.message || "Something went wrong. Please try again.";
  if (/bucket.*not found|not found.*bucket/i.test(message)) {
    return 'The Storage bucket "' + BUCKET + '" has not been created yet. Follow the Storage setup instructions below.';
  }
  if (/row-level security|permission denied|unauthorized|not allowed/i.test(message)) {
    return "Supabase Storage blocked this action. Check the bucket policies in the Storage setup instructions.";
  }
  return message;
}

export default function MediaLibrary() {
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showSetup, setShowSetup] = useState(false);

  const loadMedia = useCallback(async () => {
    if (!supabase) {
      setError("Supabase is not configured. Check your .env.local file and restart Vite.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    const { data, error: listError } = await supabase.storage.from(BUCKET).list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (listError) {
      setError(readableError(listError));
      setItems([]);
    } else {
      setItems((data || []).filter((item) => item.id && item.name).map((item) => {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(item.name);
        return { ...item, url: urlData.publicUrl };
      }));
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const filteredItems = useMemo(() => items.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  ), [items, search]);

  async function uploadFiles(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;
    const invalid = files.find((file) => !ACCEPTED_TYPES.includes(file.type));
    if (invalid) {
      setError("Unsupported file type: " + invalid.name + ". Use JPG, PNG, WEBP, GIF or AVIF.");
      return;
    }
    const oversized = files.find((file) => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setError(oversized.name + " is larger than the 10 MB limit.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");
    let uploaded = 0;
    for (const file of files) {
      const safeName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
      const path = Date.now() + "-" + crypto.randomUUID() + "-" + (safeName || "image");
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });
      if (uploadError) {
        setError(readableError(uploadError));
        break;
      }
      uploaded += 1;
    }
    if (uploaded) setMessage(uploaded + (uploaded === 1 ? " image uploaded." : " images uploaded."));
    await loadMedia();
    setUploading(false);
  }

  async function deleteImage(item) {
    const confirmed = window.confirm('Permanently delete "' + item.name + '"?');
    if (!confirmed) return;
    setError("");
    setMessage("");
    const { error: deleteError } = await supabase.storage.from(BUCKET).remove([item.name]);
    if (deleteError) {
      setError(readableError(deleteError));
      return;
    }
    if (selected?.name === item.name) setSelected(null);
    setMessage("Image deleted.");
    await loadMedia();
  }

  async function copyUrl(url) {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Image URL copied.");
      setError("");
    } catch {
      setError("Clipboard access was blocked by your browser. Open the image and copy its address.");
    }
  }

  return (
    <main className="admin-dashboard admin-media-page">
      <header className="admin-topbar">
        <a href="/" className="admin-brand">hasiru haadi<span>.</span></a>
        <div className="admin-topbar-actions">
          <a className="admin-back-dashboard" href="/admin/dashboard">← Dashboard</a>
          <span className="admin-status"><i /> Private admin</span>
        </div>
      </header>

      <section className="admin-welcome admin-media-welcome">
        <p className="admin-kicker">HASIRU HAADI · YOUR ASSETS</p>
        <h1>Media library.</h1>
        <p>Keep the images behind your stories, plants and little moments in one place.</p>
      </section>

      <section className="admin-media-toolbar" aria-label="Media actions">
        <div>
          <h2>Your images <span>{items.length}</span></h2>
          <p>JPG, PNG, WEBP, GIF or AVIF · up to 10 MB each</p>
        </div>
        <div className="admin-media-actions">
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple hidden onChange={uploadFiles} />
          <button type="button" className="admin-primary-button" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "+ Upload images"}
          </button>
        </div>
      </section>

      {message && <p className="admin-feedback admin-feedback-success" role="status">{message}</p>}
      {error && <p className="admin-feedback admin-feedback-error" role="alert">{error}</p>}

      <div className="admin-media-search">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search images by filename…" aria-label="Search images" />
        <button type="button" className="admin-text-button" onClick={loadMedia} disabled={loading}>Refresh</button>
      </div>

      {loading ? (
        <div className="admin-media-empty">Loading your images…</div>
      ) : filteredItems.length ? (
        <section className="admin-media-grid" aria-label="Uploaded images">
          {filteredItems.map((item) => (
            <article className="admin-media-card" key={item.id || item.name}>
              <button type="button" className="admin-media-preview" onClick={() => setSelected(item)} aria-label={"Preview " + item.name}>
                <img src={item.url} alt={item.name} loading="lazy" />
              </button>
              <div className="admin-media-card-info">
                <strong title={item.name}>{item.name}</strong>
                <span>{formatBytes(item.metadata?.size || 0)}</span>
              </div>
              <div className="admin-media-card-actions">
                <button type="button" onClick={() => copyUrl(item.url)}>Copy URL</button>
                <button type="button" className="admin-danger-link" onClick={() => deleteImage(item)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="admin-media-empty">
          <span className="admin-media-empty-icon">✿</span>
          <h2>{search ? "No matching images." : "Your library is waiting."}</h2>
          <p>{search ? "Try a different filename." : "Upload your first image to start building your Hasiru Haadi collection."}</p>
          {!search && <button type="button" className="admin-primary-button" onClick={() => inputRef.current?.click()}>Upload your first image</button>}
        </div>
      )}

      <section className="admin-storage-help">
        <button type="button" className="admin-storage-help-toggle" onClick={() => setShowSetup((value) => !value)} aria-expanded={showSetup}>
          <span>Storage setup & permissions</span><span>{showSetup ? "−" : "+"}</span>
        </button>
        {showSetup && (
          <div className="admin-storage-help-content">
            <p>Create a <strong>public</strong> Supabase Storage bucket named <code>{BUCKET}</code> and set its file size limit to 10 MB. Public means visitors can view image URLs; uploads and deletes remain restricted by the policies below.</p>
            <p>In Supabase → SQL Editor, replace <code>YOUR_ADMIN_EMAIL</code> in this SQL with the exact email used for your admin login, then run it:</p>
            <pre>{`create policy "Hasiru Haadi admin can view media list"
on storage.objects for select to authenticated
using (
  bucket_id = 'hasiru-haadi-media'
  and lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL')
);

create policy "Hasiru Haadi admin can upload media"
on storage.objects for insert to authenticated
with check (
  bucket_id = '${BUCKET}'
  and lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL')
);

create policy "Hasiru Haadi admin can update media"
on storage.objects for update to authenticated
using (
  bucket_id = '${BUCKET}'
  and lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL')
)
with check (
  bucket_id = '${BUCKET}'
  and lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL')
);

create policy "Hasiru Haadi admin can delete media"
on storage.objects for delete to authenticated
using (
  bucket_id = '${BUCKET}'
  and lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL')
);`}</pre>
            <p>Do not add public insert, update or delete policies. Review existing Storage policies if this bucket has been used before. These rules restrict writes; the bucket's public setting allows image viewing.</p>
          </div>
        )}
      </section>

      {selected && (
        <div className="admin-media-modal" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setSelected(null)}>
          <div className="admin-media-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="admin-media-modal-close" onClick={() => setSelected(null)} aria-label="Close preview">×</button>
            <img src={selected.url} alt={selected.name} />
            <strong>{selected.name}</strong>
            <div className="admin-media-card-actions">
              <button type="button" onClick={() => copyUrl(selected.url)}>Copy URL</button>
              <a href={selected.url} target="_blank" rel="noreferrer">Open original ↗</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
