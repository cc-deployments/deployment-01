"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function ManifoldGallery() {
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

    // AUTOMATIC REDIRECT to Manifold gallery
    const redirectToManifold = async () => {
      console.log('🔄 Redirecting to Manifold gallery: https://manifold.xyz/@carculture');
      
      try {
        if (isInMiniApp) {
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

    initializeSDK();
    
    // Auto-redirect after a short delay to allow SDK initialization
    setTimeout(() => {
      redirectToManifold();
    }, 500);
  }, [isInMiniApp]);

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
          cursor: 'grab',
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={() => console.log('👆 Touch start detected')}
      >
        {/* Loading State - Show while redirecting */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          textAlign: 'center'
        }}>
          <div>
            <div>🔄 Redirecting to Manifold Gallery...</div>
            <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
              https://manifold.xyz/@carculture
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 