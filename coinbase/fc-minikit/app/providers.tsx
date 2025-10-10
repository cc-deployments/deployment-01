'use client';

import { useState, useEffect, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { BaseAccountProvider } from './components/BaseAccountProvider';
import { BaseAuthProvider } from '@cculture/shared-auth';
import { config } from './wagmi-config';

// Dynamically import OnchainKitProvider to prevent SSR issues
const OnchainKitProvider = dynamic(
  () => import('@coinbase/onchainkit').then(mod => ({ default: mod.OnchainKitProvider })),
  { ssr: false }
);

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
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'your-api-key'}
          chain={base}
        >
          <BaseAccountProvider>
            <BaseAuthProvider>
              {props.children}
            </BaseAuthProvider>
          </BaseAccountProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
