import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { baseAccount, coinbaseWallet, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'CarCulture: CarMania Garage',
      appLogoUrl: 'https://carculture.com/logo.png',
    }),
    baseAccount({
      appName: 'CarCulture: CarMania Garage',
    }),
    injected()
  ],
  transports: {
    [base.id]: http()
  },
})




