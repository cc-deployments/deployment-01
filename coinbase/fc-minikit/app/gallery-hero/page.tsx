"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
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
      className="gallery-hero-container"
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
      <div className="gallery-hero-image-container" style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000',
        position: 'relative',
        pointerEvents: 'none' // Prevent this div from blocking events
      }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="Gallery Hero"
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
                container.innerHTML = '<div style="color: white; text-align: center; font-size: 24px;">CarMania Gallery</div>';
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