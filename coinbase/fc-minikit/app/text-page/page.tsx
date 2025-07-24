"use client";

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function TextPage() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('📞 Calling sdk.actions.ready() immediately...');
        await sdk.actions.ready();
        console.log('✅ sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        setIsInMiniApp(baseAppStatus);
        console.log('📍 Is in Base App:', baseAppStatus);
        
      } catch (error) {
        console.error('❌ Error initializing SDK:', error);
        
        // Fallback: try again after a delay
        setTimeout(async () => {
          try {
            console.log('🔄 Fallback: calling sdk.actions.ready()...');
            await sdk.actions.ready();
            console.log('✅ Fallback sdk.actions.ready() successful');
          } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
          }
        }, 1000);
      }
    };

    initializeSDK();
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      if (isInMiniApp) {
        sdk.actions.openUrl('/manifold-gallery');
      } else {
        window.location.href = '/manifold-gallery';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      if (isInMiniApp) {
        sdk.actions.openUrl('/gallery-hero-2');
      } else {
        window.location.href = '/gallery-hero-2';
      }
    }
  }, [isInMiniApp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('📄 Text-page component mounted - swipe handlers should be active');
  }, []);

  // Manual touch detection as fallback
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    console.log('👆 Manual touch start detected', e.targetTouches[0]);
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    console.log('👆 Manual touch move detected', e.targetTouches[0]);
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    console.log('👆 Manual touch end detected');
    console.log('Touch start:', touchStart);
    console.log('Touch end:', touchEnd);
    
    if (!touchStart || !touchEnd) {
      console.log('❌ Missing touch start or end data');
      return;
    }
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    console.log('Distance X:', distanceX, 'Distance Y:', distanceY);
    
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);
    console.log('Is vertical swipe:', isVerticalSwipe);

    if (isVerticalSwipe && Math.abs(distanceY) > minSwipeDistance) {
      if (distanceY > 0) {
        console.log('⬆️ Manual swipe up detected - navigating to manifold-gallery');
        if (isInMiniApp) {
          sdk.actions.openUrl('/manifold-gallery');
        } else {
          window.location.href = '/manifold-gallery';
        }
      } else {
        console.log('⬇️ Manual swipe down detected - navigating to gallery-hero-2');
        if (isInMiniApp) {
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
          window.location.href = '/gallery-hero-2';
        }
      }
    } else {
      console.log('❌ Swipe not detected - distance too small or not vertical');
    }
  };

  // Simple click-based navigation as fallback
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickX = e.clientX - rect.left;
    
    console.log('🖱️ Click detected at:', { x: clickX, y: clickY });
    
    // Top 30% of screen = swipe down
    if (clickY < rect.height * 0.3) {
      console.log('⬇️ Top area clicked - navigating to gallery-hero-2');
      if (isInMiniApp) {
        sdk.actions.openUrl('/gallery-hero-2');
      } else {
        window.location.href = '/gallery-hero-2';
      }
    }
    // Bottom 30% of screen = swipe up
    else if (clickY > rect.height * 0.7) {
      console.log('⬆️ Bottom area clicked - navigating to manifold-gallery');
      if (isInMiniApp) {
        sdk.actions.openUrl('/manifold-gallery');
      } else {
        window.location.href = '/manifold-gallery';
      }
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected - navigating to manifold-gallery');
      if (isInMiniApp) {
        sdk.actions.openUrl('/manifold-gallery');
      } else {
        window.location.href = '/manifold-gallery';
      }
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero-2');
      if (isInMiniApp) {
        sdk.actions.openUrl('/gallery-hero-2');
      } else {
        window.location.href = '/gallery-hero-2';
      }
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    onSwipeStart: () => {
      console.log('🎯 Swipe started');
    },
    onSwiped: () => {
      console.log('🏁 Swipe ended');
    },
    trackMouse: true,
    delta: 15, // Lowered delta for easier mobile detection
    swipeDuration: 300, // Faster duration for mobile
    preventScrollOnSwipe: true, // Prevent scroll interference
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

  return (
    <>
      <div 
        {...handlers} 
        className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
          cursor: 'grab', // Add cursor to show it's interactive
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleClick}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/text-page.png"
            alt="Text Page"
            width={1260}
            height={2400}
            style={{ width: '100%', height: 'auto', aspectRatio: '1260 / 2400', objectFit: 'cover', display: 'block' }}
            priority
          />
          
          {/* Invisible "Unlock the Ride" Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={() => {
              console.log('Unlock Ride clicked!');
              // Universal navigation - works in all environments
              try {
                window.open('https://app.manifold.xyz/c/man-driving-car', '_blank', 'noopener,noreferrer');
                console.log('✅ Opened Manifold mint URL via universal navigation');
              } catch (error) {
                console.error('Error opening URL:', error);
                // Fallback to regular window.open
                window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
              }
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '63.6%', // Centered vertically
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '71.4%', // 900px / 1260px = 71.4%
              height: '2%', // Approximately 50px / 2400px = 2%
              background: 'transparent', // Invisible background
              border: 'none', // No border
              cursor: 'pointer',
              zIndex: 20,
            }}
            title="Unlock the Ride"
          />
        </div>
      </div>
    </>
  );
} 