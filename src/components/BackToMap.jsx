import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./BackToMap.css";

export default function BackToMap() {
  const navigate = useNavigate();

  return (
    <button
      className="back-map-btn"
      onClick={() => navigate("/")}
      aria-label="Back to map"
      title="Back to map"
    >
      <FaArrowLeft aria-hidden="true" />
    </button>
  );
}