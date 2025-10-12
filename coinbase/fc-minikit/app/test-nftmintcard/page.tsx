'use client';

import { TestManifoldNFTMintCard } from '@/app/components/ManifoldNFTMintCard';

export default function TestNFTMintCardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 NFTMintCard vs Manifold Checkout Test
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Testing OnchainKit's NFTMintCard component with our existing Manifold NFT 
            to see if we can eliminate the 9-step checkout process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* NFTMintCard Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              ✅ NFTMintCard (New Approach)
            </h2>
            <TestManifoldNFTMintCard />
          </div>

          {/* Comparison Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              ❌ Current Manifold Process (9 Steps)
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                <span>Click "Buy Now" button</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                <span>Redirect to Manifold</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                <span>Connect wallet on Manifold</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                <span>Approve transaction</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">5</span>
                <span>Confirm minting</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">6</span>
                <span>Wait for confirmation</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">7</span>
                <span>Return to app</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">8</span>
                <span>Refresh wallet</span>
              </div>
              <div className="flex items-center p-2 bg-red-50 rounded">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">9</span>
                <span>Verify NFT received</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">
                🎯 Goal: Reduce to 1-2 Steps
              </h4>
              <p className="text-yellow-700 text-sm">
                NFTMintCard should handle wallet connection, approval, minting, 
                and delivery automatically within our app.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🔬 Test Instructions:
            </h3>
            <ol className="text-blue-700 text-sm space-y-2">
              <li>1. <strong>Connect your wallet</strong> using the wallet button in the top navigation</li>
              <li>2. <strong>Click the mint button</strong> on the NFTMintCard</li>
              <li>3. <strong>Compare the experience</strong> to the current 9-step Manifold process</li>
              <li>4. <strong>Check if NFT appears</strong> in your wallet automatically</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
