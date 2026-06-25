import BackToMap    from "../components/BackToMap";
import FadeIn       from "../components/FadeIn";
import PageWrapper  from "../components/PageWrapper";
import ExploreMore  from "../components/ExploreMore";
import "./Garden.css";

import heroImg    from "../assets/garden/hero.jpeg";
import bedImg     from "../assets/garden/bed.jpg";
import trellisImg from "../assets/garden/ridge-gaurd-on-trellis.jpg";
import harvestImg from "../assets/garden/harvest-radish.jpg";
import methiImg   from "../assets/garden/methi-harvest.jpg";

export default function Garden() {
  return (
    <PageWrapper>
      <div className="garden-page">
        <BackToMap />

        {/* Hero with text overlay */}
        <FadeIn>
          <section className="garden-hero">
            <div className="hero-img-wrap">
              <img loading="lazy" src={heroImg} alt="Harvested peas in hand at sunset" />
              <div className="hero-overlay">
                <h1>Our Garden</h1>
                <p>A small backyard where patience turns into food.</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Story */}
        <FadeIn delay={0.05}>
          <section className="garden-story">
            <h2>My Garden Story</h2>
            <p>
              My sister and I built our backyard garden with our own hands and a lot
              of patience. What began as a small experiment slowly grew into a space
              that feels deeply ours. We have eight garden beds in total. Four of them are shaped using
              coconut husk boundaries, while the other four are built with leftover
              cement bricks from our home construction. In these beds, we grow leafy greens like spinach, coriander, methi,
              dill, and pudina, along with peas, bitter gourd, radish, tomato, beans,
              ladies' finger, chilli, and other seasonal crops. Each bed has its own drip irrigation system. We don't rush the
              process—we let nature grow at its own pace.
            </p>
            <p className="garden-signature">
              We lovingly call this space <strong>Hasiru Haadi Vegetable Garden</strong> —
              a green path that we walk every day.
            </p>
          </section>
        </FadeIn>

        {/* Garden Moments */}
        <FadeIn delay={0.05}>
          <section className="garden-photos">
            <h2>Garden Moments</h2>
            <div className="photo-grid">
              <img loading="lazy" src={bedImg}     alt="Garden bed with coconut husk boundary" />
              <img loading="lazy" src={trellisImg} alt="Ridge gourd growing on trellis" />
              <img loading="lazy" src={harvestImg} alt="Freshly harvested radish" />
              <img loading="lazy" src={methiImg}   alt="Fresh methi harvest" />
            </div>
          </section>
        </FadeIn>

        {/* What We Grow */}
        <FadeIn delay={0.05}>
          <section className="garden-grow">
            <h2>What We Grow</h2>
            <div className="grow-grid">
              <div className="grow-card">🍅 Tomato</div>
              <div className="grow-card">🌶️ Chilli</div>
              <div className="grow-card">🥬 Leafy Greens</div>
              <div className="grow-card">🫘 Beans</div>
              <div className="grow-card">🥒 Bitter Gourd</div>
              <div className="grow-card">🌱 Seasonal Crops</div>
            </div>
          </section>
        </FadeIn>

        {/* Growth Stages */}
        <FadeIn delay={0.05}>
          <section className="garden-stages">
            <h2>Growth Stages</h2>
            <div className="stages-flow">
              <span>🌱</span>
              <div className="stage-line" />
              <span>🌿</span>
              <div className="stage-line" />
              <span>🧺</span>
            </div>
          </section>
        </FadeIn>

        <ExploreMore current="/garden" />

        <footer className="garden-footer">
          <p>Grown with care, not hurry.</p>
        </footer>
      </div>
    </PageWrapper>
  );
}
