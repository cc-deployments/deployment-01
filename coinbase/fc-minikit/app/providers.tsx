'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { BaseAccountProvider } from './components/BaseAccountProvider';
import { BaseAuthProvider } from '@cculture/shared-auth';
import { config } from './wagmi-config';

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isMounted, setIsMounted] = useState(false);

  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
    setIsMounted(true);
  }, []);

  // Prevent SSR issues by only rendering the provider on the client
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4 h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Initializing wallet services...</p>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'your-api-key'}
          chain={base}
          miniKit={{ enabled: true }}
          config={{
            appearance: {
              name: 'CarCulture',
              logo: '/carculture-wing-bl-logo.png',
              mode: 'light',
              theme: 'default',
            },
            wallet: {
              display: 'modal',
              termsUrl: 'https://carculture.com/terms',
              privacyUrl: 'https://carculture.com/privacy',
            },
          }}
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
