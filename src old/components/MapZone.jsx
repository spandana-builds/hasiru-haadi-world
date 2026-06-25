import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MapZone({ label, position, route, icon, featured }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className={`map-zone ${featured ? "featured" : ""}`}
      style={{
        top: position.top,
        left: position.left,
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.12 }}
      onClick={() => navigate(route)}
    >
      <div className="zone-icon">
        <img src={icon} alt={label} />
      </div>
      <span>{label}</span>
    </motion.div>
  );
}
