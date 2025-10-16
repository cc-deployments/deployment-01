'use client';

import type { ReactNode } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { CDPHooksProvider } from '@coinbase/cdp-hooks';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { coinbaseWallet } from 'wagmi/connectors';

// Create wagmi config with proper connectors
const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'carculture.eth',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export function Providers(props: { children: ReactNode }) {
  // Call ready when the app loads in Farcaster
  sdk.actions.ready();

  return (
    <WagmiProvider config={wagmiConfig}>
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
          apiKey="EkLP8filqrKyDZrEyPYc4cqgEsn7gDrk"
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
    </WagmiProvider>
  );
}