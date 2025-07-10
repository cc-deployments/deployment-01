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
    <div className="flex flex-col items-center bg-white">
      {/* 1. Main hero image */}
      <div className="w-full max-w-2xl mx-auto">
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>

      {/* Share icon in white area below hero image */}
      <div className="w-full max-w-2xl mx-auto flex justify-center items-center" style={{ background: "#fff", height: 48 }}>
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (navigator.share && navigator.share !== undefined) {
              navigator.share({
                title: "CarMania Garage",
                text: "Check out CarMania Garage!",
                url: window.location.href,
              }).catch((error) => {
                console.log('Share failed:', error);
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
          style={{
            background: "none",
            border: "none",
            padding: 8,
            margin: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            width: 40,
            borderRadius: "50%",
            zIndex: 10,
            position: "relative",
          }}
          aria-label="Share"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="#111" strokeWidth="2" fill="none" />
            <path d="M14 7V21M14 7L8 13M14 7L20 13" stroke="#a32428" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* 2. Secondary gallery image */}
      <div className="w-full max-w-2xl mx-auto mt-0">
        <a
          href="https://app.manifold.xyz/c/man-driving-car"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          <Image
            src="/carmania-gallery-hero-2.png"
            alt="CarMania Gallery Hero 2"
            width={1200}
            height={630}
            style={{ width: "100%", height: "auto", cursor: "pointer", transition: "box-shadow 0.2s" }}
            className="hover:shadow-lg"
            priority
          />
        </a>
      </div>

      {/* 3. Text page image with flex white section for icon/button */}
      <div className="w-full max-w-2xl mx-auto my-4 flex flex-col items-center">
        <Image
          src="/text-page.png"
          alt="CarMania Gallery Text Page"
          width={1260}
          height={2400}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 24,
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            display: "block",
          }}
          priority
        />
        {/* White area for icon and button, fixed height 1140px (matches transparent area) */}
        <div
          className="w-full flex flex-col items-center justify-start"
          style={{
            background: "#fff",
            width: "100%",
            maxWidth: "100%",
            height: 1140,
            minHeight: 200,
          }}
        >
          <Image
            src="/icon.png"
            alt="Car Culture Icon"
            width={120}
            height={120}
            style={{ marginBottom: 32, marginTop: 140 }}
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
    </div>
  );
}
