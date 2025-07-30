"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useOpenUrl } from '@coinbase/onchainkit/minikit';
import { useSafeArea } from '../hooks/useSafeArea';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea();
  const openUrl = useOpenUrl();
  const { context, isFrameReady, setFrameReady } = useMiniKit();
  
  console.log('🎨 GalleryHero component rendering...');
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
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to gallery-hero-2');
      try {
        console.log('🌐 Using openUrl for navigation');
        openUrl('/gallery-hero-2');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      // This is the first page, no previous page to navigate to
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
      console.log('⬆️ Swipe up detected - navigating to gallery-hero-2');
      try {
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/gallery-hero-2');
        } else {
          console.log('🌐 Using window.location for navigation');
          window.location.href = '/gallery-hero-2';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
      }
    },
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating to text-page');
      try {
        if (openUrl) {
          console.log('🌐 Using MiniKit openUrl for navigation');
          openUrl('/text-page');
        } else {
          console.log('🌐 Using window.location for navigation');
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
    onSwipeStart: (eventData) => {
      console.log('🎯 Swipe started:', eventData);
    },
    onSwiped: (eventData) => {
      console.log('🏁 Swipe ended:', eventData);
    },
    onSwiping: (eventData) => {
      console.log('🔄 Swiping in progress:', eventData);
    },
    trackMouse: true,
    delta: 20, // Even more sensitive
    swipeDuration: 300, // Faster response
    preventScrollOnSwipe: true,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  console.log('📱 Safe area insets:', safeArea);

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
    <div 
      {...handlers} 
      className="gallery-hero-container"
      style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '1260px',
        height: '2400px',
        overflow: 'hidden',
        touchAction: 'pan-y', // Allow vertical scrolling for swipe detection
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      onClick={(e) => {
        console.log('🎯 Container clicked:', e.target);
      }}
      onMouseDown={(e) => {
        console.log('🖱️ Container mouse down:', e.target);
      }}
    >
      <div className="gallery-hero-image-container" style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000',
        position: 'relative'
      }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="Gallery Hero"
          width={1260}
          height={2400}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none', // Prevent image from interfering with touch events
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
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery</div>';
              }
            }
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully');
          }}
        />
        
        {/* Test button for debugging */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('🔘 Test button clicked!');
            alert('App is working! Try swiping up or down.');
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            console.log('🖱️ Test button mouse down!');
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
        >
          Test Button
        </button>
        
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