// packages/shared-auth/config/wagmi.ts

import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

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