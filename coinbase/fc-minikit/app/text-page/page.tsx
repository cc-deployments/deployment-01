"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea';

export default function TextPage() {
  const { safeArea, isLoading } = useSafeArea();
  const openUrl = useOpenUrl(); // Use BASE AI's recommended hook for URL opening
  const { setFrameReady, isFrameReady } = useMiniKit(); // Add MiniKit context

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('📞 Calling sdk.actions.ready() immediately...');
        await sdk.actions.ready();
        console.log('✅ sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
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

  // Add frame readiness logic as recommended by BASE AI
  useEffect(() => {
    if (!isFrameReady) {
      console.log('🖼️ Setting frame ready...');
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/manifold-gallery');
        } else {
          openUrl('/manifold-gallery');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/manifold-gallery');
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
          window.location.href = '/gallery-hero-2';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
      }
    }
  }, [openUrl]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('📄 Text-page component mounted - swipe handlers should be active');
  }, []);

  // Manual touch detection as fallback






  const handlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to manifold-gallery');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/manifold-gallery');
        } else {
          openUrl('/manifold-gallery');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/manifold-gallery');
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero-2');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
          openUrl('/gallery-hero-2');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        openUrl('/gallery-hero-2');
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

  // Debug: Log safe area values
  console.log('📱 Safe area insets:', safeArea);

  // Show loading state while safe area is being determined
  if (isLoading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '16px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <div 
        {...handlers} 
        className="gallery-hero-container"
        style={{
          position: 'relative',
          backgroundColor: '#000',
          border: '8px solid blue !important', // Force blue border around container edge
          outline: '4px solid red', // Additional red outline for debugging
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
      >
        {/* Image area - Responsive container with safe area consideration */}
        <div className="gallery-hero-image-container">
          <Image
            src="/text-page.png"
            alt="Text Page"
            width={1260}
            height={2400}
            style={{ 
              width: '100%', 
              height: 'auto', 
              aspectRatio: '1260 / 2400', 
              objectFit: 'cover', 
              display: 'block',
              // Ensure image respects safe areas
              maxHeight: `calc(100vh - ${safeArea.top + safeArea.bottom}px)`
            }}
            priority
          />
          
          {/* Clean MiniKit Button - No Direct Event Handlers */}
          <button
            onClick={() => {
              console.log('🚀 UNLOCK THE RIDE button clicked');
              // Use MiniKit hook for URL opening
              openUrl('https://manifold.xyz/@carculture');
            }}
            style={{
              position: 'absolute',
              top: '850px', // Y=1550 from top (2400-1550=850px from top)
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%', // Wider - increased from 40%
              height: '35px', // Slightly taller - increased from 25px
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
              border: '2px solid red',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
              zIndex: 1000,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              pointerEvents: 'auto',
            }}
            title="Unlock the Ride"
          />
        </div>
      </div>
    </>
  );
} 