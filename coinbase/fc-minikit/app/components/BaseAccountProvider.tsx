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
    // Initialize Base Account SDK for proper wallet detection
    const initializeSDK = async () => {
      try {
        const baseAccountSDK = await createBaseAccountSDK({
          // Remove chain parameter - not supported in current API
          // Add any required configuration here
        });
        
        console.log('Base Account SDK initialized successfully');
        setSdk(baseAccountSDK);
        
        // Check if already connected by trying to get accounts
        try {
          const accounts = await baseAccountSDK.getProvider().request({
            method: 'eth_accounts'
          }) as string[];
          if (accounts && accounts.length > 0) {
            setIsConnected(true);
            setAddress(accounts[0]);
          }
        } catch (error) {
          console.log('No existing connection found');
        }
      } catch (error) {
        console.error('Failed to initialize Base Account SDK:', error);
        // Set a mock SDK to prevent errors
        setSdk({ 
          getProvider: () => null,
          isConnected: false 
        });
      }
    };
    
    initializeSDK();
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

