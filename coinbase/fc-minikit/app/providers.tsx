'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';

export function Providers(props: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Call ready when the app loads in Farcaster
    sdk.actions.ready();
  }, []);

  // Don't render providers during SSR to avoid hydration issues
  if (!mounted) {
    return <>{props.children}</>;
  }

  // Skip OnchainKitProvider for error pages to prevent SSR conflicts
  const isErrorPage = pathname === '/404' || pathname === '/500' || pathname?.includes('/_error');
  
  if (isErrorPage) {
    return <>{props.children}</>;
  }

  return (
    <OnchainKitProvider
      apiKey="EkLP8filqrKyDZrEyPYc4cqgEsn7gDrk"
      projectId="1cceb0e4-e690-40ac-8f3d-7d1f3da1417a"
      chain={base}
      miniKit={{
        enabled: true
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}