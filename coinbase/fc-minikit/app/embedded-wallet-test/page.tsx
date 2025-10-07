'use client';

import React from 'react';
import { EmbeddedWalletIntegration, EmbeddedWalletExample } from '../components/EmbeddedWalletIntegration';

export default function EmbeddedWalletTest() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CarCulture Embedded Wallets Test</h1>
        
        {/* Embedded Wallets Demo */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Web2 User NFT Purchase</h2>
          <p className="text-gray-600 mb-6">
            This demonstrates how Web2 users can buy NFTs using email/SMS login without needing a crypto wallet.
          </p>
          
          <div className="flex justify-center">
            <EmbeddedWalletExample />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Embedded Wallet Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Email/SMS authentication</li>
              <li>✅ Instant wallet creation</li>
              <li>✅ No seed phrases required</li>
              <li>✅ Built-in payment processing</li>
              <li>✅ Mobile responsive</li>
              <li>✅ USDC rewards (4.1% APY)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Web2 User Benefits</h3>
            <ul className="space-y-2 text-gray-600">
              <li>🔷 No crypto wallet installation</li>
              <li>🦊 Familiar login methods</li>
              <li>🔵 Instant onboarding</li>
              <li>🔗 Seamless NFT purchases</li>
              <li>📱 Mobile-first experience</li>
              <li>💳 Credit card integration</li>
            </ul>
          </div>
        </div>

        {/* Integration Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Integration Status</h3>
          <div className="space-y-2 text-blue-700">
            <p>✅ CDP Embedded Wallets SDK installed</p>
            <p>✅ Project ID configured: 1cceb0e4-e690-40ac-8f3d-7d1f3da1417a</p>
            <p>✅ Base network configured</p>
            <p>✅ EmbeddedWalletIntegration component ready</p>
            <p>✅ Web2 user onboarding enabled</p>
            <p>✅ NFT purchase flow implemented</p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Implementation</h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>SDK:</strong> @coinbase/cdp-react, @coinbase/cdp-core, @coinbase/cdp-hooks</p>
            <p><strong>Authentication:</strong> Coinbase Managed (email/SMS/OAuth)</p>
            <p><strong>Wallet Type:</strong> EOA (Externally Owned Account)</p>
            <p><strong>Network:</strong> Base mainnet</p>
            <p><strong>Payment Methods:</strong> Embedded wallet balance, credit card onramp</p>
            <p><strong>User Experience:</strong> No crypto knowledge required</p>
          </div>
        </div>

        {/* Comparison with Current Implementation */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Migration Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Current Onramp Approach</h4>
              <ul className="space-y-1 text-green-600 text-sm">
                <li>❌ Deprecated (past July 31, 2025 deadline)</li>
                <li>❌ Requires separate wallet setup</li>
                <li>❌ Complex URL construction</li>
                <li>❌ Limited to existing crypto users</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Embedded Wallets Approach</h4>
              <ul className="space-y-1 text-green-600 text-sm">
                <li>✅ Active development and support</li>
                <li>✅ Instant wallet creation</li>
                <li>✅ Unified SDK and API</li>
                <li>✅ Web2 user friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}