import { useNavigate } from "react-router-dom";
import "./ExploreMore.css";

const ALL_ZONES = [
  {
    label: "Garden",  route: "/garden",  emoji: "🌱",
    desc: "Backyard beds & harvests",
    bg: "#e9f5db", accent: "#3a7d44",
  },
  {
    label: "Plants",  route: "/plants",  emoji: "🪴",
    desc: "A journey into plant care",
    bg: "#dff0e0", accent: "#2d6a4f",
  },
  {
    label: "Farm",    route: "/farm",    emoji: "🌾",
    desc: "Coconut palms & open land",
    bg: "#fef3cd", accent: "#7a5c00",
  },
  {
    label: "Village", route: "/village", emoji: "🏡",
    desc: "Yerigenahalli & quiet life",
    bg: "#fce8d5", accent: "#7a3b1e",
  },
  {
    label: "Gallery", route: "/gallery", emoji: "📸",
    desc: "Moments without noise",
    bg: "#e8ecf8", accent: "#2c3e7a",
  },
  {
    label: "Shop",    route: "/shop",    emoji: "🛒",
    desc: "Plants, seeds & more",
    bg: "#f5e6f8", accent: "#5c2d7a",
  },
];

export default function ExploreMore({ current }) {
  const navigate = useNavigate();
  const suggestions = ALL_ZONES.filter(z => z.route !== current).slice(0, 3);

  return (
    <section className="explore-more">
      <p className="explore-more-label">Also explore</p>
      <div className="explore-more-grid">
        {suggestions.map(z => (
          <button
            key={z.route}
            className="explore-more-card"
            style={{ "--card-bg": z.bg, "--card-accent": z.accent }}
            onClick={() => navigate(z.route)}
          >
            <span className="explore-emoji">{z.emoji}</span>
            <span className="explore-text">
              <span className="explore-name">{z.label}</span>
              <span className="explore-desc">{z.desc}</span>
            </span>
            <span className="explore-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
