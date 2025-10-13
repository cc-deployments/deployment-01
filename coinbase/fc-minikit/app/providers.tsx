'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { BaseAccountProvider } from './components/BaseAccountProvider';
import { BaseAuthProvider } from '@cculture/shared-auth';
import { config } from './wagmi-config';

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <BaseAuthProvider config={config}>
      <BaseAccountProvider>
        {props.children}
      </BaseAccountProvider>
    </BaseAuthProvider>
  );
}