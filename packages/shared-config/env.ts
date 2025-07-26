// packages/shared-config/env.ts

export interface SharedEnvConfig {
  // OnchainKit Configuration
  NEXT_PUBLIC_ONCHAINKIT_API_KEY?: string;
  NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME?: string;
  
  // Farcaster MiniApp specific
  FARCASTER_HEADER?: string;
  FARCASTER_PAYLOAD?: string;
  FARCASTER_SIGNATURE?: string;
  
  // Privy Authentication
  NEXT_PUBLIC_PRIVY_APP_ID?: string;
  
  // App Configuration
  NEXT_PUBLIC_APP_URL?: string;
  NODE_ENV?: string;
  
  // Smart Contract Addresses
  NEXT_PUBLIC_BASE_ERC721_CONTRACT?: string;
  NEXT_PUBLIC_BASE_ERC1155_CONTRACT?: string;
  NEXT_PUBLIC_CARMANIA_ERC721_CONTRACT?: string;
  NEXT_PUBLIC_CARMANIA_ERC1155_CONTRACT?: string;
  NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS?: string;
  
  // Neynar API (for archived components)
  NEXT_PUBLIC_NEYNAR_API_KEY?: string;
}

export function getSharedEnvConfig(): SharedEnvConfig {
  return {
    // OnchainKit Configuration
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    
    // Farcaster MiniApp specific
    FARCASTER_HEADER: process.env.FARCASTER_HEADER,
    FARCASTER_PAYLOAD: process.env.FARCASTER_PAYLOAD,
    FARCASTER_SIGNATURE: process.env.FARCASTER_SIGNATURE,
    
    // Privy Authentication
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    
    // App Configuration
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    
    // Smart Contract Addresses
    NEXT_PUBLIC_BASE_ERC721_CONTRACT: process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT,
    NEXT_PUBLIC_BASE_ERC1155_CONTRACT: process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT,
    NEXT_PUBLIC_CARMANIA_ERC721_CONTRACT: process.env.NEXT_PUBLIC_CARMANIA_ERC721_CONTRACT,
    NEXT_PUBLIC_CARMANIA_ERC1155_CONTRACT: process.env.NEXT_PUBLIC_CARMANIA_ERC1155_CONTRACT,
    NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS,
    
    // Neynar API (for archived components)
    NEXT_PUBLIC_NEYNAR_API_KEY: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
}

// Helper function to get environment-specific configuration
export function getEnvironmentConfig() {
  const config = getSharedEnvConfig();
  
  return {
    isDevelopment: config.NODE_ENV === 'development',
    isProduction: config.NODE_ENV === 'production',
    appUrl: config.NEXT_PUBLIC_APP_URL || 'https://onchain-app-template.vercel.app',
  };
}

// Helper function to validate required environment variables
export function validateRequiredEnvVars(requiredVars: (keyof SharedEnvConfig)[]) {
  const config = getSharedEnvConfig();
  const missing: string[] = [];
  
  for (const varName of requiredVars) {
    if (!config[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return config;
} 