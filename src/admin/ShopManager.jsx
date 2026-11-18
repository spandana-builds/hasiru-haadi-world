import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./admin.css";

const EMPTY = { name: "", category: "PLANTS", description: "", price: "", imageUrl: "", imageAlt: "", productUrl: "", active: true, sortOrder: 0 };

const SQL = `create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'PLANTS',
  description text not null default '',
  price numeric(10,2),
  image_url text not null default '',
  image_alt text not null default '',
  product_url text not null default '',
  active boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shop_products enable row level security;

drop policy if exists "Public can read active shop products" on public.shop_products;
create policy "Public can read active shop products"
on public.shop_products for select to anon, authenticated
using (active = true);

drop policy if exists "Hasiru Haadi admin can read all shop products" on public.shop_products;
create policy "Hasiru Haadi admin can read all shop products"
on public.shop_products for select to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

drop policy if exists "Hasiru Haadi admin can create shop products" on public.shop_products;
create policy "Hasiru Haadi admin can create shop products"
on public.shop_products for insert to authenticated
with check (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

drop policy if exists "Hasiru Haadi admin can update shop products" on public.shop_products;
create policy "Hasiru Haadi admin can update shop products"
on public.shop_products for update to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'))
with check (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

drop policy if exists "Hasiru Haadi admin can delete shop products" on public.shop_products;
create policy "Hasiru Haadi admin can delete shop products"
on public.shop_products for delete to authenticated
using (lower(auth.jwt() ->> 'email') = lower('YOUR_ADMIN_EMAIL'));

grant select on public.shop_products to anon, authenticated;
grant insert, update, delete on public.shop_products to authenticated;

create index if not exists shop_products_active_sort_idx
on public.shop_products (active, sort_order, created_at desc);`;

function toForm(product) {
  return {
    name: product.name || "", category: product.category || "PLANTS",
    description: product.description || "", price: product.price ?? "",
    imageUrl: product.image_url || "", imageAlt: product.image_alt || "",
    productUrl: product.product_url || "", active: Boolean(product.active),
    sortOrder: product.sort_order ?? 0,
  };
}

export default function ShopManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showSetup, setShowSetup] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase.from("shop_products").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (queryError) {
      setProducts([]);
      setError(queryError.message.includes("shop_products") ? "The Shop database table is not set up yet. Open the setup instructions below and run the SQL first." : queryError.message);
    } else setProducts(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function resetForm() { setForm(EMPTY); setEditingId(null); setError(""); setNotice(""); }

  async function saveProduct(event) {
    event.preventDefault();
    if (!form.name.trim()) { setError("Please add a product name."); return; }
    if (!form.imageUrl.trim()) { setError("Please add an image URL from the Media Library."); return; }
    if (form.price !== "" && (!Number.isFinite(Number(form.price)) || Number(form.price) < 0)) { setError("Enter a valid price."); return; }
    setSaving(true); setError(""); setNotice("");
    const payload = {
      name: form.name.trim(), category: form.category.trim() || "PLANTS",
      description: form.description.trim(), price: form.price === "" ? null : Number(form.price),
      image_url: form.imageUrl.trim(), image_alt: form.imageAlt.trim() || form.name.trim(),
      product_url: form.productUrl.trim(), active: form.active,
      sort_order: Number(form.sortOrder) || 0, updated_at: new Date().toISOString(),
    };
    const result = editingId
      ? await supabase.from("shop_products").update(payload).eq("id", editingId)
      : await supabase.from("shop_products").insert(payload);
    if (result.error) setError(result.error.message);
    else { resetForm(); setNotice(editingId ? "Product updated." : "Product saved."); await loadProducts(); }
    setSaving(false);
  }

  async function removeProduct(product) {
    if (!window.confirm('Delete "' + product.name + '" permanently?')) return;
    const { error: deleteError } = await supabase.from("shop_products").delete().eq("id", product.id);
    if (deleteError) setError(deleteError.message);
    else { setNotice("Product deleted."); await loadProducts(); }
  }

  return (
    <main className="admin-dashboard admin-shop-page">
      <header className="admin-topbar">
        <Link to="/" className="admin-brand">hasiru haadi<span>.</span></Link>
        <div className="admin-topbar-actions"><Link className="admin-back-dashboard" to="/admin/dashboard">← Dashboard</Link><span className="admin-status"><i /> Private admin</span></div>
      </header>
      <section className="admin-welcome admin-media-welcome">
        <p className="admin-kicker">HASIRU HAADI · YOUR MARKETPLACE</p>
        <h1>Shop studio.</h1>
        <p>Add products, update prices and choose what appears in your public shop.</p>
      </section>

      <section className="admin-shop-editor">
        <div className="admin-journal-editor-heading"><div><p className="admin-kicker">{editingId ? "UPDATE A LISTING" : "ADD SOMETHING TO YOUR SHOP"}</p><h2>{editingId ? "Edit product." : "Create a product."}</h2></div>{editingId && <button type="button" className="admin-text-button" onClick={resetForm}>＋ New product</button>}</div>
        <form className="admin-journal-form" onSubmit={saveProduct}>
          <div className="admin-journal-form-grid">
            <label>Product name<input id="shop-product-name" name="productName" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="e.g. Money plant" /></label>
            <label>Category<input id="shop-product-category" name="category" value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="PLANTS, SEEDS, ECO PRODUCTS…" /></label>
            <label>Price (₹)<input id="shop-product-price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="Leave blank to hide price" /></label>
            <label>Display order<input id="shop-product-order" name="sortOrder" type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", e.target.value)} /></label>
          </div>
          <label>Description<textarea id="shop-product-description" name="description" rows="3" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="A short description of this product." /></label>
          <label>Product image URL <span className="admin-field-hint">Upload the photo in the <Link to="/admin/media">Media Library</Link>, then copy its URL.</span><input id="shop-product-image" name="imageUrl" type="url" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="https://…" required /></label>
          <label>Image description<input id="shop-product-image-alt" name="imageAlt" value={form.imageAlt} onChange={(e) => update("imageAlt", e.target.value)} placeholder="Describe the product photograph" /></label>
          <label>Order / product link<input id="shop-product-link" name="productUrl" type="url" value={form.productUrl} onChange={(e) => update("productUrl", e.target.value)} placeholder="Meesho or another product page URL" /></label>
          <div className="admin-journal-options"><label className="admin-check-label"><input id="shop-product-active" name="active" type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} /> Show on public Shop page</label></div>
          <div className="admin-journal-submit"><button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : editingId ? "Save changes" : "Save product"}</button><button type="button" className="admin-secondary-button" onClick={resetForm}>Clear form</button></div>
        </form>
      </section>

      {notice && <p className="admin-feedback admin-feedback-success" role="status">{notice}</p>}
      {error && <p className="admin-feedback admin-feedback-error" role="alert">{error}</p>}

      <section className="admin-shop-list">
        <div className="admin-media-toolbar"><div><h2>Your products <span>{products.length}</span></h2><p>Active listings appear on the public Shop page</p></div><button type="button" className="admin-text-button" onClick={loadProducts} disabled={loading}>Refresh</button></div>
        {loading ? <div className="admin-media-empty">Loading products…</div> : products.length ? <div className="admin-shop-product-list">{products.map((product) => <article className="admin-journal-post-row" key={product.id}><img src={product.image_url} alt={product.image_alt || ""} /><div className="admin-journal-post-info"><span>{product.category} · {product.active ? "VISIBLE" : "HIDDEN"}</span><h3>{product.name}</h3><p>{product.price == null ? "Price not set" : "₹" + Number(product.price).toLocaleString("en-IN")}</p></div><div className="admin-journal-row-actions"><button type="button" onClick={() => { setEditingId(product.id); setForm(toForm(product)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button><button type="button" className="admin-danger-link" onClick={() => removeProduct(product)}>Delete</button></div></article>)}</div> : <div className="admin-media-empty"><span className="admin-media-empty-icon">✿</span><h2>Your shop is waiting.</h2><p>Add your first product above. It will appear on the public Shop page when you select “Show on public Shop page”.</p></div>}
      </section>

      <section className="admin-storage-help">
        <button type="button" className="admin-storage-help-toggle" onClick={() => setShowSetup((value) => !value)} aria-expanded={showSetup}><span>Shop database setup & permissions</span><span>{showSetup ? "−" : "+"}</span></button>
        {showSetup && <div className="admin-storage-help-content"><p>In Supabase → SQL Editor, replace every <code>YOUR_ADMIN_EMAIL</code> with your admin login email, then run this SQL once:</p><pre>{SQL}</pre><p>Public visitors can only read active products. Only your admin email can create, update or delete listings.</p></div>}
      </section>
    </main>
  );
}
