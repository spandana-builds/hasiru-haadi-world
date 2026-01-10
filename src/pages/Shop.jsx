import BackToMap from "../components/BackToMap";
import "./Shop.css";

export default function Shop() {
  return (
    <div className="shop-page">
      <BackToMap />

      {/* Hero */}
      <section className="shop-hero fade-in">
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

      {/* Beliefs */}
      <section className="shop-beliefs fade-in">
        <h2>Our Beliefs</h2>

        <div className="belief-grid">
          <div className="belief-card">
            🌼 <strong>Nature is our home</strong>
            <span>We cherish and protect it.</span>
          </div>

          <div className="belief-card">
            🧵 <strong>Simplicity is beauty</strong>
            <span>We keep our designs and products minimal.</span>
          </div>

          <div className="belief-card">
            🤝 <strong>Community is strength</strong>
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
          style={{
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
