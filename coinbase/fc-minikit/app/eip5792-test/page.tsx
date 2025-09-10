'use client';

import { EIP5792BatchTransaction, createNFTPurchaseBatchCalls, EIP5792Example } from '../components/EIP5792BatchTransaction';
import { EnhancedStableLinkCommerce, EnhancedStableLinkCommerceExample } from '../components/EnhancedStableLinkCommerce';

export default function EIP5792TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EIP5792 Integration Test
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Testing batch transactions and enhanced payment flows
          </p>
          <p className="text-sm text-gray-500">
            BASE Pay + EIP5792 = Better UX + Lower Costs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EIP5792 Batch Transaction Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              🚀 EIP5792 Batch Transactions
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Test atomic execution of multiple operations
            </p>
            <EIP5792Example />
          </div>

          {/* Enhanced StableLink Commerce Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              💳 Enhanced Payment Flows
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Credit card + Crypto with EIP5792 support
            </p>
            <EnhancedStableLinkCommerceExample />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why EIP5792 Matters for CarMania
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Faster Transactions</h3>
              <p className="text-gray-600">
                Batch multiple operations (approve + purchase + mint) into a single transaction
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Lower Costs</h3>
              <p className="text-gray-600">
                Reduce gas fees by combining operations instead of separate transactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Atomic Execution</h3>
              <p className="text-gray-600">
                All operations succeed together or fail together - no partial failures
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Technical Implementation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EIP5792 Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">wallet_sendCalls</code> - Execute batch transactions</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">wallet_getCallsStatus</code> - Monitor transaction status</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">wallet_getCapabilities</code> - Check wallet features</li>
                <li>• Paymaster integration for gasless transactions</li>
                <li>• Atomic execution guarantees</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">BASE Integration</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Base mainnet support (Chain ID: 8453)</li>
                <li>• BASE Pay paymaster service integration</li>
                <li>• Optimized for Base ecosystem</li>
                <li>• Compatible with Base smart wallets</li>
                <li>• Enhanced UX for BASE users</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            🧪 Testing Instructions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Wallet Setup</h3>
              <p className="text-gray-600">
                Install a wallet that supports EIP5792 (MetaMask, Ambire, etc.)
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2. Test Batch Transactions</h3>
              <p className="text-gray-600">
                Click "Execute batch transaction" to test atomic operations
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">3. Test Payment Flows</h3>
              <p className="text-gray-600">
                Try both credit card and crypto payment methods
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">4. Monitor Console</h3>
              <p className="text-gray-600">
                Check browser console for transaction details and status updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


