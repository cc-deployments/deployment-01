"use client";

import { type ReactNode, useEffect, useState } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
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
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
          chain={base}
          config={{
            appearance: {
              theme: 'light',
              variables: {
                colorPrimary: '#0052ff',
              },
            },
            walletConnect: {
              projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
