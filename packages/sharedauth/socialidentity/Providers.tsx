import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Try to import usePrivyWagmi from Privy, fallback to error if not available
let usePrivyWagmi: any = undefined;
try {
  // @ts-ignore
  usePrivyWagmi = require('@privy-io/react-auth').usePrivyWagmi;
} catch (e) {
  usePrivyWagmi = () => { throw new Error('usePrivyWagmi is not available in your Privy SDK version. Please update @privy-io/react-auth.'); };
}

const queryClient = new QueryClient();

export default function Providers({ children }) {
  const wagmiConfig = usePrivyWagmi();
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}

