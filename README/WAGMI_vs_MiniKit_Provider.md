# Wagmi + WalletConnect vs MiniKitProvider

## Overview

This project can be configured to use either:
- **Wagmi + WalletConnect (custom Providers)**
- **MiniKitProvider (from OnchainKit)**

Each approach has different implications for wallet connection, Farcaster integration, and code structure.

---

## 1. Wagmi + WalletConnect (Custom Providers)

- **Providers** wraps the app with WagmiProvider, OnchainKitProvider, and QueryClientProvider.
- Use this if you want full control over wallet connectors, custom UI, and direct access to Wagmi hooks.
- **Do NOT use MiniKitProvider or the `useMiniKit` hook** in this mode.
- Remove all MiniKit-specific logic/components.
- Best for: Custom wallet flows, advanced Wagmi usage, and when you want to support WalletConnect directly.

**Root layout example:**
```tsx
<Providers>
  {children}
</Providers>
```

---

## 2. MiniKitProvider (OnchainKit)

- **MiniKitProvider** is a higher-level provider from OnchainKit, designed for Farcaster miniapps and frame context.
- Use this if you want the MiniKit experience, Farcaster context, and built-in wallet UI.
- **You MUST use MiniKitProvider if you use the `useMiniKit` hook** or any MiniKit-specific components.
- Do NOT wrap your app in both MiniKitProvider and custom Providers.
- Best for: Farcaster miniapps, simple wallet flows, and when you want OnchainKit's built-in features.

**Root layout example:**
```tsx
<MiniKitProvider>
  {children}
</MiniKitProvider>
```

---

## ⚠️ Important Guidance
- **Do NOT use both MiniKitProvider and custom Providers at the same time.**
- If you see errors like `useMiniKit must be used within a MiniKitProvider`, it means you are using a MiniKit hook/component without the required provider.
- Decide which approach fits your app's needs, and remove the other from your root layout and codebase.

---

## Decision Log
- [2025-06-29] Switched to Providers (Wagmi + WalletConnect) for custom wallet support.
- [2025-06-29] Reverted to MiniKitProvider for Farcaster miniapp compatibility after testing.

---

## Troubleshooting
- **Unhandled error:** If you see a crash after removing MiniKitProvider, check for any `useMiniKit` usage in your components and remove or refactor it.
- **Wallet not connecting:** Ensure you are not double-wrapping providers and that your environment variables are correct.

---

## Privy Authentication

- As of this note, **Privy is NOT integrated** in the current CarCulture Miniapp codebase.
- Privy was present in an archived subproject (`_archive_neynar_v2`), but is not used in the main miniapp.
- If you want to add Privy for social login or passkey support, it will require a separate integration and provider setup.

---

## Fallback to WalletConnect Providers

- If MiniKitProvider does not support your desired wallet connection flow (e.g., WalletConnect QR code for mobile wallets in browser), you can switch back to the Wagmi + WalletConnect Providers setup.
- See the table above for guidance on which provider setup to use for your use case.

---

## Auth Mode (cb-minikit)

- This app uses **MiniKitProvider** for authentication.
- **Supported:** Coinbase Wallet dApp browser, Farcaster frames.
- **Not supported:** Generic browser login, WalletConnect QR code.
- If browser login or WalletConnect QR code is needed in the future, refactor to use Wagmi + WalletConnect Providers.

---

*This note documents the tradeoffs and setup for Wagmi + WalletConnect vs MiniKitProvider in the CarCulture Miniapp codebase.* 