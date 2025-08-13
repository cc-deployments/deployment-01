// packages/shared-auth/types/auth.ts

export interface SharedAuthState {
  address?: string;
  isConnected: boolean;
  chainId?: number;
  fid?: string;        // MiniKit-specific
  frameContext?: any;  // MiniKit-specific
  connector?: any;     // Standard web3-specific
}

export interface WalletConnectionState {
  connectWallet: (connectorId?: string) => Promise<void>;
  disconnect: () => void;
  connectors: any[];
  availableConnectors: any[];
}

export interface AuthProviderProps {
  children: React.ReactNode;
  apiKey?: string;
  projectName?: string;
  config?: any;
} 