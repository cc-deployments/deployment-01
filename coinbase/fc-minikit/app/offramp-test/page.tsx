'use client';

import React from 'react';
import { OffRampIntegration } from '../components/OffRampIntegration';

export default function OffRampTest() {
  const handleSuccess = (transactionId: string) => {
    console.log('OffRamp transaction successful:', transactionId);
    // You could show a success message or redirect
  };

  const handleError = (error: string) => {
    console.error('OffRamp error:', error);
    // You could show an error message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* CarCulture Logo */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="/ccult-carmania-2000x600.png" 
              alt="CarCulture Logo" 
              className="mx-auto max-w-sm md:max-w-md lg:max-w-lg h-auto"
              style={{ maxHeight: '150px' }}
            />
          </div>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>💰</span>
            <span>Sell Crypto for Fiat</span>
          </div>
        </div>

        {/* OffRamp Integration */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            CarCulture OffRamp Test
          </h1>
          
          <OffRampIntegration 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        {/* Environment Info */}
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Environment Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-purple-600">CDP Project ID:</strong> <span className="text-green-600 font-mono">1cceb0e4-e690-40ac-8f3d-7d1f3da1417a</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-purple-600">OffRamp Status:</strong> <span className="text-green-600">Ready for Testing</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-purple-600">Base Chain:</strong> <span className="text-green-600">Mainnet</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <strong className="text-purple-600">Shared Auth:</strong> <span className="text-green-600">Integrated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


