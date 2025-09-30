'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface BaseAccountContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  sdk: any;
}

const BaseAccountContext = createContext<BaseAccountContextType | undefined>(undefined);

export function useBaseAccount() {
  const context = useContext(BaseAccountContext);
  if (context === undefined) {
    throw new Error('useBaseAccount must be used within a BaseAccountProvider');
  }
  return context;
}

interface BaseAccountProviderProps {
  children: React.ReactNode;
}

export function BaseAccountProvider({ children }: BaseAccountProviderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sdk, setSdk] = useState<any>(null);

  useEffect(() => {
    // Polyfill crypto.randomUUID if not available
    if (!crypto.randomUUID) {
      crypto.randomUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
    }

    // Initialize OnchainKit with default setup
    const initializeSDK = async () => {
      try {
        // Import OnchainKit components
        const { OnchainKitProvider, OnchainKit } = await import('@coinbase/onchainkit');
        
        // For now, create a simple mock SDK for testing
        const mockSDK = {
          connect: async () => {
            // Simulate wallet connection
            const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
            return { address: mockAddress };
          },
          getProvider: () => null,
          isConnected: false
        };
        
        setSdk(mockSDK);
        console.log('OnchainKit initialized with mock SDK');
      } catch (error) {
        console.error('Error initializing OnchainKit:', error);
        // Fallback to mock SDK
        const mockSDK = {
          connect: async () => {
            const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
            return { address: mockAddress };
          },
          getProvider: () => null,
          isConnected: false
        };
        setSdk(mockSDK);
      }
    };

    initializeSDK();
  }, []);

  const connect = async () => {
    if (!sdk) {
      console.error('SDK not initialized');
      return;
    }

    try {
      const result = await sdk.connect();
      if (result && result.address) {
        setAddress(result.address);
        setIsConnected(true);
        console.log('Wallet connected:', result.address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    console.log('Wallet disconnected');
  };

  const value = {
    address,
    isConnected,
    connect,
    disconnect,
    sdk
  };

  return (
    <BaseAccountContext.Provider value={value}>
      {children}
    </BaseAccountContext.Provider>
  );
}
