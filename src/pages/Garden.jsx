import BackToMap from "../components/BackToMap";
import "./Garden.css";

import heroImg from "../assets/garden/hero.jpeg";
import bedImg from "../assets/garden/bed.jpg";
import trellisImg from "../assets/garden/ridge-gaurd-on-trellis.jpg";
import harvestImg from "../assets/garden/harvest-radish.jpg";
import methiImg from "../assets/garden/methi-harvest.jpg";

export default function Garden() {
  return (
    <div className="garden-page">
      <BackToMap />

      {/* Hero */}
      <section className="garden-hero fade-in">
        <img src={heroImg} alt="Harvested peas in hand at sunset" />
        <h1>Our Garden</h1>
        <p className="garden-subtitle">
          A small backyard where patience turns into food.
        </p>
      </section>

      {/* Story */}
      <section className="garden-story fade-in">
        <h2>My Garden Story</h2>

        <p>
          My sister and I built our backyard garden with our own hands and a lot
          of patience. What began as a small experiment slowly grew into a space
          that feels deeply ours. We have eight garden beds in total. Four of them are shaped using
          coconut husk boundaries, while the other four are built with leftover
          cement bricks from our home construction. In these beds, we grow leafy greens like spinach, coriander, methi,
          dill, and pudina, along with peas, bitter gourd, radish, tomato, beans,
          ladies’ finger, chilli, and other seasonal crops. Each bed has its own drip irrigation system. We don’t rush the
          process—we let nature grow at its own pace.
        </p>

        <p className="garden-signature">
          We lovingly call this space <strong>Hasiru Haadi Vegetable Garden</strong> —
          a green path that we walk every day.
        </p>
      </section>

      {/* Garden Moments */}
      <section className="garden-photos fade-in">
        <h2>Garden Moments</h2>

        <div className="photo-grid">
          <img src={bedImg} alt="Garden bed with coconut husk boundary" />
          <img src={trellisImg} alt="Ridge gourd growing on trellis" />
          <img src={harvestImg} alt="Freshly harvested radish" />
          <img src={methiImg} alt="Fresh methi harvest" />
        </div>
      </section>

      {/* What We Grow */}
      <section className="garden-grow fade-in">
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

      {/* Growth Stages */}
      <section className="garden-stages fade-in">
        <h2>Growth Stages</h2>

        <div className="stages-flow">
          <span>🌱</span>
          <div className="stage-line" />
          <span>🌿</span>
          <div className="stage-line" />
          <span>🧺</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="garden-footer">
        <p>Grown with care, not hurry.</p>
      </footer>
    </div>
  );
}
