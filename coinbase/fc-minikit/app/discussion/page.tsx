"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import ManifoldGalleryDiscussion from '../components/ManifoldGalleryDiscussion';

export default function DiscussionPage() {
  const router = useRouter();

  // Navigation helper function
  const navigateTo = useCallback(async (path: string) => {
    console.log('🧭 Navigating to:', path);
    try {
      await router.push(path);
    } catch (error) {
      console.error('❌ Navigation error:', error);
      console.log('🔄 Falling back to window.location.href');
      window.location.href = path;
    }
  }, [router]);

  // Custom swipe handlers for navigation
  const swipeHandlers = useSwipeable({
    onSwipedDown: async () => {
      console.log('⬇️ Swipe down detected - navigating back to text-page');
      navigateTo('/text-page');
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
    },
    onSwipeStart: () => {
      console.log('👆 Swipe start detected');
    },
    trackMouse: true,
    delta: 50,
    swipeDuration: 400,
    preventScrollOnSwipe: false,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    console.log('🎹 Key pressed:', event.key);
    
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down - navigating back to text-page');
      navigateTo('/text-page');
    }
  }, [navigateTo]);

  useEffect(() => {
    console.log('🎧 Setting up keyboard event listener');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('🎧 Removing keyboard event listener');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div 
      {...swipeHandlers}
      style={{
        position: 'relative',
        backgroundColor: '#f8f9fa',
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'manipulation',
      }}
    >
      {/* Header with navigation hint */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px',
        zIndex: 1000,
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#1f2937',
          margin: 0 
        }}>
          🚗 CarMania Discussion
        </h1>
        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          margin: '4px 0 0 0' 
        }}>
          Swipe down to go back
        </p>
      </div>

      {/* Discussion Component */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <ManifoldGalleryDiscussion 
          collectionId="@carculture"
          autoRefresh={true}
          refreshInterval={30000}
        />
      </div>
    </div>
  );
}
