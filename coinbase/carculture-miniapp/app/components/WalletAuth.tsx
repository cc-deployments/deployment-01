'use client';

import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Address, Identity, EthBalance } from '@coinbase/onchainkit/identity';

export default function WalletAuth() {
  return (
    <div className="flex items-center space-x-2">
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name className="text-white" />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownLink
            icon="wallet"
            href="https://keys.coinbase.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
} 