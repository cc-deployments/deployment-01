'use client';
import { PrivyProvider } from '@privy-io/react-auth';
import { base } from 'wagmi/chains';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider 
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Base chain configuration for Coinbase ecosystem
        defaultChain: base,
        supportedChains: [base],
        // Login methods optimized for Coinbase
        loginMethods: ['email', 'wallet', 'google'],
        // Embedded wallets for better UX
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
} 