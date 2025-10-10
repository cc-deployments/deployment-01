"use client";

import { type ReactNode, useEffect, useState } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BaseAccountProvider>
          <BaseAuthProvider>
            {props.children}
          </BaseAuthProvider>
        </BaseAccountProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
