// packages/shared-auth/examples/BasePayTest.tsx

import React from 'react';
import { BasePayExample } from '../components/BasePayExample';

/**
 * Test component for Base Pay integration
 * This can be used to test the Base Pay functionality in development
 */
export function BasePayTest() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Base Pay Integration Test
          </h1>
          <p className="text-gray-600">
            Test the Base Pay functionality with various configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testnet Example */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Testnet Example
            </h2>
            <BasePayExample
              recipientAddress="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
              defaultAmount="1.00"
              testnet={true}
            />
          </div>

          {/* Mainnet Example (for production testing) */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Mainnet Example
            </h2>
            <BasePayExample
              recipientAddress="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
              defaultAmount="5.00"
              testnet={false}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Testing Instructions
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>• <strong>Testnet:</strong> Use Base testnet for safe testing with test USDC</p>
            <p>• <strong>Mainnet:</strong> Use Base mainnet for real USDC payments (be careful!)</p>
            <p>• <strong>Wallet Connection:</strong> Base Pay works with or without wallet connection</p>
            <p>• <strong>Amount:</strong> Enter any amount in USDC (minimum $0.01)</p>
            <p>• <strong>Recipient:</strong> Change the recipient address to your own for testing</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            Features Demonstrated
          </h3>
          <div className="text-green-800 space-y-2">
            <p>✓ Base Pay button with loading states</p>
            <p>✓ Modal payment flow</p>
            <p>✓ Payment status tracking</p>
            <p>✓ Error handling and display</p>
            <p>✓ Wagmi integration (optional wallet display)</p>
            <p>✓ Responsive design with Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
