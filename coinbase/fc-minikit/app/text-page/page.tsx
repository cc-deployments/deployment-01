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

  const handleUnlockRide = () => {
    console.log('Unlock Ride clicked!');
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
  };

  // Handle Manifold mint page navigation
  const handleManifoldMint = () => {
    console.log('Manifold Mint clicked!');
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
  };

  // Enhanced touch handler for mobile
  const handleTouchStart = () => {
    console.log('Touch start detected on button area');
  };

  const handleTouchEnd = () => {
    console.log('Touch end detected on button area');
    handleUnlockRide();
  };

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


      {/* Manifold Gallery Navigation Button */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <button 
          onClick={() => {
            try {
              window.location.href = '/manifold-gallery';
            } catch (error) {
              console.log('Navigation failed:', error);
              window.location.replace('/manifold-gallery');
            }
          }}
          style={{ 
            padding: '10px 20px', 
            borderRadius: 8, 
            background: '#a32428', 
            color: 'white', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            fontSize: 16, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)' 
          }}
        >
          View Gallery
        </button>
      </div>

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
        

        
        {/* Invisible "Unlock the Ride" Button Overlay */}
        <button
          onClick={handleUnlockRide}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'absolute',
            left: '305px', // Fixed pixel position that was working
            top: '1110px', // Fixed pixel position that was working
            width: '300px', // Fixed width that was working
            height: '50px', // Fixed height that was working
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 20,
          }}
          title="Unlock the Ride"
        />



        {/* Invisible Manifold Mint Button Overlay */}
        <button
          onClick={handleManifoldMint}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'absolute',
            left: '20%', // Larger touch area
            top: '45%', // Slightly higher for better positioning
            width: '30%', // Much larger for better touch interaction
            height: '4%', // Taller for easier touch
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 20,
            minHeight: '40px', // Ensure minimum touch size
            minWidth: '200px', // Ensure minimum touch size
          }}
          title="Mint on Manifold"
        />
        

      </div>
    </div>
  );
} 