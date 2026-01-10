import BackToMap from "../components/BackToMap";
import "./Farm.css";

import farm1 from "../assets/farm/img1.jpg";
import farm2 from "../assets/farm/img2.jpg";
import farm3 from "../assets/farm/img3.jpg";
import farm4 from "../assets/farm/img4.jpg";
import farm5 from "../assets/farm/img5.jpg";

import heroImg from "../assets/farm/hero-img2.jpg";

export default function Farm() {
  return (
    <div className="farm-page">
      <BackToMap />

      {/* Hero */}
      <section className="farm-hero fade-in">
        <img src={heroImg} alt="Our farm" />
        <h1>Our Farm</h1>
        <p className="farm-subtitle">
          Rooted in tradition, growing with care.
        </p>
      </section>

      {/* Story */}
      <section className="farm-story fade-in">
        <h2>Our Farm Story</h2>

        <p>
          Living in the heart of Kalpataru Naadu, our lives are shaded by the grace
          of coconut palms. Our farm, located just a walkable distance from our
          home, forms the center of our daily life. While the land provides, it is
          my father who nurtures it — he is the backbone of every development
          here.
        </p>

        <p>
          We cultivate a diverse ecosystem. Alongside the abundant coconut
          trees, we grow areca nut, mango, and cashew nut trees. Staying true to
          our roots, we also grow seasonal crops like ragi — our staple food —
          and green gram. Recently, taking a step toward further development, my
          father expanded the plantation by planting new saplings. To ensure the
          land thrives sustainably, we rely on a drip irrigation system sourced
          through a borewell, making careful and efficient use of every drop of
          water.
        </p>

        <p className="farm-signature">
          It is a labor of love that sustains us, ensuring that our land flourishes
          for generations to come.
        </p>
      </section>

      {/* Farm Moments */}
      <section className="farm-photos fade-in">
        <h2>Farm Moments</h2>

        <div className="photo-grid">
          <img src={farm2} alt="Coconut trees in our farm" />
          <img src={farm3} alt="Areca nut trees growing" />
          <img src={farm1} alt="Raagi crop in the field" />
          <img src={farm4} alt="Drip irrigation system" />
          <img src={farm5} alt="Farm view" />
        </div>
      </section>

      {/* Footer */}
      <footer className="farm-footer">
        <p>Grounded in soil, guided by care.</p>
      </footer>
    </div>
  );
}
