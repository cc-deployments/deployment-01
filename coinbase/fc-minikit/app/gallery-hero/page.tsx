"use client";

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea'; // Import the safe area hook
import { sdk } from '@farcaster/miniapp-sdk';

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea(); // Use the safe area hook
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
          // CRITICAL: Call sdk.actions.ready() to dismiss the splash screen
          await sdk.actions.ready();
          console.log('✅ sdk.actions.ready() called successfully');
          setSdkReady(true);
          
        } catch (error) {
          console.error('❌ Error initializing interface:', error);
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
    console.log('🎹 Key pressed:', event.key);
    
    // Test: Log any key press to see if event listener is working
    if (event.key === 'Enter') {
      console.log('🔍 Enter key detected - event listener is working!');
    }
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to text-page');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/text-page');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/text-page';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      // This is the first page, no previous page to navigate to
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
      console.log('⬆️ Swipe up detected - navigating to text-page (next page)');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/text-page');
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/text-page');
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - this is the first page, no previous page');
      // This is the first page in the sequence, so no previous page to navigate to
      // Could add haptic feedback or visual indication that this is the first page
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
          
          {/* "Unlock the Ride" Button - MINIKIT HOOKS ONLY */}
          <div
            style={{
              position: 'absolute',
              left: '50%', // Center horizontally within container
              top: '70%', // Moved up to create separation from SHARE button
              transform: 'translateX(-50%)', // Center horizontally
              width: '60%', // 60% of 1260px = ~756px
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

          {/* Share Button - MINIKIT HOOKS ONLY */}
          <div
            style={{
              position: 'absolute',
              right: '20px', // 20px from right edge
              top: '80%', // Moved down to create separation from UNLOCK button
              width: '80px', // Fixed width
              height: '40px', // Fixed height
              backgroundColor: 'rgba(0, 255, 0, 0.8)', // More visible green overlay
              border: '3px solid green', // Thicker green border for visibility
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 1001, // Higher z-index to ensure visibility
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 'bold',
            }}
            onClick={() => {
              console.log('🎯 Share button clicked - using MiniKit openUrl');
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