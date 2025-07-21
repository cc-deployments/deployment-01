"use client";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { sdk } from '@farcaster/miniapp-sdk';

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Runtime check for localhost
  const [isLocalhost, setIsLocalhost] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      setIsLocalhost(true);
    }
  }, []);

  const handleUnlockRide = async () => {
    console.log('🎯 Unlock Ride button clicked!');
    console.log('🔗 Target URL: https://app.manifold.xyz/c/man-driving-car');
    
    // Universal navigation - works in all environments
    try {
      window.open('https://app.manifold.xyz/c/man-driving-car', '_blank', 'noopener,noreferrer');
      console.log('✅ Opened Manifold mint URL via universal navigation');
    } catch (error) {
      console.log('❌ Navigation failed:', error);
      // Fallback: location.href
      window.location.href = 'https://app.manifold.xyz/c/man-driving-car';
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: isLocalhost ? '600px' : '1260px',
        height: isLocalhost ? '1200px' : '2400px',
        margin: '0 auto',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        ...(isLocalhost && {
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }),
      }}
    >
      <div className="image-area" style={{ position: 'relative' }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1260}
          height={2200}
          style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', maxHeight: isLocalhost ? '600px' : '2200px' }}
          priority
        />
        
        {/* Unlock the Ride Button - Invisible but functional */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '50%', // Center horizontally
            top: '77%', // Positioned at 77% of image height
            transform: 'translate(-50%, -50%)',
            width: '32%', // Wide click area
            height: '3.3%', // Height for good clickability
            background: 'transparent', // Invisible background
            border: 'none', // No border
            cursor: 'pointer',
            zIndex: 50, // High z-index to ensure clickability
          }}
          title="Unlock the Ride"
        />
      </div>
      <div
        style={{
          width: isLocalhost ? '420px' : '1260px',
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