import BackToMap from "../components/BackToMap";
import "./Plants.css";

import plant1 from "../assets/plants/img1.jpg";
import plant2 from "../assets/plants/img2.jpg";
import plant3 from "../assets/plants/img3.jpg";
import plant4 from "../assets/plants/img4.jpg";
import plant5 from "../assets/plants/img5.jpg";
import plant6 from "../assets/plants/img6.jpg";
import plant7 from "../assets/plants/img7.jpg";
import plant8 from "../assets/plants/img8.jpg";
import plant9 from "../assets/plants/img9.jpg";
import heroImg from "../assets/plants/img10.jpg";


export default function Plants() {
  return (
    <div className="plants-page">
      <BackToMap />

      {/* Hero */}
      <section className="plants-hero fade-in">
         <img src={heroImg} alt="potted plants" />
        <h1>My Plants</h1>
        <p className="plants-subtitle">
          Where curiosity slowly turned into companionship.
        </p>
      </section>

      {/* Story */}
      <section className="plants-story fade-in">
        <h2>My Plant Journey</h2>

        <p>
          My interest in growing plants started during the COVID-19 lockdown.
          With time slowing down, I began experimenting with a small terrace
          garden using plastic bottles and reused plastic boxes. It wasn’t
          planned or perfect, but it felt meaningful. I still remember the very first gardening video I watched on YouTube —
          <strong> “Plant Propagation in Soil and Water” </strong> by GardenUp
          (Ekta Chaudhary). Watching plants grow from simple cuttings inspired me
          deeply, and that’s where my journey truly began.
        </p>

        <p>
          From then on, I started collecting plants wherever I went — from
          relatives’ homes, friends’ houses, nurseries, and every place I could.
          Since my home was outside the village and I didn’t have many friends
          nearby, plants slowly became my closest companions. Every morning, I woke up with excitement to look for new growth — tiny
          leaves, fresh shoots, flowers blooming, and sometimes harvesting.
          Gardening became my therapy, my peace, and my quiet joy.
        </p>

        <p className="plants-signature">
          Plants taught me patience, observation, and how small care can create
          something beautiful.
        </p>
      </section>
      {/* Plants Moments */}
<section className="plants-photos fade-in">
  <h2>Plant Moments</h2>

  <div className="photo-grid">
    <img src={plant1} alt="Young plant growth" />
    <img src={plant2} alt="New leaves emerging" />
    <img src={plant3} alt="Healthy potted plant" />
    <img src={plant4} alt="Plant collection at home" />
    <img src={plant5} alt="Plant collection at home" />
    <img src={plant6} alt="Plant collection at home" />
    <img src={plant7} alt="Plant collection at home" />
    <img src={plant8} alt="Plant collection at home" />
    <img src={plant9} alt="Plant collection at home" />
    <img src={heroImg} alt="Plant collection at home" />
  </div>
</section>

{/* Watering Tracker */}
<section className="plants-tool fade-in">
  <h2>Plant Watering Tracker</h2>
  <p>
    To stay consistent with plant care, I built a simple plant watering tracker.
    It helps me remember when each plant needs attention.
  </p>
<a
  href="https://plant-care-system.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 16px",
    borderRadius: "999px",
    border: "none",
    background: "#2d6a4f",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  }}
>
  Visit Plant Watering Tracker →
</a>

</section>

      {/* Footer */}
      <footer className="plants-footer">
        <p>Growing plants, growing peace.</p>
      </footer>
    </div>
  );
}
