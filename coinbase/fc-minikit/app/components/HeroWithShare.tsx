import React from "react";
import Image from "next/image";

// Props for position customization
interface HeroWithStartProps {
  onStart: () => void;
  startPosition?: React.CSSProperties;
}

const HeroWithStart: React.FC<HeroWithStartProps> = ({ onStart, startPosition }) => (
  <div style={{ position: "relative", width: "100%", maxWidth: 600, margin: "0 auto" }}>
    <Image
      src="/hero.png"
      alt="CarMania Garage Hero"
      width={1200}
      height={630}
      style={{ width: "100%", display: "block", borderRadius: 0 }}
      priority
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
      aria-label="Share"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
);

export default HeroWithStart; 