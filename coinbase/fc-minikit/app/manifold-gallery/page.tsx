"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function ManifoldGallery() {
  const router = useRouter();
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Navigation helper function
  const navigateTo = useCallback(async (path: string) => {
    console.log('🧭 Navigating to:', path);
    try {
      await router.push(path);
    } catch (error) {
      console.error('❌ Navigation error:', error);
      console.log('🔄 Falling back to window.location.href');
      window.location.href = path;
    }
  }, [router]);

  // Custom swipe handlers for navigation
  const swipeHandlers = useSwipeable({
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating back to text-page');
      navigateTo('/text-page');
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
    delta: 50, // Increased from 30 to reduce accidental swipes
    swipeDuration: 400,
    preventScrollOnSwipe: false, // Changed to false to allow button clicks
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating back to text-page');
      navigateTo('/text-page');
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

  useEffect(() => {
    // Redirect to external Manifold gallery after a short delay
    const redirectTimer = setTimeout(() => {
      console.log('🔄 Redirecting to external Manifold gallery...');
      window.location.href = 'https://manifold.xyz/@carculture';
    }, 2000); // 2 second delay to show the page briefly

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div 
      {...swipeHandlers}
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
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        position: 'relative',
        // Allow touch events to pass through to MiniKit
        pointerEvents: 'auto',
        touchAction: 'manipulation',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '18px',
        textAlign: 'center',
        padding: '20px',
      }}>
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>🚗 Manifold Gallery</h1>
          <p style={{ marginBottom: '15px' }}>Redirecting to CarCulture&apos;s NFT collection...</p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>Swipe down to go back</p>
        </div>
      </div>
    </div>
  );
} 