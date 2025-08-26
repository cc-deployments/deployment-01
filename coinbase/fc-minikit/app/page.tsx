'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Immediately dismiss splash screen when app is ready
        await sdk.actions.ready();
        setIsReady(true);
      } catch (error) {
        // Still show content even if ready() fails
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  // Show main app content immediately
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold mb-4">CarMania Garage</h1>
          <p className="text-white text-lg mb-6">Welcome to CarCulture</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/gallery-hero" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-xl font-semibold mb-2">Gallery Hero</h3>
            <p className="text-gray-300">Explore the main gallery</p>
          </a>
          
          <a href="/gallery-hero-2" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-xl font-semibold mb-2">Gallery Hero 2</h3>
            <p className="text-gray-300">Secondary gallery view</p>
          </a>
          
          <a href="/text-page" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-xl font-semibold mb-2">Text Page</h3>
            <p className="text-gray-300">Content and information</p>
          </a>
        </div>
      </div>
    </div>
  );
}
