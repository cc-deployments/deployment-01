"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSafeArea } from '../hooks/useSafeArea';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function TextPage() {
  const { safeArea, isLoading } = useSafeArea();
  const router = useRouter();
  
  // Note: Splash screen is dismissed by the main page (page.tsx)
  // This page just needs to be ready to display content
  useEffect(() => {
    console.log('📄 Text Page loaded - splash already dismissed');
  }, []);

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
      {/* Swipe Area - EXCLUDES button areas for proper gesture detection */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%', // Exclude button areas to prevent conflicts (button is at 75%)
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
            // Allow touch events to pass through
            pointerEvents: 'auto',
            touchAction: 'manipulation',
          }}
          priority
          unoptimized={true}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.src !== '/hero-v2.png') {
              img.src = '/hero-v2.png';
            } else {
              img.style.display = 'none';
              const container = img.parentElement;
              if (container) {
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Text Page</div>';
              }
            }
          }}
          onLoad={() => {
          }}
        />
      </div>
      
      {/* UNLOCK Button - Invisible transparent clickable area at 63% */}
      <div 
        style={{
          position: 'absolute',
          top: '63%', // Positioned at 63% from top as specified
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          pointerEvents: 'auto',
          width: '200px',
          height: '60px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
        }}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🔓 UNLOCK button clicked');
          
          try {
            console.log('🔄 Calling /api/latest-mint API...');
            const response = await fetch('/api/latest-mint');
            
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.data.mint_url) {
                console.log('✅ API success, redirecting to:', result.data.mint_url);
                
                // Try to open in new window first (desktop)
                const mintWindow = window.open(result.data.mint_url, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
                
                if (!mintWindow) {
                  // Fallback: redirect current window (mobile-friendly)
                  console.log('📱 Popup blocked, redirecting current window (mobile-friendly)');
                  window.location.href = result.data.mint_url;
                }
              } else {
                console.log('⚠️ API success but no mint_url, using specific Manifold URL');
                window.location.href = 'https://manifold.xyz/@carculture/id/4149819632';
              }
            } else {
              console.log('❌ API not ready yet (status:', response.status, '), using specific Manifold URL');
              window.location.href = 'https://manifold.xyz/@carculture/id/4149819632';
            }
          } catch (error) {
            console.log('❌ API error, using specific Manifold URL:', error);
            window.location.href = 'https://manifold.xyz/@carculture/id/4149819632';
          }
        }}
      />
    </div>
  );
} 