import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { baseAccount, coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ 
      appName: 'CarCulture: CarMania Garage', 
      appLogoUrl: 'https://carculture.com/logo.png' 
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '6d64c482670aaba6a406a6377259d323',
    }),
    baseAccount({ 
      appName: 'CarCulture: CarMania Garage' 
    }),
    injected()
  ],
  transports: {
    [base.id]: http()
  },
})




