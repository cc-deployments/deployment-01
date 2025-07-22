"use client";

import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function ManifoldGallery() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  const handleManualRedirect = () => {
    console.log('🖱️ Manual redirect clicked');
    window.location.href = 'https://manifold.xyz/@carculture';
  };

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('📞 Calling sdk.actions.ready() immediately...');
        await sdk.actions.ready();
        console.log('✅ sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        setIsInMiniApp(baseAppStatus);
        console.log('📍 Is in Base App:', baseAppStatus);
        
      } catch (error) {
        console.error('❌ Error initializing SDK:', error);
        
        // Fallback: try again after a delay
        setTimeout(async () => {
          try {
            console.log('🔄 Fallback: calling sdk.actions.ready()...');
            await sdk.actions.ready();
            console.log('✅ Fallback sdk.actions.ready() successful');
          } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
          }
        }, 1000);
      }
    };

    // Redirect to actual Manifold gallery - MANUAL ONLY
    const redirectToManifold = () => {
      console.log('🔄 Redirecting to Manifold gallery: https://manifold.xyz/@carculture');
      // Manual redirect only - no automatic redirect
      try {
        const newWindow = window.open('https://manifold.xyz/@carculture', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          console.log('⚠️ Popup blocked, using location.href');
          window.location.href = 'https://manifold.xyz/@carculture';
        }
      } catch {
        console.log('❌ Redirect failed, using location.href');
        window.location.href = 'https://manifold.xyz/@carculture';
      }
    };

    initializeSDK();
    // redirectToManifold(); // REMOVED - Manual only
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      window.location.href = '/socialidentity';
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      window.location.href = '/text-page';
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected - navigating to socialidentity');
      window.location.href = '/socialidentity';
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected - navigating to text-page');
      window.location.href = '/text-page';
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    trackMouse: true,
    delta: 30, // Increased delta for easier detection (matching working pages)
    swipeDuration: 500, // Increased duration for more forgiving detection
    preventScrollOnSwipe: true, // Prevent scroll interference
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

  return (
    <>
      <div 
        {...handlers} 
        className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
          cursor: 'grab', // Add cursor to show it's interactive
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={() => console.log('👆 Touch start detected')}
      >
        {/* Loading State */}
        {/* Error State */}
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          {/* Redirect Message */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '18px',
            textAlign: 'center',
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <div>🎯 Manifold Gallery</div>
            <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
              https://manifold.xyz/@carculture
            </div>
            <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.7 }}>
              Swipe up/down to navigate • Click button to open gallery
            </div>
            <button
              onClick={handleManualRedirect}
              style={{
                marginTop: '15px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Open Manifold Gallery
            </button>
          </div>
          
          {/* TEST NAVIGATION BUTTONS - FOR DEBUGGING */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 2000,
            display: 'flex',
            gap: '10px',
            flexDirection: 'column'
          }}>
            <button
              onClick={() => {
                console.log('🧪 Test: Navigate to socialidentity');
                window.location.href = '/socialidentity';
              }}
              style={{
                background: 'rgba(255, 0, 0, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Test: → socialidentity
            </button>
            <button
              onClick={() => {
                console.log('🧪 Test: Navigate to text-page');
                window.location.href = '/text-page';
              }}
              style={{
                background: 'rgba(0, 255, 0, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Test: → text-page
            </button>
            {/* Debug Info */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '10px',
              maxWidth: '200px'
            }}>
              <div>Loading: {false} (Redirecting)</div>
              <div>Error: {null} (Redirecting)</div>
              <div>Has Data: {false} (Redirecting)</div>
              <div>Title: (Redirecting)</div>
            </div>
          </div>
          
          {/* Latest Mint Info Display */}
          {/* Invisible "View Gallery" Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={() => {
              console.log('View Gallery clicked!');
              // Use the latest mint URL if available, otherwise fallback
              const targetUrl = 'https://manifold.xyz/@carculture';
              
              // Universal navigation - works in all environments
              try {
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
                console.log('✅ Opened Manifold gallery URL via universal navigation');
              } catch (error) {
                console.error('Error opening URL:', error);
                // Fallback to regular window.open
                window.open(targetUrl, '_blank');
              }
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '63.6%', // Centered vertically
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '24%', // Approximately 300px / 1260px = 24%
              height: '2%', // Approximately 50px / 2400px = 2%
              background: 'transparent', // Invisible background
              border: 'none', // No border
              cursor: 'pointer',
              zIndex: 20,
            }}
            title="View Gallery"
          />
        </div>
      </div>
    </>
  );
} 