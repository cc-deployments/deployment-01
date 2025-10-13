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
  const [isMounted, setIsMounted] = useState(false);

  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
    setIsMounted(true);
  }, []);

  // SSR protection - prevent hydration mismatches
  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <BaseAuthProvider config={config}>
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
          {props.children}
        </BaseAccountProvider>
      </OnchainKitProvider>
    </BaseAuthProvider>
  );
}