"use client";
import Image from "next/image";
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function TextPage() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('🔧 Starting SDK initialization...');
        
        // Always call ready() first to dismiss splash screen
        console.log('📞 Calling sdk.actions.ready() immediately...');
        await sdk.actions.ready();
        console.log('✅ sdk.actions.ready() called successfully');
        
        // Then check environment
        console.log('🔍 Checking if in Mini App environment...');
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('📍 Is in Mini App:', isInMiniApp);
        setIsInMiniApp(isInMiniApp);
        
      } catch (error) {
        console.error('❌ Error initializing SDK:', error);
        // Try to call ready() anyway as fallback
        try {
          console.log('🔄 Fallback: calling sdk.actions.ready()...');
          await sdk.actions.ready();
          console.log('✅ Fallback ready() call successful');
        } catch (fallbackError) {
          console.error('❌ Fallback ready() call failed:', fallbackError);
        }
      }
    };
    
    initializeSDK();
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: (eventData) => {
      console.log('🎯 Swipe up detected!', eventData);
      console.log('Delta Y:', eventData.deltaY, 'Velocity:', eventData.velocity);
      
      // Enhanced mobile swipe detection
      if (Math.abs(eventData.deltaY) >= 50 || eventData.velocity >= 0.3) {
        console.log('✅ Valid swipe up - navigating to manifold-gallery');
        try {
          window.location.href = '/manifold-gallery';
        } catch (error) {
          console.log('Navigation failed:', error);
          window.location.replace('/manifold-gallery');
        }
      } else {
        console.log('❌ Swipe too small or slow, ignoring');
      }
    },
    onSwipedDown: (eventData) => {
      console.log('⬇️ Swipe down detected!', eventData);
      console.log('Delta Y:', eventData.deltaY, 'Velocity:', eventData.velocity);
      
      // Enhanced mobile swipe detection
      if (Math.abs(eventData.deltaY) >= 50 || eventData.velocity >= 0.3) {
        console.log('✅ Valid swipe down - navigating to gallery-hero-2');
        try {
          window.location.href = '/gallery-hero-2';
        } catch (error) {
          console.log('Navigation failed:', error);
          window.location.replace('/gallery-hero-2');
        }
      } else {
        console.log('❌ Swipe too small or slow, ignoring');
      }
    },
    onSwipeStart: (eventData) => {
      console.log('🔄 Swipe started:', eventData);
    },
    onSwiped: (eventData) => {
      console.log('📱 Swipe completed:', eventData);
      // Additional manual detection for mobile
      if (eventData.dir === 'Up' && (Math.abs(eventData.deltaY) >= 50 || eventData.velocity >= 0.3)) {
        console.log('✅ Manual swipe up detection - navigating to manifold-gallery');
        try {
          window.location.href = '/manifold-gallery';
        } catch (error) {
          console.log('Navigation failed:', error);
          window.location.replace('/manifold-gallery');
        }
      } else if (eventData.dir === 'Down' && (Math.abs(eventData.deltaY) >= 50 || eventData.velocity >= 0.3)) {
        console.log('✅ Manual swipe down detection - navigating to gallery-hero-2');
        try {
          window.location.href = '/gallery-hero-2';
        } catch (error) {
          console.log('Navigation failed:', error);
          window.location.replace('/gallery-hero-2');
        }
      }
    },
    trackTouch: true,
    trackMouse: true,
    delta: 10, // More reasonable sensitivity
    swipeDuration: 500, // Longer duration for mobile
    preventScrollOnSwipe: true, // Prevent scroll interference
  });

  // Enhanced fallback click handler
  const handleContainerClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    // Check if click is in the bottom area (last 300px) - swipe up
    if (clickY > 2100) {
      console.log('Bottom area clicked - treating as swipe up');
      try {
        window.location.href = '/manifold-gallery';
      } catch (error) {
        console.log('Navigation failed:', error);
        window.location.replace('/manifold-gallery');
      }
      return;
    }
    
    // Check if click is in the top area (first 300px) - swipe down
    if (clickY < 300) {
      console.log('Top area clicked - treating as swipe down');
      try {
        window.location.href = '/gallery-hero-2';
      } catch (error) {
        console.log('Navigation failed:', error);
        window.location.replace('/gallery-hero-2');
      }
      return;
    }
  };

  return (
    <div 
      {...handlers} 
      onClick={handleContainerClick}
      className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
    >




      {/* Image area - Responsive container */}
      <div className="gallery-hero-image-container">
        <Image
          src="/text-page.png"
          alt="Text Page"
          width={1260}
          height={2400}
          style={{ width: '100%', height: 'auto', aspectRatio: '1260 / 2400', objectFit: 'cover', display: 'block' }}
          priority
        />
        

        
        {/* Red "Unlock the Ride" Button Overlay - Centered at x=630px, y=1550px */}
        <button
          onClick={() => {
            console.log('Unlock Ride clicked!');
            try {
              // Try to open in Mini App environment first
              if (isInMiniApp) {
                console.log('Opening in Mini App environment...');
                sdk.actions.openUrl('https://app.manifold.xyz/c/man-driving-car');
              } else {
                console.log('Opening in regular browser...');
                window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
              }
            } catch (error) {
              console.error('Error opening URL:', error);
              // Fallback to regular window.open
              window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
            }
          }}
          style={{
            position: 'absolute',
            left: '330px', // 630px center - 150px (half of 300px width) - moved left by 150px, then right by 50px
            top: '1115px', // 1550px center - 25px (half of 50px height) - moved up by 500px, then down by 100px, then up by 10px
            width: '300px',
            height: '50px',
            background: 'rgba(255, 0, 0, 0.8)', // Bright red background for visibility
            border: '3px solid yellow', // Yellow border for high visibility
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Unlock the Ride - Position Check Overlay"
        />
        

      </div>
    </div>
  );
} 