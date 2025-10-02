'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { WalletModal } from './WalletModal';

interface FundCardIntegrationProps {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  contractAddress: string;
  tokenId?: string;
  imageUrl?: string;
  description?: string;
  make?: string;
  model?: string;
  year?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

export function FundCardIntegration({
  productId,
  productName,
  price,
  currency,
  contractAddress,
  tokenId,
  imageUrl,
  description,
  make,
  model,
  year,
  onPaymentSuccess,
  onPaymentError,
  className = ''
}: FundCardIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');
  
  // Use wagmi hook
  const { address, isConnected: wagmiConnected } = useAccount();

  useEffect(() => {
    if (wagmiConnected && address) {
      setIsConnected(true);
      setUserAddress(address);
    } else {
      setIsConnected(false);
      setUserAddress('');
    }
  }, [wagmiConnected, address]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect Base Account:', error);
      onPaymentError?.(error.message);
    }
  };

  const handlePaymentSuccess = (result: any) => {
    console.log('FundCard payment success:', result);
    onPaymentSuccess?.(result.paymentId, result.transactionHash);
  };

  const handlePaymentError = (error: any) => {
    console.error('FundCard payment error:', error);
    onPaymentError?.(error.message || 'Payment failed');
  };

  if (!isConnected || !userAddress) {
    return (
      <div className={`fund-card-integration ${className}`}>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Connect Wallet
            </h3>
            <p className="text-gray-600 mb-4">
              Connect your wallet to purchase this NFT
            </p>
            <div className="flex justify-center">
              <WalletModal className="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fund-card-integration ${className}`}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Product Info Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{productName}</h3>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
              {(make || model || year) && (
                <p className="text-xs text-gray-500">
                  {[make, model, year].filter(Boolean).join(' ')}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</div>
              <div className="text-sm text-gray-500">USD</div>
            </div>
          </div>
        </div>

        {/* FundCard Integration */}
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-900 mb-2">
              Purchase with USD
            </h4>
            <p className="text-sm text-gray-600">
              Buy ETH on Base network using your preferred payment method
            </p>
          </div>

          {/* FundCard component removed - using Base Pay instead */}
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-600">FundCard integration disabled - using Base Pay instead</p>
          </div>
        </div>

        {/* Payment Features */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>💳</span>
              <span>Credit Card, Apple Pay</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔵</span>
              <span>Base Network</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundCardIntegration;
