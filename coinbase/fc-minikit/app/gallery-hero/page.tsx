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
  
  // Removed environment detection pattern for CBW compatibility



  // Enable MiniKit's built-in navigation gestures with proper configuration and error handling
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        if (!isFrameReady) {
          console.log('🚀 Initializing MiniKit SDK with disableNativeGestures: true');
          await setFrameReady({ disableNativeGestures: true });
          console.log('✅ SDK initialized successfully');
        }
      } catch (error) {
        console.error('❌ SDK initialization failed:', error);
        // Implement fallback UI or retry logic
        console.log('🔄 Attempting fallback initialization...');
        try {
          await setFrameReady();
          console.log('✅ Fallback SDK initialization successful');
        } catch (fallbackError) {
          console.error('❌ Fallback SDK initialization also failed:', fallbackError);
        }
      }
    };
    
    initializeSDK();
  }, [isFrameReady, setFrameReady]);

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
      navigateTo('/gallery-hero-2');
    },
    onSwipedDown: async () => {
      // This is the first page, no previous page to navigate to
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
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        paddingTop: safeArea.top,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
    >


      {/* Main Content */}
      <div className="relative z-10">
        {/* Swipe Area - EXCLUDES button areas for proper gesture detection */}
        <div 
          {...swipeHandlers}
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
                                           onTouchStart={(e) => {
                               e.preventDefault();
                               e.stopPropagation();
                             }}
                             onTouchEnd={async (e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 
                 try {
                   const response = await fetch('/api/latest-mint');
                   const result = await response.json();
                   
                   if (result.success && result.data.mint_url) {
                     window.open(result.data.mint_url, '_blank');
                   } else {
                     window.open('https://manifold.xyz/@carculture', '_blank');
                   }
                 } catch (error) {
                   window.open('https://manifold.xyz/@carculture', '_blank');
                 }
               }}
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