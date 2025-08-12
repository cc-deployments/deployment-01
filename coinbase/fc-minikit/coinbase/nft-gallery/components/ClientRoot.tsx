'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import NFTGallery from './NFTGallery';

export default function ClientRoot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return <NFTGallery />;
} 