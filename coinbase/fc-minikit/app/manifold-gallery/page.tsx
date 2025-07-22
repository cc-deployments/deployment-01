"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function ManifoldGallery() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    // IMMEDIATE REDIRECT - No delay, no SDK initialization needed
    const redirectToManifold = async () => {
      console.log('🔄 Immediate redirect to Manifold gallery: https://manifold.xyz/@carculture');
      
      try {
        // Check if we're in a Mini App environment
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        setIsInMiniApp(baseAppStatus);
        
        if (baseAppStatus) {
          console.log('📱 Using sdk.actions.openUrl() for Mini App');
          await sdk.actions.openUrl('https://manifold.xyz/@carculture');
        } else {
          console.log('🌐 Using window.location.href for web browser');
          window.location.href = 'https://manifold.xyz/@carculture';
        }
      } catch (error) {
        console.error('❌ Redirect failed:', error);
        // Fallback to regular window.location.href
        window.location.href = 'https://manifold.xyz/@carculture';
      }
    };

    // Execute redirect immediately
    redirectToManifold();
  }, []);

  // Keep minimal navigation handlers in case redirect fails
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      if (isInMiniApp) {
        sdk.actions.openUrl('/socialidentity');
      } else {
        window.location.href = '/socialidentity';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      if (isInMiniApp) {
        sdk.actions.openUrl('/text-page');
      } else {
        window.location.href = '/text-page';
      }
    }
  }, [isInMiniApp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected - navigating to socialidentity');
      if (isInMiniApp) {
        sdk.actions.openUrl('/socialidentity');
      } else {
        window.location.href = '/socialidentity';
      }
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected - navigating to text-page');
      if (isInMiniApp) {
        sdk.actions.openUrl('/text-page');
      } else {
        window.location.href = '/text-page';
      }
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    trackMouse: true,
    delta: 30,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackTouch: true,
    rotationAngle: 0,
  });

  // Return empty div - no intermediate display
  return (
    <div 
      {...handlers} 
      className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
        background: 'transparent'
      }}
      onMouseDown={() => console.log('🖱️ Mouse down detected')}
      onTouchStart={() => console.log('👆 Touch start detected')}
    />
  );
} 