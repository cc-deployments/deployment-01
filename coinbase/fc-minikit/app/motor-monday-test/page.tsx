'use client';

import React, { useState } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import {
  NFTCreator,
  NFTCollectionTitle,
  NFTQuantitySelector,
  NFTAssetCost,
  NFTMintButton,
} from '@coinbase/onchainkit/nft/mint';
import { base } from 'viem/chains';

export default function MotorMondayTest() {
  const [contractAddress, setContractAddress] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  // CarCulture ERC-1155 details from Manifold
  const mercedesContract = '0x1c6d27a76f4f706cccb698acc236c31f886c5421'; // CarCulture ERC-1155 contract
  const mercedesTokenId = '0'; // Start with token ID 0 (most common)

  const handleStatus = (status: string) => {
    console.log('Mint Status:', status);
  };

  const handleSuccess = (receipt: any) => {
    console.log('Mint Success:', receipt);
    alert('Mercedes NFT minted successfully! 🚗✨');
  };

  const handleError = (error: any) => {
    console.error('Mint Error:', error);
    alert(`Mint failed: ${error.message}`);
  };

  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🚗 Motor Monday Mercedes Test
            </h1>
            <p className="text-gray-600 text-lg">
              Testing OnchainKit NFTMintCard with your Mercedes ERC-1155
            </p>
          </div>

          {/* Contract Details Input */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Address
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token ID
                </label>
                <input
                  type="text"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setContractAddress(mercedesContract);
                setTokenId(mercedesTokenId);
                setIsReady(true);
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Use Mercedes Contract Details
            </button>
          </div>

          {/* NFT Mint Card */}
          {isReady && contractAddress && tokenId && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">CarCulture ERC-1155 Mint - $1.00</h2>
              <div className="max-w-md mx-auto">
                <NFTMintCard
                  contractAddress={contractAddress as `0x${string}`}
                  tokenId={tokenId}
                  onStatus={handleStatus}
                  onSuccess={handleSuccess}
                  onError={handleError}
                >
                  <NFTCreator />
                  <NFTMedia />
                  <NFTCollectionTitle />
                  <NFTQuantitySelector />
                  <NFTAssetCost />
                  <NFTMintButton />
                </NFTMintCard>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🚀 How to Test
            </h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Contract: <code>0x1c6d27a76f4f706cccb698acc236c31f886c5421</code> (CarCulture ERC-1155)</li>
          <li>Token ID: <code>0</code> (Available Edition - $1.00)</li>
          <li>Click "Use Mercedes Contract Details" to auto-fill</li>
          <li>Connect your wallet (Base network)</li>
          <li>Click the mint button to test the ERC-1155 edition flow</li>
        </ol>
          </div>

          {/* Status Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-4">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              ✅ OnchainKit Status
            </h3>
            <div className="space-y-2 text-green-800">
              <p>• OnchainKit Version: 1.1.0</p>
              <p>• Base Network: Configured</p>
              <p>• NFTMintCard: Ready for ERC-1155</p>
              <p>• Frame-sdk Issue: Resolved in source code</p>
            </div>
          </div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}
