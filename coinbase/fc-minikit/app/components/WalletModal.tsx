'use client';

import React from 'react';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Identity,
  Avatar,
  Name,
  Address,
  EthBalance,
} from '@coinbase/onchainkit/identity';

interface WalletModalProps {
  className?: string;
}

export function WalletModal({ className = '' }: WalletModalProps) {
  return (
    <div className={className}>
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}

// Hook for easy wallet modal usage
export function useWalletModal() {
  return {
    WalletModal: (props: WalletModalProps) => <WalletModal {...props} />,
  };
}