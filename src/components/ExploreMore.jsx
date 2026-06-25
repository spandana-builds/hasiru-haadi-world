import { useNavigate } from "react-router-dom";
import "./ExploreMore.css";

const ALL_ZONES = [
  { label: "Garden",  route: "/garden",  emoji: "🌱" },
  { label: "Plants",  route: "/plants",  emoji: "🪴" },
  { label: "Farm",    route: "/farm",    emoji: "🌾" },
  { label: "Village", route: "/village", emoji: "🏡" },
  { label: "Gallery", route: "/gallery", emoji: "📸" },
  { label: "Shop",    route: "/shop",    emoji: "🛒" },
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
            onClick={() => navigate(z.route)}
          >
            <span className="explore-emoji">{z.emoji}</span>
            <span className="explore-name">{z.label}</span>
            <span className="explore-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
