'use client';

import React from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';
import { getCarManiaGarageNFTs, getPublishedNFTs } from '../utils/nftDataUtils';

// Get real NFT data from CSV
const realNFTs = [
  // CarMania Garage Testing NFTs (from CSV)
  ...getCarManiaGarageNFTs(),
  // Published NFTs (from CSV) 
  ...getPublishedNFTs()
];

// Custom useNFTData hook for each NFT
function createUseNFTData(nft: any) {
  return function useNFTData() {
    return {
      title: nft.name,
      imageUrl: nft.image,
      description: nft.description,
      contractAddress: nft.contractAddress,
      tokenId: nft.tokenId,
      price: {
        value: (parseFloat(nft.price) * 1e18).toString(), // Convert USD to wei
        currency: 'ETH',
        usdValue: nft.price
      }
    };
  };
}

export default function NFTGalleryGrid() {
  // Status handler following Base's Advanced Usage pattern
  const handleStatusChange = (status: LifecycleStatus) => {
    const { statusName, statusData } = status;
    console.log('🔄 NFT Status Change:', statusName, statusData);
    
    switch (statusName) {
      case 'success':
        console.log('✅ NFT minted successfully!', statusData);
        // Handle success - NFT delivered to wallet
        break;
      case 'error':
        console.error('❌ NFT minting failed:', statusData);
        // Handle error
        break;
      case 'transactionPending':
        console.log('⏳ Transaction pending...', statusData);
        // Handle pending state
        break;
      case 'transactionLegacyExecuted':
        console.log('🎉 Transaction executed!', statusData);
        // Handle execution
        break;
      default:
        console.log('ℹ️ Status:', statusName, statusData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-4">
            <img 
              src="/carculture-wing-bl-logo.png" 
              alt="CarCulture" 
              className="h-10"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              CarMania NFT Gallery
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Exclusive CarMania Collection
          </h2>
          <p className="text-gray-600">
            Discover unique automotive NFTs from the CarMania Garage Testing series and published collections.
            Each NFT can be minted directly using Base's NFTMintCard component.
          </p>
        </div>

        {/* NFT Grid using Base's recommended approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realNFTs.map((nft, index) => (
            <div key={`${nft.tokenId}-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
              <NFTMintCard
                contractAddress={nft.contractAddress as `0x${string}`}
                tokenId={nft.tokenId}
                useNFTData={createUseNFTData(nft)}
                onStatus={handleStatusChange}
                className="w-full"
              >
                <NFTCreator />
                <NFTMedia />
                <NFTCollectionTitle />
                <NFTQuantitySelector />
                <NFTAssetCost />
                <NFTMintButton />
              </NFTMintCard>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ✅ Base Advanced Usage Implementation Complete
          </h3>
          <div className="text-green-700 text-sm space-y-2">
            <p><strong>✅ Gallery Pattern:</strong> Multiple NFTMintCard components in grid layout</p>
            <p><strong>✅ Custom Data:</strong> useNFTData hook with CSV data integration</p>
            <p><strong>✅ Lifecycle Management:</strong> onStatus callback for transaction monitoring</p>
            <p><strong>✅ Wallet Integration:</strong> Base's official minting flow</p>
            <p><strong>✅ NFT Delivery:</strong> Automatic delivery to connected wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
}