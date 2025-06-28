import React from 'react';
import Image from 'next/image';

export default function CarManiaMintCard() {
  return (
    <div className="bg-black rounded-xl p-8 border border-gray-700 shadow-2xl">
      <div className="text-center">
        {/* CarMania Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/carmania-logo.png"
            alt="CarMania Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">
          CarMania NFT Mint
        </h3>
        <p className="text-gray-300 mb-6">
          Mint today's exclusive CarMania NFT
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Mint Now
        </button>
      </div>
    </div>
  );
} 