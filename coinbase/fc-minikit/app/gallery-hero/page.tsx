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
    const initializeSDK = async () => {
      try {
        console.log('Checking if in Mini App environment...');
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('Is in Mini App:', isInMiniApp);
        
        if (isInMiniApp) {
          console.log('Calling sdk.actions.ready()...');
          await sdk.actions.ready();
          console.log('sdk.actions.ready() called successfully');
        } else {
          console.log('Not in Mini App environment, skipping ready() call');
        }
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };
    
    initializeSDK();
  }, []);
  
  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('Swipe up detected! Navigating to gallery-hero-2');
      router.push('/gallery-hero-2');
    },
    onSwipeStart: (eventData) => {
      console.log('Swipe started:', eventData);
    },
    onSwiped: (eventData) => {
      console.log('Swipe completed:', eventData);
    },
    trackTouch: true,
    trackMouse: true,
    delta: 50, // Increased from 30 to 50 for more reliable detection
    swipeDuration: 500, // Increased from 300 to 500ms for better detection
    preventScrollOnSwipe: false,
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

  // Enhanced fallback click handler with better area detection
  const handleContainerClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickX = e.clientX - rect.left;
    
    // Check if click is in the bottom area (last 300px)
    if (clickY > 2100) {
      console.log('Bottom area clicked - treating as swipe up');
      router.push('/gallery-hero-2');
      return;
    }
    
    // Check if click is in the swipe indicator area
    const indicatorLeft = rect.width / 2 - 100; // Approximate indicator position
    const indicatorRight = rect.width / 2 + 100;
    const indicatorTop = rect.height - 100; // Bottom 100px
    
    if (clickX >= indicatorLeft && clickX <= indicatorRight && clickY >= indicatorTop) {
      console.log('Swipe indicator area clicked - navigating to gallery-hero-2');
      router.push('/gallery-hero-2');
      return;
    }
  };

  return (
    <div 
      {...handlers} 
      onClick={handleContainerClick}
      onTouchStart={() => {
        // Additional touch handling for better mobile detection
        console.log('Touch started on container');
      }}
      style={{
        width: '1260px',
        height: '2400px',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer', // Show it's interactive
        touchAction: 'pan-y', // Allow vertical touch gestures
      }}
    >
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
        
        {/* Invisible "Unlock the Ride" Button Overlay - INCREASED WIDTH BY 200% */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '480px', // Center at 630px, so left = 630 - (width/2) = 630 - 150 = 480px
            top: '2175px', // Center at 2200px, so top = 2200 - (height/2) = 2200 - 25 = 2175px
            width: '300px', // Increased from 100px to 300px (200% increase)
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
            left: '1095px', // Center at 1120px, so left = 1120 - (width/2) = 1120 - 25 = 1095px
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
              left: '480px',
              top: '2175px',
              width: '300px',
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
              Unlock Ride (300px)
            </div>
            <div style={{
              position: 'absolute',
              left: '1095px',
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
        
        {/* Enhanced Swipe Up Indicator - Larger Click Area */}
        <div 
          onClick={() => {
            console.log('Swipe indicator clicked - navigating to gallery-hero-2');
            router.push('/gallery-hero-2');
          }}
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '16px 32px', // Increased padding for larger click area
            borderRadius: '25px',
            fontSize: '18px', // Slightly larger font
            fontWeight: 'bold',
            zIndex: 15,
            cursor: 'pointer',
            animation: 'pulse 2s infinite',
            border: '2px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            minWidth: '200px', // Ensure minimum clickable width
            textAlign: 'center',
          }}
        >
          ↑ Swipe Up or Click
        </div>
        
        {/* Additional Swipe Hint - Bottom Area Indicator */}
        <div 
          onClick={() => {
            console.log('Bottom area clicked - navigating to gallery-hero-2');
            router.push('/gallery-hero-2');
          }}
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '100px', // Larger click area at bottom
            background: showDebug ? 'rgba(255,0,0,0.1)' : 'transparent',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: showDebug ? 'red' : 'transparent',
          }}
        >
          {showDebug && 'Click here to swipe up'}
        </div>
        
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
} 