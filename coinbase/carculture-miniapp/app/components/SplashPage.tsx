'use client';

import Image from 'next/image';
import { useAddFrame } from '@coinbase/onchainkit/minikit';
import { useState, useEffect } from 'react';

// Define the CarNFT type here to ensure consistency
interface CarNFT {
  id: string;
  contractAddress: string;
  carName: string;
  date: string;
  splashImageUrl?: string;
  mintImageUrl?: string;
  description?: string;
  isActive: boolean;
}

interface SplashPageProps {
  onGetStarted: () => void;
}

export default function SplashPage({ onGetStarted }: SplashPageProps) {
  const addFrame = useAddFrame();
  const [added, setAdded] = useState(false);
  const [activeCar, setActiveCar] = useState<CarNFT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCars = localStorage.getItem('carNFTs');
      if (savedCars) {
        const cars: CarNFT[] = JSON.parse(savedCars);
        const active = cars.find(car => car.isActive);
        setActiveCar(active || null);
      }
    } catch (e) {
      console.error("Failed to load or parse car data from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddFrame = async () => {
    const result = await addFrame();
    if (result) {
      console.log('Frame added:', result.url, result.token);
      setAdded(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="text-gray-400 mt-4 text-lg">Loading Today's Car...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Enhanced Social Media Style Header */}
      <div className="mb-8 w-full max-w-2xl">
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-4 px-6 rounded-t-xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            CarMania: {activeCar?.carName || 'Car of the Day'}
          </h1>
        </div>
        
        {/* Enhanced Sticker-style content area */}
        <div className="bg-gradient-to-b from-gray-900 to-black text-white p-6 md:p-8 rounded-b-xl shadow-2xl relative overflow-hidden border border-gray-700">
          {/* Main content */}
          <div className="relative z-10">
            <div className="relative mb-6">
              <Image
                src={activeCar?.splashImageUrl || '/forward.png'}
                alt={activeCar?.carName || 'Car of the Day'}
                width={400}
                height={200}
                className="rounded-lg shadow-lg mx-auto"
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
              {/* Overlay badge */}
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                LIVE
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Today's Featured Ride
            </h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
              Ready to mint your piece of automotive history?
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Buttons */}
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <button
          onClick={onGetStarted}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-6 md:px-8 rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-white hover:border-red-300"
          style={{
            boxShadow:
              '0 10px 25px rgba(220, 38, 38, 0.3), 0 0 0 2px #fff, 0 0 0 4px #dc2626',
          }}
        >
          🚀 MINT THE DAILY CARMANIA DROP
        </button>
        <button
          onClick={handleAddFrame}
          disabled={added}
          className="text-purple-400 hover:text-purple-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {added ? '✅ Added to Farcaster' : '📱 Add App to Farcaster'}
        </button>
      </div>
    </div>
  );
} 