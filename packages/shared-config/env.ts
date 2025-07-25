// packages/shared-config/env.ts

export interface SharedEnvConfig {
  // OnchainKit Configuration
  NEXT_PUBLIC_ONCHAINKIT_API_KEY?: string;
  NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME?: string;
  
  // WalletConnect Configuration
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?: string;
  
  // Farcaster/MiniKit Configuration
  FARCASTER_HEADER?: string;
  FARCASTER_PAYLOAD?: string;
  FARCASTER_SIGNATURE?: string;
  
  // Neynar Configuration
  NEYNAR_API_KEY?: string;
  
  // Database/Storage Configuration
  DATABASE_URL?: string;
  REDIS_URL?: string;
  
  // Deployment Configuration
  VERCEL_URL?: string;
  CLOUDFLARE_API_TOKEN?: string;
}

export function getSharedEnvConfig(): SharedEnvConfig {
  return {
    // OnchainKit Configuration
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    
    // WalletConnect Configuration
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    
    // Farcaster/MiniKit Configuration
    FARCASTER_HEADER: process.env.FARCASTER_HEADER,
    FARCASTER_PAYLOAD: process.env.FARCASTER_PAYLOAD,
    FARCASTER_SIGNATURE: process.env.FARCASTER_SIGNATURE,
    
    // Neynar Configuration
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    
    // Database/Storage Configuration
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    
    // Deployment Configuration
    VERCEL_URL: process.env.VERCEL_URL,
    CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
  };
}

export function validateRequiredEnvVars(requiredVars: (keyof SharedEnvConfig)[]): void {
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
}

export function getAppSpecificConfig(appName: 'fc-minikit' | 'socialidentity' | 'nft-gallery'): SharedEnvConfig {
  const baseConfig = getSharedEnvConfig();
  
  // App-specific overrides or additions can go here
  switch (appName) {
    case 'fc-minikit':
      return {
        ...baseConfig,
        // FC MiniApp specific config
      };
    case 'socialidentity':
      return {
        ...baseConfig,
        // Social Identity specific config
      };
    case 'nft-gallery':
      return {
        ...baseConfig,
        // NFT Gallery specific config
      };
    default:
      return baseConfig;
  }
} 