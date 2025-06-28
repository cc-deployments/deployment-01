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
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Enhanced Header with Wallet Authentication */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="w-full flex justify-between items-center px-4 md:px-6 py-3">
          <TitleBar />
          <WalletAuth />
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-8 md:py-12 lg:py-16">
          <SplashPage onGetStarted={handleGetStarted} />
        </div>
        
        {/* Minting Section - Requires Wallet Auth */}
        <div ref={mintSectionRef} className="py-12 md:py-16 lg:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Mint?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Connect your wallet to mint today's exclusive CarMania NFT
            </p>
          </div>
          
          <ProtectedContent>
            <div className="flex justify-center">
              <CarMintCard />
            </div>
          </ProtectedContent>
        </div>
        
        {/* Gallery Section */}
        <div className="py-12 md:py-16 lg:py-20 border-t border-gray-800">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Past Drops
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore the collection of previous CarMania releases
            </p>
          </div>
          
          <ProtectedContent 
            fallback={
              <div className="text-center py-12 md:py-16">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                    <div className="text-4xl mb-4">🔐</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Connect Your Wallet
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Connect your wallet to view past drops and build your collection
                    </p>
                    <WalletAuth />
                  </div>
                </div>
              </div>
            }
          >
            <PastDropsGallery />
          </ProtectedContent>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-800 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 CarCulture • Built with ❤️ on Base
          </p>
        </div>
      </footer>
    </main>
  );
}
