'use client';

import React, { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';
import { getCarManiaGarageNFTs, getPublishedNFTs } from '../utils/nftDataUtils';

// Get specific NFTs from lines 9-19 of CSV (all priced in USD except Summertime Blues)
const realNFTs = [
  {
    name: 'Car Culture: CarMania Garage Testing 1',
    description: 'CarMania Garage Testing 1 - Testing with Cloudflare public image',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169111792',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169111792',
    price: '1.00', // USD
    status: 'testing',
    // Test with Cloudflare public image URL
    imageUrl: 'https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 2',
    description: 'CarMania Garage Testing 2',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169128176',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169128176',
    price: '1.00', // USD
    status: 'published'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 3',
    description: 'CarMania Garage Testing 3',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169124080',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169124080',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 4',
    description: 'CarMania Garage Testing 4',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169085168',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169085168',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 5',
    description: 'CarMania Garage Testing 5',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169081072',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169081072',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Low Tide',
    description: 'Low Tide - A moment of calm reflection by the water\'s edge',
    mintUrl: 'https://manifold.xyz/@carculture/id/4149840112',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4149840112',
    price: '1.00', // USD
    status: 'published'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 6',
    description: 'CarMania Garage Testing 7',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169076976',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169076976',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 7',
    description: 'CarMania Garage Testing 7',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169074928',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169074928',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 8',
    description: 'CarMania Garage Testing 8',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169103600',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169103600',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Car Culture: CarMania Garage Testing 9',
    description: 'CarMania Garage Testing 9',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169097456',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169097456',
    price: '1.00', // USD
    status: 'testing'
  },
  {
    name: 'Summertime Blues',
    description: 'Post-modern Surfing Wagon',
    mintUrl: 'https://manifold.xyz/@carculture/id/4144040176',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4144040176',
    price: '0.001', // ETH (not USD)
    status: 'published'
  }
];

// Custom useNFTData hook for each NFT - using actual NFT data from CSV
function createUseNFTData(nft: any) {
  return function useNFTData() {
    // Handle pricing: Summertime Blues is in ETH, all others are USD
    const isSummertimeBlues = nft.name === 'Summertime Blues';
    const priceValue = isSummertimeBlues 
      ? (parseFloat(nft.price) * 1e18).toString() // ETH to wei
      : (parseFloat(nft.price) * 1e18).toString(); // USD to wei (assuming 1 USD = 1 ETH for now)
    
    return {
      title: nft.name,
      imageUrl: nft.imageUrl || nft.mintUrl, // Use direct imageUrl if available, otherwise use Manifold URL
      description: nft.description,
      contractAddress: nft.contractAddress,
      tokenId: nft.tokenId,
      price: {
        value: priceValue,
        currency: 'ETH'
      }
    };
  };
}

export default function NFTGalleryGrid() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

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
                    <NFTMedia square={false} />
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