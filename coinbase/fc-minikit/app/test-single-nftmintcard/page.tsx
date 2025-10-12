'use client';

import React from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

// Test single NFTMintCard with Cloudflare public image (NOT using StableLink)
function useNFTData() {
  return {
    title: 'CarMania Share Image Test',
    imageUrl: 'https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png'
  };
}

async function buildMintTransaction() {
  // For testing, return a simple transaction structure
  return {
    to: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    data: '0x',
    value: '1000000000000000000'
  };
}

export default function TestSingleNFTMintCard() {
  const handleStatusChange = (status: LifecycleStatus) => {
    const { statusName, statusData } = status;
    console.log('🔄 Single NFT Status Change:', statusName, statusData);

    switch (statusName) {
      case 'success':
        console.log('✅ Single NFT minted successfully!', statusData);
        break;
      case 'error':
        console.error('❌ Single NFT minting failed:', statusData);
        break;
      case 'transactionPending':
        console.log('⏳ Single NFT transaction pending...', statusData);
        break;
      case 'transactionLegacyExecuted':
        console.log('🎉 Single NFT transaction executed!', statusData);
        break;
      default:
        console.log('ℹ️ Single NFT Status:', statusName, statusData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Single NFTMintCard Test
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing Cloudflare Image: https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png
        </p>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <NFTMintCard
            contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
            tokenId="4169097456"
            useNFTData={useNFTData}
            buildMintTransaction={buildMintTransaction}
            onStatus={handleStatusChange}
            className="w-full"
          >
            <NFTCreator />
            <NFTMedia square={false} />
            <NFTCollectionTitle />
            <NFTQuantitySelector />
            <NFTAssetCost />
            <NFTMintButton />
          </NFTMintCard>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🧪 Test Configuration
          </h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>Environment:</strong> Outside StableLink</p>
            <p><strong>Image URL:</strong> Cloudflare public image</p>
            <p><strong>Contract:</strong> Base ERC-721</p>
            <p><strong>Purpose:</strong> Test wallet connection and minting with public image</p>
          </div>
        </div>
      </div>
    </div>
  );
}
