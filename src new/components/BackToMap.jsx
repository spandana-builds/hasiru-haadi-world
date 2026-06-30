import { useNavigate } from "react-router-dom";

export default function BackToMap() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "fixed",
        top: "16px",
        left: "16px",
        zIndex: 100,
        padding: "9px 18px",
        borderRadius: "999px",
        border: "none",
        background: "rgba(27, 67, 50, 0.82)",   /* semi-transparent so it blends over the photo */
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        letterSpacing: "0.2px",
      }}
      aria-label="Back to map"
    >
      ← Map
    </button>
  );
}
