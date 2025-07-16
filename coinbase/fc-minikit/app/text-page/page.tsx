"use client";
import Image from "next/image";
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

export default function TextPage() {
  const [showDebug, setShowDebug] = useState(false);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      window.open('https://app.manifold.xyz/c/carculture', '_blank', 'noopener,noreferrer');
    },
    trackTouch: true,
  });

  const handleUnlockRide = () => {
    console.log('Unlock Ride clicked!');
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
  };

  return (
    <div {...handlers} style={{
      width: '1260px',
      height: '2400px',
      margin: '0 auto',
      background: 'transparent',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      border: '1px solid #ccc',
      borderRadius: '8px',
    }}>
      {/* Debug Toggle Button */}
      <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 30 }}>
        <button 
          onClick={() => setShowDebug(!showDebug)}
          style={{ 
            padding: '8px 16px', 
            borderRadius: 8, 
            background: showDebug ? '#ff4444' : '#444444', 
            color: 'white', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            fontSize: 14
          }}
        >
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </button>
      </div>

      {/* Image area - FULL 2400px height to match image */}
      <div style={{ width: '1260px', height: '2400px', position: 'relative' }}>
        <Image
          src="/text-page.png"
          alt="Text Page"
          width={1260}
          height={2400}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          priority
        />
        
        {/* Debug: Show image container bounds */}
        {showDebug && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '2px solid red',
            pointerEvents: 'none',
            zIndex: 25,
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,0,0,0.8)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              borderRadius: '4px',
            }}>
              Image Container: 1260×2400
            </div>
          </div>
        )}
        
        {/* Invisible "Unlock Ride" Button Overlay - CORRECT COORDINATES */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '580px', // Center at 630px, so left = 630 - (width/2) = 630 - 50 = 580px
            top: '1505px', // Center at 1530px, so top = 1530 - (height/2) = 1530 - 25 = 1505px
            width: '100px',
            height: '50px',
            background: showDebug ? 'rgba(255,255,0,0.3)' : 'transparent',
            border: showDebug ? '2px solid yellow' : 'none',
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Unlock Ride"
        />
        
        {/* Debug: Show button position */}
        {showDebug && (
          <div style={{
            position: 'absolute',
            left: '580px',
            top: '1505px',
            width: '100px',
            height: '50px',
            background: 'rgba(255,255,0,0.2)',
            border: '1px solid yellow',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'yellow',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            Unlock Ride
          </div>
        )}
      </div>
    </div>
  );
} 