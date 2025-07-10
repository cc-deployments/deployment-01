"use client";

import { useEffect } from "react";
import { sdk } from '@farcaster/frame-sdk';
import Image from "next/image";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Removed unused handleShare function

  return (
    <div
      style={{
        position: "relative",
        width: 630,
        height: 1280,
        maxWidth: "100%",
        background: "#fff",
        overflow: "hidden",
        borderRadius: 24,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        margin: "0 auto",
      }}
      className="mx-auto"
    >
      {/* Main text-page.png image as background */}
      <Image
        src="/text-page.png"
        alt="CarMania Gallery Text Page"
        width={630}
        height={1280}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
        priority
      />
      {/* White overlay for transparent area */}
      <div
        style={{
          position: "absolute",
          top: 850,
          left: 0,
          width: "100%",
          height: 430,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Image
          src="/icon.png"
          alt="Car Culture Icon"
          width={80}
          height={80}
          style={{ marginBottom: 32, marginTop: 0 }}
          priority
        />
        <a
          href="https://app.manifold.xyz/c/man-driving-car"
          target="_blank"
          rel="noopener noreferrer"
          style={{ pointerEvents: "auto" }}
        >
          <button
            type="button"
            className="rounded-lg text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap font-semibold text-base px-4 py-1 min-w-0 h-9 flex items-center justify-center border-none"
            style={{
              fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif',
              letterSpacing: '0.08em',
              fontSize: 16,
            }}
          >
            Unlock&nbsp;the&nbsp;Ride
          </button>
        </a>
      </div>
    </div>
  );
}
