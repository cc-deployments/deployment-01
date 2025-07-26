import { useAccount, useConnect, useDisconnect } from 'wagmi';

export interface SharedAuthState {
  address?: string;
  isConnected: boolean;
  chainId?: number;
  fid?: string;        // MiniKit-specific
  frameContext?: any;  // MiniKit-specific
  connector?: any;     // Standard web3-specific
}

export function useSharedAuth(): SharedAuthState {
  const { address, isConnected, chainId, connector } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  let miniKitContext;
  try {
    // Import useMiniKit only if available
    const { useMiniKit } = require('@coinbase/onchainkit/minikit');
    miniKitContext = useMiniKit();
  } catch {
    // MiniKit not available in this environment
  }
  
  return {
    address,
    isConnected,
    chainId,
    connector,
    fid: miniKitContext?.fid,
    frameContext: miniKitContext?.frameContext,
  };
} 