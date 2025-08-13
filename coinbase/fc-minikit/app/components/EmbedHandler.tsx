"use client";

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function EmbedHandler() {
  const { context } = useMiniKit();

  useEffect(() => {
    // Removed location context dependencies for CBW compatibility
    // This component now only handles basic Mini App context without location-specific features
    
    if (context) {
      console.log('📱 Mini App context available');
      // Future: Add CBW-compatible embed functionality here
    }
  }, [context]);

  // This component doesn't render anything visible
  // It just handles basic Mini App context detection
  return null;
} 