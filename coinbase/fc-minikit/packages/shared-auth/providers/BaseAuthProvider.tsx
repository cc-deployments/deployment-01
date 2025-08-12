'use client';

import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import React, { ReactNode, useState } from 'react';

// Shared wagmi configuration
export function getSharedWagmiConfig() {
  return createConfig({
    chains: [base, baseSepolia],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
}

interface BaseAuthProviderProps {
  children: ReactNode;
  config?: ReturnType<typeof getSharedWagmiConfig>;
}

export function BaseAuthProvider({ children, config }: BaseAuthProviderProps) {
  const [wagmiConfig] = useState(() => config || getSharedWagmiConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 