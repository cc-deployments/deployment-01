'use client';

import { MiniKitProvider as BaseMiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';

interface MiniKitProviderProps {
  children: React.ReactNode;
}

export default function MiniKitProvider({ children }: MiniKitProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;

  if (!apiKey) {
    console.warn("API key for OnchainKit is not set in environment variables.");
  }
  
  return (
    <BaseMiniKitProvider
      apiKey={apiKey}
      notificationProxyUrl="/api/notification"
      chain={base}
      enableWalletAuth={true}
    >
      {children}
    </BaseMiniKitProvider>
  );
} 