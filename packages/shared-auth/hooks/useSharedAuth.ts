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
  
  // Try to get MiniKit context if available
  let miniKitContext;
  try {
    // This will only work in MiniKit environment
    const { useMiniKit } = require('@coinbase/onchainkit/minikit');
    miniKitContext = useMiniKit();
  } catch {
    // MiniKit not available in this environment
    miniKitContext = null;
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