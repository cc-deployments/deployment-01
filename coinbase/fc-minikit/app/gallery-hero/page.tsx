"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSafeArea } from '../hooks/useSafeArea';
// TEMPORARILY DISABLED: OnchainKit dependency issue
// import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea();
  // TEMPORARILY DISABLED: OnchainKit dependency issue
  // const { setFrameReady, isFrameReady, context } = useMiniKit();
  const router = useRouter();
  
  // Removed environment detection pattern for CBW compatibility



  // Enable MiniKit's built-in navigation gestures with proper configuration and error handling
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady({ disableNativeGestures: true });
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
        // Ensure MiniKit gestures work by not blocking touch events
        touchAction: 'manipulation',
      }}
    >


      {/* Main Content */}
      <div className="relative z-10">
        {/* Swipe Area - EXCLUDES button areas for proper gesture detection */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '70%', // Exclude button areas to prevent conflicts
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
            onLoad={() => {
            }}
          />
        </div>
        
        {/* Buttons - Always render for testing */}
        {(
          <>
            {/* UNLOCK Button Area - Enhanced touch detection */}
            <div
              style={{
                position: 'absolute',
                top: '75%', // EXACTLY match the white button position (updated to 75%)
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
                top: '76%', // EXACTLY match the white button position (as per your notes)
                right: '10%', // Position on right edge as specified
                zIndex: 1000,
                pointerEvents: 'auto',
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Use native share API if available
                  if (navigator.share) {
                    navigator.share({
                      title: 'CarMania Gallery',
                      text: 'Check out this amazing car collection!',
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    // Fallback: copy URL to clipboard with mobile compatibility
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link copied to clipboard!');
                      }).catch(() => {
                        // Fallback for mobile devices
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
                      // Fallback for older browsers
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
          </>
        )}
      </div>
    </div>
  );
} 