'use client';

import React, { useState } from 'react';
import { StableLinkCommerce } from '../components/StableLinkCommerce';

export default function CommerceDemo() {
  const [selectedProduct, setSelectedProduct] = useState<string>('summertime');

  const products = {
    summertime: {
      id: 'summertime-1',
      name: 'Summertime Blues NFT',
      description: 'A legendary automotive NFT from the CarMania collection, featuring classic summer vibes and car culture nostalgia.',
      price: 99.99,
      currency: 'USD',
      nftMetadata: {
        contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
        network: 'base' as const,
        standard: 'ERC-721' as const
      },
      paymentLink: 'https://stablelink.xyz/pay/summertime-1',
      status: 'active' as const
    },
    premium: {
      id: 'premium-1',
      name: 'CarMania Premium NFT',
      description: 'A premium tier NFT from the CarMania collection with exclusive benefits and access.',
      price: 149.99,
      currency: 'USD',
      nftMetadata: {
        contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
        network: 'base' as const,
        standard: 'ERC-721' as const
      },
      paymentLink: 'https://stablelink.xyz/pay/premium-1',
      status: 'active' as const
    },
    vip: {
      id: 'vip-1',
      name: 'CarMania VIP NFT',
      description: 'A VIP tier NFT from the CarMania collection with exclusive benefits and access.',
      price: 299.99,
      currency: 'USD',
      nftMetadata: {
        contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
        network: 'base' as const,
        standard: 'ERC-721' as const
      },
      paymentLink: 'https://stablelink.xyz/pay/vip-1',
      status: 'active' as const
    }
  };

  const handlePaymentComplete = (paymentId: string) => {
    console.log('Payment completed:', paymentId);
    alert(`Payment completed! Payment ID: ${paymentId}`);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛒 CarMania Commerce Demo
          </h1>
          <p className="text-gray-600">
            Test the StableLink-powered NFT commerce system
          </p>
        </div>

        {/* Product Selector */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Choose a Product</h2>
            <div className="space-y-3">
              {Object.entries(products).map(([key, product]) => (
                <button
                  key={key}
                  onClick={() => setSelectedProduct(key)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedProduct === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-600">${product.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Commerce Component */}
        <StableLinkCommerce
          product={products[selectedProduct as keyof typeof products]}
          onPaymentComplete={handlePaymentComplete}
          onPaymentError={handlePaymentError}
        />

        {/* Info Section */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">How It Works</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">1.</span>
                <span>Click "Buy with Credit Card" button</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">2.</span>
                <span>Secure payment window opens</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">3.</span>
                <span>Pay with credit card, Apple Pay, or Google Pay</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">4.</span>
                <span>Smart wallet created automatically</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">5.</span>
                <span>NFT delivered to your wallet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span>💳</span>
                <span>Credit Card Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>Apple Pay & Google Pay</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span>Global Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚫</span>
                <span>No Crypto Knowledge Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


