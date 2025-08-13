# Question for BASE AI: Dual SDK Conflict Resolution

## Current Situation
We have a Next.js Mini App that currently has **both SDKs installed**:
- `@farcaster/miniapp-sdk` (v0.1.7)
- `@coinbase/onchainkit` (v0.38.15)

## The Problem
According to your documentation, using both SDKs simultaneously causes:
- Telemetry script errors
- Mobile gesture conflicts
- Runtime errors preventing navigation

## Our Current State
- We have MiniKit already integrated with `<MiniKitProvider>`
- We have existing pages using `useMiniKit()` hooks
- But we also have Farcaster SDK imports in several files:
  - `gallery-hero-2/page.tsx`
  - `text-page/page.tsx` 
  - `EmbedHandler.tsx`
  - `ShareHandler.tsx`

## The Question
**Should we:**

1. **Remove `@farcaster/miniapp-sdk` completely** and replace all Farcaster SDK calls with MiniKit equivalents?

2. **Keep both SDKs** but ensure they don't conflict by using them in different contexts?

3. **Gradually migrate** from Farcaster SDK to MiniKit over time?

## Specific Issues We're Facing
- `npm uninstall @farcaster/miniapp-sdk` fails with "Cannot read properties of undefined (reading 'extraneous')"
- Some components still import `sdk` from `@farcaster/miniapp-sdk`
- We want to maintain Farcaster sharing functionality

## What's the recommended approach for safely removing the Farcaster SDK while preserving all functionality?

---

**Context**: We're building a car gallery Mini App that needs to work on both Base App and Farcaster, with swipe navigation and social sharing features. 