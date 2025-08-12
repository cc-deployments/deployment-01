"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSafeArea } from '../hooks/useSafeArea';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea();
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const router = useRouter();
  
  // Proper environment detection for Coinbase Wallet
  const isInMiniApp = context !== null;

  console.log('🎨 GalleryHero component rendering...');
  console.log('🔑 MiniKit context available:', context !== null);
  console.log('📱 In Mini App environment:', isInMiniApp);
  console.log('✅ Frame ready status:', isFrameReady);

  // Enable MiniKit's built-in navigation gestures
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

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

  // Custom swipe handlers for navigation - EXCLUDE button areas
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to gallery-hero-2');
      navigateTo('/gallery-hero-2');
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - this is the first page, no previous page');
      // This is the first page, no previous page to navigate to
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
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to gallery-hero-2');
      navigateTo('/gallery-hero-2');
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      // This is the first page, no previous page to navigate to
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

  console.log('📱 Safe area insets:', safeArea);

  // Early return for loading state
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

  // Single return statement for main component
  return (
    <div 
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        paddingTop: safeArea.top,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
    >
      {/* Debug Panel - Always Visible */}
      <div className="fixed top-0 left-0 right-0 bg-red-900 text-white text-xs p-2 z-50">
        <div className="flex justify-between items-center">
          <span>🔍 MiniKit Debug:</span>
          <span>Context: {context !== null ? '✅ TRUE' : '❌ FALSE'}</span>
          <span>Frame: {isFrameReady ? '✅ READY' : '⏳ LOADING'}</span>
          <span>Env: {isInMiniApp ? '📱 MINI APP' : '🌐 BROWSER'}</span>
        </div>
      </div>

      {/* Main Content - Only render after frame is ready */}
      {isFrameReady && (
        <div className="relative z-10">
          {/* Swipe Area - EXCLUDE button areas (stops at 70% to be safe) */}
          <div 
            {...swipeHandlers}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '70%', // Stop before button area (buttons at 75% and 76%)
              pointerEvents: 'auto',
              zIndex: 1,
            }}
          />
          
          {/* Image Container */}
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
              src="/carmania-gallery-hero.png"
              alt="Gallery Hero"
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
                    container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery</div>';
                  }
                }
              }}
              onLoad={() => {
                console.log('✅ Image loaded successfully');
              }}
            />
          </div>
          
          {/* Button Area - COMPLETELY SEPARATE from swipe detection */}
          <div 
            style={{
              position: 'absolute',
              top: '75%', // EXACTLY match the white button position
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              pointerEvents: 'auto',
              // Make touch target larger for better mobile experience
              minWidth: '150px',
              minHeight: '60px',
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔓 UNLOCK button clicked - navigating to CarCulture Manifold Gallery');
                // Navigate to CarCulture Manifold Gallery
                window.open('https://manifold.xyz/@carculture', '_blank');
              }}
              style={{
                backgroundColor: 'transparent', // Invisible - buttons are built into images
                border: 'none',
                borderRadius: '25px',
                padding: '15px 30px', // Match white button size
                fontSize: '18px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                // Mobile responsive sizing
                minWidth: '120px',
                maxWidth: '300px',
                // Ensure button is clickable
                position: 'relative',
                zIndex: 1001,
                // Invisible styling since buttons are built into images
                color: 'transparent',
                boxShadow: 'none',
                backdropFilter: 'none',
                transition: 'none',
              }}
            >
              UNLOCK the Ride
            </button>
          </div>

          {/* Share Button Area - COMPLETELY SEPARATE from swipe detection */}
          <div 
            style={{
              position: 'absolute',
              top: '76%', // EXACTLY match the white button position
              right: '10%', // Position on right edge as specified
              zIndex: 1000,
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📤 Share button clicked!');
                // Use native share API if available
                if (navigator.share) {
                  navigator.share({
                    title: 'CarMania Gallery',
                    text: 'Check out this amazing car collection!',
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  // Fallback: copy URL to clipboard
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                  }).catch(console.error);
                }
              }}
              style={{
                backgroundColor: 'transparent', // Invisible - buttons are built into images
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px', // Match white button size
                fontSize: '16px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                fontWeight: 'bold',
                position: 'relative',
                zIndex: 1001,
                // Invisible styling since buttons are built into images
                color: 'transparent',
                boxShadow: 'none',
                backdropFilter: 'none',
                transition: 'none',
              }}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 