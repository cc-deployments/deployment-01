import React from 'react';
import { usePrivy, useWallets } from '@cculture/privy';
import { useAccount, useEnsName } from 'wagmi';

export default function WalletWrapper() {
  const { login, logout, user, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  if (!ready) return <div>Loading...</div>;

  if (!authenticated) {
    return <button onClick={login}>Sign in / Connect Wallet</button>;
  }

  const activeWallet = wallets[0];
  let userLabel: string = '';
  if (activeWallet && typeof activeWallet.address === 'string') {
    userLabel = activeWallet.address;
  } else if (user && typeof user.email === 'string') {
    userLabel = user.email;
  } else {
    userLabel = 'User';
  }

  return (
    <div>
      <div>
        Connected as: {userLabel}
      </div>
      <button onClick={logout}>Log out</button>
      {/* Debug info */}
      <div style={{ marginTop: 16, fontSize: 12, color: '#888' }}>
        <div>Debug info:</div>
        <div>isConnected: {String(isConnected)}</div>
        <div>address: {address}</div>
        <div>ENS/Basename: {ensName || '(none found)'}</div>
      </div>
    </div>
  );
} 