"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function GalleryHero2() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Calling sdk.actions.ready()...');
        await sdk.actions.ready();
        console.log('sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        setIsInMiniApp(baseAppStatus);
        console.log('📍 Is in Base App:', baseAppStatus);
        
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };

    initializeSDK();
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      window.location.href = '/text-page';
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      window.location.href = '/gallery-hero';
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected');
      window.location.href = '/text-page';
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected');
      window.location.href = '/gallery-hero';
    },
    trackMouse: true,
    delta: 5, // Lower delta for more sensitive detection
    swipeDuration: 300, // Shorter duration for more responsive feel
    preventScrollOnSwipe: true, // Prevent scroll interference
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
        }}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/gallery-hero-2.png"
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