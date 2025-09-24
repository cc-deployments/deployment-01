'use client';

import React, { useState } from 'react';
import { EIP5792BatchTransaction, createNFTPurchaseBatchCalls } from '../components/EIP5792BatchTransaction';
import { CARMANIA_NFTS } from '../utils/manifoldUtils';

export default function EIP5792TestPage() {
  const [selectedNFT, setSelectedNFT] = useState(CARMANIA_NFTS[0]);
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleTestSuccess = (result: any) => {
    console.log('✅ EIP5792 Test Success:', result);
    setTestResults(prev => [...prev, {
      type: 'success',
      timestamp: new Date().toISOString(),
      result: result
    }]);
  };

  const handleTestError = (error: string) => {
    console.error('❌ EIP5792 Test Error:', error);
    setTestResults(prev => [...prev, {
      type: 'error',
      timestamp: new Date().toISOString(),
      error: error
    }]);
  };

  const createTestCalls = () => {
    return createNFTPurchaseBatchCalls(
      selectedNFT.contractAddress,
      selectedNFT.tokenId,
      (selectedNFT.price! * 1e18).toString(), // Convert to wei
      '0x0000000000000000000000000000000000000000' // Placeholder - will be replaced with actual buyer
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚀 EIP5792 + Paymaster Test
          </h1>
          <p className="text-gray-600">
            Test our streamlined 1-click NFT purchase flow with sponsored gas fees
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Interface */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🎯 Test Configuration</h2>
              
              {/* NFT Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select NFT to Test:
                </label>
                <select
                  value={selectedNFT.tokenId}
                  onChange={(e) => {
                    const nft = CARMANIA_NFTS.find(n => n.tokenId === e.target.value);
                    if (nft) setSelectedNFT(nft);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CARMANIA_NFTS.map((nft) => (
                    <option key={nft.tokenId} value={nft.tokenId}>
                      CarMania Garage Testing {nft.tokenId.slice(-1)} - ${nft.price} {nft.currency}
                    </option>
                  ))}
                </select>
              </div>

              {/* NFT Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">NFT Details:</h3>
                <div className="text-sm space-y-1">
                  <div><strong>Token ID:</strong> {selectedNFT.tokenId}</div>
                  <div><strong>Contract:</strong> {selectedNFT.contractAddress}</div>
                  <div><strong>Price:</strong> ${selectedNFT.price} {selectedNFT.currency}</div>
                  <div><strong>URL:</strong> 
                    <a 
                      href={selectedNFT.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      View on Manifold
                    </a>
                  </div>
                </div>
              </div>

              {/* Test Button */}
              <EIP5792BatchTransaction
                calls={createTestCalls()}
                onSuccess={handleTestSuccess}
                onError={handleTestError}
                className="mb-4"
              />
            </div>

            {/* Paymaster Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">⚡ Paymaster Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>BASE Paymaster Service: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">💰</span>
                  <span>Gas Fees: Sponsored (Free for users)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🔒</span>
                  <span>Atomic Execution: Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600">⚡</span>
                  <span>Batch Transactions: Optimized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">📊 Test Results</h2>
              
              {testResults.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">🧪</div>
                  <p>No tests run yet. Click "Execute batch transaction" to start testing.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        result.type === 'success'
                          ? 'bg-green-50 border-green-400'
                          : 'bg-red-50 border-red-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {result.type === 'success' ? '✅ Success' : '❌ Error'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {result.type === 'success' 
                          ? `Transaction ID: ${result.result?.sessionId || 'N/A'}`
                          : `Error: ${result.error}`
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Expected Flow */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🎯 Expected Flow</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Connect wallet (if not connected)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Execute batch transaction with paymaster</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>NFT minted directly to wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Success! (No 9-step process)</span>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🔧 Troubleshooting</h2>
              <div className="text-sm space-y-2">
                <div><strong>Wallet not connected:</strong> Make sure you're using a compatible wallet (Coinbase Wallet, MetaMask, etc.)</div>
                <div><strong>EIP5792 not supported:</strong> Your wallet needs to support batch transactions</div>
                <div><strong>Paymaster error:</strong> Check if BASE paymaster service is available</div>
                <div><strong>Contract error:</strong> Verify the Manifold contract address and token ID</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}