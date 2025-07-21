"use client";
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';

export default function GalleryHero() {
  const [isInMiniApp, setIsInMiniApp] = useState(false);
  const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
  const [showDebug, setShowDebug] = useState(true); // Temporary debug mode
  
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
        
        // Get safe area insets for mobile UI and apply to button positioning
        const context = await sdk.context;
        if (context?.client?.safeAreaInsets) {
          console.log('📱 Safe area insets:', context.client.safeAreaInsets);
          setSafeAreaInsets(context.client.safeAreaInsets);
        }
        
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
        console.log('✅ Valid swipe up - navigating to gallery-hero-2');
        try {
          // Try router first for better UX
          window.location.href = '/gallery-hero-2';
        } catch (error) {
          console.log('Router failed, using direct navigation:', error);
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
        console.log('✅ Manual swipe up detection - navigating to gallery-hero-2');
        try {
          window.location.href = '/gallery-hero-2';
        } catch (error) {
          console.log('Navigation failed:', error);
          window.location.replace('/gallery-hero-2');
        }
      }
    },
    onSwipedDown: (eventData) => {
      console.log('⬇️ Swipe down detected:', eventData);
    },
    onSwipedLeft: (eventData) => {
      console.log('⬅️ Swipe left detected:', eventData);
    },
    onSwipedRight: (eventData) => {
      console.log('➡️ Swipe right detected:', eventData);
    },
    trackTouch: true,
    trackMouse: true,
    delta: 10, // More reasonable sensitivity
    swipeDuration: 500, // Longer duration for mobile
    preventScrollOnSwipe: true, // Prevent scroll interference
  });

  const handleUnlockRide = async () => {
    console.log('🎯 Unlock Ride button clicked!');
    
    try {
      // Check capabilities first
      const capabilities = await sdk.getCapabilities();
      console.log('🔧 Available capabilities:', capabilities);
      
      // Use SDK actions if available
      if (capabilities.includes('actions.openUrl')) {
        await sdk.actions.openUrl('https://app.manifold.xyz/c/man-driving-car');
        console.log('✅ Opened Manifold URL via SDK');
      } else {
        console.log('📱 Navigation not available, using fallback');
        window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
      }
    } catch (error) {
      console.log('❌ SDK navigation failed, using fallback:', error);
      window.open('https://app.manifold.xyz/c/man-driving-car', '_blank');
    }
  };

  const handleShare = async () => {
    console.log('🎯 Share button clicked!');
    
    try {
      // Add haptic feedback
      const capabilities = await sdk.getCapabilities();
      if (capabilities.includes('haptics.impactOccurred')) {
        await sdk.haptics.impactOccurred('medium');
        console.log('📳 Haptic feedback triggered');
      }
      
      // Try to compose a cast
      if (capabilities.includes('actions.composeCast')) {
        await sdk.actions.composeCast({
          text: "Check out CarMania Garage! 🚗✨",
          embeds: [window.location.href]
        });
        console.log('✅ Cast composed via SDK');
      } else {
        console.log('📱 Cast composition not available, using fallback');
        // Fallback to native share
        const currentUrl = window.location.href;
        if (navigator.share && navigator.share !== undefined) {
          navigator.share({
            title: "CarMania Garage",
            text: "Check out CarMania Garage!",
            url: currentUrl,
          }).catch((error) => {
            console.log('Share API failed, trying clipboard:', error);
            handleClipboardFallback(currentUrl);
          });
        } else {
          handleClipboardFallback(currentUrl);
        }
      }
    } catch (error) {
      console.log('❌ SDK share failed, using fallback:', error);
      const currentUrl = window.location.href;
      handleClipboardFallback(currentUrl);
    }
  };

  const handleClipboardFallback = (url: string) => {
    // Check if clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        console.log('URL copied to clipboard successfully');
          alert("Link copied to clipboard!");
        }).catch((clipboardError) => {
        console.log('Clipboard permission denied or failed:', clipboardError);
        // Don't show error alert, just log it
        showManualCopyDialog(url);
        });
    } else {
      console.log('Clipboard API not available');
      showManualCopyDialog(url);
    }
  };

  const showManualCopyDialog = (url: string) => {
    // Create a more user-friendly dialog
    const dialog = document.createElement('div');
    dialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 1000;
      max-width: 400px;
      text-align: center;
    `;
    
    dialog.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #333;">Share CarMania Garage</h3>
      <p style="margin: 0 0 15px 0; color: #666;">Copy this link to share:</p>
      <input type="text" value="${url}" readonly style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px;">
      <button onclick="this.parentElement.remove()" style="background: #a32428; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Close</button>
    `;
    
    document.body.appendChild(dialog);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(dialog)) {
        dialog.remove();
      }
    }, 10000);
  };

  return (
    <>
      {/* Debug Toggle Button */}
      {showDebug && (
        <button
          onClick={() => setShowDebug(false)}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            background: '#a32428',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Hide Debug
        </button>
      )}
      
      <div 
        {...handlers} 
        onTouchStart={() => {
          // Additional touch handling for better mobile detection
          console.log('Touch started on container');
        }}
        className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
        style={{
          // Apply safe area padding to container
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left,
          paddingRight: safeAreaInsets.right,
        }}
      >
        {/* Image area - Responsive container */}
        <div className="gallery-hero-image-container">
          <Image
            src="/carmania-gallery-hero.png"
            alt="CarMania Gallery Hero"
            width={1260}
            height={2400}
            style={{ width: '100%', height: 'auto', aspectRatio: '1260 / 2400', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            priority
          />
          
          {/* Invisible "Unlock the Ride" Button Overlay - UPDATED POSITION */}
          <button
            onClick={handleUnlockRide}
            style={{
              position: 'absolute',
              left: '50.4%', // Updated: 635px (50.4% of 1260px) - moved left 5px to widen gap
              top: '77.29%', // Updated: 1855px (77.29% of 2400px) - moved up 20px
              transform: 'translateX(-50%) translateY(-50%)', // Center both horizontally and vertically
              width: '36%',
              height: '2%',
              background: showDebug ? 'rgba(255, 255, 0, 0.5)' : 'transparent', // Yellow debug overlay
              border: showDebug ? '2px solid red' : 'none',
              cursor: 'pointer',
              zIndex: 40,
            }}
            title="Unlock the Ride"
          />
          
          {/* Invisible Share Button Overlay - UPDATED POSITION */}
          <button
            onClick={handleShare}
            style={{
              position: 'absolute',
              right: '11.1%', // Updated: 1140px from left = 11.1% from right - moved right 5px
              top: '77.29%', // Updated: 1855px (77.29% of 2400px) - moved up 20px
              transform: 'translateY(-50%)', // Center vertically
              width: '4%',
              height: '1%',
              background: showDebug ? 'rgba(0, 255, 255, 0.5)' : 'transparent', // Cyan debug overlay
              border: showDebug ? '2px solid blue' : 'none',
              cursor: 'pointer',
              zIndex: 40,
            }}
            title="Share"
          />
        </div>
      </div>
    </>
  );
} 