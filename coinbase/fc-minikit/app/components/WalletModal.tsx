'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface WalletModalProps {
  className?: string;
}

export function WalletModal({ className = '' }: WalletModalProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <div className={className}>
        <button
          onClick={() => connect({ connector: injected() })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <div className="text-sm">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
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