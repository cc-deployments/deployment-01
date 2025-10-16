'use client';

import React, { useState, useEffect } from 'react';
import { useSharedAuth } from '@cculture/shared-auth';
import { StableLinkPayment } from '@cculture/shared-auth';
import { useBaseAccount } from './BaseAccountProvider';

function SharedAuthWrapper() {
  // For now, let's skip the SharedAuth integration to focus on testing the payment flow
  // We can add it back later once the WagmiProvider timing is resolved
  console.log('Skipping SharedAuth for now to focus on payment testing');
  return <EmbeddedWalletTestContent sharedAuthAddress={null} sharedAuthConnected={false} />;
}

function EmbeddedWalletTestContent({ sharedAuthAddress, sharedAuthConnected }: { sharedAuthAddress: string | null, sharedAuthConnected: boolean }) {
  const [mounted, setMounted] = useState(false);
  
  // CDP hooks - safe after mounted check
  const { address: baseAccountAddress, isConnected: baseAccountConnected, connect: connectBaseAccount, disconnect: disconnectBaseAccount } = useBaseAccount();
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
      {/* Embedded Wallet Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Embedded Wallet Status
        </h2>
        
        {/* Status Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Shared Auth System:</span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              ✅ Active
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Shared Auth Wallet:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${sharedAuthConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {sharedAuthConnected ? '✅ Connected' : '❌ Not Connected'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Base Account SDK:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${baseAccountConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {baseAccountConnected ? '✅ Connected' : '❌ Not Connected'}
            </span>
          </div>
          
          {baseAccountConnected && baseAccountAddress && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Base Account Address:</span>
              <span className="font-mono text-sm bg-white border border-gray-300 px-3 py-1 rounded-lg">
                {baseAccountAddress.slice(0, 6)}...{baseAccountAddress.slice(-4)}
              </span>
            </div>
          )}

          {sharedAuthConnected && sharedAuthAddress && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Shared Auth Address:</span>
              <span className="font-mono text-sm bg-white border border-gray-300 px-3 py-1 rounded-lg">
                {sharedAuthAddress.slice(0, 6)}...{sharedAuthAddress.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Integration Test */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Payment Integration Test
        </h3>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            Test the embedded wallet functionality with our existing StableLink payment system. 
            This includes both crypto wallet payments and credit card payments with automatic wallet creation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={() => setShowPayment(!showPayment)}
              className="bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              {showPayment ? 'Hide Payment Test' : 'Show Payment Test'}
            </button>

            {!baseAccountConnected ? (
              <button
                onClick={async () => {
                  setIsConnecting(true);
                  try {
                    await connectBaseAccount();
                  } catch (error) {
                    console.error('Failed to connect Base Account:', error);
                    alert('Failed to connect Base Account. Please try again.');
                  } finally {
                    setIsConnecting(false);
                  }
                }}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                {isConnecting ? 'Connecting...' : 'Connect Base Account'}
              </button>
            ) : (
              <button
                onClick={disconnectBaseAccount}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                Disconnect Base Account
              </button>
            )}
          </div>
        </div>

        {showPayment && (
          <div className="border-t pt-4">
            <StableLinkPayment
              {...exampleProduct}
              onPaymentSuccess={(paymentId, txHash) => {
                console.log('Payment completed:', { paymentId, txHash });
                alert(`Payment successful! Payment ID: ${paymentId}`);
              }}
              onPaymentError={(error) => {
                console.error('Payment error:', error);
                alert(`Payment failed: ${error}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function EmbeddedWalletTest() {
  return <SharedAuthWrapper />;
}