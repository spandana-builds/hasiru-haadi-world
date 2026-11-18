import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BackToMap from "../components/BackToMap";
import { blogs, getBlogBySlug } from "../data/blogs";
import { supabase } from "../lib/supabase";
import { fromDatabasePost } from "../lib/journal";
import "./BlogPost.css";

export default function BlogPost() {
  const { slug } = useParams();
  const [databaseBlog, setDatabaseBlog] = useState(null);
  const [checked, setChecked] = useState(false);
  const [databaseReady, setDatabaseReady] = useState(false);

  useEffect(() => {
    let active = true;
    setDatabaseBlog(null);
    setChecked(false);
    if (!supabase) { setChecked(true); return undefined; }
    supabase.from("journal_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle()
      .then(({ data, error }) => { if (active) { setDatabaseReady(!error); setDatabaseBlog(error ? null : fromDatabasePost(data)); setChecked(true); } });
    return () => { active = false; };
  }, [slug]);

  const blog = databaseReady ? databaseBlog : getBlogBySlug(slug);
  useEffect(() => {
    document.title = blog ? `${blog.title} | Hasiru Haadi Journal` : "Hasiru Haadi Journal";
    return () => { document.title = "Hasiru Haadi — Stories Rooted in Nature"; };
  }, [blog]);

  if (!blog && !checked) return <main className="blog-post-page" />;
  if (!blog) return <Navigate to="/journal" replace />;

  const currentIndex = blogs.findIndex((item) => item.slug === blog.slug);
  const previousStory = blogs[currentIndex - 1];
  const nextStory = blogs[currentIndex + 1];

  return (
    <main className="blog-post-page">
      <BackToMap />
      <header className="blog-post-header"><Link to="/" className="blog-post-wordmark">hasiru haadi<span>.</span></Link><Link to="/journal" className="blog-post-journal-link">THE JOURNAL <span aria-hidden="true">↗</span></Link></header>
      <article className="blog-article">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb"><Link to="/journal">Journal</Link><span aria-hidden="true">/</span><span>{blog.category}</span></nav>
        <header className="blog-article-heading"><p className="blog-post-eyebrow">{blog.category}</p><h1>{blog.title}</h1><p className="blog-article-excerpt">{blog.excerpt}</p><div className="blog-article-meta"><span>HASIRU HAADI JOURNAL</span><span aria-hidden="true">·</span><span>{blog.readTime}</span></div></header>
        <figure className="blog-cover-figure"><img src={blog.cover} alt={blog.coverAlt} className="blog-cover-image" /><figcaption>{blog.coverAlt}</figcaption></figure>
        <div className="blog-body"><p className="blog-introduction">{blog.introduction}</p>{blog.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<blockquote className="blog-closing-thought">“{blog.closingThought}”</blockquote></div>
        {blog.gallery?.length > 0 && <section className="blog-gallery" aria-labelledby="blog-gallery-title"><div className="blog-gallery-heading"><p className="blog-post-eyebrow">A FEW MOMENTS</p><h2 id="blog-gallery-title">From the photo diary</h2></div><div className="blog-gallery-grid">{blog.gallery.map((item, index) => { const image = typeof item === "string" ? { src: item, alt: "" } : item; return <figure className="blog-gallery-item" key={image.src + index}><img src={image.src} alt={image.alt} loading="lazy" /></figure>; })}</div></section>}
        <footer className="blog-article-footer"><p className="blog-post-eyebrow">THANK YOU FOR READING</p><p className="blog-thanks">Some stories are best kept close. I'm glad I could share this one with you.</p><Link to="/journal" className="blog-back-link">← Back to all stories</Link></footer>
      </article>
      <nav className="blog-story-navigation" aria-label="More stories">{previousStory ? <Link to={`/journal/${previousStory.slug}`} className="blog-story-nav-card"><span>← PREVIOUS STORY</span><strong>{previousStory.title}</strong></Link> : <span />}{nextStory ? <Link to={`/journal/${nextStory.slug}`} className="blog-story-nav-card blog-story-nav-next"><span>NEXT STORY →</span><strong>{nextStory.title}</strong></Link> : <span />}</nav>
      <footer className="blog-site-footer"><Link to="/" className="blog-footer-brand">HASIRU HAADI · GROWING WITH NATURE</Link></footer>
    </main>
  );
}
