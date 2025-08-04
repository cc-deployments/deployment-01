"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function GalleryHero2() {
  const { context, setFrameReady, isFrameReady } = useMiniKit(); // Added isFrameReady back
  const router = useRouter();
  
  console.log('🎨 GalleryHero2 component rendering...');
  console.log('🔍 Frame context available:', !!context);

  // Enable MiniKit's built-in navigation gestures
  useEffect(() => {
    if (!isFrameReady) { // Added isFrameReady check back
      console.log('📱 Setting frame ready with DISABLED native gestures to prevent conflicts');
      setFrameReady({ disableNativeGestures: true });
    }
  }, [setFrameReady, isFrameReady]); // Added isFrameReady to dependency array

  // Navigation helper function - Use Next.js router by default
  const navigateTo = useCallback((path: string) => {
    console.log(`🧭 Navigating to: ${path}`);
    try {
      // Use Next.js router by default (avoids 401 errors in desktop browsers)
      console.log('🔄 Using Next.js router (default)');
      router.push(path);
    } catch (error) {
      console.error('Navigation error:', error);
      console.log('🔄 Falling back to window.location.href');
      window.location.href = path;
    }
  }, [router]);

  // Custom swipe handlers for navigation
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to text-page');
      navigateTo('/text-page');
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero');
      navigateTo('/gallery-hero');
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    onSwipeStart: () => {
      console.log('👆 Swipe start detected');
    },
    trackMouse: true,
    delta: 30,
    swipeDuration: 400,
    preventScrollOnSwipe: true,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to text-page');
      navigateTo('/text-page');
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating to gallery-hero');
      navigateTo('/gallery-hero');
    }
  }, [navigateTo]);

  useEffect(() => {
    console.log('🎧 Setting up keyboard event listener');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('🎧 Removing keyboard event listener');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div 
      {...swipeHandlers}
      className="gallery-hero-2-container"
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
      <div className="gallery-hero-2-image-container" style={{ 
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