"use client";

import React, { type ReactNode } from "react";
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

// Define Base chain
const baseChain = {
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY || "test-key"}
      chain={baseChain}
    >
      {children}
    </MiniKitProvider>
  );
} 