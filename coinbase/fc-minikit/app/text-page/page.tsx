"use client";

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea';

export default function TextPage() {
  const { safeArea, isLoading } = useSafeArea();
  const openUrl = useOpenUrl(); // Use BASE AI's recommended hook for URL opening
  const { isFrameReady } = useMiniKit(); // Add MiniKit context
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  // Call sdk.actions.ready() only after image is loaded and safe area is determined
  useEffect(() => {
    const initializeSDK = async () => {
      // Wait for both image to load AND safe area to be determined
      if (imageLoaded && !isLoading && !sdkReady) {
        try {
          console.log('📞 Calling sdk.actions.ready() - interface is ready...');
          await sdk.actions.ready();
          console.log('✅ sdk.actions.ready() called successfully');
          setSdkReady(true);
          
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
              setSdkReady(true);
            } catch (fallbackError) {
              console.error('❌ Fallback also failed:', fallbackError);
            }
          }, 1000);
        }
      }
    };

    initializeSDK();
  }, [imageLoaded, isLoading, sdkReady]);

  // Add frame readiness logic as recommended by BASE AI
  useEffect(() => {
    if (!isFrameReady) {
      console.log('📱 Skipping setFrameReady to avoid 401 errors - app will work with basic functionality');
    }
  }, [isFrameReady]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      try {
        // Try MiniKit navigation first
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/gallery-hero');
        } else {
          // Fallback to window navigation
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/gallery-hero';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Final fallback
        window.location.href = '/gallery-hero';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      try {
        // Try MiniKit navigation first
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/gallery-hero-2');
        } else {
          // Fallback to window navigation
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/gallery-hero-2';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Final fallback
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
      console.log('⬆️ Swipe up detected - navigating to gallery-hero');
      try {
        // Try MiniKit navigation first
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/gallery-hero');
        } else {
          // Fallback to window navigation
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/gallery-hero';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Final fallback
        window.location.href = '/gallery-hero';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero-2');
      try {
        // Try MiniKit navigation first
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/gallery-hero-2');
        } else {
          // Fallback to window navigation
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/gallery-hero-2';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Final fallback
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
            }}
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </>
  );
} 