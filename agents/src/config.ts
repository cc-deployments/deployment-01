import { CarManiaAgentConfig } from './types/agent';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration for Drivr Agent
export const config: CarManiaAgentConfig = {
  walletPrivateKey: process.env.CARMANIA_AGENT_PRIVATE_KEY || '',
  openSeaApiKey: process.env.OPENSEA_API_KEY || '',
  baseRpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
  agentName: 'Drivr',
  agentDescription: 'Your AI assistant for all things CarMania - NFTs, galleries, and community!',
  supportedCollections: [
    // Add your CarMania NFT collection addresses here
    // Example: '0x1234567890123456789012345678901234567890',
    // You can add multiple collections for different tiers
  ],
};

// Validate configuration
export function validateConfig(config: CarManiaAgentConfig): void {
  const errors: string[] = [];

  if (!config.walletPrivateKey) {
    errors.push('CARMANIA_AGENT_PRIVATE_KEY is required');
  }

  if (!config.openSeaApiKey) {
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
      baseConfig.agentName = 'Drivr Dev';
      break;
    case 'testnet':
      baseConfig.baseRpcUrl = 'https://sepolia.base.org';
      baseConfig.agentName = 'Drivr Test';
      break;
    case 'production':
      baseConfig.baseRpcUrl = 'https://mainnet.base.org';
      baseConfig.agentName = 'Drivr';
      break;
  }
  
  return baseConfig;
}
