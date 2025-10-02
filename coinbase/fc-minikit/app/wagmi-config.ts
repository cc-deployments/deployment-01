import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { baseAccount, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    baseAccount({
      appName: 'CarCulture: CarMania Garage',
    }),
    injected()
  ],
  transports: {
    [base.id]: http()
  },
})




