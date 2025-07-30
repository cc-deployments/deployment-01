"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';

export default function TextPage() {
  const openUrl = useOpenUrl();
  const { context, isFrameReady, setFrameReady } = useMiniKit();
  
  console.log('🎨 TextPage component rendering...');
  console.log('🔍 Frame context available:', !!context);

  // Set frame ready with disableNativeGestures to prevent conflicts
  useEffect(() => {
    if (!isFrameReady && context) {
      console.log('📱 Setting frame ready with disableNativeGestures to prevent conflicts');
      setFrameReady({ disableNativeGestures: true });
    }
  }, [isFrameReady, setFrameReady, context]);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to manifold-gallery');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/manifold-gallery');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/manifold-gallery';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating to gallery-hero-2');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/gallery-hero-2');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
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
      console.log('⬆️ Swipe up detected - navigating to manifold-gallery');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/manifold-gallery');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/manifold-gallery';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to gallery-hero-2');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/gallery-hero-2');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
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
    swipeDuration: 400,
    preventScrollOnSwipe: true,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  return (
    <div 
      {...handlers} 
      className="text-page-container"
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
      }}
    >
      <div className="text-page-image-container" style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000',
        position: 'relative'
      }}>
        <Image
          src="/text-page.png"
          alt="Text Page"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
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
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">Text Page</div>';
              }
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully');
          }}
        />
        
        {/* Swipe instructions */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          textAlign: 'center',
          fontSize: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '8px 16px',
          borderRadius: '8px',
          pointerEvents: 'none'
        }}>
          Swipe up or down to navigate
        </div>
      </div>
    </div>
  );
} 