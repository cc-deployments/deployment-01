// packages/shared-config/env.ts

export interface SharedEnvConfig {
  NEXT_PUBLIC_ONCHAINKIT_API_KEY?: string;
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?: string;
  NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME?: string;
  // MiniKit specific
  FARCASTER_HEADER?: string;
  FARCASTER_PAYLOAD?: string;
  FARCASTER_SIGNATURE?: string;
}

export function getSharedEnvConfig(): SharedEnvConfig {
  return {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    FARCASTER_HEADER: process.env.FARCASTER_HEADER,
    FARCASTER_PAYLOAD: process.env.FARCASTER_PAYLOAD,
    FARCASTER_SIGNATURE: process.env.FARCASTER_SIGNATURE,
  };
}

// Helper function to get environment-specific configuration
export function getEnvironmentConfig() {
  const config = getSharedEnvConfig();
  
  return {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://onchain-app-template.vercel.app',
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