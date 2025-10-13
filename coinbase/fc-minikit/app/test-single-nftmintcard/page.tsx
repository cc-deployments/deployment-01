'use client';

import React from 'react';
import { NFTMintCard, NFTCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

// Test with pre-minted NFT (Token 20) from Manifold contract
function useNFTData() {
  return {
    title: 'Pre-Minted NFT Token 20',
    imageUrl: 'https://manifold.xyz/@carculture/id/20', // Manifold page URL for token 20
    description: 'Testing pre-minted NFT from Manifold contract - Token 20 (Owned by user)',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', // Manifold Edition contract
    tokenId: '20', // Pre-minted token owned by user
    price: {
      value: '1000000000000000000', // 1 ETH in wei
      currency: 'ETH'
    }
  };
}

async function buildMintTransaction() {
  // Real Manifold ERC-1155 Edition mint transaction
  return [
    {
      to: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0' as `0x${string}`, // Manifold Edition contract
      data: '0x' as `0x${string}`, // Will be populated by OnchainKit
      value: BigInt('1000000000000000000') // 1 ETH
    }
  ];
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
          NFT Card vs NFTMintCard Test
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing NFT Card vs NFTMintCard with Pre-Minted Token 20 (Owned by User)
        </p>
        
        {/* Test 1: NFT Card for Pre-Minted NFT */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 1: NFT Card (Pre-Minted)</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <NFTCard
              contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
              tokenId="20"
              useNFTData={useNFTData}
              className="w-full"
            >
              <NFTCreator />
              <NFTMedia square={false} />
              <NFTCollectionTitle />
            </NFTCard>
          </div>
        </div>

        {/* Test 2: NFTMintCard for Minting */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 2: NFTMintCard (Minting)</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <NFTMintCard
              contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
              tokenId="20"
              useNFTData={useNFTData}
              buildMintTransaction={buildMintTransaction}
              onStatus={handleStatusChange}
              onError={(error) => {
                console.error('🔍 Detailed NFTMintCard Error:', error);
              }}
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
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🧪 Test Configuration
          </h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>Environment:</strong> Outside StableLink</p>
            <p><strong>Image URL:</strong> Manifold page URL</p>
            <p><strong>Contract:</strong> Manifold ERC-1155 Edition</p>
            <p><strong>Purpose:</strong> Test wallet connection and minting with real Manifold contract</p>
          </div>
        </div>
      </div>
    </div>
  );
}
