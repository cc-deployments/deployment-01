"use client";

import { type ReactNode, useEffect } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'viem/chains';

export function Providers(props: { children: ReactNode }) {
  // Call ready when the app loads in Farcaster
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      address={undefined}
      config={{
        appearance: {
          name: "CarMania Gallery",
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  );
}
