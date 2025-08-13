"use client";

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useOpenUrl, useComposeCast } from '@coinbase/onchainkit/minikit';

export default function GalleryHero() {
  const openUrl = useOpenUrl();
  const { composeCast } = useComposeCast();
  
  console.log('🎨 GalleryHero component rendering...');

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

  const handleShare = () => {
    console.log('🔘 Share button clicked!');
    composeCast({
      text: 'Check out this amazing car gallery! 🚗',
      embeds: ['https://your-deployment-url.com/gallery-hero']
    });
  };

  return (
    <div 
      className="gallery-hero-container"
      style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
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
        
        {/* Share button using MiniKit */}
        <button
          onClick={handleShare}
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
          Share to Farcaster
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