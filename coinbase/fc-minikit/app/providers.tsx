'use client';

import type { ReactNode } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { base } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';

export function Providers(props: { children: ReactNode }) {
  // Call ready when the app loads in Farcaster
  sdk.actions.ready();

  return (
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
      {props.children}
    </OnchainKitProvider>
  );
}