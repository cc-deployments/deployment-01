import React from 'react';

export default function CarManiaMintCard() {
  return (
    <div className="bg-black rounded-xl p-8 border border-gray-700 shadow-2xl max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          CarMania Mint
        </h3>
        <p className="text-gray-400 mb-6 text-lg">
          Mint the latest CarMania NFT on Manifold
        </p>
        <a
          href="https://app.manifold.xyz/c/man-driving-car"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-100 transition-colors"
        >
          Mint on Manifold
        </a>
      </div>
    </div>
  );
} 