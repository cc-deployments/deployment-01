'use client';

import React from 'react';

interface EmbeddedWalletIntegrationProps {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  contractAddress: string;
  tokenId?: string;
  mintUrl?: string;
  imageUrl?: string;
  description?: string;
  make?: string;
  model?: string;
  year?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

// Main Export - TEMPORARILY DISABLED due to CDP onramp/offramp issues
export function EmbeddedWalletIntegration(props: EmbeddedWalletIntegrationProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
      <div className="text-yellow-600 text-2xl mb-3">⚠️</div>
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        Embedded Wallet Temporarily Disabled
      </h3>
      <p className="text-sm text-yellow-700 mb-4">
        CDP onramp/offramp functionality is currently being fixed. 
        Please use the standard payment methods for now.
      </p>
      <div className="text-xs text-yellow-600 bg-yellow-100 rounded-lg p-2">
        🔧 Open ticket: CDP onramp/offramp integration issues
      </div>
      
      {/* Show product info for reference */}
      <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-300">
        <p className="text-sm font-medium text-gray-800">{props.productName}</p>
        <p className="text-lg font-bold text-gray-900">{props.currency === 'ETH' ? `${props.price} ETH` : `$${props.price}`}</p>
        {props.mintUrl && (
          <a
            href={props.mintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            View on Manifold →
          </a>
        )}
      </div>
    </div>
  );
}

// Example usage component
export function EmbeddedWalletExample() {
  const exampleProduct = {
    productId: 'summertime-blues-1',
    productName: 'Summertime Blues NFT',
    price: 0.001,
    currency: 'ETH',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            CarMania Embedded Wallets Demo
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Web2 users can buy NFTs with email/SMS login - no crypto wallet needed!
          </p>
        </div>
        
        <EmbeddedWalletIntegration
          {...exampleProduct}
          onPaymentSuccess={(paymentId, txHash) => {
            console.log('Embedded Wallet payment completed:', { paymentId, txHash });
            alert(`Payment successful! Payment ID: ${paymentId}`);
          }}
          onPaymentError={(error) => {
            console.error('Embedded Wallet payment error:', error);
            alert(`Payment failed: ${error}`);
          }}
        />
      </div>
    </div>
  );
}