import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./admin.css";

const PAGES = [
  { key: "garden", label: "Garden", fields: [{ key: "hero_title", label: "Hero title" }, { key: "hero_subtitle", label: "Hero subtitle" }, { key: "story_heading", label: "Story heading" }, { key: "hero_image_url", label: "Hero image URL" }] },
  { key: "village", label: "Village", fields: [{ key: "hero_title", label: "Hero title" }, { key: "hero_subtitle", label: "Hero subtitle" }, { key: "hero_image_url", label: "Hero image URL" }] },
  { key: "plants", label: "Plants", fields: [{ key: "hero_title", label: "Hero title" }, { key: "hero_subtitle", label: "Hero subtitle" }, { key: "story_heading", label: "Story heading" }, { key: "hero_image_url", label: "Hero image URL" }] },
  { key: "farm", label: "Farm", fields: [{ key: "hero_title", label: "Hero title" }, { key: "hero_subtitle", label: "Hero subtitle" }, { key: "story_heading", label: "Story heading" }, { key: "hero_image_url", label: "Hero image URL" }] },
  { key: "gallery", label: "Gallery", fields: [{ key: "hero_title", label: "Page title" }, { key: "hero_subtitle", label: "Page subtitle" }] },
];

const SQL = `create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  field_key text not null,
  content_value text not null default '',
  updated_at timestamptz not null default now(),
  unique(page_key, field_key)
);
alter table public.page_content enable row level security;
drop policy if exists "Public can read page content" on public.page_content;
create policy "Public can read page content" on public.page_content for select to anon, authenticated using (true);
drop policy if exists "Hasiru Haadi admin can write page content" on public.page_content;
create policy "Hasiru Haadi admin can write page content" on public.page_content for all to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'))
with check (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));
grant select on public.page_content to anon, authenticated;
grant insert, update, delete on public.page_content to authenticated;`;

export default function PageContentManager() {
  const [pageKey, setPageKey] = useState("garden");
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const page = PAGES.find((item) => item.key === pageKey) || PAGES[0];

  const load = useCallback(async () => {
    setLoading(true); setError("");
    const { data, error: queryError } = await supabase.from("page_content").select("field_key,content_value").eq("page_key", pageKey);
    if (queryError) setError(queryError.message.includes("page_content") ? "The Page Content database is not set up yet. Run the SQL instructions below." : queryError.message);
    else setValues(Object.fromEntries((data || []).map((row) => [row.field_key, row.content_value])));
    setLoading(false);
  }, [pageKey]);
  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true); setError(""); setNotice("");
    const rows = page.fields.filter((field) => (values[field.key] || "").trim()).map((field) => ({ page_key: pageKey, field_key: field.key, content_value: values[field.key].trim(), updated_at: new Date().toISOString() }));
    const { error: saveError } = await supabase.from("page_content").upsert(rows, { onConflict: "page_key,field_key" });
    if (saveError) setError(saveError.message);
    else setNotice("Page content saved. Refresh the public page to see the changes.");
    setSaving(false);
  }

  async function clearField(fieldKey) {
    const { error: deleteError } = await supabase.from("page_content").delete().eq("page_key", pageKey).eq("field_key", fieldKey);
    if (deleteError) setError(deleteError.message);
    else { setValues((current) => ({ ...current, [fieldKey]: "" })); setNotice("Override removed. The original website content will show again."); }
  }

  return (
    <main className="admin-dashboard admin-content-page">
      <header className="admin-topbar"><Link to="/" className="admin-brand">hasiru haadi<span>.</span></Link><div className="admin-topbar-actions"><Link className="admin-back-dashboard" to="/admin/dashboard">← Dashboard</Link><span className="admin-status"><i /> Private admin</span></div></header>
      <section className="admin-welcome admin-media-welcome"><p className="admin-kicker">HASIRU HAADI · YOUR WEBSITE</p><h1>Page content.</h1><p>Make small updates to page headings, introductions and hero photographs without changing the design.</p></section>
      <section className="admin-content-editor">
        <label className="admin-content-page-select">Choose a page<select id="content-page" name="page" value={pageKey} onChange={(event) => setPageKey(event.target.value)}>{PAGES.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
        {loading ? <p>Loading page content…</p> : <div className="admin-content-fields">{page.fields.map((field) => <label key={field.key}>{field.label}{field.key.includes("image_url") ? <input id={pageKey+"-"+field.key} name={field.key} type="url" value={values[field.key] || ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder="Paste an image URL from Media Library" /> : <textarea id={pageKey+"-"+field.key} name={field.key} rows={field.key.includes("subtitle") ? 2 : 3} value={values[field.key] || ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder="Leave empty to keep the current website content" />}<button type="button" className="admin-text-button" onClick={() => clearField(field.key)}>Reset to original</button></label>)}</div>}
        <div className="admin-journal-submit"><button type="button" className="admin-primary-button" onClick={save} disabled={loading || saving}>{saving ? "Saving…" : "Save page changes"}</button><button type="button" className="admin-secondary-button" onClick={load}>Refresh</button></div>
        {notice && <p className="admin-feedback admin-feedback-success">{notice}</p>}{error && <p className="admin-feedback admin-feedback-error">{error}</p>}
      </section>
      <section className="admin-storage-help"><button type="button" className="admin-storage-help-toggle" onClick={() => setShowSetup((v) => !v)} aria-expanded={showSetup}><span>Page content database & permissions</span><span>{showSetup ? "−" : "+"}</span></button>{showSetup && <div className="admin-storage-help-content"><p>In Supabase → SQL Editor, replace <code>YOUR_ADMIN_EMAIL</code> with your admin login email and run once:</p><pre>{SQL}</pre><p>Public visitors can read page content. Only your admin email can change it.</p></div>}</section>
    </main>
  );
}
