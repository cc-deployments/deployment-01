'use client';

import { useIsSignedIn, useEvmAddress } from "@coinbase/cdp-hooks";

export function useCDPEmbeddedWallet() {
  const { isSignedIn } = useIsSignedIn();
  const { evmAddress } = useEvmAddress();

  return {
    isSignedIn,
    evmAddress,
    isConnected: isSignedIn,
    address: evmAddress,
  };
}




