import React from 'react';
import ImageWithOverlay from './ImageWithOverlay';
import Image from 'next/image';

export default function ImageWithOverlayExample() {
  // Example overlay content
  const overlayContent = (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Image
        src="/icon.png"
        alt="Car Culture Icon"
        width={80}
        height={80}
        style={{ marginBottom: '16px' }}
        priority
      />
      <button
        type="button"
        className="rounded-lg text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap font-semibold text-base px-6 py-3 min-w-0 flex items-center justify-center border-none"
        style={{
          fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: '0.08em',
          fontSize: '18px',
        }}
      >
        Unlock the Ride
      </button>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <ImageWithOverlay
        imageSrc="/text-page.png"
        imageAlt="CarMania Gallery Text Page"
        overlayContent={overlayContent}
        className="shadow-lg"
      />
    </div>
  );
} 