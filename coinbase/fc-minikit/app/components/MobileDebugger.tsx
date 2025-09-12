'use client';

import { useEffect } from 'react';

export function MobileDebugger() {
  useEffect(() => {
    // Only load Eruda in development and when not on localhost
    if (process.env.NODE_ENV === 'development' && 
        !window.location.hostname.includes('localhost')) {
      import('eruda').then((eruda) => {
        eruda.default.init();
        console.log('🔧 Eruda mobile debugger initialized');
      }).catch((error) => {
        console.warn('Failed to load Eruda:', error);
      });
    }
  }, []);

  return null; // This component doesn't render anything
}

