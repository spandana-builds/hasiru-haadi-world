import { Link } from "react-router-dom";
import BackToMap from "../components/BackToMap";
import "./Journal.css";

import villageHero from "../assets/village/hero-village.jpg";
import gardenHero from "../assets/garden/hero.jpeg";
import plantsHero from "../assets/plants/img10.jpg";
import farmHero from "../assets/farm/hero-img2.jpg";

const stories = [
  {
    category: "GARDEN DIARIES",
    title: "A Little Garden We Built Together",
    excerpt: "A story of two sisters, eight garden beds and the joy of growing something with our own hands.",
    image: gardenHero,
    imageAlt: "Hasiru Haadi backyard vegetable garden",
    to: "/journal/garden-we-built",
    readTime: "Garden",
  },
  {
    category: "MY GREEN JOURNEY",
    title: "How a Lockdown Hobby Became My Green World",
    excerpt: "It began with a few reused containers, a terrace and the excitement of watching a new leaf appear.",
    image: plantsHero,
    imageAlt: "Potted plants from the Hasiru Haadi collection",
    to: "/journal/my-green-journey",
    readTime: "Plants",
  },
  {
    category: "FARM STORIES",
    title: "The Land That Keeps Us Rooted",
    excerpt: "A little about our family farm, the trees we nurture and the care behind every new sapling.",
    image: farmHero,
    imageAlt: "Family farm at Hasiru Haadi",
    to: "/journal/our-farm",
    readTime: "Farm",
  },
  {
    category: "VILLAGE CHRONICLES",
    title: "Yerigenahalli – A Place That Feels Like Peace",
    excerpt: "Quiet roads, green fields, familiar faces and the little things that make a place feel like home.",
    image: villageHero,
    imageAlt: "Yerigenahalli village at dusk",
    to: "/journal/yerigenahalli",
    readTime: "Village",
  },
];

function StoryCard({ story }) {
  return (
    <article className="journal-card">
      <Link className="journal-card-image-link" to={story.to} aria-label={`Explore ${story.title}`}>
        <img className="journal-card-image" src={story.image} alt={story.imageAlt} loading="lazy" />
      </Link>
      <div className="journal-card-copy">
        <p className="journal-eyebrow">{story.category}</p>
        <h3><Link to={story.to}>{story.title}</Link></h3>
        <p className="journal-card-excerpt">{story.excerpt}</p>
        <Link className="journal-read-link" to={story.to}>Explore story <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}

export default function Journal() {
  return (
    <main className="journal-page">
      <BackToMap />

      <header className="journal-header">
        <Link to="/" className="journal-wordmark">hasiru haadi<span>.</span></Link>
        <span className="journal-header-note">A JOURNAL OF LITTLE THINGS</span>
      </header>

      <section className="journal-hero" aria-labelledby="journal-title">
        <div className="journal-hero-copy">
          <p className="journal-eyebrow">NOTES FROM A GREEN LIFE</p>
          <h1 id="journal-title">Stories rooted <em>in nature.</em></h1>
          <p className="journal-hero-subtitle">Memories that keep growing.</p>
          <p className="journal-intro">
            A little collection of my experiences, village memories, garden adventures
            and everything that makes life greener.
          </p>
          <a className="journal-text-link" href="#latest-stories">Wander through the journal <span aria-hidden="true">↓</span></a>
        </div>
        <div className="journal-hero-image-wrap">
          <img src={gardenHero} alt="A glimpse of the Hasiru Haadi garden" className="journal-hero-image" />
          <span className="journal-image-caption">A little world, growing every day</span>
        </div>
      </section>

      <section className="journal-welcome">
        <p className="journal-eyebrow">WELCOME, I'M GLAD YOU'RE HERE</p>
        <h2>Every little thing has a story.</h2>
        <p>
          Some stories begin in a garden, some on a quiet village road, and some
          with a tiny plant growing in a reused container. This is where I keep
          those moments — just as they are, with a little room for wonder.
        </p>
      </section>

      <section className="journal-featured" aria-labelledby="featured-title">
        <div className="journal-section-heading">
          <div>
            <p className="journal-eyebrow">A PLACE CLOSE TO MY HEART</p>
            <h2>Featured story</h2>
          </div>
          <span className="journal-index">01 / FEATURED</span>
        </div>
        <Link to="/journal/yerigenahalli" className="journal-feature-link">
          <img src={villageHero} alt="Yerigenahalli village at dusk" className="journal-feature-image" />
          <div className="journal-feature-copy">
            <p className="journal-eyebrow">VILLAGE CHRONICLES</p>
            <h3 id="featured-title">Yerigenahalli – A Place That Feels Like Peace</h3>
            <p>
              Some places don't need grand attractions. A quiet road, green fields
              and familiar faces are sometimes enough to make you feel at home.
            </p>
            <span className="journal-read-link">Visit the village <span aria-hidden="true">↗</span></span>
          </div>
        </Link>
      </section>

      <section className="journal-latest" id="latest-stories" aria-labelledby="latest-title">
        <div className="journal-section-heading">
          <div>
            <p className="journal-eyebrow">LITTLE MOMENTS, KEPT IN WORDS</p>
            <h2 id="latest-title">From the journal</h2>
          </div>
          <span className="journal-index">THE COLLECTION</span>
        </div>
        <div className="journal-grid">
          {stories.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>
      </section>

      <footer className="journal-footer">
        <p className="journal-footer-quote">“A little corner of the internet, growing with time.”</p>
        <p>Thank you for being here.</p>
        <Link to="/" className="journal-footer-link">Back to the Hasiru Haadi map ↑</Link>
        <span className="journal-footer-brand">HASIRU HAADI · GROWING WITH NATURE</span>
      </footer>
    </main>
  );
}
