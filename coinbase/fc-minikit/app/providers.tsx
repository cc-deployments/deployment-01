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
              name: 'CarMania Garage',        // Displayed in modal header
              logo: 'https://carmania.carculture.com/carmania-share.png',// Displayed in modal header
              mode: 'auto',                 // 'light' | 'dark' | 'auto'
              theme: 'default',             // 'default' or custom theme
            },
            // configure the wallet modal below
            wallet: {
              display: 'modal',
              termsUrl: 'https://carmania.carculture.com/terms',
              privacyUrl: 'https://carmania.carculture.com/privacy',
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
