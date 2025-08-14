'use client';

import React from 'react';
import { useState, useEffect } from 'react';
// TODO: Import NFTGallery when component is created
// import NFTGallery from './NFTGallery';

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

  // TODO: Return NFTGallery when component is created
  // return <NFTGallery />;
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">NFT Gallery - Coming Soon</p>
    </div>
  );
} 