import React from 'react';
import { useAccount } from 'wagmi';
import { Name } from '@coinbase/onchainkit/identity';

export default function IdentityWrapper() {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) {
    return <div>Please connect your account to see your profile</div>;
  }

  return (
    <div>
      <div>
        ENS/Basename: <Name address={address} />
      </div>
      {/* ...other profile info... */}
    </div>
  );
} 