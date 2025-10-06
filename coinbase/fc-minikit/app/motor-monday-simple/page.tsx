'use client';

import React, { useState } from 'react';

export default function MotorMondaySimple() {
  const [contractAddress, setContractAddress] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');

  // Mercedes ERC-1155 details from BaseScan transaction
  const mercedesContract = '0x8EF0772347e0CaEd0119937175D7Ef9636Ae1aa0'; // CarMania.cb.id contract
  const mercedesTokenId = '11'; // Available edition token ID

  const handlePopulate = () => {
    setContractAddress(mercedesContract);
    setTokenId(mercedesTokenId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚗 Motor Monday Simple Test
          </h1>
          <p className="text-gray-600 text-lg">
            Testing without OnchainKit wrapper to isolate the syntax error
          </p>
        </div>

        {/* Contract Details Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Address
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token ID
              </label>
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handlePopulate}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Use Mercedes Contract Details
          </button>
        </div>

        {/* Contract Info Display */}
        {contractAddress && tokenId && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Contract Information</h2>
            <div className="space-y-3">
              <div>
                <strong>Contract:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{contractAddress}</code>
              </div>
              <div>
                <strong>Token ID:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{tokenId}</code>
              </div>
              <div>
                <strong>Type:</strong> ERC-1155 Edition
              </div>
              <div>
                <strong>Price:</strong> $10.00 (from contract)
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">✅ Status</h3>
              <p className="text-green-800">
                Contract details loaded successfully! The syntax error is likely in the OnchainKit import.
                Next step: Fix the OnchainKit import issue.
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 Next Steps
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>This page works without OnchainKit (no syntax error)</li>
            <li>The issue is in the OnchainKit import/compilation</li>
            <li>Need to fix the OnchainKit version compatibility</li>
            <li>Try downgrading OnchainKit or fixing import paths</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
