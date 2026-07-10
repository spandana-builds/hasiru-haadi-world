import BackToMap from "../components/BackToMap";
import "./Shop.css";

import heroImg from "../assets/shop/hero.jpeg";
import img2 from "../assets/shop/img2.jpeg";
import img3 from "../assets/shop/img3.jpeg";
import img4 from "../assets/shop/img4.jpeg";

export default function Shop() {
  return (
    <div className="shop-page">
      <BackToMap />

      {/* Hero */}
      <section className="shop-hero fade-in">
        <img
          src={heroImg}
          alt="Hasiru Haadi Shop"
        />
        <h1>Hasiru Haadi Shop</h1>
        <p className="shop-subtitle">
          A small marketplace rooted in nature and care.
        </p>
      </section>

      {/* Story */}
      <section className="shop-story fade-in">
        <h2>Our Marketplace</h2>

        <p>
          At Hasiru Haadi, we believe that nature deserves calm attention and
          careful hands. Alongside our gardens and farm, we have built a modest
          marketplace where you can find plants, seeds, and home-grown products —
          all chosen with intention and love.
        </p>

        <p>
          We are two sisters who started this small initiative to bring a little
          more green and a little more goodness into the world. From saplings and
          seeds to simple eco-friendly items, our shop reflects what we nurture
          and enjoy every day.
        </p>

        <p>
          Every item is handpicked or handmade with care, packed with heart, and
          delivered with gratitude. Whether you are a plant lover, a nature
          enthusiast, or someone curious about sustainable living — welcome.
          You are walking the green path with us.
        </p>

        <p className="shop-signature">
          Bring a piece of Hasiru Haadi into your own space 🌿
        </p>
      </section>

      {/* Shop Moments */}
      <section className="shop-moments fade-in">
        <h2>Shop Moments</h2>
        <div className="photo-grid">
          <img
            loading="lazy"
            src={img2}
            alt="Shop moment"
          />
          <img
            loading="lazy"
            src={img3}
            alt="Shop moment"
          />
          <img
            loading="lazy"
            src={img4}
            alt="Shop moment"
          />
        </div>
      </section>

      {/* Beliefs */}
      <section className="shop-beliefs fade-in">
        <h2>Our Beliefs</h2>

        <div className="belief-grid">
          <div className="belief-card">
            <span style={{ fontSize: "2.5rem" }}>🌼</span>
            <strong>Nature is our home</strong>
            <span>We cherish and protect it.</span>
          </div>

          <div className="belief-card">
            <span style={{ fontSize: "2.5rem" }}>🧵</span>
            <strong>Simplicity is beauty</strong>
            <span>We keep our designs and products minimal.</span>
          </div>

          <div className="belief-card">
            <span style={{ fontSize: "2.5rem" }}>🤝</span>
            <strong>Community is strength</strong>
            <span>We believe in supporting local and growing together.</span>
          </div>
        </div>
      </section>

      {/* Meesho Link */}
      <section className="shop-link fade-in">
        <p>Visit our live store on Meesho</p>
        <a
          href="https://www.meesho.com/Hasiruhaadi?_ms=3.0.1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Hasiru Haadi on Meesho →
        </a>
      </section>

      {/* Footer */}
      <footer className="shop-footer">
        <p>Growing green, sharing goodness.</p>
      </footer>
    </div>
  );
}
