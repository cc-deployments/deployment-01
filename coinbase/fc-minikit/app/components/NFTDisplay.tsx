'use client';

import React, { useState, useEffect } from 'react';

interface NFTDisplayProps {
  walletAddress: string;
}

interface NFT {
  tokenId: string;
  contractAddress: string;
  name: string;
  image: string;
  description: string;
}

export default function NFTDisplay({ walletAddress }: NFTDisplayProps) {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a simplified version - in production you'd use a proper NFT API
      // like Alchemy, Moralis, or OpenSea API
      console.log('Fetching NFTs for wallet:', walletAddress);
      
      // For now, we'll show a message about the verification tool
      setNfts([]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchNFTs();
    }
  }, [walletAddress]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Your NFTs</h3>
      
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading NFTs...</p>
        </div>
      )}
      
      {error && (
        <div className="text-red-600 bg-red-50 p-4 rounded-md">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      {!isLoading && !error && nfts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            No NFTs found or wallet not connected.
          </p>
          <p className="text-sm text-gray-500">
            Use the <a href="/nft-verification" className="text-blue-600 hover:underline">NFT Verification Tool</a> to check specific NFT ownership.
          </p>
        </div>
      )}
      
      {nfts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <div key={`${nft.contractAddress}-${nft.tokenId}`} className="border rounded-lg p-4">
              <img 
                src={nft.image} 
                alt={nft.name}
                className="w-full h-48 object-cover rounded-md mb-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/hero-v2.png';
                }}
              />
              <h4 className="font-semibold text-gray-900">{nft.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{nft.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Token ID: {nft.tokenId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

