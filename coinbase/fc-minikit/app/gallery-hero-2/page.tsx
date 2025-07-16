"use client";
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

export default function GalleryHero2() {
  const router = useRouter();
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Enhanced swipe handlers with better detection
  const handlers = useSwipeable({
    onSwipedUp: () => router.push('/text-page'),
    onSwipedDown: () => router.push('/gallery-hero'),
    trackTouch: true,
    trackMouse: true,
    delta: 50, // Increased for more reliable detection
    swipeDuration: 500, // Increased for better detection
    preventScrollOnSwipe: false,
  });

  // Tap handler
  const handleTap = () => {
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank', 'noopener,noreferrer');
  };

  // Enhanced fallback click handler
  const handleContainerClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    // Check if click is in the bottom area (last 300px) - swipe up
    if (clickY > 2100) {
      console.log('Bottom area clicked - treating as swipe up');
      router.push('/text-page');
      return;
    }
    
    // Check if click is in the top area (first 300px) - swipe down
    if (clickY < 300) {
      console.log('Top area clicked - treating as swipe down');
      router.push('/gallery-hero');
      return;
    }
    
    // Default tap behavior
    handleTap();
  };

  return (
    <div
      {...handlers}
      onClick={handleContainerClick}
      role="button"
      tabIndex={0}
      aria-label="Open Car of the Day mint page"
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') handleTap();
      }}
      style={{
        width: '1260px',
        height: '2400px',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        touchAction: 'pan-y', // Allow vertical touch gestures
      }}
    >
      <Image
        src="/carmania-gallery-hero-2.png"
        alt="CarMania Gallery Hero 2"
        width={1260}
        height={2400}
        style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
        priority
      />
      
      {/* Swipe Navigation Hints */}
      <div 
        onClick={() => router.push('/text-page')}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 15,
          cursor: 'pointer',
          animation: 'pulse 2s infinite',
          border: '2px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        ↑ Swipe Up or Click
      </div>
      
      <div 
        onClick={() => router.push('/gallery-hero')}
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 15,
          cursor: 'pointer',
          animation: 'pulse 2s infinite',
          border: '2px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        ↓ Swipe Down or Click
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 