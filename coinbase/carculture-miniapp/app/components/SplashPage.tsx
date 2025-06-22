'use client';

import Image from 'next/image';

interface SplashPageProps {
  onGetStarted: () => void;
}

export default function SplashPage({ onGetStarted }: SplashPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Social Media Style Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-6 rounded-t-lg">
          <h1 className="text-3xl font-bold">
            🚗 CARMANIA Car of the Day 🚗
          </h1>
        </div>
        
        {/* Sticker-style content area */}
        <div className="bg-white text-black p-8 rounded-b-lg shadow-lg relative overflow-hidden">
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
            <div className="text-6xl mb-4">🏎️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Today's Featured Ride
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to mint your piece of automotive history?
            </p>
            
            {/* Sticker-style features */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold transform rotate-2">
                ⚡ INSTANT MINT
              </div>
              <div className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-1">
                💎 COLLECTIBLE
              </div>
              <div className="bg-green-400 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-1">
                🎯 DAILY DROP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button with sticker effect */}
      <button
        onClick={onGetStarted}
        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg border-4 border-white"
        style={{
          boxShadow: '0 10px 25px rgba(0,0,0,0.3), 0 0 0 4px #fff, 0 0 0 8px #dc2626'
        }}
      >
        🚀 MINT NOW - CARMANIA NFT
      </button>

      {/* Social sharing info */}
      <div className="mt-8 text-gray-400">
        <p className="text-sm mb-2">
          Share this car with your community:
        </p>
        <div className="flex justify-center space-x-4 text-xs">
          <span>📱 Instagram</span>
          <span>📘 Facebook</span>
          <span>🐦 X (Twitter)</span>
          <span>🔗 Farcaster</span>
        </div>
      </div>

      {/* CarCulture branding */}
      <div className="mt-6 text-gray-500">
        <p className="text-xs">
          Powered by OnchainKit • Built on Base • CarCulture Community
        </p>
      </div>
    </div>
  );
} 