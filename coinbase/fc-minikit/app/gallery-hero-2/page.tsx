"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';

export default function GalleryHero2() {
  const openUrl = useOpenUrl();
  const { context, isFrameReady, setFrameReady } = useMiniKit();
  
  console.log('🎨 GalleryHero2 component rendering...');
  console.log('🔍 Frame context available:', !!context);

  // Set frame ready with disableNativeGestures to prevent conflicts
  useEffect(() => {
    if (!isFrameReady && context) {
      console.log('📱 Setting frame ready with disableNativeGestures to prevent conflicts');
      setFrameReady({ disableNativeGestures: true });
      
      // Try to access the underlying SDK for gesture conflicts
      try {
        const sdk = (window as unknown as { sdk?: { actions?: { ready?: (options: { disableNativeGestures?: boolean }) => void } } }).sdk;
        if (sdk?.actions?.ready) {
          console.log('🔧 Calling underlying SDK ready() with disableNativeGestures');
          sdk.actions.ready({ disableNativeGestures: true });
        }
      } catch {
        console.log('⚠️ SDK not available in this environment');
      }
    }
  }, [isFrameReady, setFrameReady, context]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to text-page');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/text-page');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/text-page';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating to gallery-hero');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/gallery-hero');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero';
      }
    }
  }, [openUrl]);

  useEffect(() => {
    console.log('🎧 Setting up keyboard event listener');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('🎧 Removing keyboard event listener');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handlers = useSwipeable({
    onSwipedUp: async () => {
      console.log('⬆️ Swipe up detected - navigating to text-page');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/text-page');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/text-page';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/gallery-hero');
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
    trackMouse: false, // Disable mouse tracking to avoid conflicts
    delta: 50, // Less sensitive to avoid accidental triggers
    swipeDuration: 500, // Slower response for more intentional swipes
    preventScrollOnSwipe: true,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  return (
    <div 
      {...handlers} 
      className="gallery-hero-2-container"
      style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '1260px',
        height: '2400px',
        overflow: 'hidden',
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        margin: '0 auto', // Center horizontally
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="gallery-hero-2-image-container" style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000',
        position: 'relative',
        pointerEvents: 'none' // Prevent this div from blocking swipe events
      }}>
        <Image
          src="/carmania-gallery-hero-2.png"
          alt="Gallery Hero 2"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
            margin: '0 auto',
          }}
          priority
          unoptimized={true}
          onError={(e) => {
            console.error('❌ Image failed to load:', e);
            const img = e.currentTarget as HTMLImageElement;
            if (img.src !== '/hero-v2.png') {
              console.log('🔄 Trying fallback image...');
              img.src = '/hero-v2.png';
            } else {
              img.style.display = 'none';
              console.log('❌ All images failed, showing background only');
              const container = img.parentElement;
              if (container) {
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery 2</div>';
              }
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully');
          }}
        />
        

      </div>
    </div>
  );
} 