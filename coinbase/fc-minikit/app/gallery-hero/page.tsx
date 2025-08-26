"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSafeArea } from '../hooks/useSafeArea';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea();
  const router = useRouter();
  
  // Dismiss splash screen when this page loads (FC app entry point)
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Immediately dismiss splash screen when app is ready
        // Use disableNativeGestures: true to prevent conflicts with native Mini App dismissal gestures
        await sdk.actions.ready({ disableNativeGestures: true });
        console.log('✅ Splash screen dismissed successfully');
      } catch (error) {
        console.error('❌ Error dismissing splash screen:', error);
      }
    };

    initializeApp();
  }, []);

  // Navigation helper function - Use Next.js router by default
  const navigateTo = useCallback((path: string) => {
    try {
      router.push(path);
    } catch (error) {
      window.location.href = path;
    }
  }, [router]);

  // Custom swipe handlers for navigation - Mobile optimized
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to gallery-hero-2');
      navigateTo('/gallery-hero-2');
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - no previous page');
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
    trackMouse: false, // Disable mouse tracking to reduce conflicts
    delta: 50, // Increased delta for more reliable mobile detection
    swipeDuration: 500, // Slower duration for mobile accuracy
    preventScrollOnSwipe: true, // Prevent scroll conflicts on mobile
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false }, // Allow event handling
  });

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      navigateTo('/gallery-hero-2');
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      // This is the first page, no previous page to navigate to
    }
  }, [navigateTo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        touchAction: 'manipulation',
      }}
    >
      {/* Main Content */}
      <div className="relative z-10">
        {/* Swipe Area */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '70%',
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
                  container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery</div>';
                }
              }
            }}
          />
        </div>
        
        {/* Buttons */}
        <>
          {/* UNLOCK Button Area */}
          <div
            style={{
              position: 'absolute',
              top: '75%',
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
                
                try {
                  console.log('🔄 Calling /api/latest-mint API...');
                  const response = await fetch('/api/latest-mint');
                  
                  if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data.mint_url) {
                      console.log('✅ API success, redirecting to:', result.data.mint_url);
                      window.location.href = result.data.mint_url;
                    } else {
                      console.log('⚠️ API success but no mint_url, using fallback');
                      window.location.href = 'https://manifold.xyz/@carculture';
                    }
                  } else {
                    console.log('❌ API not ready yet (status:', response.status, '), using fallback');
                    window.location.href = 'https://manifold.xyz/@carculture';
                  }
                } catch (error) {
                  console.log('❌ API error, using fallback:', error);
                  window.location.href = 'https://manifold.xyz/@carculture';
                }
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '25px',
                padding: '15px 30px',
                fontSize: '18px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                minWidth: '120px',
                maxWidth: '300px',
                position: 'relative',
                zIndex: 1001,
                color: 'transparent',
                boxShadow: 'none',
                backdropFilter: 'none',
                transition: 'none',
              }}
            >
              UNLOCK the Ride
            </button>
          </div>

          {/* Share Button Area */}
          <div 
            style={{
              position: 'absolute',
              top: '76%',
              right: '10%',
              zIndex: 1000,
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (navigator.share) {
                  navigator.share({
                    title: 'CarMania Gallery',
                    text: 'Check out this amazing car collection!',
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      alert('Link copied to clipboard!');
                    }).catch(() => {
                      try {
                        const textArea = document.createElement('textarea');
                        textArea.value = window.location.href;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('Link copied to clipboard!');
                      } catch (fallbackError) {
                        alert('Copy failed. Please copy manually: ' + window.location.href);
                      }
                    });
                  } else {
                    try {
                      const textArea = document.createElement('textarea');
                      textArea.value = window.location.href;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      alert('Link copied to clipboard!');
                    } catch (fallbackError) {
                      alert('Copy failed. Please copy manually: ' + window.location.href);
                    }
                  }
                }
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                fontWeight: 'bold',
                position: 'relative',
                zIndex: 1001,
                color: 'transparent',
                boxShadow: 'none',
                backdropFilter: 'none',
                transition: 'none',
              }}
            >
              Share
            </button>
          </div>
        </>
      </div>
    </div>
  );
} 