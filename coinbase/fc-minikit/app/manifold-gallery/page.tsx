"use client";

import { useEffect } from 'react';

export default function ManifoldGallery() {
  useEffect(() => {
    // Simple redirect to static Manifold gallery
    window.location.href = 'https://manifold.xyz/@carculture';
  }, []);

  return (
    <div style={{
      width: '1260px',
      height: '2400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color: '#fff',
      fontSize: '18px'
    }}>
      Redirecting to Manifold Gallery...
    </div>
  );
} 