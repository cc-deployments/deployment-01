// packages/shared-auth/components/BasePayExample.tsx

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { BasePayButton, BasePayModal } from './index';
import { useBasePay } from '../hooks/useBasePay';
import type { BasePayConfig } from '../types/basePay';

export interface BasePayExampleProps {
  recipientAddress?: string;
  defaultAmount?: string;
  testnet?: boolean;
}

export function BasePayExample({ 
  recipientAddress: initialRecipientAddress = process.env.NEXT_PUBLIC_SAFE_REVENUE_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // SAFE #1: NFT Sales Revenue
  defaultAmount = '5.00',
  testnet: initialTestnet = true 
}: BasePayExampleProps) {
  const { address, isConnected } = useAccount();
  const { lastPayment, reset } = useBasePay();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState(defaultAmount);
  const [recipientAddress, setRecipientAddress] = useState(initialRecipientAddress);
  const [testnet, setTestnet] = useState(initialTestnet);

  const basePayConfig: BasePayConfig = {
    amount: customAmount,
    to: recipientAddress,
    testnet,
    payerInfo: {
      email: true,
      name: true,
    },
  };

  const handleSuccess = (result: any) => {
    console.log('Payment successful:', result);
    // You can add additional success handling here
  };

  const handleError = (error: Error) => {
    console.error('Payment failed:', error);
    // You can add additional error handling here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Base Pay Integration
        </h2>
        <p className="text-gray-600">
          Accept USDC payments with Base Pay
        </p>
      </div>

      {/* Wallet Connection Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Wallet Status</h3>
        {isConnected ? (
          <div className="space-y-1">
            <p className="text-sm text-green-600">✓ Connected</p>
            <p className="text-xs text-gray-500 font-mono break-all">
              {address}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            No wallet connected (Base Pay works without wallet connection)
          </p>
        )}
      </div>

      {/* Payment Configuration */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Payment Details</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (USDC)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="0x..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="testnet"
            checked={testnet}
            onChange={(e) => setTestnet(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="testnet" className="text-sm text-gray-700">
            Use testnet
          </label>
        </div>
      </div>

      {/* Payment Buttons */}
      <div className="space-y-3">
        <BasePayButton
          config={basePayConfig}
          onSuccess={handleSuccess}
          onError={handleError}
          className="w-full"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Open Payment Modal
        </button>
      </div>

      {/* Last Payment Status */}
      {lastPayment && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Last Payment</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Status:</span> {lastPayment.status}</p>
            <p><span className="font-medium">Amount:</span> ${lastPayment.amount}</p>
            <p><span className="font-medium">To:</span> {lastPayment.to}</p>
            {lastPayment.transactionHash && (
              <p><span className="font-medium">TX:</span> {lastPayment.transactionHash}</p>
            )}
            {lastPayment.error && (
              <p className="text-red-600"><span className="font-medium">Error:</span> {lastPayment.error}</p>
            )}
          </div>
          <button
            onClick={reset}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
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
        title="Complete Your Payment"
        description="This payment will be processed using Base Pay. You can complete the transaction even without a connected wallet."
      />
    </div>
  );
}
