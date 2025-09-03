"use client";

import { type ReactNode, useEffect } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
// TEMPORARILY DISABLED: OnchainKit dependency issue
// import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

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
  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    // TEMPORARILY DISABLED: OnchainKit dependency issue
    // <MiniKitProvider
    //   apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
    //   chain={baseChain}
    // >
    <>
      {props.children}
    </>
    // </MiniKitProvider>
  );
}
