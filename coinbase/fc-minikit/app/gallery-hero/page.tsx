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
      }).catch((error) => {
        console.log('Share API failed, falling back to clipboard:', error);
        // Fallback to clipboard with better error handling
        try {
          navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Link copied to clipboard!");
          }).catch((clipboardError) => {
            console.error('Clipboard write failed:', clipboardError);
            // Final fallback - show URL for manual copy
            alert(`Share failed. Please copy this URL manually: ${window.location.href}`);
          });
        } catch (e) {
          console.error('Clipboard API not available:', e);
          alert(`Share failed. Please copy this URL manually: ${window.location.href}`);
        }
      });
    } else {
      // No share API available, try clipboard
      try {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert("Link copied to clipboard!");
        }).catch((clipboardError) => {
          console.error('Clipboard write failed:', clipboardError);
          alert(`Please copy this URL manually: ${window.location.href}`);
        });
      } catch (e) {
        console.error('Clipboard API not available:', e);
        alert(`Please copy this URL manually: ${window.location.href}`);
      }
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
      className=""
      style={{
        width: '1200px',
        height: '2400px',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        touchAction: 'pan-y',
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
      
      {/* Image area - Fixed container */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1260}
          height={2400}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          priority
        />
        
        {/* Invisible "Unlock the Ride" Button Overlay - FIXED POSITIONING */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '384px',
            top: '2180px',
            width: '432px',
            height: '48px',
            background: showDebug ? 'rgba(255,255,0,0.3)' : 'transparent',
            border: showDebug ? '2px solid yellow' : 'none',
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Unlock the Ride"
        />
        
        {/* Invisible Share Button Overlay - FIXED POSITIONING */}
        <button
          onClick={handleShare}
          style={{
            position: 'absolute',
            right: '97px',
            top: '2208px',
            width: '48px',
            height: '24px',
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
              left: '384px',
              top: '2180px',
              width: '432px',
              height: '48px',
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
              Unlock Ride (432×48)
            </div>
            <div style={{
              position: 'absolute',
              right: '97px',
              top: '2208px',
              width: '48px',
              height: '24px',
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
              Share (48×24)
            </div>
          </>
        )}
        
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
            background: 'transparent',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'transparent',
          }}
        >
        </div>
      </div>
    </div>
  );
} 