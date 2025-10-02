'use client';

import React from 'react';
import { WalletModal } from '../components/WalletModal';

export default function WalletModalTest() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">OnchainKit Wallet Modal Test</h1>
        
        {/* Wallet Modal Demo */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
          <p className="text-gray-600 mb-6">
            This demonstrates the OnchainKit WalletModal component with smart wallet creation and existing wallet connection.
          </p>
          
          <div className="flex justify-center">
            <WalletModal className="w-full max-w-sm" />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Smart Wallet Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Passkey authentication</li>
              <li>✅ Sponsored transactions</li>
              <li>✅ Gasless operations</li>
              <li>✅ Mobile responsive</li>
              <li>✅ Theme customization</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Supported Wallets</h3>
            <ul className="space-y-2 text-gray-600">
              <li>🔷 Base Account (Smart Wallet)</li>
              <li>🦊 MetaMask</li>
              <li>🔵 Coinbase Wallet</li>
              <li>🔗 WalletConnect</li>
              <li>📱 Mobile wallets</li>
            </ul>
          </div>
        </div>

        {/* Integration Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Integration Status</h3>
          <div className="space-y-2 text-blue-700">
            <p>✅ OnchainKitProvider configured</p>
            <p>✅ Base network configured</p>
            <p>✅ WalletModal component ready</p>
            <p>✅ Smart wallet creation enabled</p>
            <p>✅ Existing wallet connection enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

