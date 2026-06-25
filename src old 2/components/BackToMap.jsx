import { useNavigate } from "react-router-dom";

export default function BackToMap() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "fixed",       /* sticky — always visible while scrolling */
        top: "16px",
        left: "16px",
        zIndex: 100,
        padding: "10px 18px",
        borderRadius: "999px",
        border: "none",
        background: "#2d6a4f",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
      aria-label="Back to map"
    >
      ← Map
    </button>
  );
}
