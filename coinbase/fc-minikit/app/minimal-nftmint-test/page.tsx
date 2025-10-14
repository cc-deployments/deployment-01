import React from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { ConnectWallet, Wallet, WalletDropdown } from '@coinbase/onchainkit/wallet';
// AutoConnect not available in current OnchainKit version
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

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
    isEligibleToMint: true,
    status: 'active',
    mintStatus: 'active'
  };
}

async function buildMintTransaction() {
  // Proper Manifold ERC-1155 Edition mint transaction
  const contractAddress = '0x8ef0772347e0caed0119937175d7ef9636ae1aa0';
  const tokenId = '4169111792';
  const quantity = 1;
  const price = BigInt('1000000000000000000'); // 1 ETH in wei
  
  // Manifold Edition purchase function signature: purchase(uint256,uint256)
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

export default function MinimalNFTMintTest() {
  const handleStatusChange = (status: LifecycleStatus) => {
    console.log('🔄 NFT Status Change:', status);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Minimal NFTMintCard Test (NO CDP)
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing NFTMintCard without CDP authentication
        </p>

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
              />
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🧪 Test Configuration
          </h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>Environment:</strong> NO CDP Authentication</p>
            <p><strong>Purpose:</strong> Test NFTMintCard without CDP provider</p>
            <p><strong>Expected:</strong> Should show Connect Wallet button</p>
          </div>
        </div>
      </div>
    </div>
  );
}