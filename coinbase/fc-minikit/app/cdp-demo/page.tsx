'use client';

import React, { useState } from 'react';
import { CDPOnRampIntegration } from '../components/CDPOnRampIntegration';

export default function CDPDemo() {
  const [selectedProduct, setSelectedProduct] = useState<string>('summertime');

  const products = {
    summertime: {
      productId: 'summertime-blues-4144040176',
      productName: 'Summertime Blues',
      price: 0.001, // Real Manifold price
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '4144040176',
      mintUrl: 'https://manifold.xyz/@carculture/id/4144040176',
      imageUrl: '/preview-images/summertime_blues_preview.png', // Screenshot from Manifold
      description: 'Post-modern Surfing Wagon',
      make: 'Chevrolet',
      model: 'Suburban',
      year: '1970'
    },
    lowtide: {
      productId: 'low-tide-4149840112',
      productName: 'Low Tide',
      price: 0.001, // Real Manifold price
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '4149840112',
      mintUrl: 'https://manifold.xyz/@carculture/id/4149840112',
      imageUrl: '/preview-images/low_tide_preview.png', // Screenshot from Manifold
      description: 'A moment of calm reflection by the water\'s edge',
      make: 'Nil',
      model: 'Nil',
      year: 'Nil'
    },
    flatsea: {
      productId: 'flat-sea',
      productName: 'Flat Sea',
      price: 0.001, // Real Manifold price
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: 'flat-sea',
      mintUrl: 'https://app.manifold.xyz/c/flat-sea',
      imageUrl: '/preview-images/flat_sea_preview.png', // Screenshot from Manifold
      description: 'A moment of calm reflection by the water\'s edge',
      make: 'Nil',
      model: 'Nil',
      year: 'Nil'
    }
  };

  const handlePaymentSuccess = (paymentId: string, transactionHash?: string) => {
    console.log('Payment completed:', { paymentId, transactionHash });
    alert(`🎉 Payment successful!\n\nPayment ID: ${paymentId}\n${transactionHash ? `Transaction: ${transactionHash}` : ''}`);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`❌ Payment failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          {/* CarMania Logo */}
          <div className="mb-6">
            <img 
              src="/ccult-carmania-2000x600.png" 
              alt="CarMania Logo" 
              className="mx-auto max-w-sm md:max-w-md lg:max-w-lg h-auto"
              style={{ maxHeight: '150px' }}
            />
          </div>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-[#a32428] text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>🚗</span>
            <span>Drive the Past. Own the Moment</span>
          </div>
        </div>

        {/* Product Selector */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Choose Your NFT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(products).map(([key, product]) => (
                <button
                  key={key}
                  onClick={() => setSelectedProduct(key)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedProduct === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="mb-3 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.productName}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/carmania-splash.png'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="font-semibold text-sm mb-1">{product.productName}</div>
                  <div className="text-xs text-gray-500 mb-1">{product.description}</div>
                  {product.make !== 'Nil' && (
                    <div className="text-xs text-gray-400 mb-1">{product.year} {product.make} {product.model}</div>
                  )}
                  <div className="text-sm text-gray-600 font-semibold">
                    {product.currency === 'ETH' ? `${product.price} ETH` : `$${product.price}`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CDP OnRamp Integration */}
        <CDPOnRampIntegration
          {...products[selectedProduct as keyof typeof products]}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />

        {/* How It Works */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">How CDP OnRamp Works</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">1.</span>
                <span>Click "Buy with Credit Card" button</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">2.</span>
                <span>CDP OnRamp opens in secure window</span>
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
                <span>NFT minted and delivered to your wallet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">CDP OnRamp Features</h2>
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
                <span>CDP Security</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Instant Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span>Global Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚫</span>
                <span>No Crypto Knowledge Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔵</span>
                <span>Base Network Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span>Smart Wallet Creation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Technical Implementation</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✅</span>
                <span>CDP OnRamp SDK Integration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✅</span>
                <span>Base Network Configuration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✅</span>
                <span>Smart Wallet Integration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✅</span>
                <span>Real-time Payment Processing</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✅</span>
                <span>NFT Contract Integration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Test?</h2>
            <p className="mb-4">
              Try the CDP OnRamp integration above to experience real credit card NFT purchases!
            </p>
            <p className="text-sm opacity-90">
              This demo uses your actual CDP project ID: 1cceb0e4-e690-40ac-8f3d-7d1f3da1417a
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
