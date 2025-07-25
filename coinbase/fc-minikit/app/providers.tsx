"use client";

import { type ReactNode, useEffect, useState } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sdk } from '@farcaster/miniapp-sdk';
import { getAppSpecificConfig } from '../../../packages/shared-config';

// Context provider for Farcaster SDK
function FarcasterContextProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const initializeFarcasterContext = async () => {
      try {
        console.log('🔧 Initializing Farcaster SDK context...');
        
        // Call ready() to dismiss splash screen
        await sdk.actions.ready();
        console.log('✅ SDK ready() called successfully');
        
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
  const [queryClient] = useState(() => new QueryClient());
  const config = getAppSpecificConfig('fc-minikit');

  return (
    <MiniKitProvider
      apiKey={config.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <QueryClientProvider client={queryClient}>
        <FarcasterContextProvider>
          {props.children}
        </FarcasterContextProvider>
      </QueryClientProvider>
    </MiniKitProvider>
  );
}
