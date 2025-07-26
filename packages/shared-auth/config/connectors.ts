// packages/shared-auth/config/connectors.ts

import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// Shared connector configurations
export const SHARED_CONNECTORS = [
  injected(),
  walletConnect({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  }),
  coinbaseWallet({
    appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'CarMania',
  }),
];

// Connector configurations for different environments
export const CONNECTOR_CONFIGS = {
  development: [
    injected(),
    coinbaseWallet({
      appName: 'CarMania Dev',
    }),
  ],
  production: SHARED_CONNECTORS,
}; 