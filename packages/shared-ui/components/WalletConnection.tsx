'use client';

import React from 'react';
import { useSharedAuth, useWalletConnection } from '../../shared-auth/hooks';
// RainbowKit import removed - OnchainKit handles wallet connections
import { Wallet } from '@coinbase/onchainkit/wallet';

interface WalletConnectionProps {
  variant?: 'minikit' | 'rainbowkit' | 'onchainkit';
  className?: string;
}

export function WalletConnection({ 
  variant = 'onchainkit', 
  className = '' 
}: WalletConnectionProps) {
  const { isConnected, address, fid } = useSharedAuth();

  // MiniKit apps use OnchainKit Wallet component
  if (variant === 'minikit') {
    return (
      <div className={className}>
        <Wallet />
      </div>
    );
  }

  // Standard apps can use RainbowKit (fallback to OnchainKit)
  if (variant === 'rainbowkit') {
    return (
      <div className={className}>
        <Wallet />
      </div>
    );
  }

  // Default to OnchainKit
  return (
    <div className={className}>
      <Wallet />
    </div>
  );
}

export default WalletConnection; 