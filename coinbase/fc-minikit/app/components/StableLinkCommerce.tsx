'use client';

import React, { useState, useEffect } from 'react';

interface StableLinkProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  nftMetadata: {
    contractAddress: string;
    tokenId?: string;
    network: 'base' | 'ethereum';
    standard: 'ERC-721' | 'ERC-1155';
  };
  paymentLink: string;
  status: 'active' | 'inactive' | 'sold';
}

interface StableLinkCommerceProps {
  product: StableLinkProduct;
  onPaymentComplete?: (paymentId: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

export function StableLinkCommerce({
  product,
  onPaymentComplete,
  onPaymentError,
  className
}: StableLinkCommerceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('processing');
      
      // Open payment link in new window
      const paymentWindow = window.open(product.paymentLink, '_blank', 'width=600,height=700');
      
      if (!paymentWindow) {
        throw new Error('Failed to open payment window. Please allow popups for this site.');
      }

      // Listen for payment completion (this would be handled by webhooks in production)
      const checkPaymentStatus = setInterval(async () => {
        try {
          // In production, you'd poll your backend for payment status
          // For now, we'll simulate a successful payment after 3 seconds
          if (paymentWindow.closed) {
            clearInterval(checkPaymentStatus);
            setPaymentStatus('success');
            setIsLoading(false);
            onPaymentComplete?.(product.id);
          }
        } catch (error) {
          clearInterval(checkPaymentStatus);
          setPaymentStatus('error');
          setIsLoading(false);
          onPaymentError?.(error.message);
        }
      }, 1000);

      // Cleanup after 5 minutes
      setTimeout(() => {
        clearInterval(checkPaymentStatus);
        if (isLoading) {
          setIsLoading(false);
          setPaymentStatus('idle');
        }
      }, 300000);

    } catch (error) {
      setIsLoading(false);
      setPaymentStatus('error');
      onPaymentError?.(error.message);
    }
  };

  const getNetworkIcon = (network: string) => {
    return network === 'base' ? '🔵' : '🟠';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'sold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border ${className}`}>
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
            🚗
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
          {product.status.toUpperCase()}
        </span>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Price Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            ${product.price}
          </div>
          <div className="text-sm text-gray-500">
            {product.currency} • Pay with Credit Card
          </div>
        </div>

        {/* NFT Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Network:</span>
            <span className="flex items-center gap-1">
              {getNetworkIcon(product.nftMetadata.network)}
              {product.nftMetadata.network.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Standard:</span>
            <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
              {product.nftMetadata.standard}
            </span>
          </div>
          {product.nftMetadata.tokenId && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Token ID:</span>
              <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                #{product.nftMetadata.tokenId}
              </span>
            </div>
          )}
        </div>

        {/* Payment Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>💳</span>
            <span>Credit Card, Apple Pay, Google Pay</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📱</span>
            <span>Automatic Smart Wallet Creation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>🛡️</span>
            <span>Secure Payment Processing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>⚡</span>
            <span>Instant NFT Delivery</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading || product.status !== 'active'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : paymentStatus === 'success' ? (
            '✅ Payment Successful!'
          ) : paymentStatus === 'error' ? (
            '❌ Payment Failed - Try Again'
          ) : (
            <>
              <span className="mr-2">💳</span>
              Buy with Credit Card - ${product.price}
            </>
          )}
        </button>

        {/* Status Messages */}
        {paymentStatus === 'processing' && (
          <div className="text-center text-sm text-blue-600">
            Opening secure payment window...
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="text-center text-sm text-green-600">
            🎉 Your NFT is being minted and will be delivered shortly!
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="text-center text-sm text-red-600">
            Payment failed. Please try again or contact support.
          </div>
        )}

        {/* Security Notice */}
        <div className="text-xs text-gray-500 text-center">
          Powered by StableLink • Secure payment processing • No crypto knowledge required
        </div>
      </div>
    </div>
  );
}

// Example usage component
export function StableLinkCommerceExample() {
  const exampleProduct: StableLinkProduct = {
    id: 'example-1',
    name: 'Summertime Blues NFT',
    description: 'A legendary automotive NFT from the CarMania collection, featuring classic summer vibes and car culture nostalgia.',
    price: 99.99,
    currency: 'USD',
    nftMetadata: {
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      network: 'base',
      standard: 'ERC-721'
    },
    paymentLink: 'https://stablelink.xyz/pay/example-1',
    status: 'active'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI-Powered NFT Commerce
          </h1>
          <p className="text-gray-600">
            Buy NFTs with your credit card - no crypto knowledge required!
          </p>
        </div>
        
        <StableLinkCommerce
          product={exampleProduct}
          onPaymentComplete={(paymentId) => {
            console.log('Payment completed:', paymentId);
          }}
          onPaymentError={(error) => {
            console.error('Payment error:', error);
          }}
        />
      </div>
    </div>
  );
}
