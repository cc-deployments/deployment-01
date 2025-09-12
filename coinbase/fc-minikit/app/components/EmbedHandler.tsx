"use client";

import { useEffect } from 'react';
export default function EmbedHandler() {
  useEffect(() => {
    console.log('📱 Mini App context available');
    // Future: Add CBW-compatible embed functionality here
  }, []);

  // This component doesn't render anything visible
  // It just handles basic Mini App context detection
  return null;
} 