// packages/shared-auth/components/BasePayModal.tsx

import React from 'react';
import { useBasePay } from '../hooks/useBasePay';
import type { BasePayConfig } from '../types/basePay';

export interface BasePayModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BasePayConfig;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  title?: string;
  description?: string;
}

export function BasePayModal({
  isOpen,
  onClose,
  config,
  onSuccess,
  onError,
  title = 'Complete Payment',
  description,
}: BasePayModalProps) {
  const { pay, isProcessing, error, lastPayment } = useBasePay();

  const handlePayment = async () => {
    try {
      const result = await pay(config);
      onSuccess?.(result);
      onClose();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Payment failed');
      onError?.(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isProcessing}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {description && (
              <p className="text-gray-600 text-sm">
                {description}
              </p>
            )}

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">${config.amount} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-mono text-sm">{config.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span className="text-sm">{config.testnet ? 'Base Testnet' : 'Base Mainnet'}</span>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Success Display */}
            {lastPayment?.status === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm">
                  Payment completed successfully!
                </p>
                {lastPayment.transactionHash && (
                  <p className="text-green-600 text-xs mt-1 font-mono">
                    TX: {lastPayment.transactionHash}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isProcessing ? 'Processing...' : 'Pay with Base Pay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
