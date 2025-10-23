import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { baseAccount, coinbaseWallet, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({ 
      appName: 'CarCulture: CarMania Garage', 
      appLogoUrl: 'https://carculture.com/logo.png' 
    }),
    baseAccount({ 
      appName: 'CarCulture: CarMania Garage' 
    }),
    injected()
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http()
  },
})




