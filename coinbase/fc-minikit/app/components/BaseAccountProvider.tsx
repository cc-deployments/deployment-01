'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { createBaseAccountSDK } from '@base-org/account';
import { base } from 'viem/chains';

// Extend Window interface for crypto polyfill
declare global {
  interface Window {
    crypto: {
      randomUUID: () => string;
    };
  }
}

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
    // Temporarily disable Base Account SDK to avoid crypto.randomUUID issues
    // The NFT purchase flow will work with standard wallet connections
    console.log('Base Account Provider initialized (SDK disabled for now)');
    
    // Set a mock SDK to prevent errors
    setSdk({ 
      getProvider: () => null,
      isConnected: false 
    });
  }, []);

  const connect = async () => {
    if (!sdk) return;

    try {
      // Use the correct Base Account SDK method
      const provider = sdk.getProvider();
      const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
      if (accounts && Array.isArray(accounts) && accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        console.log('Base Account connected:', accounts[0]);
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

