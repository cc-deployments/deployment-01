# MiniApp Provider & SSR Issues — 2025-06-27

## Problem Summary

### 1. `useMiniKit must be used within a MiniKitProvider`
- **Cause:** Components using `useMiniKit` require the app to be wrapped in a `MiniKitProvider`.
- **Fix:** In `app/layout.tsx`, wrap your app with `<MiniKitProvider projectId={process.env.NEXT_PUBLIC_PROJECT_ID}>`.

### 2. `indexedDB is not defined` (WalletConnect SSR error)
- **Cause:** WalletConnect and Wagmi try to use `indexedDB` during SSR, which is not available in Node.js. This causes errors in Next.js apps.
- **Fix:** Move Wagmi/RainbowKit/OnchainKit providers into a client-only component and use dynamic import with `ssr: false` in `layout.tsx`.

---

## Solution: Example Layout

```tsx
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('../shared/identity/Providers'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MiniKitProvider projectId={process.env.NEXT_PUBLIC_PROJECT_ID}>
          <Providers>
            {children}
          </Providers>
        </MiniKitProvider>
      </body>
    </html>
  );
}
```

- Set all required env variables in `.env.local`.
- This ensures both MiniKit and WalletConnect work without SSR errors. 