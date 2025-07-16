"use client";
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryHero() {
  const router = useRouter();
  const [showDebug, setShowDebug] = useState(false);
  
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  
  const handlers = useSwipeable({
    onSwipedUp: () => router.push('/gallery-hero-2'),
    trackTouch: true,
  });

  const handleUnlockRide = () => {
    console.log('Unlock Ride clicked!');
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
  };

  const handleShare = () => {
    console.log('Share clicked!');
    if (navigator.share && navigator.share !== undefined) {
      navigator.share({
        title: "CarMania Garage",
        text: "Check out CarMania Garage!",
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
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

      {/* Social Identity Navigation Button */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <Link href="/socialidentity">
          <button style={{ 
            padding: '10px 20px', 
            borderRadius: 8, 
            background: '#a32428', 
            color: 'white', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            fontSize: 16, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)' 
          }}>
            Social Identity
          </button>
        </Link>
      </div>
      
      {/* Image area - FULL 2400px height to match image */}
      <div style={{ width: '1260px', height: '2400px', position: 'relative' }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
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
        
        {/* Invisible "Unlock the Ride" Button Overlay - CORRECT COORDINATES */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '580px', // Center at 630px, so left = 630 - (width/2) = 630 - 50 = 580px
            top: '2195px', // Center at 2220px, so top = 2220 - (height/2) = 2220 - 25 = 2195px
            width: '100px',
            height: '50px',
            background: showDebug ? 'rgba(255,255,0,0.3)' : 'transparent',
            border: showDebug ? '2px solid yellow' : 'none',
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Unlock the Ride"
        />
        
        {/* Invisible Share Button Overlay - CORRECT COORDINATES */}
        <button
          onClick={handleShare}
          style={{
            position: 'absolute',
            left: '1125px', // Center at 1150px, so left = 1150 - (width/2) = 1150 - 25 = 1125px
            top: '2207px', // Center at 2220px, so top = 2220 - (height/2) = 2220 - 13 = 2207px
            width: '50px',
            height: '26px',
            background: showDebug ? 'rgba(0,255,255,0.3)' : 'transparent',
            border: showDebug ? '2px solid cyan' : 'none',
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Share"
        />
        
        {/* Debug: Show button positions */}
        {showDebug && (
          <>
            <div style={{
              position: 'absolute',
              left: '580px',
              top: '2195px',
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
            <div style={{
              position: 'absolute',
              left: '1125px',
              top: '2207px',
              width: '50px',
              height: '26px',
              background: 'rgba(0,255,255,0.2)',
              border: '1px solid cyan',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'cyan',
              pointerEvents: 'none',
              zIndex: 21,
            }}>
              Share
            </div>
          </>
        )}
      </div>
    </div>
  );
} 