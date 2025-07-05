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
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '80px',
            zIndex: 10
          }}
        >
          <button
            type="button"
            className="px-20 rounded-full text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap"
            style={{
              fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif',
              letterSpacing: '0.08em',
              fontSize: '60px',
              height: '80px',
              lineHeight: '80px',
              minWidth: '700px',
              padding: 0
            }}
          >
            Unlock&nbsp;the&nbsp;Ride
          </button>
        </a>
      </div>
    </div>
  );
}
