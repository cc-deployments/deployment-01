"use client";

import { useEffect, useState, useCallback } from "react";
import { sdk } from '@farcaster/frame-sdk';
import Image from "next/image";

export default function App() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  // 0 = hero, 1 = secondary

  const handleTap = useCallback(() => {
    if (galleryIndex === 0) {
      setGalleryIndex(1);
    } else if (galleryIndex === 1) {
      window.open("https://app.manifold.xyz/c/man-driving-car", "_blank");
    }
  }, [galleryIndex]);

  useEffect(() => {
    // Call ready as soon as the interface is ready to dismiss the splash screen
    sdk.actions.ready();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[var(--app-background)]">
      <div className="w-[1200px] max-w-full">
        <Image
          src={galleryIndex === 0 ? "/carmania-gallery-hero.png" : "/carmania-gallery-hero-2.png"}
          alt="CarMania Gallery Hero"
          width={1200}
          height={630}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
          onClick={handleTap}
        />
      </div>
      {/* Car Culture Logo */}
      <div className="flex justify-center w-full mt-6 mb-2">
        <Image
          src="/carculture-logo.png"
          alt="Car Culture Logo"
          width={100}
          height={60}
          style={{ width: "100px", height: "auto" }}
          priority
        />
      </div>
      {galleryIndex === 0 && (
        <div className="flex justify-center w-full mt-0">
          <a
            href="https://app.manifold.xyz/c/man-driving-car"
            target="_blank"
            rel="noopener noreferrer"
            className="md:w-auto flex justify-center"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              type="button"
              className="
                rounded-full
                text-white
                shadow-md
                hover:opacity-90
                transition
                bg-[#a32428]
                whitespace-nowrap
                font-semibold
                text-base
                px-4
                md:px-12
                py-1.5
                md:py-3
                min-w-[110px]
                md:min-w-[320px]
                h-9
                md:h-16
                flex
                items-center
                justify-center
                border-none
              "
              style={{
                fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '0.08em',
              }}
            >
              Unlock&nbsp;the&nbsp;Ride
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
