'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Required: Call ready() to dismiss the splash screen
        // This is mandatory for ALL Farcaster Mini Apps
        console.log('🚀 Calling sdk.actions.ready() to dismiss splash screen...');
        await sdk.actions.ready();
        console.log('✅ Splash screen dismissed successfully');
        
        // Now navigate to the main app using router.push
        console.log('🔄 Redirecting to /gallery-hero...');
        router.push('/gallery-hero');
      } catch (error) {
        console.error('❌ Error initializing Mini App:', error);
        // Still redirect even if ready() fails
        console.log('🔄 Redirecting despite error...');
        router.push('/gallery-hero');
      }
    };

    initializeApp();
  }, [router]);

  // Show loading state while initializing
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading CarMania...</p>
        <p className="text-gray-400 text-sm mt-2">Dismissing splash screen...</p>
      </div>
    </div>
  );
}
