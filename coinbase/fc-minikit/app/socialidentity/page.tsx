"use client";

import { Name, Address, Avatar, Identity } from '@coinbase/onchainkit/identity';
import { useAccount, useConnect } from 'wagmi';
import { base } from 'wagmi/chains';

export default function SocialIdentityPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  // Following BASE/Coinbase's exact pattern
  if (!isConnected || !address) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Social Identity</h1>
          <p className="text-gray-600 mb-6">Please connect your wallet to view your social identity.</p>
          
          {/* Add explicit wallet connection buttons */}
          <div className="mb-6 space-y-3">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect {connector.name}
              </button>
            ))}
            
            {/* Test button for when no wallet extensions are installed */}
            <button
              onClick={() => {
                alert('This is a test connection. Install MetaMask or Coinbase Wallet extension to test real wallet connection.');
              }}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Connection (No Extension)
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Debug Info:</strong><br />
              Connected: {isConnected ? 'Yes' : 'No'}<br />
              Address: {address || 'None'}<br />
              Chain: {base.name}<br />
              Available Connectors: {connectors.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Social Identity</h1>
        
        {/* Following BASE/Coinbase's exact Identity component pattern */}
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name address={address} />
          <Address address={address} />
        </Identity>

        {/* Debug info */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Debug Info:</strong><br />
            Connected: {isConnected ? 'Yes' : 'No'}<br />
            Address: {address}<br />
            Chain: {base.name}<br />
            Network: Base Mainnet
          </p>
        </div>
      </div>
    </div>
  );
} 