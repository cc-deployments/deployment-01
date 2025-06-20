"use client";

import React from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity, Address, Avatar } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';

export function OnchainKitAuth() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center gap-4">
      <ConnectWallet />
      {isConnected && (
        <div className="mt-4 flex flex-col items-center gap-3 p-4 border rounded-lg">
          <Identity>
            <Avatar />
            <Address />
          </Identity>
        </div>
      )}
    </div>
  );
} 