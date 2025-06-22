'use client';

import { useRef, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import SplashPage from './components/SplashPage';
import CarMintCard from './components/CarMintCard';
import TitleBar from './components/TitleBar';
import PastDropsGallery from './components/PastDropsGallery';

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
      <TitleBar />
      <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center">
        <SplashPage onGetStarted={handleGetStarted} />
        <div ref={mintSectionRef} className="w-full pt-24">
          <CarMintCard />
        </div>
        <PastDropsGallery />
      </div>
    </main>
  );
}
