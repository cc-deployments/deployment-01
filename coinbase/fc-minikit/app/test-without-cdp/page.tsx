'use client';

import React from 'react';
import { NFTMintCard, NFTCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

// Test WITHOUT CDP - just OnchainKit components
function useNFTData(contractAddress: `0x${string}`, tokenId?: string) {
  return {
    title: 'Car Culture: CarMania Garage Testing 1',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
    description: 'CarMania Garage Testing 1 - ERC-1155 testing NFT',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169111792',
    
    price: {
      value: '1000000000000000000',
      currency: 'ETH',
      usdValue: '2500.00'
    },
    
    creator: {
      address: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      name: 'CarCulture',
      verified: true
    },
    
    collection: {
      name: 'CarMania Garage',
      description: 'Automotive NFT collection by CarCulture',
      imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      verified: true
    },
    
    mimeType: 'image/jpeg',
    animationUrl: undefined,
    
    attributes: [
      { trait_type: 'Brand', value: 'CarCulture' },
      { trait_type: 'Collection', value: 'CarMania Garage' },
      { trait_type: 'Status', value: 'Testing' },
      { trait_type: 'Type', value: 'ERC-1155' },
      { trait_type: 'Rarity', value: 'Common' }
    ],
    
    externalUrl: 'https://manifold.xyz/@carculture/id/4169111792',
    
    totalSupply: '1000',
    remainingSupply: '999',
    
    mintable: true,
    mintPrice: '1000000000000000000',
    
    isEligibleToMint: true
  };
}

async function buildMintTransaction() {
  return [
    {
      to: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0' as `0x${string}`,
      data: '0x' as `0x${string}`,
      value: BigInt('1000000000000000000')
    }
  ];
}

export default function TestWithoutCDP() {
  const handleStatusChange = (status: LifecycleStatus) => {
    const { statusName, statusData } = status;
    console.log('🔄 NFT Status Change:', statusName, statusData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Test WITHOUT CDP
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing OnchainKit components without CDP provider
        </p>

        {/* Test 1: NFT Card */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 1: NFT Card</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <NFTCard
              contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
              tokenId="4169111792"
              useNFTData={useNFTData}
              className="w-full"
            >
              <NFTCreator />
              <NFTMedia square={false} />
              <NFTCollectionTitle />
            </NFTCard>
          </div>
        </div>

        {/* Test 2: NFTMintCard */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 2: NFTMintCard</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <NFTMintCard
              contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
              tokenId="4169111792"
              useNFTData={useNFTData}
              buildMintTransaction={buildMintTransaction}
              onStatus={handleStatusChange}
              onError={(error) => {
                console.error('🔍 NFTMintCard Error:', error);
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

        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ✅ Test Configuration
          </h3>
          <div className="text-green-700 text-sm space-y-1">
            <p><strong>CDP Provider:</strong> DISABLED</p>
            <p><strong>OnchainKit:</strong> ENABLED</p>
            <p><strong>Purpose:</strong> Test if CDP is causing the hanging issue</p>
          </div>
        </div>
      </div>
    </div>
  );
}




