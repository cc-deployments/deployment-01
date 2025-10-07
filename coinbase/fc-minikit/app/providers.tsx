"use client";

import { type ReactNode, useEffect, useState } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CDPHooksProvider } from '@coinbase/cdp-hooks';
import { config } from './wagmi-config';
import { SECURITY_CONFIG } from '../lib/security';

// CDP Configuration
const cdpConfig = {
  projectId: SECURITY_CONFIG.CDP_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY,
  basePath: "https://api.cdp.coinbase.com/platform",
  useMock: false,
  debugging: process.env.NODE_ENV === 'development',
  ethereum: { createOnLogin: 'eoa' as const },
  solana: { createOnLogin: false },
};

// Debug CDP configuration
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 CDP Config:', {
    projectId: cdpConfig.projectId,
    apiKey: cdpConfig.apiKey ? '✅ Present' : '❌ Missing',
    basePath: cdpConfig.basePath
  });
}

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isMounted, setIsMounted] = useState(false);

  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
    setIsMounted(true);
  }, []);

  // Prevent SSR issues by only rendering the provider on the client
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4 h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Initializing wallet services...</p>
        </div>
      </div>
    );
  }

  return (
    <CDPHooksProvider config={cdpConfig}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </WagmiProvider>
    </CDPHooksProvider>
  );
}
