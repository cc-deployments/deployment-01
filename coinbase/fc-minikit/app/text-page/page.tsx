"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function TextPage() {
  const { context, setFrameReady, isFrameReady } = useMiniKit(); // Added isFrameReady back
  const router = useRouter();
  
  console.log('🎨 TextPage component rendering...');
  console.log('🔍 Frame context available:', !!context);

  // Enable MiniKit's built-in navigation gestures
  useEffect(() => {
    if (!isFrameReady) { // Added isFrameReady check back
      console.log('📱 Setting frame ready with DISABLED native gestures to prevent conflicts');
      setFrameReady({ disableNativeGestures: true });
    }
  }, [setFrameReady, isFrameReady]); // Added isFrameReady to dependency array

  // Navigation helper function - Use external URL for Manifold Gallery
  const navigateTo = useCallback((path: string) => {
    console.log(`🧭 Navigating to: ${path}`);
    try {
      if (path === '/manifold-gallery') {
        // Navigate to external Manifold Gallery
        console.log('🌐 Opening external Manifold Gallery');
        window.open('https://manifold.xyz/@carculture', '_blank');
      } else {
        // Use Next.js router for internal navigation
        console.log('🔄 Using Next.js router (internal navigation)');
        router.push(path);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      console.log('🔄 Falling back to window.location.href');
      if (path === '/manifold-gallery') {
        window.location.href = 'https://manifold.xyz/@carculture';
      } else {
        window.location.href = path;
      }
    }
  }, [router]);

  // Custom swipe handlers for navigation
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - opening external Manifold Gallery');
      // Navigate to external Manifold Gallery URL (avoids popup blockers)
      window.location.href = 'https://manifold.xyz/@carculture';
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero-2');
      navigateTo('/gallery-hero-2');
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
      console.log('⬆️ Keyboard navigation: Swipe up - opening external Manifold Gallery');
      // Directly open external Manifold Gallery URL
      window.open('https://manifold.xyz/@carculture', '_blank');
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating to gallery-hero-2');
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

  return (
    <div 
      {...swipeHandlers}
      className="text-page-container"
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
      <div className="text-page-image-container" style={{ 
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
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Text Page</div>';
              }
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully');
          }}
        />
      </div>
      
      {/* UNLOCK Button Overlay for BASE Discord Debugging */}
      <div style={{
        position: 'absolute',
        top: '62%', // Moved up 1% from 63%
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000, // Higher z-index to ensure it's on top
        pointerEvents: 'auto',
      }}>
        <button
          className="unlock-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔓 UNLOCK button clicked - navigating to most recent NFT mint');
            // Navigate to most recent NFT mint URL from SQL database
            window.open('https://app.manifold.xyz/c/light-bulb-moment', '_blank');
          }}
          onTouchStart={() => {
            console.log('👆 Touch start on UNLOCK button');
          }}
          onTouchEnd={() => {
            console.log('👆 Touch end on UNLOCK button');
          }}
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.8)', // More visible red background
            color: 'white',
            border: '3px solid white', // Thicker border
            borderRadius: '25px',
            padding: '15px 30px', // Larger padding
            fontSize: '18px', // Larger font
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            touchAction: 'manipulation',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)', // Add shadow
            // Mobile responsive sizing
            minWidth: '120px',
            maxWidth: '300px',
            // Ensure button is clickable
            position: 'relative',
            zIndex: 1001,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
          }}
        >
          🔓 UNLOCK the Ride
        </button>
      </div>
    </div>
  );
} 