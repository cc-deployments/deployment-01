'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { BaseAuthProvider } from './BaseAuthProvider';

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
      {/* OnchainKit removed - using BaseAuthProvider only */}
      {children}
    </BaseAuthProvider>
  );
} 