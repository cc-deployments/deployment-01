"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useOpenUrl, useMiniKit } from '@coinbase/onchainkit/minikit';

export default function GalleryHero2() {
  const openUrl = useOpenUrl();
  const { context, isFrameReady, setFrameReady } = useMiniKit();
  
  console.log('🎨 GalleryHero2 component rendering...');
  console.log('🔍 Frame context available:', !!context);

  // Enable MiniKit's built-in navigation gestures
  useEffect(() => {
    if (!isFrameReady && context) {
      console.log('📱 Setting frame ready with ENABLED native gestures for MiniKit navigation');
      setFrameReady({ disableNativeGestures: false });
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

  return (
    <div 
      className="gallery-hero-2-container"
      style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
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
        pointerEvents: 'none' // Prevent this div from blocking events
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
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">Gallery Hero 2</div>';
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