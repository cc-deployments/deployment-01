"use client";

import { useEffect } from "react";
import { sdk } from '@farcaster/frame-sdk';
import Image from "next/image";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Share handler for the hero image
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Try native share first
    if (navigator.share && navigator.share !== undefined) {
      navigator.share({
        title: "CarMania Garage",
        text: "Check out CarMania Garage!",
        url: window.location.href,
      }).catch((error) => {
        console.log('Share failed:', error);
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      });
    } else {
      // Fallback for environments without native share
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

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
          onClick={handleShare}
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
        <Image
          src="/carmania-gallery-hero-2.png"
          alt="CarMania Gallery Hero 2"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>

      {/* 3. Text page image with overlaid logo and button */}
      <div className="w-full max-w-2xl mx-auto my-4 flex justify-center relative">
        <Image
          src="/text-page.png"
          alt="CarMania Gallery Text Page"
          width={630}
          height={1200}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
        />
        
        {/* Overlay container for logo and button */}
        <div className="absolute left-0 right-0 flex flex-col items-center justify-end bg-white" style={{ bottom: "120px", height: "18%", paddingBottom: 0 }}>
          {/* CarCulture logo */}
          <div className="flex justify-center w-full mb-3" style={{ marginBottom: 18 }}>
            <Image
              src="/carculture-logo.png"
              alt="Car Culture Logo"
              width={180}
              height={80}
              style={{ width: "180px", height: "auto" }}
              priority
            />
          </div>
          {/* Unlock the Ride button */}
          <div className="flex flex-col items-center w-full">
            <a
              href="https://app.manifold.xyz/c/man-driving-car"
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-auto flex justify-center"
              style={{ pointerEvents: 'auto' }}
            >
              <button
                type="button"
                className="rounded-full text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap font-semibold text-xs px-1.5 md:px-5 py-2 md:py-2.5 min-w-[54px] md:min-w-[156px] h-8 md:h-12 flex items-center justify-center border-none"
                style={{
                  fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  letterSpacing: '0.08em',
                  fontSize: 18,
                }}
              >
                Unlock&nbsp;the&nbsp;Ride
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
