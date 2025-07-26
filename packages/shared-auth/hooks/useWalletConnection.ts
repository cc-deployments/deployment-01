import { useConnect, useDisconnect } from 'wagmi';
import { useCallback } from 'react';

export function useWalletConnection() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = useCallback(async (connectorId?: string) => {
    const connector = connectorId
      ? connectors.find(c => c.id === connectorId)
      : connectors[0];

    if (connector) {
      connect({ connector });
    }
  }, [connect, connectors]);

  return { 
    connectWallet, 
    disconnect, 
    connectors,
    availableConnectors: connectors 
  };
} 