"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useOpenUrl } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea';

export default function GalleryHero2() {
  const { safeArea, isLoading } = useSafeArea();
  const openUrl = useOpenUrl(); // Use BASE AI's recommended hook for URL opening

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Calling sdk.actions.ready()...');
        await sdk.actions.ready();
        console.log('sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        console.log('📍 Is in Base App:', baseAppStatus);
        
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };

    initializeSDK();
  }, []);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/text-page');
        } else {
          window.location.href = '/text-page';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/text-page';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero');
        } else {
          window.location.href = '/gallery-hero';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero';
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to text-page');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/text-page');
        } else {
          window.location.href = '/text-page';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/text-page';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero');
        } else {
          window.location.href = '/gallery-hero';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero';
      }
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    trackMouse: true,
    delta: 20, // Reduced delta for more sensitive detection
    swipeDuration: 300, // Reduced duration for faster response
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
    <>
      <div 
        {...handlers} 
        className="gallery-hero-container"
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'grab', // Add cursor to show it's interactive
          // Apply safe area padding to the main container
          paddingTop: `${safeArea.top}px`,
          paddingBottom: `${safeArea.bottom}px`,
          paddingLeft: `${safeArea.left}px`,
          paddingRight: `${safeArea.right}px`,
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={() => console.log('👆 Touch start detected')}
        onMouseMove={() => console.log('🖱️ Mouse move detected')}
        onTouchMove={() => console.log('👆 Touch move detected')}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero-2.png"
            alt="Gallery Hero 2"
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
          
          {/* Invisible "Unlock the Ride" Button Overlay - SAFE AREA AWARE */}
          <button
            onClick={async () => {
              console.log('🚗 Unlock Ride clicked!');
              
              try {
                // Step 1: Fetch dynamic URL from Cloudflare API (Base-compliant)
                console.log('📡 Fetching current mint URL from Cloudflare API...');
                const response = await fetch('https://ccult.carculture-com.workers.dev/api/cars/active');
                const activeCar = await response.json();
                
                if (activeCar && activeCar.mint_url) {
                  console.log('✅ Got dynamic URL:', activeCar.mint_url);
                  
                  // Step 2: Use the recommended useOpenUrl hook (Base-compliant)
                  openUrl(activeCar.mint_url);
                } else {
                  console.log('⚠️ No active car found, using fallback URL');
                  // Fallback to current hardcoded URL
                  const fallbackUrl = 'https://app.manifold.xyz/c/light-bulb-moment';
                  openUrl(fallbackUrl);
                }
              } catch (error) {
                console.error('❌ Error fetching dynamic URL:', error);
                // Fallback to current hardcoded URL
                const fallbackUrl = 'https://app.manifold.xyz/c/light-bulb-moment';
                openUrl(fallbackUrl);
              }
            }}
            onTouchStart={(e) => {
              e.stopPropagation(); // Prevent container touch handlers from interfering
              console.log('👆 Touch start on UNLOCK button');
            }}
            onTouchEnd={(e) => {
              e.stopPropagation(); // Prevent container touch handlers from interfering
              console.log('👆 Touch end on UNLOCK button');
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: `calc(63.6% - ${safeArea.bottom}px)`, // Adjust for bottom safe area
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '24%', // Approximately 300px / 1260px = 24%
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