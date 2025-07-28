"use client";

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea';

export default function GalleryHero2() {
  const { safeArea, isLoading } = useSafeArea();
  const openUrl = useOpenUrl(); // Use BASE AI's recommended hook for URL opening
  const { setFrameReady, isFrameReady } = useMiniKit(); // Add MiniKit context
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  // Call sdk.actions.ready() only after image is loaded and safe area is determined
  useEffect(() => {
    const initializeSDK = async () => {
      // Wait for both image to load AND safe area to be determined
      if (imageLoaded && !isLoading && !sdkReady) {
        try {
          console.log('📞 Calling sdk.actions.ready() - interface is ready...');
          await sdk.actions.ready();
          console.log('✅ sdk.actions.ready() called successfully');
          setSdkReady(true);
          
          // Get SDK context for environment detection
          const context = await sdk.context;
          const baseAppStatus = context?.client?.clientFid === 309857;
          console.log('📍 Is in Base App:', baseAppStatus);
          
        } catch (error) {
          console.error('❌ Error initializing SDK:', error);
          
          // Fallback: try again after a delay
          setTimeout(async () => {
            try {
              console.log('🔄 Fallback: calling sdk.actions.ready()...');
              await sdk.actions.ready();
              console.log('✅ Fallback sdk.actions.ready() successful');
              setSdkReady(true);
            } catch (fallbackError) {
              console.error('❌ Fallback also failed:', fallbackError);
            }
          }, 1000);
        }
      }
    };

    initializeSDK();
  }, [imageLoaded, isLoading, sdkReady]);

  // Add frame readiness logic as recommended by BASE AI
  useEffect(() => {
    if (!isFrameReady) {
      console.log('🖼️ Setting frame ready with disableNativeGestures for mobile compatibility...');
      setFrameReady({ disableNativeGestures: true });
    }
  }, [setFrameReady, isFrameReady]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/text-page');
        } else {
          openUrl('/text-page');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/text-page');
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero');
        } else {
          window.location.href = '/gallery-hero';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero';
      }
    }
  }, [openUrl]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to text-page');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/text-page');
        } else {
          openUrl('/text-page');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/text-page');
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero');
        } else {
          openUrl('/gallery-hero');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/gallery-hero');
      }
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    trackMouse: true,
    delta: 20, // Reduced delta for more sensitive detection
    swipeDuration: 300, // Reduced duration for faster response
    preventScrollOnSwipe: true, // Prevent scroll interference
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

  // Debug: Log safe area values
  console.log('📱 Safe area insets:', safeArea);

  // Show loading state while safe area is being determined
  if (isLoading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <div 
        {...handlers} 
        className="gallery-hero-container"
        style={{
          position: 'relative',
          backgroundColor: '#000',
          border: '2px solid blue',
          width: '100%',
          height: '100vh', // Fixed viewport height to match gallery-hero
          overflow: 'hidden', // Prevent scrolling
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
      >
        {/* Image area - Full container height */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero-2.png"
            alt="Gallery Hero 2"
            width={1260}
            height={2400}
            style={{ 
              width: '100%', 
              height: '100%', // Fill container height to match gallery-hero
              objectFit: 'cover', 
              display: 'block',
            }}
            priority
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* "Unlock the Ride" Button - VISIBLE like gallery-hero */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '75%',
              transform: 'translateX(-50%)',
              width: '50%',
              height: '35px',
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
              border: '2px solid red',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
              zIndex: 1000,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              pointerEvents: 'auto',
            }}
            onClick={() => {
              console.log('🚗 Unlock the Ride clicked - using MiniKit openUrl');
              openUrl('https://app.manifold.xyz/c/light-bulb-moment');
            }}
          >
            Unlock the Ride
          </div>

          {/* Share Button - ADDED to match gallery-hero */}
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '75.3%',
              width: '80px',
              height: '50px',
              backgroundColor: 'rgba(0, 255, 0, 0.8)',
              border: '3px solid green',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
            }}
            onClick={() => {
              console.log('🔴 SHARE BUTTON CLICKED - TEST');
              // Add visual feedback
              const button = event?.currentTarget as HTMLElement;
              if (button) {
                button.style.backgroundColor = 'rgba(255, 255, 0, 0.8)';
                button.style.border = '3px solid yellow';
                setTimeout(() => {
                  button.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                  button.style.border = '3px solid green';
                }, 200);
              }
              openUrl('/share');
            }}
          >
            SHARE
          </div>
        </div>
      </div>
    </>
  );
} 