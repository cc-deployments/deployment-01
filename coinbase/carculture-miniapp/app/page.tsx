'use client';

import { useRef, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import CarManiaSplashPage from './components/carmania/CarManiaSplashPage';
import CarManiaMintCard from './components/carmania/CarManiaMintCard';
import TitleBar from './components/TitleBar';
import PastDropsGallery from './components/PastDropsGallery';
import WalletAuth from '../shared/identity/WalletAuth';
import ProtectedContent from '../shared/identity/ProtectedContent';
import CarManiaGallery from './components/carmania/CarManiaGallery';

export default function HomePage() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const mintSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  const handleGetStarted = () => {
    mintSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Enhanced Header with Wallet Authentication */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="w-full flex justify-between items-center px-4 md:px-6 py-3">
          <WalletAuth />
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Section - CarMania Splash */}
        <div className="pt-6 pb-4 md:pt-8 md:pb-6 lg:pt-10 lg:pb-8">
          <CarManiaSplashPage />
        </div>

        {/* Car of the Day - CarManiaGallery */}
        <div className="pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10">
          <CarManiaGallery />
        </div>
        
        {/* Past Drops Gallery Section - Only show if there are past drops */}
        <div className="pt-6 pb-8 md:pt-8 md:pb-10 lg:pt-10 lg:pb-12 border-t border-gray-800">
          <ProtectedContent>
            <PastDropsGallery />
          </ProtectedContent>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-gray-800 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 CarCulture • Built with ❤️ on Base
          </p>
        </div>
      </footer>
    </main>
  );
}
