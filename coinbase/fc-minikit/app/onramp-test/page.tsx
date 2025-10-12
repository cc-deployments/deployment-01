'use client';

import React, { useState } from 'react';
import { FundButton } from '@coinbase/onchainkit/fund'; // OnchainKit's built-in OnRamp
import { useBaseAccount } from '../components/BaseAccountProvider';

export default function OnRampTest() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { address: evmAddress, isConnected, connect } = useBaseAccount();

  const handleConnect = async () => {
    if (!isConnected) {
      await connect();
    }
  };

  const handleSuccess = () => {
    console.log('OnRamp purchase successful!');
    setPaymentStatus('success');
  };

  const handleError = (error: string) => {
    console.error('OnRamp purchase failed:', error);
    setPaymentStatus('error');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          OnRamp Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Wallet Status</h2>
          <div className="space-y-2">
            <p><strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}</p>
            <p><strong>Address:</strong> {evmAddress || 'Not connected'}</p>
          </div>
          
          {!isConnected && (
            <button
              onClick={handleConnect}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">OnRamp Test</h2>
          <p className="text-gray-600 mb-4">
            Test the OnchainKit OnRamp functionality.
          </p>
          
          {/* Payment Status */}
          <div className="mb-4">
            {paymentStatus === 'idle' && (
              <div className="text-gray-600">Ready to test OnRamp</div>
            )}
            {paymentStatus === 'success' && (
              <div className="text-green-600">✅ OnRamp purchase successful!</div>
            )}
            {paymentStatus === 'error' && (
              <div className="text-red-600">❌ OnRamp purchase failed</div>
            )}
          </div>
          
          {isConnected ? (
            <FundButton
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              text="Test OnRamp - $1.00 USD"
              hideText={false}
              hideIcon={false}
              openIn="tab"
            />
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed"
            >
              Connect Wallet First
            </button>
          )}
        </div>
      </div>
    </div>
  );
}