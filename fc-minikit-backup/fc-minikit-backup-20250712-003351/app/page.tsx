"use client";
import { useEffect } from 'react';
import Image from "next/image";
import { sdk } from '@farcaster/miniapp-sdk';
// import ShareArrow if used

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Example share handler for ShareArrow if present
  // handleShare function removed as it is unused

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1260px',
        height: '2400px',
        margin: '0 auto',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <div className="image-area">
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1260}
          height={2200}
          style={{ width: '100%', height: 'auto', objectFit: 'none', objectPosition: 'top left', display: 'block' }}
          priority
        />
      </div>
      <div
        style={{
          width: '1260px',
          height: '200px',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Uncomment if ShareArrow is used: <ShareArrow onClick={handleShare} /> */}
      </div>
    </div>
  );
}
