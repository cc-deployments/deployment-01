"use client";

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useOpenUrl, useComposeCast } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea'; // Import the safe area hook
import { sdk } from '@farcaster/miniapp-sdk';
import { useMiniKit } from '@coinbase/onchainkit/minikit'; // Import useMiniKit

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea(); // Use the safe area hook
  const openUrl = useOpenUrl(); // Use MiniKit's openUrl hook
  const { composeCast } = useComposeCast(); // Use MiniKit's compose cast for sharing
  const { context } = useMiniKit(); // Check if we're in Farcaster frame context
  
  console.log('🎨 GalleryHero component rendering...');
  console.log('🔍 SHARE button should be created with onClick handler');
  console.log('🔍 Frame context available:', !!context);
  console.log('🔍 composeCast available:', !!composeCast);
  
  // State management for splash screen timing
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  // Simple sharing using MiniKit's useComposeCast (works universally)
  const handleShare = () => {
    console.log('🎯 Share button clicked - using MiniKit composeCast...');
    console.log('🔍 Frame context available:', !!context);
    console.log('🔍 composeCast available:', !!composeCast);
    
    try {
      if (!context) {
        console.log('⚠️ Not in Farcaster frame context - using fallback');
        alert(`Share this link: ${window.location.href}\n\nNote: Full sharing requires Farcaster frame context`);
        return;
      }
      
      if (!composeCast) {
        console.log('❌ composeCast not available - using fallback');
        alert(`Share this link: ${window.location.href}\n\nNote: composeCast not available in current context`);
        return;
      }
      
      console.log('📝 Calling composeCast in Farcaster frame...');
      composeCast({
        text: 'Check out this awesome CarMania app! 🚗',
        embeds: [window.location.href]
      });
      console.log('✅ composeCast called successfully');
    } catch (error) {
      console.error('❌ Share error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Share this link: ${window.location.href}\n\nError: ${errorMessage}`);
    }
  };

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

  // REMOVED: Frame readiness logic - we're using custom buttons instead

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
      <div       style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        color: '#fff'
      }}
    >
        Loading...
      </div>
    );
  }

  return (
    <div 
      {...handlers} 
      className="gallery-hero-container"
      style={{
        position: 'relative',
        backgroundColor: '#000',
        border: '2px solid blue',
        width: '100%',
        height: '100vh', // Fixed viewport height instead of auto
        overflow: 'hidden', // Prevent scrolling
      }}
    >
      <div className="gallery-hero-image-container">
        <Image
          src="/carmania-gallery-hero.png"
          alt="Gallery Hero"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%', // Fill container height
            objectFit: 'cover', 
            display: 'block',
          }}
          priority
          unoptimized={true}
          onError={(e) => {
            console.error('❌ Image failed to load:', e);
            const img = e.currentTarget as HTMLImageElement;
            if (img.src !== '/hero-v2.png') {
              console.log('🔄 Trying fallback image...');
              img.src = '/hero-v2.png';
            } else {
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

        {/* Share Button - MINIKIT HOOKS ONLY */}
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
            // Add visual indicator to make it obvious this is the SHARE button
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
            handleShare();
          }}
        >
          SHARE
        </div>
      </div>
    </div>
  );
} 