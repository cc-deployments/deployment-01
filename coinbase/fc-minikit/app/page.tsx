"use client";

import { useEffect } from "react";
import { sdk } from '@farcaster/frame-sdk';
import Image from "next/image";

export default function App() {
  useEffect(() => {
    // Call ready as soon as the interface is ready to dismiss the splash screen
    sdk.actions.ready();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[var(--app-background)]">
      <div className="relative w-[1200px] max-w-full">
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1200}
          height={630}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
        />
        <a
          href="https://app.manifold.xyz/c/man-driving-car"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 bottom-20 z-10 transform -translate-x-1/2 w-full flex justify-center"
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
              text-2xl
              md:text-5xl
              px-8
              md:px-20
              py-3
              md:py-4
              min-w-[200px]
              md:min-w-[400px]
              h-16
              md:h-20
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
    </div>
  );
}
