'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'viem/chains';

export function Providers(props: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Call ready when the app loads in Farcaster
    sdk.actions.ready();
  }, []);

  // Don't render providers during SSR to avoid hydration issues
  if (!mounted) {
    return <>{props.children}</>;
  }

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY}
      chain={base}
    >
      {props.children}
    </MiniKitProvider>
  );
}