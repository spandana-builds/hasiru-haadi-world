import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MapZone({ label, position, route, icon, featured }) {
  const navigate = useNavigate();

  const handleActivate = () => navigate(route);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(route);
    }
  };

  return (
    <motion.div
      className={`map-zone ${featured ? "featured" : ""}`}
      style={{ top: position.top, left: position.left }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.12 }}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Go to ${label}`}
    >
      <div className="zone-icon">
        <img src={icon} alt="" aria-hidden="true" />
      </div>
      <span>{label}</span>
    </motion.div>
  );
}
