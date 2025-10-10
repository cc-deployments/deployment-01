import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'StableLink',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [base],
  ssr: true, // Enable SSR support to prevent hydration errors
})




