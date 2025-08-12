import React from 'react';
import Image from 'next/image';

export default function TextPageWithOverlay() {
  // Overlay content with CarMania branding and functionality
  const overlayContent = (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: '10%',
    }}>
      {/* Top third: Centered icon */}
      <div style={{
        height: '33%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image
          src="/icon.png"
          alt="Car Culture Icon"
          width={120}
          height={120}
          priority
        />
      </div>
      {/* Remaining space: Button just below center */}
      <div style={{
        height: '67%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        <a
          href="https://app.manifold.xyz/c/man-driving-car"
          target="_blank"
          rel="noopener noreferrer"
          style={{ pointerEvents: "auto" }}
        >
          <button
            type="button"
            className="rounded-xl text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap font-semibold text-base px-5 py-2 min-w-0 h-10 flex items-center justify-center border-none"
            style={{
              fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '0.08em',
              fontSize: 18,
              marginTop: 60,
            }}
          >
            Unlock&nbsp;the&nbsp;Ride
          </button>
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div 
        className="relative shadow-lg"
        style={{
          width: '630px',
          height: '1800px',
          maxWidth: '100%',
          maxHeight: '100vh',
        }}
      >
        {/* Main image area with text-page.png */}
        <Image
          src="/text-page.png"
          alt="CarMania Gallery Text Page"
          width={630}
          height={1800}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
          }}
          priority
        />
        
        {/* Bottom overlay - always bottom third of image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '33%',
            background: 'rgba(255, 255, 255, 0.95)',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            zIndex: 2,
          }}
        >
          {overlayContent}
        </div>
      </div>
    </div>
  );
} 