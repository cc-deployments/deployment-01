'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCarManiaGarageNFTs, getPublishedNFTs, type NFTData } from '../utils/nftDataUtils';

// Get real NFT data from CSV
const realNFTs = [
  // CarMania Garage Testing NFTs (from CSV)
  ...getCarManiaGarageNFTs(),
  // Published NFTs (from CSV) 
  ...getPublishedNFTs()
].map((nft, index) => ({
  ...nft,
  id: `${nft.tokenId}-${index}`, // Ensure unique IDs by combining tokenId with index
}));

// Use real data instead of mock data
const mockNFTs = realNFTs;

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500', 
  legendary: 'bg-purple-500'
};

interface NFTGridCardProps {
  nft: typeof mockNFTs[0];
  onPurchase: (nft: typeof mockNFTs[0]) => void;
  onViewDetails: (nft: typeof mockNFTs[0]) => void;
}

function NFTGridCard({ nft, onPurchase, onViewDetails }: NFTGridCardProps) {
  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onPurchase(nft);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onViewDetails(nft)}
    >
      <div className="relative">
        <Image
          src={nft.image}
          alt={nft.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-semibold ${rarityColors[nft.rarity]}`}>
          {nft.rarity.toUpperCase()}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{nft.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{nft.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{nft.brand}</span> • {nft.year}
          </div>
          <div className="text-sm text-gray-500">
            {nft.platformName}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            ${nft.price} {nft.currency}
          </div>
          <button
            onClick={handlePurchaseClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NFTGalleryGrid() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async (nft: typeof mockNFTs[0]) => {
    setIsLoading(true);
    
    try {
      // Check if wallet is available
      if (!window.ethereum) {
        alert('Please install a compatible wallet (Coinbase Wallet, MetaMask, etc.) to purchase NFTs.');
        setIsLoading(false);
        return;
      }

      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (!accounts || accounts.length === 0) {
        alert('Please connect your wallet to purchase NFTs.');
        setIsLoading(false);
        return;
      }

      const buyerAddress = accounts[0];
      console.log('🚀 Starting streamlined NFT purchase for:', nft.name);
      console.log('👤 Buyer address:', buyerAddress);
      console.log('🎯 Contract:', nft.contractAddress);
      console.log('🆔 Token ID:', nft.tokenId);

      // Check if wallet supports EIP5792
      const capabilities = await window.ethereum.request({
        method: 'wallet_getCapabilities'
      });
      
      const isEIP5792Supported = capabilities && Object.keys(capabilities).includes('wallet_sendCalls');
      
      if (isEIP5792Supported) {
        console.log('✅ EIP5792 supported - Using streamlined batch transaction');
        
        // Import the batch transaction function
        const { createNFTPurchaseBatchCalls } = await import('../components/EIP5792BatchTransaction.jsx');
        
        // Create batch calls for NFT purchase
        const batchCalls = createNFTPurchaseBatchCalls(
          nft.contractAddress,
          nft.tokenId,
          (parseFloat(nft.price) * 1e18).toString(), // Convert USD to wei
          buyerAddress
        );

        // Execute batch transaction with paymaster
        const result = await window.ethereum.request({
          method: 'wallet_sendCalls',
          params: [{
            version: '1.0',
            chainId: '0x2105', // Base mainnet
            calls: batchCalls,
            capabilities: {
              paymasterService: {
                url: 'https://paymaster.base.org' // FREE GAS! 🎉
              }
            }
          }]
        });

        console.log('🎉 NFT purchase transaction submitted:', result);
        alert(`🎉 NFT purchase successful! Transaction ID: ${result.sessionId || 'N/A'}\n\nYour NFT will be minted directly to your wallet with sponsored gas fees!`);
        
      } else {
        console.log('⚠️ EIP5792 not supported - Using traditional transaction');
        
        // Fallback to traditional transaction
        const transaction = {
          to: nft.contractAddress,
          from: buyerAddress,
          value: (parseFloat(nft.price) * 1e18).toString(16), // Convert to hex
          data: '0x' // Simplified - would need proper ABI encoding
        };

        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transaction]
        });

        console.log('📝 Traditional transaction submitted:', txHash);
        alert(`📝 NFT purchase transaction submitted!\n\nTransaction Hash: ${txHash}\n\nYour NFT will be minted once the transaction is confirmed.`);
      }
      
    } catch (error) {
      console.error('❌ NFT purchase failed:', error);
      alert(`❌ NFT purchase failed: ${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (nft: typeof mockNFTs[0]) => {
    // Navigate to single-card view with NFT ID as parameter
    router.push(`/nft-gallery-demo?nft=${nft.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <img 
              src="/carculture-wing-bl-logo.png" 
              alt="CarCulture" 
              style={{ height: '40px' }}
            />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
              CarMania NFT Gallery
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Exclusive CarMania Collection
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Discover unique automotive NFTs from the CarMania Garage Testing series and published collections.
          </p>
        </div>

        {/* NFT Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {mockNFTs.map((nft) => (
            <NFTGridCard
              key={nft.id}
              nft={nft}
              onPurchase={handlePurchase}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Processing Purchase...
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Please wait while we process your NFT purchase.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}