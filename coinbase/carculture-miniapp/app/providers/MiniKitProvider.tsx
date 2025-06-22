'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { ReactNode } from 'react';
import { base } from 'wagmi/chains';

export function MiniKitContextProvider({ children }: { children: ReactNode }) {
  // TODO: Get a projectId from https://cloud.wallet.coinbase.com/
  const projectId = 'e8712a4b5536417b34a6549a0c293f84';

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
      chain={base}
      projectId={projectId}
      // Optional: If you want to customize notification handling
      // notificationProxyUrl="/api/notification" 
    >
      {children}
    </MiniKitProvider>
  );
} 