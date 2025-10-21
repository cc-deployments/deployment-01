'use client';

import React, { useState, useEffect } from 'react';
import { useBaseAccount } from './BaseAccountProvider';
import { BasePayIntegration } from './BasePayIntegration';

function EmbeddedWalletTestContent() {
  const [mounted, setMounted] = useState(false);
  
  // Base Account SDK hooks
  const { 
    address: baseAccountAddress, 
    isConnected: baseAccountConnected, 
    connect: connectBaseAccount, 
    disconnect: disconnectBaseAccount 
  } = useBaseAccount();
  
  const [showPayment, setShowPayment] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  const exampleProduct = {
    productId: 'summertime-blues-1',
    productName: 'Summertime Blues NFT',
    price: 0.001,
    currency: 'ETH',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1',
    imageUrl: '/preview-images/summertime_blues_preview.png',
    description: 'Post-modern Surfing Wagon',
    make: 'Chevrolet',
    model: 'Suburban',
    year: '1970',
    mintUrl: 'https://manifold.xyz/studio/0x8ef0772347e0caed0119937175d7ef9636ae1aa0'
  };

  return (
    <div className="space-y-6">
      {/* Base Account SDK Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Base Account SDK Integration
        </h2>
        
        {/* Status Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Base Account SDK:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${baseAccountConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {baseAccountConnected ? '✅ Connected' : '❌ Not Connected'}
            </span>
          </div>
          
          {baseAccountConnected && baseAccountAddress && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Wallet Address:</span>
              <span className="font-mono text-sm bg-white border border-gray-300 px-3 py-1 rounded-lg">
                {baseAccountAddress.slice(0, 6)}...{baseAccountAddress.slice(-4)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Network:</span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
              🔵 Base Mainnet
            </span>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Wallet Connection
        </h3>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            Connect your Base Account to enable secure payments and NFT minting. 
            Base Account provides a seamless wallet experience with built-in Base Pay integration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {!baseAccountConnected ? (
              <button
                onClick={async () => {
                  setIsConnecting(true);
                  try {
                    await connectBaseAccount();
                    console.log('✅ Base Account connected successfully');
                  } catch (error) {
                    console.error('❌ Failed to connect Base Account:', error);
                    alert('Failed to connect Base Account. Please try again.');
                  } finally {
                    setIsConnecting(false);
                  }
                }}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔵</span>
                    Connect Base Account
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={disconnectBaseAccount}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                <span className="mr-2">🔴</span>
                Disconnect Base Account
              </button>
            )}

            <button
              onClick={() => setShowPayment(!showPayment)}
              disabled={!baseAccountConnected}
              className="bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              {showPayment ? 'Hide Payment Test' : 'Show Payment Test'}
            </button>
          </div>
        </div>

        {!baseAccountConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Wallet Required</h4>
            <p className="text-yellow-700">
              Please connect your Base Account to enable payments and NFT minting.
            </p>
          </div>
        )}
      </div>

      {/* Base Pay Integration Test */}
      {showPayment && baseAccountConnected && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            Base Pay Integration Test
          </h3>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Test Base Pay integration with your connected Base Account. 
              This demonstrates secure, one-click payments using Base Pay.
            </p>
          </div>

          <div className="border-t pt-4">
            <BasePayIntegration
              config={exampleProduct}
              onSuccess={(result) => {
                console.log('✅ Base Pay payment successful:', result);
                alert(`Payment successful! Transaction: ${result.transactionHash || 'N/A'}`);
              }}
              onError={(error) => {
                console.error('❌ Base Pay payment failed:', error);
                alert(`Payment failed: ${error}`);
              }}
            />
          </div>
        </div>
      )}

      {/* Features Overview */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">🚀 Base Account SDK Features</h4>
        <ul className="text-blue-800 space-y-2">
          <li>• <strong>Seamless Wallet Connection:</strong> One-click connection to Base Account</li>
          <li>• <strong>Base Pay Integration:</strong> Secure payments with USDC on Base</li>
          <li>• <strong>No Gas Fees:</strong> Base Account handles gas for transactions</li>
          <li>• <strong>NFT Minting:</strong> Direct integration with NFT contracts</li>
          <li>• <strong>Cross-Platform:</strong> Works on web and mobile</li>
        </ul>
      </div>
    </div>
  );
}

export function EmbeddedWalletTest() {
  return <EmbeddedWalletTestContent />;
}