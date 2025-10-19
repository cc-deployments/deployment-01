'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'viem/chains';
import { config } from './wagmi-config';

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Call ready when the app loads in Farcaster
    sdk.actions.ready();
  }, []);

  // Don't render providers during SSR to avoid hydration issues
  if (!mounted) {
    return <>{props.children}</>;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          miniKit={{
            enabled: true,
            autoConnect: true,
            notificationProxyUrl: '/api/notify',
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}