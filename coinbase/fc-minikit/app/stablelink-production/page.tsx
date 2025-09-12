'use client';

import React, { useState } from 'react';
import { UnifiedPayment } from '../components/UnifiedPayment';

export default function StableLinkProductionPage() {
  const products = {
    summertime: {
      productId: 'summertime-blues-4144040176',
      productName: 'Summertime Blues',
      price: 3.00,
      currency: 'USD',
      contractAddress: '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989', // Your BASE SAFE wallet
      tokenId: '4144040176',
      imageUrl: '/preview-images/summertime_blues_preview.png',
      description: 'Post-modern Surfing Wagon',
      make: 'Chevrolet',
      model: 'Suburban',
      year: '1970'
    },
  lowTide: {
    productId: 'low-tide-4149840112',
    productName: 'Low Tide',
    price: 1.00,
    currency: 'USD',
    contractAddress: '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989', // Merchant Wallet
    tokenId: '4149840112',
    imageUrl: '/preview-images/low_tide_preview.png',
    description: 'Classic Woodie Wagon',
    make: 'Ford',
    model: 'Woodie',
    year: '1946'
  },
  flatSea: {
    productId: 'flat-sea-4149807344',
    productName: 'Flat Sea',
    price: 1.00,
    currency: 'USD',
    contractAddress: '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989', // Merchant Wallet
    tokenId: '4149807344',
    imageUrl: '/preview-images/flat_sea_preview.png',
    description: 'Ocean Breeze Woodie',
    make: 'Chevrolet',
    model: 'Woodie',
    year: '1948'
  },
  test9: {
    productId: 'test-9-4169097456',
    productName: 'Car Culture: CarMania Garage - Test 9',
    price: 1.00,
    currency: 'USD',
    contractAddress: '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989', // Merchant Wallet
    tokenId: '4169097456',
    imageUrl: '/preview-images/test_9_preview.png', // Placeholder - will be updated with actual image
    description: 'Pink Car Art - Test NFT for StableLink',
    make: 'Art',
    model: 'Test',
    year: '2025'
  }
  };

  const [selectedProduct, setSelectedProduct] = useState<keyof typeof products>('summertime');
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProductSelect = (key: keyof typeof products) => {
    console.log('Product selected:', key, products[key]);
    setSelectedProduct(key);
  };

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful:', result);
    setPaymentResult(result);
    setError(null);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    setError(error);
    setPaymentResult(null);
  };

  const resetPayment = () => {
    setPaymentResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
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

        {/* Product Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Select Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(products).map(([key, product]) => (
              <button
                key={key}
                onClick={() => handleProductSelect(key as keyof typeof products)}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                  selectedProduct === key
                    ? 'border-[#a32428] bg-gradient-to-br from-[#a32428]/10 to-[#8b1e22]/10 shadow-lg'
                    : 'border-gray-200 hover:border-[#a32428]/50 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <img 
                    src={product.imageUrl} 
                    alt={product.productName}
                    className="max-w-24 max-h-24 rounded-xl mx-auto mb-3 border-2 border-[#a32428]/20"
                    style={{ objectFit: 'contain' }}
                  />
                  <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{product.productName}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <p className="text-xl font-bold text-[#a32428]">
                    {product.price} {product.currency}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Debug Info */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-bold text-blue-800 mb-2">Debug: Selected Product</h3>
          <p className="text-xs text-blue-700">
            Key: <strong>{selectedProduct}</strong> | 
            Name: <strong>{products[selectedProduct].productName}</strong> | 
            Price: <strong>${products[selectedProduct].price}</strong>
          </p>
        </div>

        {/* Payment Component */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <UnifiedPayment
            product={products[selectedProduct]}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>


        {/* Payment Results */}
        {paymentResult && (
          <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Payment Successful! 🎉</h3>
            <pre className="text-sm text-green-700 bg-green-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(paymentResult, null, 2)}
            </pre>
            <button
              onClick={resetPayment}
              className="mt-4 px-6 py-3 bg-[#a32428] text-white rounded-xl hover:bg-[#8b1e22] font-semibold transition-colors"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
            <h3 className="text-xl font-bold text-red-800 mb-3" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Payment Failed</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={resetPayment}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Environment Info */}
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Environment Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">CDP Project ID:</strong> <span className="text-green-600 font-mono">1cceb0e4-e690-40ac-8f3d-7d1f3da1417a</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">Base RPC:</strong> <span className="text-green-600">{process.env.NEXT_PUBLIC_BASE_RPC_URL || 'Not set'}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">StableLink:</strong> <span className="text-green-600">{process.env.NEXT_PUBLIC_STABLELINK_ENABLED || 'Not set'}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">CDP OnRamp:</strong> <span className="text-green-600">{process.env.NEXT_PUBLIC_CDP_ONRAMP_ENABLED || 'Not set'}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">OnChainKit API:</strong> <span className="text-green-600">{process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY ? 'Set' : 'Not set'}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">Privy App ID:</strong> <span className="text-green-600">{process.env.NEXT_PUBLIC_PRIVY_APP_ID ? 'Set' : 'Not set'}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-[#a32428]">Legal Pages:</strong> <a href="/terms" className="text-[#a32428] hover:text-[#8b1e22] font-medium">Terms</a> | <a href="/privacy" className="text-[#a32428] hover:text-[#8b1e22] font-medium">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}