'use client';

import { useRef, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import SplashPage from './components/SplashPage';
import CarMintCard from './components/CarMintCard';
import TitleBar from './components/TitleBar';
import PastDropsGallery from './components/PastDropsGallery';
import WalletAuth from './components/WalletAuth';
import ProtectedContent from './components/ProtectedContent';

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
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 lg:p-24 bg-black text-white">
      {/* Header with Wallet Authentication */}
      <div className="w-full flex justify-between items-center mb-8">
        <TitleBar />
        <WalletAuth />
      </div>
      
      <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center">
        <SplashPage onGetStarted={handleGetStarted} />
        
        {/* Protected Minting Section */}
        <div ref={mintSectionRef} className="w-full pt-24">
          <ProtectedContent>
            <CarMintCard />
          </ProtectedContent>
        </div>
        
        {/* Protected Gallery Section */}
        <ProtectedContent 
          fallback={
            <div className="text-center py-12">
              <p className="text-gray-400">Connect your wallet to view past drops</p>
            </div>
          }
        >
          <PastDropsGallery />
        </ProtectedContent>
      </div>
    </main>
  );
}
