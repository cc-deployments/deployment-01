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

// Add crypto polyfill if needed
if (typeof window !== 'undefined' && !window.crypto?.randomUUID) {
  window.crypto = {
    ...window.crypto,
    randomUUID: () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  };
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
    const initializeSDK = async () => {
      try {
        console.log('Initializing Base Account SDK...');
        
        // Initialize the Base Account SDK
        const baseAccountSDK = await createBaseAccountSDK({
          chain: base,
          apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '',
        });
        
        setSdk(baseAccountSDK);
        console.log('Base Account SDK initialized successfully');
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
    if (!sdk) {
      throw new Error('Base Account SDK is not available');
    }

    try {
      console.log('Connecting to Base Account...');
      
      // Use the Base Account SDK getProvider method and request accounts
      const provider = sdk.getProvider();
      if (!provider) {
        throw new Error('Base Account provider is not available');
      }

      // Request accounts using the provider
      const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
      
      if (accounts && Array.isArray(accounts) && accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        console.log('Base Account connected:', accounts[0]);
      } else {
        throw new Error('No accounts returned from Base Account');
      }
    } catch (error) {
      console.error('Base Account connection failed:', error);
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

