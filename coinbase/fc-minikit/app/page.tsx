'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // After your app is fully loaded and ready to display
        await sdk.actions.ready();
      } catch (error) {
        console.error('Error calling sdk.actions.ready():', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-4">CarMania Garage</h1>
        <p className="text-white text-lg">Welcome to CarCulture</p>
      </div>
    </div>
  );
}
