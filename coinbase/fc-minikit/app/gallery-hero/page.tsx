"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { sdk } from '@farcaster/miniapp-sdk';

export default function GalleryHero() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('📞 Calling sdk.actions.ready() immediately...');
        await sdk.actions.ready();
        console.log('✅ sdk.actions.ready() called successfully');
        
        // Get SDK context for environment detection
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        setIsInMiniApp(baseAppStatus);
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

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      window.location.href = '/text-page';
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      window.location.href = '/gallery-hero-2';
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected');
      window.location.href = '/text-page';
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected');
      window.location.href = '/gallery-hero-2';
    },
    trackMouse: true,
    trackTouch: true,
    delta: 30, // Increased for better mobile detection
    swipeDuration: 500, // Longer duration for mobile
    preventScrollOnSwipe: true,
    rotationAngle: 0, // Only detect vertical swipes
  });

  const handleUnlockRide = async () => {
    console.log('🎯 Unlock Ride button clicked!');
    console.log('🔗 Target URL: https://app.manifold.xyz/c/man-driving-car');
    
    // Universal navigation - works in all environments
    try {
      window.open('https://app.manifold.xyz/c/man-driving-car', '_blank', 'noopener,noreferrer');
      console.log('✅ Opened Manifold mint URL via universal navigation');
    } catch (error) {
      console.log('❌ Navigation failed:', error);
      // Fallback: location.href
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
        className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          touchAction: 'none', // Prevent default touch behaviors
        }}
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
              top: '77%',
              width: '16%',
              height: '4%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          />

          {/* Invisible "Share" Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={handleShare}
            style={{
              position: 'absolute',
              right: '8%',
              top: '77%',
              width: '8%',
              height: '2%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transform: 'translate(0%, -50%)',
              zIndex: 1000,
            }}
          />
        </div>
      </div>
    </>
  );
} 