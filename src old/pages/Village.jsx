import BackToMap from "../components/BackToMap";
import "./Village.css";

import heroImg from "../assets/village/hero-village.jpg";
import field1 from "../assets/village/fields-1.jpg";
import field2 from "../assets/village/fields-2.jpg";
import lifeImg from "../assets/village/village-life.jpg";
import skyImg from "../assets/village/village-sky.jpg";
import detailImg from "../assets/village/village-detail.jpg";

export default function Village() {
  return (
    <div className="village-page">
      <BackToMap />

      {/* Hero */}
      <section className="village-hero fade-in">
        <img src={heroImg} alt="Yerigenahalli village at dusk" />
        <h1>Yerigenahalli</h1>
        <p className="village-subtitle">
          Where life moves with the land, light, and people.
        </p>
      </section>

      {/* Story */}
      <section className="village-story fade-in">
        <p>
          <strong>Yerigenahalli</strong> is one of the most beautiful villages I
          have ever seen.
        </p>

        <p>
          Surrounded by cultivated fields, gentle mountains, and open skies, it
          offers sunrises and sunsets that quietly stay with you. It is my
          brother-in-law’s native place, and every visit reminds me how lucky my
          sister is to call this place home.
        </p>

        <p>
          They have cows, and honestly, the calves are one of the main reasons I
          keep coming back — I simply love them. There is a softness in the way
          life exists here, unhurried and sincere. The people of Yerigenahalli
          are kind-hearted and selfless, treating everyone like their own, with
          a warmth that doesn’t need words.
        </p>

        <p>
          The village is about 16 km from our home. On early mornings, I ride my
          scooty there. The journey itself feels like therapy — quiet roads,
          green crops on either side, little traffic, and the gentle glow of the
          sunrise. In those moments, everything feels peaceful and whole.
        </p>

        <p className="village-signature">
          Yerigenahalli reminds me that a simple life, lived close to nature and
          people, is often the richest.
        </p>
      </section>

      {/* Village Moments */}
      <section className="village-photos fade-in">
        <h2>Village Moments</h2>

        <div className="photo-grid">
          <img src={field1} alt="Cultivated crop fields" />
          <img src={field2} alt="Farming work and tractor" />
          <img src={lifeImg} alt="Cows and calves in the village" />
          <img src={skyImg} alt="Village sunset sky" />
          <img src={detailImg} alt="Quiet village water body" />
        </div>
      </section>

 

      {/* Footer */}
      <footer className="village-footer">
        <p>Some places teach you without speaking.</p>
      </footer>
    </div>
  );
}
