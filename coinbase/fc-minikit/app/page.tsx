'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Show splash screen briefly in FC environment
        console.log('🚀 Initializing CarMania Mini App...');
        
        // Wait 2 seconds to show splash.png before dismissing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Dismiss splash screen when app is ready
        console.log('🔧 Calling sdk.actions.ready() to dismiss splash screen...');
        await sdk.actions.ready();
        console.log('✅ Splash screen dismissed successfully');
        setIsReady(true);
        
      } catch (error) {
        console.error('❌ Error during app initialization:', error);
        // Still show content even if ready() fails
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  // Show loading state while initializing (this will show splash.png briefly)
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading CarMania...</p>
        </div>
      </div>
    );
  }

  // Show main app content after ready() is called
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold mb-4">CarMania Garage</h1>
          <p className="text-white text-lg mb-6">Welcome to CarCulture</p>
          <p className="text-green-400 text-sm">✅ App ready! - Testing auto-promotion</p>
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
