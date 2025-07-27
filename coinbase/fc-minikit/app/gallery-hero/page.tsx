"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSafeArea } from '../hooks/useSafeArea'; // Import the safe area hook

export default function GalleryHero() {
  const { safeArea, isLoading } = useSafeArea(); // Use the safe area hook

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('📞 Calling sdk.actions.ready() immediately...');
        await sdk.actions.ready();
        console.log('✅ sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        console.log('📍 Is in Base App:', baseAppStatus);
        
      } catch (error) {
        console.error('❌ Error initializing SDK:', error);
        
        // Fallback: try again after a delay
        setTimeout(async () => {
          try {
            console.log('🔄 Fallback: calling sdk.actions.ready()...');
            await sdk.actions.ready();
            console.log('✅ Fallback sdk.actions.ready() successful');
          } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
          }
        }, 1000);
      }
    };

    initializeSDK();
  }, []);

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    // Test: Log any key press to see if event listener is working
    if (event.key === 'Enter') {
      console.log('🔍 Enter key detected - event listener is working!');
    }
    
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up - navigating to gallery-hero-2');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          console.log('📱 Using sdk.actions.openUrl() for Mini App');
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
          console.log('🌐 Using window.location.href for web browser');
          window.location.href = '/gallery-hero-2';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/gallery-hero-2';
      }
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating to text-page');
      try {
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          console.log('📱 Using sdk.actions.openUrl() for Mini App');
          sdk.actions.openUrl('/text-page');
        } else {
          console.log('🌐 Using window.location.href for web browser');
          window.location.href = '/text-page';
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/text-page';
      }
    }
  }, []);

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
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/gallery-hero-2');
        } else {
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
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl('/text-page');
        } else {
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
    trackMouse: true,
    delta: 20, // Reduced delta for more sensitive detection
    swipeDuration: 300, // Reduced duration for faster response
    preventScrollOnSwipe: true, // Prevent scroll interference
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

  const handleUnlockRide = async () => {
    console.log('🚗 Unlock the Ride clicked');
    
    try {
      // Step 1: Fetch dynamic URL from Cloudflare API (Base-compliant)
      console.log('📡 Fetching current mint URL from Cloudflare API...');
      const response = await fetch('https://ccult.carculture-com.workers.dev/api/cars/active');
      const activeCar = await response.json();
      
      if (activeCar && activeCar.mint_url) {
        console.log('✅ Got dynamic URL:', activeCar.mint_url);
        
        // Step 2: Use SDK action for navigation (Base-compliant)
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl(activeCar.mint_url);
        } else {
          window.location.href = activeCar.mint_url;
        }
      } else {
        console.log('⚠️ No active car found, using fallback URL');
        // Fallback to current hardcoded URL
        const fallbackUrl = 'https://app.manifold.xyz/c/light-bulb-moment';
        const context = await sdk.context;
        if (context?.client?.clientFid === 309857) {
          sdk.actions.openUrl(fallbackUrl);
        } else {
          window.location.href = fallbackUrl;
        }
      }
    } catch (error) {
      console.error('❌ Error fetching dynamic URL:', error);
      // Fallback to current hardcoded URL
      const fallbackUrl = 'https://app.manifold.xyz/c/light-bulb-moment';
      const context = await sdk.context;
      if (context?.client?.clientFid === 309857) {
        sdk.actions.openUrl(fallbackUrl);
      } else {
        window.location.href = fallbackUrl;
      }
    }
  };

  const handleShare = async () => {
    console.log('🎯 Share button clicked!');
    
    // Universal sharing - works in all environments
    try {
      // Try native Web Share API first
      if (navigator.share && navigator.share !== undefined) {
        await navigator.share({
          title: "CarMania Garage",
          text: "Check out CarMania Garage!",
          url: window.location.href,
        });
        console.log('✅ Shared via Web Share API');
        return;
      }
    } catch (shareError) {
      console.log('❌ Web Share API failed:', shareError);
    }
    
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log('✅ URL copied to clipboard');
      showNotification('Link copied to clipboard!', 'success');
    } catch (clipboardError) {
      console.log('❌ Clipboard failed:', clipboardError);
      showManualCopyDialog(window.location.href);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 1000;
      font-family: Arial, sans-serif;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const showManualCopyDialog = (url: string) => {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 300px;
        text-align: center;
        font-family: Arial, sans-serif;
      ">
        <p style="margin: 0 0 15px 0; font-weight: bold;">Copy this link:</p>
        <input type="text" value="${url}" readonly style="
          width: 100%; 
          padding: 8px; 
          margin: 10px 0; 
          border: 1px solid #ccc; 
          border-radius: 4px;
          font-size: 12px;
        ">
        <div style="margin-top: 15px;">
          <button onclick="
            navigator.clipboard.writeText('${url}').then(() => {
              this.textContent = 'Copied!';
              setTimeout(() => this.parentElement.parentElement.remove(), 1000);
            }).catch(() => {
              this.textContent = 'Failed';
              setTimeout(() => this.textContent = 'Copy', 1000);
            });
          " style="
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
          ">Copy</button>
          <button onclick="this.parentElement.parentElement.remove()" style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
          ">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  };

  // Debug: Log safe area values
  console.log('📱 Safe area insets:', safeArea);

  // Show loading state while safe area is being determined
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
    <>
      <div 
        {...handlers} 
        className="gallery-hero-container"
        style={{
          width: '100%',
          height: 'auto',
          position: 'relative',
          overflow: 'visible',
          backgroundColor: 'transparent',
          cursor: 'grab', // Add cursor to show it's interactive
          // Apply safe area padding to the main container
          paddingTop: `${safeArea.top}px`,
          paddingBottom: `${safeArea.bottom}px`,
          paddingLeft: `${safeArea.left}px`,
          paddingRight: `${safeArea.right}px`,
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={() => console.log('👆 Touch start detected')}
        onMouseMove={() => console.log('🖱️ Mouse move detected')}
        onTouchMove={() => console.log('👆 Touch move detected')}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero.png"
            alt="Gallery Hero"
            width={1260}
            height={2400}
            style={{ 
              width: '100%', 
              height: 'auto', 
              aspectRatio: '1260 / 2400', 
              objectFit: 'cover', 
              display: 'block',
              // Ensure image respects safe areas
              maxHeight: `calc(100vh - ${safeArea.top + safeArea.bottom}px)`
            }}
            priority
          />
          
          {/* Invisible "Unlock the Ride" Button Overlay - SAFE AREA AWARE */}
          <button
            onClick={handleUnlockRide}
            onMouseEnter={() => console.log('🖱️ Mouse over UNLOCK button area')}
            style={{
              position: 'absolute',
              left: '50%',
              top: `calc(74.9% - ${safeArea.bottom}px)`, // Adjust for bottom safe area
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '59.5%', // Decreased by 50px (63.5% - 3.97% = 59.5%)
              height: '4%', // Approximately 100px / 2400px = 4%
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          />

          {/* Invisible "Share" Button Overlay - SAFE AREA AWARE */}
          <button
            onClick={handleShare}
            style={{
              position: 'absolute',
              left: `calc(89.4% - ${safeArea.right}px)`, // Adjust for right safe area
              top: `calc(75.3% - ${safeArea.bottom}px)`, // Adjust for bottom safe area
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '7.2%', // Decreased by 10px (8% - 0.79% = 7.2%)
              height: '3.1%', // Increased to 75px (75px / 2400px = 3.1%)
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          />
        </div>
      </div>
    </>
  );
} 