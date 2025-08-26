'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Immediately dismiss splash screen when app is ready
        // Use disableNativeGestures: true to prevent conflicts with native Mini App dismissal gestures
        await sdk.actions.ready({ disableNativeGestures: true });
        setIsReady(true);
      } catch (error) {
        // Still show content even if ready() fails
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  // Show main app content immediately - Fresh deployment test
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/gallery-hero" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-xl font-semibold mb-2">Gallery Hero</h3>
          </a>
          
          <a href="/gallery-hero-2" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-xl font-semibold mb-2">Gallery Hero 2</h3>
          </a>
          
          <a href="/text-page" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-xl font-semibold mb-2">Text Page</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
