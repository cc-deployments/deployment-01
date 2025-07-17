"use client";
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

export default function GalleryHero2() {
  const router = useRouter();
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Checking if in Mini App environment...');
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('Is in Mini App:', isInMiniApp);
        
        if (isInMiniApp) {
          console.log('Calling sdk.actions.ready()...');
          await sdk.actions.ready();
          console.log('sdk.actions.ready() called successfully');
        } else {
          console.log('Not in Mini App environment, skipping ready() call');
        }
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };
    
    initializeSDK();
  }, []);

  // Enhanced swipe handlers with better detection
  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('Swipe up detected! Navigating to text-page');
      router.push('/text-page');
    },
    onSwipedDown: () => {
      console.log('Swipe down detected! Navigating to gallery-hero');
      router.push('/gallery-hero');
    },
    trackTouch: true,
    trackMouse: true,
    delta: 20, // Even more sensitive detection
    swipeDuration: 200, // Faster response
    preventScrollOnSwipe: false,
    onSwipeStart: (eventData) => {
      console.log('Swipe started:', eventData);
    },
    onSwiped: (eventData) => {
      console.log('Swipe completed:', eventData);
    },
    onSwipedLeft: (eventData) => {
      console.log('Swipe left detected:', eventData);
    },
    onSwipedRight: (eventData) => {
      console.log('Swipe right detected:', eventData);
    },
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
      onTouchStart={() => {
        console.log('Touch started on container');
      }}
      onTouchMove={() => {
        console.log('Touch moved on container');
      }}
      onTouchEnd={() => {
        console.log('Touch ended on container');
      }}
      role="button"
      tabIndex={0}
      aria-label="Open Car of the Day mint page"
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') handleTap();
      }}
      className="gallery-hero-container"
      style={{
        width: '100%',
        maxWidth: '1260px',
        height: 'auto',
        aspectRatio: '1260 / 2400',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        touchAction: 'pan-y',
        minHeight: '100vh',
        maxHeight: '100vh',
        // Ensure touch events work everywhere
        pointerEvents: 'auto',
      }}
    >
      <div className="gallery-hero-image-container" style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none' }}>
        <Image
          src="/carmania-gallery-hero-2.png"
          alt="CarMania Gallery Hero 2"
          width={1260}
          height={2400}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          priority
        />
      </div>
      
      {/* Swipe Navigation Hints */}
      <div 
        onClick={() => {
          console.log('Swipe up button clicked');
          router.push('/text-page');
        }}
        style={{
          position: 'absolute',
          bottom: '5%',
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
          top: '5%',
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