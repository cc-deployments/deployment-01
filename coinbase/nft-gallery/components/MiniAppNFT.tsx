"use client";

import React from 'react';
import { useState } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Checkout, CheckoutButton, type LifecycleStatus } from '@coinbase/onchainkit/checkout';
import { NFTCheckoutMetadata, CheckoutPricing } from '../utils/commerce';

interface MiniAppNFTProps {
  tokenId: string;
  contractAddress: string;
  network: 'ethereum' | 'base';
  contractType: 'erc721' | 'erc1155';
  price: string;
  currency: 'USD' | 'ETH' | 'USDC';
  title: string;
  description: string;
  imageUrl: string;
  year?: string;
  brand?: string;
  rarity?: 'common' | 'rare' | 'legendary';
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  legendary: 'bg-purple-500'
};

export function MiniAppNFT({
  tokenId,
  contractAddress,
  network,
  contractType,
  price,
  currency,
  title,
  description,
  imageUrl,
  year,
  brand,
  rarity
}: MiniAppNFTProps) {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const targetChainId = network === 'base' ? 8453 : 1;

  const handleStatusChange = (status: LifecycleStatus) => {
    console.log('Checkout status:', status);
    if (status.statusName === 'success') {
      setLoading(false);
    }
  };

  const chargeHandler = async () => {
    if (chainId !== targetChainId) {
      await switchChain?.({ chainId: targetChainId });
      return;
    }

    const metadata: NFTCheckoutMetadata = {
      tokenId,
      contractAddress,
      network,
      contractType,
      includesPrint: false
    };

    const pricing: CheckoutPricing = {
      amount: price,
      currency
    };

    const response = await fetch('/api/create-charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        description,
        pricing,
        metadata,
        customerInfo: {
          walletAddress: address
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create charge');
    }

    return data;
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-64 object-cover"
        />
        {rarity && (
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${rarityColors[rarity]}`}>
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">{price} {currency}</span>
            <span className="text-sm text-gray-500">on {network}</span>
          </div>
        </div>

        {brand && year && (
          <div className="flex gap-4 mb-3 text-sm text-gray-600">
            <span>{brand}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
        )}
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        {!address ? (
          <ConnectWallet />
        ) : (
          <div className="w-full">
            <Checkout
              onStatus={handleStatusChange}
              chargeHandler={chargeHandler}
            >
              <CheckoutButton
                text="Mint NFT"
                disabled={loading || chainId !== targetChainId}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              />
            </Checkout>

            {chainId !== targetChainId && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please switch to {network === 'base' ? 'Base' : 'Ethereum'} network
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 