'use client';

import React from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

// Test single NFTMintCard with real Manifold ERC-1155 Edition contract
function useNFTData() {
  return {
    title: 'Car Culture: CarMania Garage Testing 7',
    imageUrl: 'https://manifold.xyz/@carculture/id/4169074928', // Manifold page URL
    description: 'CarMania Garage Testing 7 - Real Manifold ERC-1155 Edition',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', // Manifold Edition contract
    tokenId: '4169074928',
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
          Single NFTMintCard Test
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing Real Manifold ERC-1155 Edition: https://manifold.xyz/@carculture/id/4169074928
        </p>
        
               <div className="bg-white rounded-lg shadow-md overflow-hidden">
                 <NFTMintCard
                   contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
                   tokenId="4169074928"
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
                   <p><strong>Image URL:</strong> Manifold page URL</p>
                   <p><strong>Contract:</strong> Manifold ERC-1155 Edition</p>
                   <p><strong>Purpose:</strong> Test wallet connection and minting with real Manifold contract</p>
                 </div>
        </div>
      </div>
    </div>
  );
}
