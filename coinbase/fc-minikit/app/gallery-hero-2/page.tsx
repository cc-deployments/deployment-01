"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function GalleryHero2() {
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
    delta: 30, // Increased delta for easier detection
    swipeDuration: 500, // Increased duration for more forgiving detection
    preventScrollOnSwipe: true, // Prevent scroll interference
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

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
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={() => console.log('👆 Touch start detected')}
        onClick={() => console.log('🖱️ Click detected')}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero-2.png"
            alt="Gallery Hero 2"
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