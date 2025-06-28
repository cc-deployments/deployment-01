'use client';

import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Address, Identity, EthBalance } from '@coinbase/onchainkit/identity';

export default function WalletAuth() {
  return (
    <div className="flex items-center">
      <Wallet>
        <ConnectWallet>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg border border-red-500">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">🔗</span>
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Connect Wallet</span>
            <span className="text-sm font-semibold sm:hidden">Connect</span>
          </div>
        </ConnectWallet>
        <WalletDropdown>
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            <Identity className="px-4 pt-4 pb-3 bg-gradient-to-r from-gray-800 to-gray-900" hasCopyAddressOnClick={true}>
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-10 h-10 border-2 border-red-500" />
                <div className="flex-1 min-w-0">
                  <Name className="text-white font-semibold text-sm truncate" />
                  <Address className="text-gray-400 text-xs truncate" />
                </div>
              </div>
              <EthBalance className="text-green-400 text-sm font-mono" />
            </Identity>
            <div className="border-t border-gray-700">
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 hover:bg-gray-800 transition-colors duration-200"
              >
                <span className="text-white text-sm">Wallet</span>
              </WalletDropdownLink>
              <div className="px-4 py-3 hover:bg-gray-800 transition-colors duration-200 text-red-400 hover:text-red-300">
                <WalletDropdownDisconnect />
              </div>
            </div>
          </div>
        </WalletDropdown>
      </Wallet>
    </div>
  );
} 