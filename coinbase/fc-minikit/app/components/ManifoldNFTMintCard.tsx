'use client';

import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import { useState } from 'react';

// Custom NFT data hook to provide metadata directly
function useNFTData() {
  return {
    title: 'Car Culture: CarMania Garage - Test 9',
    imageUrl: '/preview-images/test_9_preview.png', // Actual NFT preview image
    description: 'Pink Car Art - Test NFT for StableLink',
    contractAddress: '0x1c6d27a76f4f706cccb698acc236c31f886c5421',
    tokenId: '4169097456',
    price: '1.00',
    currency: 'USD'
  };
}


interface NFTMintCardProps {
  contractAddress: string;
  tokenId?: string;
  className?: string;
}

export function NFTMintCardComponent({ 
  contractAddress, 
  tokenId, 
  className = '' 
}: NFTMintCardProps) {
  const [mintStatus, setMintStatus] = useState<string>('ready');

  const handleMintStatus = (status: any) => {
    console.log('🎯 NFTMintCard Status:', status);
    setMintStatus(status.statusName || 'unknown');
  };

  return (
    <div className={`manifold-nft-mint-card ${className}`}>
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🚀 Streamlined NFT Checkout
        </h3>
        <p className="text-blue-700 text-sm">
          Direct minting with NFTMintCard - No more 9-step Manifold process!
        </p>
        <div className="mt-2 text-xs text-blue-600">
          Status: <span className="font-mono">{mintStatus}</span>
        </div>
      </div>

             <NFTMintCard
               contractAddress={contractAddress as `0x${string}`}
               tokenId={tokenId}
               onStatus={handleMintStatus}
             >
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="mb-4">
            <img 
              src="/preview-images/test_9_preview.png" 
              alt="Test 9 NFT" 
              className="w-full h-64 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mb-2">🚗 Car Culture: CarMania Garage - Test 9</h3>
            <p className="text-gray-600 mb-2">
              Pink Car Art - Test NFT for StableLink - $1.00 USD ERC-1155 mint
            </p>
            <div className="text-sm text-gray-500 mb-4">
              Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
              {tokenId && <><br/>Token ID: {tokenId}</>}
            </div>
          </div>
          <NFTMintButton 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            🎯 Mint This NFT
          </NFTMintButton>
        </div>
      </NFTMintCard>

      <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
        <strong>Contract:</strong> {contractAddress}<br/>
        {tokenId && <><strong>Token ID:</strong> {tokenId}<br/></>}
        <strong>Network:</strong> Base
      </div>
    </div>
  );
}

// Test component with our existing NFT
export function TestNFTMintCard() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Test NFTMintCard Integration
      </h2>

      <NFTMintCardComponent
        contractAddress="0x1c6d27a76f4f706cccb698acc236c31f886c5421"
        tokenId="4169097456"
      />

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2">
          ✅ Expected Benefits:
        </h4>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• No redirect to Manifold</li>
          <li>• Direct minting in-app</li>
          <li>• Automatic wallet integration</li>
          <li>• 1-click checkout process</li>
          <li>• Built-in transaction handling</li>
          <li>• Beautiful Low Tide artwork</li>
        </ul>
      </div>
    </div>
  );
}
