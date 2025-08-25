'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Required: Call ready() to dismiss the splash screen
        // This is mandatory for ALL Farcaster Mini Apps
        await sdk.actions.ready();
        console.log('✅ Splash screen dismissed successfully');
        
        // Now redirect to the main app
        redirect('/gallery-hero');
      } catch (error) {
        console.error('❌ Error initializing Mini App:', error);
        // Still redirect even if ready() fails
        redirect('/gallery-hero');
      }
    };

    initializeApp();
  }, []);

  // Show loading state while initializing
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading CarMania...</p>
      </div>
    </div>
  );
}
