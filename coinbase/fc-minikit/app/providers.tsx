"use client";

import { type ReactNode, useEffect, useState } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sdk } from '@farcaster/miniapp-sdk';
import { injected } from 'wagmi/connectors';

// Create wagmi config with Base chain and connectors
const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    // Removed WalletConnect to prevent double initialization
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

// Context provider for Farcaster SDK
function FarcasterContextProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

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
        
        // Log specific context details for debugging
        if (sdkContext?.location) {
          console.log('📍 Location context type:', sdkContext.location.type);
          if (sdkContext.location.type === 'cast_embed') {
            console.log('🎯 Cast embed detected!');
            console.log('📝 Cast text:', sdkContext.location.cast?.text);
            console.log('👤 Cast author:', sdkContext.location.cast?.author);
          }
        }
        
        if (sdkContext?.user) {
          console.log('👤 User context:', sdkContext.user);
        }
        
        if (sdkContext?.client) {
          console.log('📱 Client context:', sdkContext.client);
        }
        
        setIsInitialized(true);
        
      } catch (error) {
        console.error('❌ Error initializing Farcaster context:', error);
        setIsInitialized(true); // Still mark as initialized to prevent blocking
      }
    };
    
    initializeFarcasterContext();
  }, []);

  return (
    <div className={`farcaster-context ${isInitialized ? 'initialized' : 'loading'}`}>
      {children}
    </div>
  );
}

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: 'auto',
              theme: 'default',
            },
          }}
        >
          <FarcasterContextProvider>
            {props.children}
          </FarcasterContextProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
