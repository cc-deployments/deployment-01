"use client";
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

export default function GalleryHero2() {
  const router = useRouter();
  const [isInMiniApp, setIsInMiniApp] = useState(false);
  
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Checking if in Mini App environment...');
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('Is in Mini App:', isInMiniApp);
        setIsInMiniApp(isInMiniApp);
        
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
      className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
    >
      <div className="gallery-hero-image-container">
        <Image
          src="/carmania-gallery-hero-2.png"
          alt="CarMania Gallery Hero 2"
          width={1260}
          height={2400}
          style={{ width: '100%', height: 'auto', aspectRatio: '1260 / 2400', objectFit: 'cover', display: 'block' }}
          priority
        />
      </div>
      

    </div>
  );
} 