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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading Today's Car...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Social Media Style Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-6 rounded-t-lg">
          <h1 className="text-3xl font-bold">
            CarMania: {activeCar?.carName || 'Car of the Day'}
          </h1>
        </div>
        
        {/* Sticker-style content area */}
        <div className="bg-black text-white p-8 rounded-b-lg shadow-lg relative overflow-hidden">
          {/* Background pattern for sticker effect */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-2 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="bg-red-500 rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10">
            <Image
              src={activeCar?.splashImageUrl || '/Forward.png'}
              alt={activeCar?.carName || 'Car of the Day'}
              width={400}
              height={200}
              className="rounded-lg mb-4"
              priority
            />
            <h2 className="text-2xl font-bold text-white mb-4 mt-4">
              Today's Featured Ride
            </h2>
            <p className="text-gray-400 mb-6">
              Ready to mint your piece of automotive history?
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg border-4 border-white"
            style={{
              boxShadow:
                '0 10px 25px rgba(0,0,0,0.3), 0 0 0 4px #fff, 0 0 0 8px #dc2626',
            }}
          >
            🚀 MINT THE DAILY CARMANIA DROP
          </button>
          <a
            href="https://warpcast.com/~/channel/car"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg border-4 border-white flex items-center justify-center"
            style={{
              boxShadow:
                '0 10px 25px rgba(0,0,0,0.1), 0 0 0 4px #fff, 0 0 0 8px #e5e7eb',
            }}
          >
            JOIN OUR CHANNEL
          </a>
        </div>
        <button
          onClick={handleAddFrame}
          disabled={added}
          className="text-purple-400 hover:text-purple-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {added ? '✅ Added to Farcaster' : 'Add App to Farcaster'}
        </button>
      </div>

      {/* Social sharing info */}
      <div className="mt-8 text-gray-400">
        <p className="text-sm mb-2">
          Share this car with your community:
        </p>
        <div className="flex justify-center space-x-4 text-xs">
          <span>🐦 X (Twitter)</span>
          <span>🔗 Farcaster</span>
        </div>
      </div>

      {/* CarCulture branding */}
      <div className="mt-6 text-gray-500">
        <p className="text-xs">
          A CarCulture Community Project • Powered by OnchainKit • Built on Base
        </p>
      </div>
    </div>
  );
} 