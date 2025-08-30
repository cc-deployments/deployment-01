import { CarManiaAgentConfig } from './types/agent';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration for Drivr Agent
export const config: CarManiaAgentConfig = {
  walletPrivateKey: process.env.CARMANIA_AGENT_PRIVATE_KEY || '',
  env: (process.env.NODE_ENV as 'dev' | 'testnet' | 'production') || 'production',
  openseaApiKey: process.env.OPENSEA_API_KEY || '',
  baseRpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
  openseaBaseUrl: 'https://api.opensea.io',
  openseaApiEndpoint: '/api/v1',
  supportedCollections: [
    // Add your CarMania NFT collection addresses here
    // Example: '0x1234567890123456789012345678901234567890',
    // You can add multiple collections for different tiers
  ],
  // Smart Contract Addresses (Base chain)
  provenanceContractAddress: process.env.PROVENANCE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  mintingContractAddress: process.env.MINTING_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  communityContractAddress: process.env.COMMUNITY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
};

// Validate configuration
export function validateConfig(config: CarManiaAgentConfig): void {
  const errors: string[] = [];

  if (!config.walletPrivateKey) {
    errors.push('CARMANIA_AGENT_PRIVATE_KEY is required');
  }

  if (!config.openseaApiKey) {
    errors.push('OPENSEA_API_KEY is required');
  }

  if (config.supportedCollections.length === 0) {
    errors.push('At least one supported collection address is required');
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
}

// Get environment-specific configuration
export function getConfigForEnvironment(env: 'development' | 'testnet' | 'production'): CarManiaAgentConfig {
  const baseConfig = { ...config };
  
  switch (env) {
    case 'development':
      baseConfig.baseRpcUrl = 'https://sepolia.base.org';
      // baseConfig.agentName = 'DRIVR Dev'; // Removed - not in interface
      break;
    case 'testnet':
      baseConfig.baseRpcUrl = 'https://sepolia.base.org';
      // baseConfig.agentName = 'DRIVR Test'; // Removed - not in interface
      break;
    case 'production':
      baseConfig.baseRpcUrl = 'https://mainnet.base.org';
      // baseConfig.agentName = 'DRIVR'; // Removed - not in interface
      break;
  }
  
  return baseConfig;
}
