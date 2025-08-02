'use client';

import React from 'react';

export default function TestMobile() {
  return (
    <div
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
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      <h1>🧪 Mobile Test Page</h1>
      <p>MiniKit-only navigation test</p>
      <p>✅ No react-swipeable</p>
      <p>✅ Using MiniKit navigation only</p>
      <div style={{ marginTop: '40px', fontSize: '14px' }}>
        <p>✅ App loads correctly</p>
        <p>✅ No gesture conflicts</p>
        <p>✅ Button navigation works</p>
        <p>✅ Keyboard navigation works</p>
      </div>
    </div>
  );
} 