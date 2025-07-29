'use client';

import React from 'react';
import { useSwipeable } from 'react-swipeable';

export default function TestMobile() {
  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected');
      alert('Swipe UP detected!');
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected');
      alert('Swipe DOWN detected!');
    },
    onSwipedLeft: () => {
      console.log('⬅️ Swipe left detected');
      alert('Swipe LEFT detected!');
    },
    onSwipedRight: () => {
      console.log('➡️ Swipe right detected');
      alert('Swipe RIGHT detected!');
    },
    trackMouse: true,
    delta: 30,
    swipeDuration: 300,
    preventScrollOnSwipe: true,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: false },
  });

  return (
    <div
      {...handlers}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        textAlign: 'center',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      <h1>🧪 Mobile Test Page</h1>
      <p>Try swiping in any direction!</p>
      <p>⬆️ ⬇️ ⬅️ ➡️</p>
      <p style={{ fontSize: '16px', marginTop: '20px' }}>
        Check console for swipe events
      </p>
      <div style={{ marginTop: '40px', fontSize: '14px' }}>
        <p>✅ Swipe gestures should work</p>
        <p>✅ No scrolling should occur</p>
        <p>✅ Touch events should be captured</p>
      </div>
    </div>
  );
} 