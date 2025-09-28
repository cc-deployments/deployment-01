// CarCulture DRIVR Agent Configuration
export const AGENT_CONFIG = {
  name: 'DRIVR',
  basename: 'drivr.base.eth',
  description: 'CarCulture AI Agent - Autonomous payment-enabled automotive NFT assistant',
  owner: 'CarCulture.eth',
  version: '1.0.0',
  features: [
    'x402 autonomous payments',
    'car style discovery',
    'NFT marketplace integration',
    'real-time market data',
    'Base network optimization'
  ],
  supportedNetworks: ['base', 'mainnet'],
  paymentMethods: ['x402', 'CDP OnRamp', 'Base Pay'],
  contact: {
    basename: 'drivr.base.eth',
    website: 'https://carculture.com',
    twitter: '@carculture'
  }
} as const;

export type AgentConfig = typeof AGENT_CONFIG;

<<<<<<< HEAD
=======









>>>>>>> a08cb119... 🚀 Implement complete XMTP integration for DRIVR agent and chat app
