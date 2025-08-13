# Question for BASE AI: npm Error When Removing Farcaster SDK

## The Problem
We're following your recommendation to remove `@farcaster/miniapp-sdk` and use only MiniKit. However, we're encountering this npm error:

```bash
npm error Cannot read properties of undefined (reading 'extraneous')
```

## What We've Tried
1. `npm uninstall @farcaster/miniapp-sdk` - fails with the above error
2. `rm -rf node_modules package-lock.json` then `npm install` - still fails
3. Manually removed `"@farcaster/miniapp-sdk": "^0.1.7"` from package.json
4. `npm install` after manual removal - still gets the same error

## Current State
- We've successfully updated some components to use MiniKit instead of Farcaster SDK
- We've manually removed the Farcaster SDK from package.json
- But npm install is still failing with the "extraneous" error

## The Question
**How do we resolve this npm error and complete the Farcaster SDK removal?**

Should we:
1. Use a different npm command?
2. Try yarn instead of npm?
3. Delete the entire project and start fresh?
4. Use a different approach to clean the dependencies?

## Context
We're migrating from dual SDK usage (Farcaster SDK + MiniKit) to MiniKit-only as recommended by your documentation to resolve telemetry errors and mobile gesture conflicts.

---

**What's the recommended approach to safely complete this migration?** 