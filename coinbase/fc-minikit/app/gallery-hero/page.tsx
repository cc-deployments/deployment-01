"use client";

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea'; // Import the safe area hook

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea(); // Use the safe area hook
  const openUrl = useOpenUrl(); // Use BASE AI's recommended hook for URL opening
  const { setFrameReady, isFrameReady } = useMiniKit(); // Add MiniKit context
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  // Call sdk.actions.ready() only after image is loaded before calling sdk.actions.ready(), following the Farcaster loading best practices to avoid jitter and content reflows.
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
      console.log('🖼️ Setting frame ready...');
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    // Test: Log any key press to see if event listener is working
    if (event.key === 'Enter') {
      console.log('🔍 Enter key detected - event listener is working!');
    }
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to gallery-hero-2');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          console.log('📱 Using sdk.actions.openUrl() for Mini App');
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
                  console.log('🌐 Using openUrl for web browser');
        openUrl('/gallery-hero-2');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating to text-page');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          console.log('📱 Using sdk.actions.openUrl() for Mini App');
          sdk.actions.openUrl('/text-page');
        } else {
          console.log('🌐 Using openUrl for web browser');
          openUrl('/text-page');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/text-page');
      }
    }
  }, [openUrl]);

  useEffect(() => {
    console.log('🎧 Setting up keyboard event listener');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('🎧 Removing keyboard event listener');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to gallery-hero-2');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
          openUrl('/gallery-hero-2');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/gallery-hero-2');
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to text-page');
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
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    trackMouse: true,
    delta: 50, // Standard sensitivity
    swipeDuration: 500, // Standard duration
    preventScrollOnSwipe: false, // Allow normal scrolling
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

  const handleUnlockRide = () => {
    console.log('🚗 Unlock the Ride clicked');
    // Use MiniKit hook for URL opening
    openUrl('https://app.manifold.xyz/c/light-bulb-moment');
  };

  const handleShare = () => {
    console.log('🎯 Share button clicked!');
    // Use MiniKit hook for sharing - let MiniKit handle the sharing logic
    // MiniKit will automatically handle sharing in the appropriate environment
  };



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
          border: '2px solid blue', // Debug container border
          width: '100%',
          height: 'auto',
          minHeight: '100vh',
        }}
      >
        {/* Image area - Responsive container with 1260×2400 ratio */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero.png"
            alt="Gallery Hero"
            width={1260}
            height={2400}
            style={{ 
              width: '100%', 
              height: 'auto', 
              aspectRatio: '1260 / 2400', 
              objectFit: 'cover', 
              display: 'block',
            }}
            priority
            unoptimized={true} // Force unoptimized for Vercel production
            onError={(e) => {
              console.error('❌ Image failed to load:', e);
              // Try fallback image
              const img = e.currentTarget as HTMLImageElement;
              if (img.src !== '/hero-v2.png') {
                console.log('🔄 Trying fallback image...');
                img.src = '/hero-v2.png';
              } else {
                // If fallback also fails, hide image and show background
                img.style.display = 'none';
                console.log('❌ All images failed, showing background only');
              }
            }}
            onLoad={() => {
              console.log('✅ Image loaded successfully');
              setImageLoaded(true);
            }}
          />
          
          {/* Invisible "Unlock the Ride" Button Overlay - SAFE AREA AWARE */}
          <button
            onClick={handleUnlockRide}
            style={{
              position: 'absolute',
              bottom: '35%', // Moved up significantly to avoid overflow
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%', // Wider - increased from 40%
              height: '35px', // Slightly taller - increased from 25px
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
          />

          {/* Clean MiniKit Share Button - No Direct Event Handlers */}
          <button
            onClick={handleShare}
            style={{
              position: 'absolute',
              left: `calc(89.4% - ${safeArea.right}px)`, // Adjust for right safe area
              top: `calc(75.3% - ${safeArea.bottom}px)`, // Adjust for bottom safe area
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '7.2%', // Decreased by 10px (8% - 0.79% = 7.2%)
              height: '3.1%', // Increased to 75px (75px / 2400px = 3.1%)
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          />
        </div>
      </div>
    </>
  );
} 