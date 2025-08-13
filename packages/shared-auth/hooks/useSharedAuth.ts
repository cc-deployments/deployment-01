import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';

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
  const [miniKitContext, setMiniKitContext] = useState<any>(null);
  
  useEffect(() => {
    // Use dynamic import instead of require for better webpack compatibility
    const loadMiniKit = async () => {
      try {
        const { useMiniKit } = await import('@coinbase/onchainkit/minikit');
        const context = useMiniKit();
        setMiniKitContext(context);
      } catch (error) {
        console.log('MiniKit not available in this environment');
        setMiniKitContext(null);
      }
    };

    loadMiniKit();
  }, []);
  
  return {
    address,
    isConnected,
    chainId,
    connector,
    fid: miniKitContext?.fid,
    frameContext: miniKitContext?.frameContext,
  };
} 