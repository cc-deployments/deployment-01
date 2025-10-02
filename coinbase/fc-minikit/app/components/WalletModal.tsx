'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected, baseAccount } from 'wagmi/connectors';

interface WalletModalProps {
  className?: string;
}

export function WalletModal({ className = '' }: WalletModalProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // Debug logging
  console.log('🔍 WalletModal render:', { 
    isConnected, 
    address, 
    connectorsCount: connectors.length,
    connectors: connectors.map(c => c.name),
    error: error?.message,
    isPending 
  });

  if (!isConnected) {
    return (
      <div className={className}>
        <div className="space-y-3">
          {/* Base Account Connector */}
          <button
            onClick={() => {
              console.log('🔷 Base Account button clicked');
              try {
                connect({ connector: baseAccount() });
              } catch (err) {
                console.error('❌ Base Account connection error:', err);
              }
            }}
            disabled={isPending}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              <>
                <span>🔷</span>
                Connect Base Account
              </>
            )}
          </button>
          
          {/* Injected Connector (MetaMask, etc.) */}
          <button
            onClick={() => {
              console.log('🦊 MetaMask button clicked');
              try {
                connect({ connector: injected() });
              } catch (err) {
                console.error('❌ MetaMask connection error:', err);
              }
            }}
            disabled={isPending}
            className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              <>
                <span>🦊</span>
                Connect MetaMask
              </>
            )}
          </button>
          
          {error && (
            <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
              {error.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <div className="text-sm font-mono">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

// Hook for easy wallet modal usage
export function useWalletModal() {
  return {
    WalletModal: (props: WalletModalProps) => <WalletModal {...props} />,
  };
}