import BackToMap    from "../components/BackToMap";
import FadeIn       from "../components/FadeIn";
import PageWrapper  from "../components/PageWrapper";
import ExploreMore  from "../components/ExploreMore";
import "./Farm.css";

import farm1   from "../assets/farm/img1.jpg";
import farm2   from "../assets/farm/img2.jpg";
import farm3   from "../assets/farm/img3.jpg";
import farm4   from "../assets/farm/img4.jpg";
import farm5   from "../assets/farm/img5.jpg";
import heroImg from "../assets/farm/hero-img2.jpg";

export default function Farm() {
  return (
    <PageWrapper>
      <div className="farm-page">
        <BackToMap />

        {/* Hero with overlay */}
        <FadeIn>
          <section className="farm-hero">
            <div className="hero-img-wrap">
              <img loading="lazy" src={heroImg} alt="Our farm" />
              <div className="hero-overlay">
                <h1>Our Farm</h1>
                <p>Rooted in tradition, growing with care.</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Story */}
        <FadeIn delay={0.05}>
          <section className="farm-story">
            <h2>Our Farm Story</h2>
            <p>
              Living in the heart of Kalpataru Naadu, our lives are shaded by the grace
              of coconut palms. Our farm, located just a walkable distance from our
              home, forms the center of our daily life. While the land provides, it is
              my father who nurtures it — he is the backbone of every development here.
            </p>
            <p>
              We cultivate a diverse ecosystem. Alongside the abundant coconut
              trees, we grow areca nut, mango, and cashew nut trees. Staying true to
              our roots, we also grow seasonal crops like ragi — our staple food —
              and green gram. Recently, taking a step toward further development, my
              father expanded the plantation by planting new saplings. To ensure the
              land thrives sustainably, we rely on a drip irrigation system sourced
              through a borewell, making careful and efficient use of every drop of water.
            </p>
            <p className="farm-signature">
              It is a labor of love that sustains us, ensuring that our land flourishes
              for generations to come.
            </p>
          </section>
        </FadeIn>

        {/* Farm Moments */}
        <FadeIn delay={0.05}>
          <section className="farm-photos">
            <h2>Farm Moments</h2>
            <div className="photo-grid">
              <img loading="lazy" src={farm2} alt="Coconut trees in our farm" />
              <img loading="lazy" src={farm3} alt="Areca nut trees growing" />
              <img loading="lazy" src={farm1} alt="Raagi crop in the field" />
              <img loading="lazy" src={farm4} alt="Drip irrigation system" />
              <img loading="lazy" src={farm5} alt="Farm view" />
            </div>
          </section>
        </FadeIn>

        <ExploreMore current="/farm" />

        <footer className="farm-footer">
          <p>Grounded in soil, guided by care.</p>
        </footer>
      </div>
    </PageWrapper>
  );
}
