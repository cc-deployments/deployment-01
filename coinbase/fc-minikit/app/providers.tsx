'use client';

import type { ReactNode } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { CDPHooksProvider } from '@coinbase/cdp-hooks';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';

export function Providers(props: { children: ReactNode }) {
  // Call ready when the app loads in Farcaster
  sdk.actions.ready();

  return (
    <CDPHooksProvider
      config={{
        projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a',
        ethereum: { 
          createOnLogin: 'eoa' 
        },
        solana: { 
          createOnLogin: false 
        }
      }}
    >
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a'}
        chain={base}
        config={{
          wallet: {
            display: 'modal',
          }
        }}
        miniKit={{
          enabled: true
        }}
      >
        {props.children}
      </OnchainKitProvider>
    </CDPHooksProvider>
  );
}