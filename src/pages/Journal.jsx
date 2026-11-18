import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BackToMap from "../components/BackToMap";
import { blogs } from "../data/blogs";
import { supabase } from "../lib/supabase";
import { fromDatabasePost } from "../lib/journal";
import "./Journal.css";

const fallbackStories = [
  { slug: "garden-we-built", category: "GARDEN DIARIES", title: "A Little Garden We Built Together", excerpt: "A story of two sisters, eight garden beds and the joy of growing something with our own hands.", imageAlt: "Hasiru Haadi backyard vegetable garden", readTime: "Garden" },
  { slug: "my-green-journey", category: "MY GREEN JOURNEY", title: "How a Lockdown Hobby Became My Green World", excerpt: "It began with a few reused containers, a terrace and the excitement of watching a new leaf appear.", imageAlt: "Potted plants from the Hasiru Haadi collection", readTime: "Plants" },
  { slug: "our-farm", category: "FARM STORIES", title: "The Land That Keeps Us Rooted", excerpt: "A little about our family farm, the trees we nurture and the care behind every new sapling.", imageAlt: "Family farm at Hasiru Haadi", readTime: "Farm" },
  { slug: "yerigenahalli", category: "VILLAGE CHRONICLES", title: "Yerigenahalli – A Place That Feels Like Peace", excerpt: "Quiet roads, green fields, familiar faces and the little things that make a place feel like home.", imageAlt: "Yerigenahalli village at dusk", readTime: "Village" },
];

export default function Journal() {
  const [databaseStories, setDatabaseStories] = useState(null);
  useEffect(() => {
    let active = true;
    if (!supabase) return undefined;
    supabase.from("journal_posts").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data, error }) => { if (active && !error && data?.length) setDatabaseStories(data.map(fromDatabasePost)); });
    return () => { active = false; };
  }, []);

  const stories = useMemo(() => {
    if (!databaseStories?.length) return fallbackStories.map((story) => {
      const blog = blogs.find((item) => item.slug === story.slug);
      return { ...story, image: blog?.cover, to: "/journal/" + story.slug };
    });
    return databaseStories.filter((story) => !story.isFeatured).map((story) => ({
      category: story.category, title: story.title, excerpt: story.excerpt,
      image: story.cover, imageAlt: story.coverAlt, to: "/journal/" + story.slug,
      readTime: story.readTime,
    }));
  }, [databaseStories]);

  const featured = databaseStories?.find((story) => story.isFeatured) || blogs.find((story) => story.slug === "yerigenahalli");

  function StoryCard({ story }) {
    return <article className="journal-card"><Link className="journal-card-image-link" to={story.to} aria-label={`Explore ${story.title}`}><img className="journal-card-image" src={story.image} alt={story.imageAlt} loading="lazy" /></Link><div className="journal-card-copy"><p className="journal-eyebrow">{story.category}</p><h3><Link to={story.to}>{story.title}</Link></h3><p className="journal-card-excerpt">{story.excerpt}</p><Link className="journal-read-link" to={story.to}>Explore story <span aria-hidden="true">↗</span></Link></div></article>;
  }

  return (
    <main className="journal-page">
      <BackToMap />
      <header className="journal-header"><Link to="/" className="journal-wordmark">hasiru haadi<span>.</span></Link><span className="journal-header-note">A JOURNAL OF LITTLE THINGS</span></header>
      <section className="journal-hero" aria-labelledby="journal-title">
        <div className="journal-hero-copy"><p className="journal-eyebrow">NOTES FROM A GREEN LIFE</p><h1 id="journal-title">Stories rooted <em>in nature.</em></h1><p className="journal-hero-subtitle">Memories that keep growing.</p><p className="journal-intro">A little collection of my experiences, village memories, garden adventures and everything that makes life greener.</p><a className="journal-text-link" href="#latest-stories">Wander through the journal <span aria-hidden="true">↓</span></a></div>
        <div className="journal-hero-image-wrap"><img src={blogs.find((item) => item.slug === "garden-we-built")?.cover} alt="A glimpse of the Hasiru Haadi garden" className="journal-hero-image" /><span className="journal-image-caption">A little world, growing every day</span></div>
      </section>
      <section className="journal-welcome"><p className="journal-eyebrow">WELCOME, I'M GLAD YOU'RE HERE</p><h2>Every little thing has a story.</h2><p>Some stories begin in a garden, some on a quiet village road, and some with a tiny plant growing in a reused container. This is where I keep those moments — just as they are, with a little room for wonder.</p></section>
      <section className="journal-featured" aria-labelledby="featured-title"><div className="journal-section-heading"><div><p className="journal-eyebrow">A PLACE CLOSE TO MY HEART</p><h2>Featured story</h2></div><span className="journal-index">01 / FEATURED</span></div><Link to={`/journal/${featured.slug}`} className="journal-feature-link"><img src={featured.cover || featured.image} alt={featured.coverAlt || featured.coverAlt || "Yerigenahalli village at dusk"} className="journal-feature-image" /><div className="journal-feature-copy"><p className="journal-eyebrow">{featured.category}</p><h3 id="featured-title">{featured.title}</h3><p>{featured.excerpt}</p><span className="journal-read-link">Visit the story <span aria-hidden="true">↗</span></span></div></Link></section>
      <section className="journal-latest" id="latest-stories" aria-labelledby="latest-title"><div className="journal-section-heading"><div><p className="journal-eyebrow">LITTLE MOMENTS, KEPT IN WORDS</p><h2 id="latest-title">From the journal</h2></div><span className="journal-index">THE COLLECTION</span></div><div className="journal-grid">{stories.map((story) => <StoryCard key={story.slug || story.title} story={story} />)}</div></section>
      <footer className="journal-footer"><p className="journal-footer-quote">“A little corner of the internet, growing with time.”</p><p>Thank you for being here.</p><Link to="/" className="journal-footer-link">Back to the Hasiru Haadi map ↑</Link><span className="journal-footer-brand">HASIRU HAADI · GROWING WITH NATURE</span></footer>
    </main>
  );
}
