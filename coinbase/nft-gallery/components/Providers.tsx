'use client';

import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { useState } from 'react';

// Create wagmi config with proper connectors
const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    coinbaseWallet({
      appName: 'CarCulture', // Changed from 'carculture.eth' to app name
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey="EkLP8filqrKyDZrEyPYc4cqgEsn7gDrk"
          chain={base}
          config={{
            wallet: {
              display: 'modal',
            }
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 