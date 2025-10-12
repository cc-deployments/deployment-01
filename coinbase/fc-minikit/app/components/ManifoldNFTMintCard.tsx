'use client';

import { NFTMintCardDefault } from '@coinbase/onchainkit/nft';
import { useState } from 'react';

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

      <NFTMintCardDefault
        contractAddress={contractAddress}
        tokenId={tokenId}
        onStatus={handleMintStatus}
      />

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
        contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
        tokenId="4169111792"
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
