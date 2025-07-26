'use client';

import React, { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { BaseAuthProvider } from './BaseAuthProvider';
import { base } from 'wagmi/chains';

interface StandardAuthProviderProps {
  children: ReactNode;
  apiKey?: string;
  projectName?: string;
}

export function StandardAuthProvider({ 
  children, 
  apiKey,
  projectName 
}: StandardAuthProviderProps) {
  return (
    <BaseAuthProvider>
      <OnchainKitProvider
        apiKey={apiKey || process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            name: projectName || process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          },
        }}
      >
        {children}
      </OnchainKitProvider>
    </BaseAuthProvider>
  );
} 