"use client";

import React, { useEffect, useState } from 'react';
import { useEvmAddress, useIsSignedIn } from '@coinbase/cdp-hooks';
import { AuthButton } from '@coinbase/cdp-react';

export default function WalletTest() {
  const [mounted, setMounted] = useState(false);

  // CDP hooks must be called before any early returns
  const evmAddressData = useEvmAddress();
  const isSignedIn = useIsSignedIn();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Move debug useEffect before early return
  useEffect(() => {
    console.log('🔍 CDP Wallet Debug Info:');
    console.log('  - EVM Address Data:', evmAddressData);
    console.log('  - EVM Address:', evmAddressData?.evmAddress);
    console.log('  - Is Signed In:', isSignedIn);
    console.log('  - Expected: address=undefined, isSignedIn=false when not authenticated');
  }, [evmAddressData, isSignedIn]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          CDP Embedded Wallet Test
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Testing CDP Embedded Wallets with email/password authentication.
        </p>

        {/* Test 1: CDP AuthButton */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 1: CDP AuthButton</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <AuthButton />
          </div>
        </div>

        {/* Test 2: Connection Status */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test 2: Connection Status</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {isSignedIn ? (
              <div className="text-center p-4">
                <p className="text-green-600 font-semibold">✅ Wallet Connected!</p>
                <p className="text-gray-600">Address: {evmAddressData?.evmAddress || 'N/A'}</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-600">Not signed in</p>
                <p className="text-sm text-gray-500 mt-2">Click AuthButton above to sign in</p>
              </div>
            )}
          </div>
        </div>

        {/* Debug Wallet State */}
        <div className="mt-6 bg-red-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            🔍 Debug CDP Wallet State
          </h3>
          <div className="text-red-700 text-sm space-y-1">
            <p><strong>EVM Address:</strong> {evmAddressData?.evmAddress || 'undefined'}</p>
            <p><strong>Is Signed In:</strong> {isSignedIn ? 'true' : 'false'}</p>
            <p><strong>Expected:</strong> address=undefined, isSignedIn=false when not authenticated</p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🧪 Test Configuration
          </h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>Provider:</strong> CDP Embedded Wallets</p>
            <p><strong>Authentication:</strong> Email/Password</p>
            <p><strong>Purpose:</strong> Test CDP wallet integration</p>
            <p><strong>Domain:</strong> Must be configured in CDP Portal</p>
            <p><strong>Client-Only:</strong> ✅ Mounted check prevents SSR issues</p>
          </div>
        </div>
      </div>
    </div>
  );
}