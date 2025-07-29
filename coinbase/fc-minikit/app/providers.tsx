"use client";

import { type ReactNode, useEffect } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
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

// Context provider for Farcaster SDK
function FarcasterContextProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const initializeFarcasterContext = async () => {
      try {
        console.log('🔧 Initializing Farcaster SDK context...');
        
        // Get the context (it's async)
        const sdkContext = await sdk.context;
        console.log('📋 Farcaster SDK Context:', sdkContext);
        
        // Check if we're in Base App environment using recommended method
        const isInBaseApp = sdkContext?.client?.clientFid === 309857;
        console.log('📍 Is in Base App:', isInBaseApp);
        
        if (isInBaseApp) {
          // Base App exposes an EIP-1193 Ethereum Provider
          console.log('🔗 Base App EIP-1193 provider available');
        }
        
      } catch (error) {
        console.error('❌ Error initializing Farcaster context:', error);
      }
    };
    
    initializeFarcasterContext();
  }, []);

  return <>{children}</>;
}

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY || "test-key"}
      chain={baseChain}
    >
      <FarcasterContextProvider>
        {props.children}
      </FarcasterContextProvider>
    </MiniKitProvider>
  );
}
