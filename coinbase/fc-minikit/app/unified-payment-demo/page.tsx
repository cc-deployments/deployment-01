'use client';

import React, { useState } from 'react';
import { UnifiedPayment } from '../components/UnifiedPayment';

export default function UnifiedPaymentDemoPage() {
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const products = {
    summertime: {
      productId: 'summertime-blues-4144040176',
      productName: 'Summertime Blues',
      price: 0.001,
      currency: 'ETH',
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
      price: 0.001,
      currency: 'ETH',
      contractAddress: '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989', // Your BASE SAFE wallet
      tokenId: '4149840112',
      imageUrl: '/preview-images/low_tide_preview.png',
      description: 'Classic Woodie Wagon',
      make: 'Ford',
      model: 'Woodie',
      year: '1946'
    },
    flatSea: {
      productId: 'flat-sea-4150000001',
      productName: 'Flat Sea',
      price: 0.001,
      currency: 'ETH',
      contractAddress: '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989', // Your BASE SAFE wallet
      tokenId: '4150000001',
      imageUrl: '/preview-images/flat_sea_preview.png',
      description: 'Ocean Breeze Woodie',
      make: 'Chevrolet',
      model: 'Woodie',
      year: '1948'
    }
  };

  const [selectedProduct, setSelectedProduct] = useState<keyof typeof products>('summertime');

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Unified Payment Demo
          </h1>
          <p className="text-gray-600">
            Test all payment methods: Crypto, Debit/Apple Pay, and Credit Cards
          </p>
        </div>

        {/* Product Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(products).map(([key, product]) => (
              <button
                key={key}
                onClick={() => setSelectedProduct(key as keyof typeof products)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedProduct === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <img 
                    src={product.imageUrl} 
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                  />
                  <h3 className="font-medium text-gray-900">{product.productName}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    {product.price} {product.currency}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Component */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <UnifiedPayment
            product={products[selectedProduct]}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>

        {/* Payment Results */}
        {paymentResult && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Payment Successful! 🎉</h3>
            <pre className="text-sm text-green-700 bg-green-100 p-3 rounded overflow-auto">
              {JSON.stringify(paymentResult, null, 2)}
            </pre>
            <button
              onClick={resetPayment}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Failed</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={resetPayment}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Environment Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Environment Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>CDP OnRamp:</strong> Debit cards, Apple Pay, Google Pay
            </div>
            <div>
              <strong>MoonPay:</strong> Credit cards (Visa, Mastercard, Amex)
            </div>
            <div>
              <strong>Base Pay:</strong> Crypto wallet payments
            </div>
            <div>
              <strong>Destination:</strong> {products[selectedProduct].contractAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


