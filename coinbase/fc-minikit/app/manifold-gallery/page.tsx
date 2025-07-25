"use client";

import { useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSafeArea } from '../hooks/useSafeArea'; // Import the safe area hook

export default function ManifoldGallery() {
  const { safeArea, isLoading } = useSafeArea(); // Use the safe area hook

  useEffect(() => {
    // IMMEDIATE REDIRECT - No delay, no SDK initialization needed
    const redirectToManifold = async () => {
      console.log('🔄 Immediate redirect to Manifold gallery: https://manifold.xyz/@carculture');
      
      try {
        // Check if we're in a Mini App environment
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        
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
  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/socialidentity');
        } else {
          window.location.href = '/socialidentity';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/socialidentity';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
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
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to socialidentity');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/socialidentity');
        } else {
          window.location.href = '/socialidentity';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/socialidentity';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to text-page');
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

  // Return empty div - no intermediate display
  return (
    <div 
      {...handlers} 
      className="gallery-hero-container"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
        background: 'transparent',
        // Apply safe area padding to the main container
        paddingTop: `${safeArea.top}px`,
        paddingBottom: `${safeArea.bottom}px`,
        paddingLeft: `${safeArea.left}px`,
        paddingRight: `${safeArea.right}px`,
      }}
      onMouseDown={() => console.log('🖱️ Mouse down detected')}
      onTouchStart={() => console.log('👆 Touch start detected')}
    />
  );
} 