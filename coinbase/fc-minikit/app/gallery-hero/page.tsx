"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useOpenUrl } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea'; // Import the safe area hook
import { useMiniKit } from '@coinbase/onchainkit/minikit'; // Import useMiniKit

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea(); // Use the safe area hook
  const openUrl = useOpenUrl(); // Use MiniKit's openUrl hook
  const { context, isFrameReady, setFrameReady } = useMiniKit(); // Check if we're in Farcaster frame context
  
  console.log('🎨 GalleryHero component rendering...');
  console.log('🔍 Frame context available:', !!context);
  




  // Use MiniKit's setFrameReady with disableNativeGestures to fix mobile swipe conflicts
  useEffect(() => {
    if (!isFrameReady) {
      try {
        console.log('📱 Calling setFrameReady({ disableNativeGestures: true }) to fix mobile swipe conflicts...');
        setFrameReady({ disableNativeGestures: true });
        console.log('✅ Frame ready with native gestures disabled - mobile swipe should work now');
      } catch (error) {
        console.error('❌ Error initializing frame:', error);
        
        // Don't retry on 401 errors - just continue without frame initialization (BASE AI guidance)
        if (error instanceof Error && error.message.includes('401')) {
          console.log('⚠️ 401 Unauthorized error - continuing without frame initialization (BASE AI Priority 2)');
          console.log('📱 App will work with basic functionality despite authentication issues');
          return;
        }
        
        // Fallback: try again after a delay (BASE AI fallback behavior)
        setTimeout(() => {
          try {
            console.log('🔄 Fallback: calling setFrameReady({ disableNativeGestures: true })...');
            setFrameReady({ disableNativeGestures: true });
            console.log('✅ Fallback frame ready successful');
          } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
            console.log('⚠️ Continuing without frame - app will still work with basic functionality');
            console.log('📱 This is expected behavior when frame has authentication issues');
          }
        }, 1000);
      }
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
        console.log('🌐 Using openUrl for navigation');
        openUrl('/gallery-hero-2');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
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
      console.log('⬆️ Swipe up detected - navigating to gallery-hero-2 (next page)');
      try {
        // Try MiniKit navigation first
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/gallery-hero-2');
        } else {
          // Fallback to window navigation
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/gallery-hero-2';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Final fallback
        window.location.href = '/gallery-hero-2';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to text-page');
      try {
        // Try MiniKit navigation first
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/text-page');
        } else {
          // Fallback to window navigation
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/text-page';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Final fallback
        window.location.href = '/text-page';
      }
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    onSwiped: (eventData) => {
      console.log('🔄 Swipe event detected:', eventData);
    },
    onSwiping: (eventData) => {
      console.log('🔄 Swiping in progress:', eventData);
    },
    trackMouse: true,
    delta: 30, // More sensitive for mobile
    swipeDuration: 300, // Faster response
    preventScrollOnSwipe: true, // Prevent scroll during swipe
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
    touchEventOptions: { passive: false }, // Ensure touch events are captured
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
        touchAction: 'none', // Disable default touch actions
        userSelect: 'none', // Prevent text selection during swipe
        WebkitUserSelect: 'none', // Safari support
        WebkitTouchCallout: 'none', // Disable callout on long press
      }}
      onTouchStart={(e) => console.log('👆 Touch start detected:', e.touches.length, 'touches')}
      onTouchMove={(e) => console.log('👆 Touch move detected:', e.touches.length, 'touches')}
      onTouchEnd={(e) => console.log('👆 Touch end detected:', e.touches.length, 'touches')}
    >
      <div className="gallery-hero-image-container" style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000'
      }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="Gallery Hero"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%', // Fill the entire container
            objectFit: 'cover', // Fill the container, may crop edges
            display: 'block'
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
              // Add fallback text
              const container = img.parentElement;
              if (container) {
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery</div>';
              }
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully');
          }}
        />
      </div>
    </div>
  );
} 