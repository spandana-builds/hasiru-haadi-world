import { createRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BackToMap() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "10px 16px",
        borderRadius: "999px",
        border: "none",
        background: "#2d6a4f",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      ← Back to Map
    </button>
  );
}
