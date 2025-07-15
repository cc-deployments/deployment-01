"use client";
import Image from "next/image";

export default function TextPage() {
  const isLocalhost = window.location.hostname === 'localhost';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: isLocalhost ? 600 : 1260,
        height: isLocalhost ? 1200 : 2400,
        position: 'relative',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...(isLocalhost && {
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }),
      }}
    >
      <div style={{ width: 1260, height: 2000, position: "relative" }}>
        <Image
          src="/text-page.png"
          alt="Text Page"
          width={1260}
          height={2000}
          style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
          priority
        />
      </div>
      {/* Transparent area at bottom */}
      <div
        style={{
          width: 1260,
          height: 300,
          background: "transparent",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
          }}
          style={{
            backgroundColor: '#ae262a',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            padding: '22.5px 45px', // 50% increase from 15px 30px
            fontSize: '27px', // 50% increase from 18px
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease',
            minWidth: '300px', // 50% increase from 200px
            marginTop: '-40px', // Move button higher in the area
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
          }}
        >
          Unlock the Ride
        </button>
      </div>
    </div>
  );
} 