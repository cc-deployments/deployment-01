'use client';

import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import { useState } from 'react';
import { encodeFunctionData, parseAbi } from 'viem';

// Custom mint transaction builder for your sovereign contract
async function buildMintTransaction(contractAddress: string, tokenId?: string) {
  console.log('🔧 Building custom mint transaction for:', contractAddress);
  
  // This is a placeholder - you'll need to replace with your actual contract's mint function
  // Common patterns:
  // - mint() - simple mint to msg.sender
  // - mint(address to) - mint to specific address  
  // - mint(uint256 tokenId) - mint specific token
  // - mint(address to, uint256 tokenId) - mint specific token to address
  
  try {
    // Example: Assuming your contract has a simple mint() function
    const mintAbi = parseAbi([
      'function mint() external payable',
      'function mint(address to) external payable',
      'function mint(uint256 tokenId) external payable',
      'function mint(address to, uint256 tokenId) external payable'
    ]);
    
    // Try different mint function signatures
    let data;
    try {
      // Try mint() - most common
      data = encodeFunctionData({
        abi: mintAbi,
        functionName: 'mint'
      });
    } catch {
      try {
        // Try mint(address to) with connected wallet
        data = encodeFunctionData({
          abi: mintAbi,
          functionName: 'mint',
          args: ['0x048a...'] // This should be the connected wallet address
        });
      } catch {
        // Fallback to mint(uint256 tokenId)
        data = encodeFunctionData({
          abi: mintAbi,
          functionName: 'mint',
          args: [tokenId || '1']
        });
      }
    }
    
    return {
      to: contractAddress as `0x${string}`,
      data,
      value: '0x0' // Adjust if your contract requires ETH payment
    };
  } catch (error) {
    console.error('❌ Error building mint transaction:', error);
    throw new Error('Failed to build mint transaction');
  }
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
        contractAddress={contractAddress}
        tokenId={tokenId}
        onStatus={handleMintStatus}
        buildMintTransaction={buildMintTransaction}
      >
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="mb-4">
            <NFTMedia square={false} />
            <h3 className="text-lg font-semibold mb-2">🌊 Low Tide NFT</h3>
            <p className="text-gray-600 mb-2">
              A serene moment captured - Perfect for testing streamlined checkout
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
