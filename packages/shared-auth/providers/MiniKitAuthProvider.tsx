'use client';

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
  // OnchainKit removed - using simple wrapper
  return <>{children}</>;
} 