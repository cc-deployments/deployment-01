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

  const handleUnlockRide = () => {
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
  };

  // Test button click without any wallet dependencies
  const testButtonClick = () => {
    console.log('🎯 Test button clicked!');
    alert('Button is working! This is a test.');
  };

  // Download console errors as text file
  const downloadConsoleErrors = () => {
    const errors: string[] = [];
    
    // Override console.error to capture errors
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(`ERROR: ${args.join(' ')}`);
      originalError.apply(console, args);
    };
    
    // Create and download file
    const blob = new Blob([errors.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'console-errors.txt';
    a.click();
    URL.revokeObjectURL(url);
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
        

        
        {/* Test Button - Made more prominent */}
        <button
          onClick={testButtonClick}
          style={{
            position: 'absolute',
            left: '50px',
            top: '50px',
            padding: '15px 25px',
            background: 'blue',
            color: 'white',
            border: '3px solid yellow',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 50,
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          🎯 TEST BUTTON
        </button>

        {/* Download Errors Button */}
        <button
          onClick={downloadConsoleErrors}
          style={{
            position: 'absolute',
            left: '50px',
            top: '120px',
            padding: '10px 20px',
            background: 'red',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 50,
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          📥 Download Errors
        </button>

        {/* Original "Unlock the Ride" Button - Using stored responsive positions */}
        <button
          onClick={handleUnlockRide}
          style={{
            position: 'absolute',
            left: '305px', // Stored responsive position from APP_FLOW.md
            top: '1110px', // Stored responsive position from APP_FLOW.md
            width: '300px', // Stored responsive size from APP_FLOW.md
            height: '50px', // Stored responsive size from APP_FLOW.md
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
            transition: 'all 0.3s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
          }}
        >
          Unlock the Ride
        </button>
        

      </div>
    </div>
  );
} 