// packages/shared-auth/config/chains.ts

import { base, baseSepolia } from 'wagmi/chains';

// Shared chain configurations
export const SHARED_CHAINS = [base, baseSepolia];

// Default chain for the application
export const DEFAULT_CHAIN = base;

// Chain configurations for different environments
export const CHAIN_CONFIGS = {
  development: [baseSepolia],
  production: [base],
  testnet: [baseSepolia],
  mainnet: [base],
}; 