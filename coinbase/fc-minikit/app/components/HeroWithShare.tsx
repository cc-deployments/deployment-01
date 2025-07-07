import React from "react";

// Props for position customization
interface HeroWithStartProps {
  onStart: () => void;
  startPosition?: React.CSSProperties;
}

const HeroWithStart: React.FC<HeroWithStartProps> = ({ onStart, startPosition }) => (
  <div style={{ position: "relative", width: "100%", maxWidth: 600, margin: "0 auto" }}>
    <img
      src="/hero.png"
      alt="CarMania Garage Hero"
      style={{ width: "100%", display: "block", borderRadius: 0 }}
    />
    <button
      onClick={onStart}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        background: "#a32428",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 8,
        letterSpacing: 0.5,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        opacity: 0.95,
        ...startPosition,
      }}
      aria-label="Start"
    >
      START
    </button>
  </div>
);

export default HeroWithStart; 