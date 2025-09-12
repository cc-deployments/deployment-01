'use client';

import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { base } from 'viem/chains';
import { useBaseAccount } from '../components/BaseAccountProvider';

export default function EmbeddedWalletTest() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { address: baseAccountAddress, isConnected: baseAccountConnected, connect: connectBaseAccount } = useBaseAccount();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  const handleCreateWallet = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Connecting to Base Account for email:', email);
      
      // Use Base Account SDK to connect
      await connectBaseAccount();
      
      console.log('Base Account connected:', baseAccountAddress);
      setWalletAddress(baseAccountAddress);
      
    } catch (err) {
      console.error('Error connecting Base Account:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          {/* CarMania Logo */}
          <div className="mb-6">
            <img 
              src="/ccult-carmania-2000x600.png" 
              alt="CarMania Logo" 
              className="mx-auto max-w-sm md:max-w-md lg:max-w-lg h-auto"
              style={{ maxHeight: '150px' }}
            />
          </div>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-[#a32428] text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>🚗</span>
            <span>Drive the Past. Own the Moment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            CDP Embedded Wallets Test
          </h1>

          {/* Email Input Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Embedded Wallet</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a32428] focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleCreateWallet}
                disabled={isLoading || baseAccountConnected || !email}
                className="w-full bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting Base Account...
                  </>
                ) : baseAccountConnected ? (
                  'Base Account Connected'
                ) : (
                  'Connect Base Account'
                )}
              </button>
            </div>
          </div>

          {/* Wallet Status Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Wallet Status</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Base Account:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  baseAccountConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {baseAccountConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              
              {baseAccountAddress && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Base Account Address:</span>
                  <span className="font-mono text-sm bg-white border border-gray-300 px-3 py-1 rounded-lg">
                    {baseAccountAddress.slice(0, 6)}...{baseAccountAddress.slice(-4)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Connected Wallet:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {isConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              
              {isConnected && address && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Connected Address:</span>
                  <span className="font-mono text-sm bg-white border border-gray-300 px-3 py-1 rounded-lg">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Connect Wallet Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Connect Existing Wallet</h2>
            <button
              onClick={handleConnectWallet}
              disabled={isConnected}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <h3 className="text-xl font-bold text-red-800 mb-3">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Environment Info */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Environment Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <strong className="text-[#a32428]">CDP Project ID:</strong> <span className="text-green-600 font-mono">1cceb0e4-e690-40ac-8f3d-7d1f3da1417a</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <strong className="text-[#a32428]">OnChainKit API:</strong> <span className="text-green-600">{process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY ? 'Set' : 'Not set'}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <strong className="text-[#a32428]">Base Chain ID:</strong> <span className="text-green-600">{base.id}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <strong className="text-[#a32428]">Embedded Wallets:</strong> <span className="text-green-600">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
