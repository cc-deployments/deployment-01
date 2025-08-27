'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Wait for splash.png to display properly
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Call ready() to dismiss splash screen BEFORE redirecting
        await sdk.actions.ready({ disableNativeGestures: true });
        console.log('✅ Splash screen dismissed successfully');
        
        // Now redirect to gallery
        redirect('/gallery-hero');
      } catch (error) {
        console.error('❌ Error during app initialization:', error);
        // Still redirect even if ready() fails
        redirect('/gallery-hero');
      }
    };

    initializeApp();
  }, []);

  // Show loading while initializing
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-white text-lg">Initializing CarMania...</p>
      </div>
    </div>
  );
}
