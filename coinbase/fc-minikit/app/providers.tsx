"use client";

import { type ReactNode } from "react";
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

// Define Base chain without wagmi import
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

export function Providers(props: { children: ReactNode }) {
  // Simple test log to see if this component runs
  console.log('🚀 Providers component is running!');
  
  // Debug logging
  console.log('🔑 Providers: API Key loaded:', process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY ? 'YES' : 'NO');
  console.log('🔑 Providers: API Key length:', process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY?.length || 0);
  console.log('🔑 Providers: API Key starts with:', process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY?.substring(0, 10) || 'NONE');
  console.log('🔑 Providers: Project Name:', process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME);

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY || "test-key"}
      chain={baseChain}
    >
      {props.children}
    </MiniKitProvider>
  );
}
