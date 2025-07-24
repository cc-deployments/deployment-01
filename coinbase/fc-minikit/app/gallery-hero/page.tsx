"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function GalleryHero() {
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
    delta: 30, // Increased delta for easier detection
    swipeDuration: 500, // Increased duration for more forgiving detection
    preventScrollOnSwipe: true, // Prevent scroll interference
    trackTouch: true, // Ensure touch events are tracked
    rotationAngle: 0, // No rotation angle restriction
  });

  const handleUnlockRide = async () => {
    console.log('🚗 Unlock the Ride clicked');
    try {
      const context = await sdk.context;
      if (context?.client?.clientFid === 309857) {
        sdk.actions.openUrl('https://app.manifold.xyz/c/man-driving-car');
      } else {
        window.location.href = 'https://app.manifold.xyz/c/man-driving-car';
      }
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = 'https://app.manifold.xyz/c/man-driving-car';
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
        }}
        onMouseDown={() => console.log('🖱️ Mouse down detected')}
        onTouchStart={() => console.log('👆 Touch start detected')}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero.png"
            alt="Gallery Hero"
            width={1260}
            height={2400}
            style={{ width: '100%', height: 'auto', aspectRatio: '1260 / 2400', objectFit: 'cover', display: 'block' }}
            priority
          />
          
          {/* Invisible "Unlock the Ride" Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={handleUnlockRide}
            onMouseEnter={() => console.log('🖱️ Mouse over UNLOCK button area')}
            style={{
              position: 'absolute',
              left: '50%',
              top: '74.9%', // Moved up 50px (77% - 2.08% = 74.9%)
              transform: 'translateX(-50%)', // Centers the button horizontally
              width: '59.5%', // Decreased by 50px (63.5% - 3.97% = 59.5%)
              height: '4%', // Approximately 100px / 2400px = 4%
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          />

          {/* Invisible "Share" Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={handleShare}
            style={{
              position: 'absolute',
              left: '89.4%', // Moved another 20px to the right (87.8% + 1.59% = 89.4%)
              top: '75.3%', // Moved center down 10px (74.9% + 0.42% = 75.3%)
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