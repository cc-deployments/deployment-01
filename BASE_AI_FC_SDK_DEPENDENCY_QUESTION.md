# BASE AI Question: FC SDK Dependency Causing Authentication Issues

## Context
We have a MiniKit-only Farcaster Mini App that was working fine until we installed Farcaster SDK dependencies. Now we're getting authentication errors:

## Current Issues
1. **403 Forbidden** - `/api/jwt` endpoint failing
2. **Empty accounts list** - Provider not connecting properly  
3. **Login blocked** - Can't authenticate in incognito mode
4. **Runtime errors** - `tz.on is not a function` error

## What Changed
- **Before**: App worked fine with MiniKit-only architecture
- **After**: Installed `@farcaster/frame-sdk` and related dependencies
- **Result**: Authentication errors and runtime issues

## Questions for BASE AI

1. **Why did installing FC SDK cause authentication issues?**
   - We didn't have Privy authentication before
   - Now getting 403 errors on `/api/jwt`
   - Provider accounts list is empty

2. **Should we remove FC SDK dependencies completely?**
   - Our app is MiniKit-only and doesn't need FC SDK
   - FC SDK seems to be pulling in authentication dependencies we don't need
   - MiniKit should handle all Mini App functionality

3. **How to fix the `tz.on is not a function` error?**
   - This error appeared after FC SDK installation
   - Suggests a library initialization problem
   - Could be related to authentication libraries

4. **What's the correct MiniKit-only architecture?**
   - Should we use only `@coinbase/onchainkit/minikit`?
   - Remove all FC SDK and authentication dependencies?
   - Keep it simple with just MiniKit features?

## Current Dependencies
```json
{
  "@coinbase/onchainkit": "^0.0.1",
  "@coinbase/onchainkit/minikit": "^0.0.1",
  "@shared/auth": "file:../../../packages/shared-auth",
  "@shared/ui": "file:../../../packages/shared-ui"
}
```

## Goal
Return to a working MiniKit-only app without authentication issues or FC SDK dependencies. 