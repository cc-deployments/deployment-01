"use client";
import Image from "next/image";
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';

export default function TextPage() {
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
    onSwipedUp: () => router.push('/manifold-gallery'),
    onSwipedDown: () => router.push('/gallery-hero-2'),
    trackTouch: true,
    trackMouse: true,
    delta: 50, // Increased for more reliable detection
    swipeDuration: 500, // Increased for better detection
    preventScrollOnSwipe: false,
  });

  const handleUnlockRide = () => {
    console.log('Unlock Ride clicked!');
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
  };

  // Enhanced fallback click handler
  const handleContainerClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    // Check if click is in the bottom area (last 300px) - swipe up
    if (clickY > 2100) {
      console.log('Bottom area clicked - treating as swipe up');
      router.push('/manifold-gallery');
      return;
    }
    
    // Check if click is in the top area (first 300px) - swipe down
    if (clickY < 300) {
      console.log('Top area clicked - treating as swipe down');
      router.push('/gallery-hero-2');
      return;
    }
  };

  return (
    <div 
      {...handlers} 
      onClick={handleContainerClick}
      className="gallery-hero-container"
      style={{
        width: '100%',
        maxWidth: '1260px',
        height: 'auto',
        aspectRatio: '1260 / 2400',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        touchAction: 'pan-y',
        minHeight: '100vh',
        maxHeight: '100vh',
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

      {/* Manifold Gallery Navigation Button */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <button 
          onClick={() => router.push('/manifold-gallery')}
          style={{ 
            padding: '10px 20px', 
            borderRadius: 8, 
            background: '#a32428', 
            color: 'white', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            fontSize: 16, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)' 
          }}
        >
          View Gallery
        </button>
      </div>

      {/* Image area - Responsive container */}
      <div className="gallery-hero-image-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
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
        
        {/* Invisible "Unlock the Ride" Button Overlay */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '480px',
            top: '2175px',
            width: '300px',
            height: '50px',
            background: showDebug ? 'rgba(255,255,0,0.3)' : 'transparent',
            border: showDebug ? '2px solid yellow' : 'none',
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Unlock the Ride"
        />
        
        {/* Debug: Show button positions */}
        {showDebug && (
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
        )}
        
        {/* Swipe Navigation Hints */}
        <div 
          onClick={() => router.push('/manifold-gallery')}
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 15,
            cursor: 'pointer',
            animation: 'pulse 2s infinite',
            border: '2px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          ↑ Swipe Up or Click
        </div>
        
        <div 
          onClick={() => router.push('/gallery-hero-2')}
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 15,
            cursor: 'pointer',
            animation: 'pulse 2s infinite',
            border: '2px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          ↓ Swipe Down or Click
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