"use client";
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';

// Import metadata function
import FarcasterMetaTags from '../components/FarcasterMetaTags';

// Generate metadata for this page
export const metadata = FarcasterMetaTags({ pageUrl: "/gallery-hero", buttonTitle: "Unlock the Ride" });

export default function GalleryHero() {
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
        
        // Get safe area insets for mobile UI (logging only, not applying to preserve button positioning)
        const context = await sdk.context;
        if (context?.client?.safeAreaInsets) {
          console.log('📱 Safe area insets:', context.client.safeAreaInsets);
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
      <div 
        {...handlers} 
        onTouchStart={() => {
          // Additional touch handling for better mobile detection
          console.log('Touch started on container');
        }}
        className={`gallery-hero-container ${isInMiniApp ? 'mini-app-environment' : ''}`}
        style={{
          // Removed safe area padding to preserve button positioning
          // Buttons are positioned using percentages and need to stay in place
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
          
          {/* Invisible "Unlock the Ride" Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={handleUnlockRide}
            style={{
              position: 'absolute',
              left: '50%',
              top: '90%',
              transform: 'translateX(-50%)',
              width: '36%',
              height: '2%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 40,
            }}
            title="Unlock the Ride"
          />
          
          {/* Invisible Share Button Overlay - RESPONSIVE POSITIONING */}
          <button
            onClick={handleShare}
            style={{
              position: 'absolute',
              right: '8%',
              top: '92%',
              width: '4%',
              height: '1%',
              background: 'transparent',
              border: 'none',
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