'use client';

import React from 'react';
import { NFTMintCard, NFTCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCreator, NFTCollectionTitle, NFTQuantitySelector, NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import { ConnectWallet, Wallet, WalletDropdown } from '@coinbase/onchainkit/wallet';
// AutoConnect not available in current OnchainKit version
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

// Test with Car Culture: CarMania Garage Testing 1 (ERC-1155) from CarCulture collection
// Updated with complete Base OnchainKit NFTData properties from Discord ticket 681
function useNFTData(contractAddress: `0x${string}`, tokenId?: string) {
  return {
    // Required properties
    title: 'Car Culture: CarMania Garage Testing 1',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
    description: 'CarMania Garage Testing 1 - ERC-1155 testing NFT',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169111792',
    
    // Pricing information
    price: {
      value: '1000000000000000000', // 1 ETH in wei
      currency: 'ETH',
      usdValue: '2500.00'
    },
    
    // Creator information
    creator: {
      address: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      name: 'CarCulture',
      verified: true
    },
    
    // Collection information
    collection: {
      name: 'CarMania Garage',
      description: 'Automotive NFT collection by CarCulture',
      imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      verified: true
    },
    
    // Media properties
    mimeType: 'image/jpeg',
    animationUrl: undefined,
    
    // Metadata
    attributes: [
      { trait_type: 'Brand', value: 'CarCulture' },
      { trait_type: 'Collection', value: 'CarMania Garage' },
      { trait_type: 'Status', value: 'Testing' },
      { trait_type: 'Type', value: 'ERC-1155' },
      { trait_type: 'Rarity', value: 'Common' }
    ],
    
    // External links
    externalUrl: 'https://manifold.xyz/@carculture/id/4169111792',
    
    // Supply information
    totalSupply: '1000',
    remainingSupply: '999',
    
    // Minting properties - CRITICAL for NFTMintCard
    mintable: true,
    mintPrice: '1000000000000000000', // 1 ETH in wei
    isEligibleToMint: true,
    
    // Additional properties that might be needed
    status: 'active',
    mintStatus: 'active'
  };
}

async function buildMintTransaction() {
  // Proper Manifold ERC-1155 Edition mint transaction
  // Using the purchase function for Manifold Edition contracts
  const contractAddress = '0x8ef0772347e0caed0119937175d7ef9636ae1aa0';
  const tokenId = '4169111792';
  const quantity = 1;
  const price = BigInt('1000000000000000000'); // 1 ETH in wei
  
  // Manifold Edition purchase function signature: purchase(uint256,uint256)
  // Function selector: 0xefef39a1
  const functionSelector = '0xefef39a1';
  
  // Encode the parameters: tokenId (uint256) and quantity (uint256)
  const tokenIdPadded = tokenId.padStart(64, '0');
  const quantityPadded = quantity.toString(16).padStart(64, '0');
  
  const data = `${functionSelector}${tokenIdPadded}${quantityPadded}` as `0x${string}`;
  
  return [
    {
      to: contractAddress as `0x${string}`,
      data: data,
      value: price
    }
  ];
}

export default function TestSingleNFTMintCard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

  // Debug wallet connection state
  React.useEffect(() => {
    console.log('🔍 Debug: Component mounted, checking wallet state...');
    console.log('🔍 Debug: OnchainKitProvider should be wrapping this component');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          NFT Card vs NFTMintCard Test (NO CDP)
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing NFT Card vs NFTMintCard with CarMania Garage Testing 1 (ERC-1155)
        </p>

        {/* Test 1: NFT Card for Pre-Minted NFT */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 1: NFT Card (Pre-Minted)</h2>
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

        {/* Test 2: NFTMintCard for Minting */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 2: NFTMintCard (Minting)</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <NFTMintCard
                contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
                tokenId="4169111792"
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

        {/* Test 3: Direct ConnectWallet Button */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 3: Direct ConnectWallet Button</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Wallet>
              <ConnectWallet>
                <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Connect Wallet (Direct Test)
                </div>
              </ConnectWallet>
              <WalletDropdown>
                <div className="p-4">
                  <p className="text-gray-600">Wallet connected!</p>
                </div>
              </WalletDropdown>
            </Wallet>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🧪 Test Configuration
          </h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>Environment:</strong> NO CDP Authentication</p>
            <p><strong>Image URL:</strong> Reliable Unsplash image for testing</p>
            <p><strong>Contract:</strong> Manifold ERC-1155 Edition</p>
            <p><strong>NFT:</strong> CarMania Garage Testing 1 (ERC-1155)</p>
            <p><strong>Purpose:</strong> Test NFTMintCard with proper wallet connection flow</p>
            <p><strong>Debug:</strong> Added direct ConnectWallet button to isolate issue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
