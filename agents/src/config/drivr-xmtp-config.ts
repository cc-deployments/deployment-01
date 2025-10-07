// DRIVR XMTP Configuration
import { DRIVRXMTPConfig } from '../../../packages/shared-xmtp/src/types';

export const DRIVR_XMTP_CONFIG: DRIVRXMTPConfig = {
  env: (process.env.XMTP_ENV as 'dev' | 'production') || 'dev',
  privateKey: process.env.DRIVR_AGENT_PRIVATE_KEY,
};

export const DRIVR_AGENT_CONFIG = {
  // XMTP Configuration
  XMTP_ENV: process.env.XMTP_ENV || 'dev',
  XMTP_PRIVATE_KEY: process.env.DRIVR_AGENT_PRIVATE_KEY,
  
  // Agent Configuration
  AGENT_NAME: 'DRIVR',
  AGENT_DESCRIPTION: 'CarCulture AI Assistant for automotive NFTs',
  AGENT_BASENAME: 'drivr.base.eth',
  
  // Payment Configuration
  PAYMENT_CURRENCY: 'ETH',
  PAYMENT_NETWORK: 'base',
  
  // Safe Integration
  SAFE_REVENUE_ADDRESS: process.env.SAFE_REVENUE_ADDRESS || '0x7d9bfEC6bDA952128D0321DeDa02199527A7b989',
  SAFE_COLD_STORAGE_ADDRESS: process.env.SAFE_COLD_STORAGE_ADDRESS || '0xBA03D53507412639795bDb3591aa3EE3ADe1881C',
  
  // NFT Collections
  CARMANIA_COLLECTION: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  
  // Base Network
  BASE_RPC_URL: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
  BASE_CHAIN_ID: 8453,
};

export const DRIVR_QUICK_ACTIONS = [
  {
    id: 'browse_nfts',
    label: 'Browse NFTs',
    action: 'browse_nfts',
    description: 'View available automotive NFTs'
  },
  {
    id: 'check_prices',
    label: 'Check Prices',
    action: 'check_prices',
    description: 'Get latest floor prices'
  },
  {
    id: 'find_car',
    label: 'Find Specific Car',
    action: 'find_car',
    description: 'Search for a particular car model'
  },
  {
    id: 'set_alerts',
    label: 'Set Price Alerts',
    action: 'set_alerts',
    description: 'Get notified when prices change',
    requiresPayment: true,
    paymentAmount: '0.001 ETH'
  },
  {
    id: 'purchase_nft',
    label: 'Purchase NFT',
    action: 'purchase_nft',
    description: 'Buy an automotive NFT',
    requiresPayment: true,
    paymentAmount: '0.05 ETH'
  }
];

export const DRIVR_RESPONSES = {
  GREETING: `Hello! I'm DRIVR, your CarCulture AI assistant! 🚗\n\nI can help you with:\n• Discovering automotive NFTs\n• Checking floor prices and market data\n• Finding specific car models\n• Processing purchases with x402 payments\n\nWhat would you like to explore today?`,
  
  HELP: `🆘 **DRIVR Help Center**\n\n**Available Commands:**\n• "Show NFTs" - Browse available collections\n• "Check prices" - Get current floor prices\n• "Find [car model]" - Search for specific cars\n• "Buy [NFT]" - Purchase an NFT\n• "Set alerts" - Set up price notifications\n\n**Payment Methods:**\n• x402 autonomous payments\n• Base Pay integration\n• Safe multisig fallback\n\nNeed more help? Just ask!`,
  
  ERROR: `Sorry, I encountered an error processing your request. Please try again or contact support if the issue persists.`,
  
  PAYMENT_REQUIRED: `This feature requires a small payment to access premium data and services. Would you like to proceed with payment?`,
  
  NFT_NOT_FOUND: `I couldn't find that specific NFT. Let me show you what's available in our collections.`,
  
  PRICE_UNAVAILABLE: `I'm having trouble getting the latest price data. Please try again in a moment.`
};

































