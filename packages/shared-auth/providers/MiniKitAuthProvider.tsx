'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';
import { ReactNode } from 'react';

interface MiniKitAuthProviderProps {
  children: ReactNode;
  apiKey?: string;
  projectName?: string;
}

export function MiniKitAuthProvider({ 
  children, 
  apiKey,
  projectName 
}: MiniKitAuthProviderProps) {
  return (
    <MiniKitProvider
      apiKey={apiKey || process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: projectName || process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
} 