"use client";

import { useEffect } from 'react';
// TEMPORARILY DISABLED: OnchainKit dependency issue
// import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function EmbedHandler() {
  // const { context } = useMiniKit();

  useEffect(() => {
    // TEMPORARILY DISABLED: OnchainKit dependency issue
    // Removed location context dependencies for CBW compatibility
    // This component now only handles basic Mini App context without location-specific features
    
    // if (context) {
      console.log('📱 Mini App context available (OnchainKit temporarily disabled)');
      // Future: Add CBW-compatible embed functionality here
    // }
  }, []); // Removed context dependency

  // This component doesn't render anything visible
  // It just handles basic Mini App context detection
  return null;
} 