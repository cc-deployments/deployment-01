"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSafeArea } from '../hooks/useSafeArea';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function TextPage() {
  const { safeArea, isLoading } = useSafeArea();
  const { setFrameReady, isFrameReady, context } = useMiniKit();

  const router = useRouter();
  
  console.log('🎨 TextPage component rendering...');
  console.log('🔍 Frame context available:', !!context);

  // Enable MiniKit's built-in navigation gestures with proper configuration and error handling
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady({ disableNativeGestures: true });
    }
  }, [setFrameReady, isFrameReady]);

  // Navigation helper function - 4th page goes directly to Manifold Gallery
  const navigateTo = useCallback(async (path: string) => {
    try {
      if (path === '/manifold-gallery') {
        // 4th page: Always open Manifold Gallery (not mint page)
        console.log('🚀 Opening Manifold Gallery: https://manifold.xyz/@carculture');
        
        // Use window.location.href for external URL navigation
        console.log('🔄 Opening Manifold Gallery via window.location.href');
        window.location.href = 'https://manifold.xyz/@carculture';
      } else {
        router.push(path);
      }
    } catch (error) {
      if (path === '/manifold-gallery') {
        // Final fallback: use location.href
        console.log('🔄 Final fallback to location.href');
        window.location.href = 'https://manifold.xyz/@carculture';
      } else {
        window.location.href = path;
      }
    }
  }, [router]);

  // Custom swipe handlers for navigation
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      navigateTo('/manifold-gallery');
    },
    onSwipedDown: async () => {
      navigateTo('/gallery-hero-2');
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
      console.log('⬆️ Keyboard navigation: Swipe up - opening Manifold Gallery');
      // 4th page: Always open Manifold Gallery (not mint page)
      console.log('🚀 Opening Manifold Gallery: https://manifold.xyz/@carculture');
      
      // Use window.location.href for external URL navigation
      console.log('🔄 Opening Manifold Gallery via window.location.href');
      window.location.href = 'https://manifold.xyz/@carculture';
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      navigateTo('/gallery-hero-2');
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

  // Loading state
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
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        paddingTop: safeArea.top,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      {/* Swipe Area - EXCLUDES button areas for proper gesture detection */}
      <div 
        {...swipeHandlers}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70%', // Exclude button areas to prevent conflicts (match gallery-hero)
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
          src="/text-page.png"
          alt="Text Page"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            display: 'block',
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
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Text Page</div>';
              }
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully');
          }}
        />
      </div>
      
      {/* Button only renders after MiniKit is ready */}
      {isFrameReady && (
        <div 
          style={{
            position: 'absolute',
            top: '75%', // Match gallery-hero button positioning
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            pointerEvents: 'auto',
            minWidth: '150px',
            minHeight: '60px',
          }}
        >
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔓 UNLOCK button clicked');
              
              // Use MiniKit's useOpenUrl hook for proper external URL handling
              try {
                await openUrl('https://manifold.xyz/@carculture');
                console.log('✅ Manifold Gallery opened successfully via MiniKit button');
              } catch (openError) {
                console.error('❌ MiniKit openUrl failed:', openError);
                // Fallback: use location.href for mobile
                console.log('🔄 Fallback to location.href for mobile');
                window.location.href = 'https://manifold.xyz/@carculture';
              }
            }}
            style={{
              backgroundColor: 'transparent', // Completely invisible
              border: 'none',
              borderRadius: '25px',
              padding: '15px 40px', // Match white button size
              fontSize: '18px',
              cursor: 'pointer',
              touchAction: 'manipulation',
              minWidth: '200px', // Match white button width
              maxWidth: '350px', // Match white button max width
              position: 'relative',
              zIndex: 1001,
              // Remove all visual styling - completely invisible
              color: 'transparent',
              boxShadow: 'none',
              backdropFilter: 'none',
              transition: 'none',
            }}
          >
            {/* Invisible text - just for accessibility */}
            UNLOCK the Ride
          </button>
        </div>
      )}
    </div>
  );
} 