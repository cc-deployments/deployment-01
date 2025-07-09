"use client";

import { useEffect } from "react";
import { sdk } from '@farcaster/frame-sdk';
import Image from "next/image";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Share handler for the hero image
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "CarMania Garage",
        text: "Check out CarMania Garage!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white">
      {/* 1. Main hero image with share button */}
      <div className="relative w-full max-w-2xl mx-auto">
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto" }}
          priority
        />
        {/* Subtle share button (top right) */}
        <button
          onClick={handleShare}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            background: "rgba(163,36,40,0.85)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            opacity: 0.85,
            zIndex: 10,
          }}
          aria-label="Share"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 2. Secondary gallery image */}
      <div className="w-full max-w-2xl mx-auto mt-4">
        <Image
          src="/carmania-gallery-hero-2.png"
          alt="CarMania Gallery Hero 2"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>

      {/* 3. Text page image */}
      <div className="w-full max-w-2xl mx-auto my-4 flex justify-center">
        <Image
          src="/text-page.png"
          alt="CarMania Gallery Text Page"
          width={630}
          height={1200}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
        />
      </div>

      {/* 4. CarCulture logo and Unlock the Ride button */}
      <div className="w-full bg-white flex flex-col items-center">
        <div className="flex justify-center w-full mt-6 mb-2">
          <Image
            src="/carculture-logo.png"
            alt="Car Culture Logo"
            width={112}
            height={48}
            style={{ width: "112px", height: "auto" }}
            priority
          />
        </div>
        <div className="flex flex-col items-center w-full mt-0">
          <a
            href="https://app.manifold.xyz/c/man-driving-car"
            target="_blank"
            rel="noopener noreferrer"
            className="md:w-auto flex justify-center"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              type="button"
              className="rounded-full text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap font-semibold text-xs px-1.5 md:px-5 py-0.5 md:py-1.5 min-w-[54px] md:min-w-[156px] h-4 md:h-8 flex items-center justify-center border-none"
              style={{
                fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '0.08em',
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
