'use client';

import React, { useState, useEffect } from 'react';
import { useBaseAccount } from '../components/BaseAccountProvider';

export default function EmbeddedWalletTest() {
  const [mounted, setMounted] = useState(false);
  
  // CDP hooks - safe after mounted check
  const { isConnected, address, connect, disconnect } = useBaseAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Embedded Wallet Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wallet Status
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}
              </p>
              {address && (
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {address}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              {!isConnected ? (
                <button
                  onClick={connect}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={disconnect}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-1"
                >
                  Disconnect Wallet
                </button>
              )}
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🧪 Test Configuration
              </h3>
              <div className="text-blue-700 text-sm space-y-1">
                <p><strong>Purpose:</strong> Test Base Account SDK wallet connection</p>
                <p><strong>Provider:</strong> BaseAccountProvider</p>
                <p><strong>Environment:</strong> Isolated from NFTMintCard</p>
                <p><strong>Expected:</strong> Connect/Disconnect buttons should work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
