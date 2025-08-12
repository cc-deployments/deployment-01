"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function GalleryHero2() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const router = useRouter();
  


  // Enable MiniKit's built-in navigation gestures
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Navigation helper function - Use Next.js router by default
  const navigateTo = useCallback((path: string) => {
    try {
      router.push(path);
    } catch (error) {
      window.location.href = path;
    }
  }, [router]);

  // Custom swipe handlers for navigation
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      navigateTo('/text-page');
    },
    onSwipedDown: async () => {
      navigateTo('/gallery-hero');
    },
    onSwipedLeft: () => {
    },
    onSwipedRight: () => {
    },
    onSwipeStart: () => {
    },
    trackMouse: false, // Disable mouse tracking to reduce conflicts
    delta: 30, // Reduce delta for more responsive swipes
    swipeDuration: 300, // Faster swipe detection
    preventScrollOnSwipe: false,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: true }, // Use passive for better performance
  });

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      navigateTo('/text-page');
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      navigateTo('/gallery-hero');
    }
  }, [navigateTo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div 
      style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // Ensure MiniKit gestures work by not blocking touch events
        touchAction: 'manipulation',
      }}
    >


      {/* Swipe Area - Separate from main content */}
      <div 
        {...swipeHandlers}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70%', // Exclude potential button areas
          pointerEvents: 'auto',
          zIndex: 1,
        }}
      />
      <div style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000',
        position: 'relative',
        // Allow touch events to pass through to MiniKit
        pointerEvents: 'auto',
        touchAction: 'manipulation',
      }}>
        <Image
          src="/carmania-gallery-hero-2.png"
          alt="Gallery Hero 2"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            // Allow touch events to pass through
            pointerEvents: 'auto',
            touchAction: 'manipulation',
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
              const container = img.parentElement;
              if (container) {
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery 2</div>';
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