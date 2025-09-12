'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { createBaseAccountSDK } from '@base-org/account';
import { base } from 'viem/chains';

interface BaseAccountContextType {
  sdk: any;
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const BaseAccountContext = createContext<BaseAccountContextType | null>(null);

export function useBaseAccount() {
  const context = useContext(BaseAccountContext);
  if (!context) {
    throw new Error('useBaseAccount must be used within a BaseAccountProvider');
  }
  return context;
}

export function BaseAccountProvider({ children }: { children: ReactNode }) {
  const [sdk, setSdk] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Base Account SDK
    const baseAccount = createBaseAccountSDK({
      appName: 'CarMania Gallery',
      appLogo: 'https://carmania.carculture.com/carmania-share.png',
      chain: base,
    });

    setSdk(baseAccount);

    // Check if already connected
    const checkConnection = async () => {
      try {
        const provider = baseAccount.getProvider();
        if (provider) {
          const accounts = await provider.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.log('No existing connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    if (!sdk) return;

    try {
      const provider = sdk.getProvider();
      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Connection failed:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <BaseAccountContext.Provider
      value={{
        sdk,
        isConnected,
        address,
        connect,
        disconnect,
      }}
    >
      {children}
    </BaseAccountContext.Provider>
  );
}
