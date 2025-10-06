'use client';

import { CDPReactProvider } from "@coinbase/cdp-react";
import type { ReactNode } from "react";

interface CDPEmbeddedWalletProviderProps {
  children: ReactNode;
  projectId?: string;
  appName?: string;
}

export function CDPEmbeddedWalletProvider({ 
  children, 
  projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || "1cceb0e4-e690-40ac-8f3d-7d1f3da1417a",
  appName = "CarCulture"
}: CDPEmbeddedWalletProviderProps) {
  return (
    <CDPReactProvider 
      config={{
        projectId: projectId,
        ethereum: {
          createOnLogin: "eoa" // Create EOA wallet on login
        },
        solana: {
          createOnLogin: false // Disable Solana for now
        },
        appName: appName
      }}
    >
      {children}
    </CDPReactProvider>
  );
}
