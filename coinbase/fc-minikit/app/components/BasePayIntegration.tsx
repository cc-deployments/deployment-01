// coinbase/fc-minikit/app/components/BasePayIntegration.tsx
"use client";

import React, { useState } from 'react';
import { BasePayButton, BasePayModal, useBasePay } from '@cculture/shared-auth';
import type { BasePayConfig } from '@cculture/shared-auth';

export function BasePayIntegration() {
  const { lastPayment, reset } = useBasePay();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('5.00');

  // Example recipient address - replace with your actual address
  const recipientAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';

  const basePayConfig: BasePayConfig = {
    amount,
    to: recipientAddress,
    testnet: true, // Set to false for mainnet
    payerInfo: {
      email: true,
      name: true,
    },
  };

  const handleSuccess = (result: any) => {
    console.log('Payment successful:', result);
    // You can add additional success handling here
    // For example, update your database, send confirmation email, etc.
  };

  const handleError = (error: Error) => {
    console.error('Payment failed:', error);
    // You can add additional error handling here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          CarMania NFT Purchase
        </h2>
        <p className="text-gray-600">
          Complete your purchase with Base Pay
        </p>
      </div>

      {/* Amount Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Amount (USDC)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['1.00', '5.00', '10.00', '25.00', '50.00', '100.00'].map((price) => (
            <button
              key={price}
              onClick={() => setAmount(price)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                amount === price
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              ${price}
            </button>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Amount
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        <BasePayButton
          config={basePayConfig}
          onSuccess={handleSuccess}
          onError={handleError}
          className="w-full"
          variant="primary"
          size="lg"
        >
          Buy NFT for ${amount} USDC
        </BasePayButton>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Open Payment Modal
        </button>
      </div>

      {/* Payment Status */}
      {lastPayment && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Payment Status</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                lastPayment.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : lastPayment.status === 'failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {lastPayment.status}
              </span>
            </p>
            <p><span className="font-medium">Amount:</span> ${lastPayment.amount}</p>
            {lastPayment.transactionHash && (
              <p><span className="font-medium">Transaction:</span> 
                <span className="font-mono text-xs ml-1">{lastPayment.transactionHash}</span>
              </p>
            )}
            {lastPayment.error && (
              <p className="text-red-600"><span className="font-medium">Error:</span> {lastPayment.error}</p>
            )}
          </div>
          <button
            onClick={reset}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Clear Status
          </button>
        </div>
      )}

      {/* Modal */}
      <BasePayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        config={basePayConfig}
        onSuccess={handleSuccess}
        onError={handleError}
        title="Complete Your NFT Purchase"
        description="This payment will be processed securely using Base Pay. You'll receive your NFT after successful payment."
      />

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">About Base Pay</h3>
        <div className="text-blue-800 text-sm space-y-1">
          <p>• No wallet connection required</p>
          <p>• Secure USDC payments on Base</p>
          <p>• Instant transaction confirmation</p>
          <p>• Works on both testnet and mainnet</p>
        </div>
      </div>
    </div>
  );
}
