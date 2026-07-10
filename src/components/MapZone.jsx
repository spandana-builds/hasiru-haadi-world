import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MapZone({ label, position, route, icon, featured, delay = 0 }) {
  const navigate = useNavigate();

  const handleActivate = () => navigate(route);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(route);
    }
  };

  return (
    <div
      className={`map-zone ${featured ? "featured" : ""}`}
      style={{ top: position.top, left: position.left }}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Go to ${label}`}
    >
      <motion.div
        className="zone-inner"
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay },
          scale: { duration: 0.5, delay },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
        }}
      >
        <div className="zone-icon">
          <img src={icon} alt="" aria-hidden="true" />
        </div>
        <span>{label}</span>
      </motion.div>
    </div>
  );
}
