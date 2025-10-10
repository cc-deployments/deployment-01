"use client";

import { type ReactNode, useEffect, useState } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

// Dynamically import OnchainKitProvider to prevent SSR issues
const OnchainKitProvider = dynamic(
  () => import('@coinbase/onchainkit').then(mod => ({ default: mod.OnchainKitProvider })),
  { ssr: false }
);
import { BaseAccountProvider } from './components/BaseAccountProvider';
import { BaseAuthProvider } from '@cculture/shared-auth';
import { config } from './wagmi-config';

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isClient, setIsClient] = useState(false);

  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
    setIsClient(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'your-api-key'}
          projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a'}
          chain={base}
          miniKit={{ enabled: true }}
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
