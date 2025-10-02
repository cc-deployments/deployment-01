'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useBaseAccount } from './BaseAccountProvider';

interface WalletModalProps {
  className?: string;
}

export function WalletModal({ className = '' }: WalletModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Wagmi hooks
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Base Account hooks
  const { address: baseAddress, isConnected: baseConnected, connect: baseConnect } = useBaseAccount();

  const isAnyConnected = wagmiConnected || baseConnected;
  const connectedAddress = wagmiAddress || baseAddress;

  const handleConnect = async (connectorId: string) => {
    try {
      if (connectorId === 'base-account') {
        await baseConnect();
      } else {
        const connector = connectors.find(c => c.id === connectorId);
        if (connector) {
          await connect({ connector });
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
      // Show user-friendly error message
      if (error instanceof Error && error.message.includes('SDK is currently disabled')) {
        alert('Base Account is temporarily unavailable. Please try connecting with MetaMask or another wallet.');
      } else {
        alert(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleDisconnect = () => {
    if (baseConnected) {
      // Base Account disconnect logic
      console.log('Disconnecting Base Account');
    }
    if (wagmiConnected) {
      disconnect();
    }
  };

  if (isAnyConnected) {
    return (
      <div className={`wallet-connected ${className}`}>
        <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-green-800">Wallet Connected</p>
            <p className="text-sm text-green-600 font-mono">
              {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
            </p>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`wallet-modal ${className}`}>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
      >
        Connect Wallet
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Connect Wallet</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleConnect('base-account')}
                className="w-full flex items-center space-x-4 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <div className="text-2xl">🔷</div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">Base Account</h3>
                  <p className="text-sm text-gray-600">Smart wallet powered by Base</p>
                </div>
              </button>

              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector.id)}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <div className="text-2xl">
                    {connector.name.toLowerCase().includes('metamask') ? '🦊' : 
                     connector.name.toLowerCase().includes('coinbase') ? '🔵' : '🔗'}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900">{connector.name}</h3>
                    <p className="text-sm text-gray-600">Connect with {connector.name}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium text-blue-800">Base Network</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                All transactions will be processed on Base network
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for easy wallet modal usage
export function useWalletModal() {
  return {
    WalletModal: (props: WalletModalProps) => <WalletModal {...props} />,
  };
}
