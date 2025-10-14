# BASE AI Question: Deprecated @farcaster/frame-sdk Causing 401 Errors

## Current Issue
We're getting 401 Unauthorized errors from `cca-lite.coinbase.com` and deprecation warnings about `@farcaster/frame-sdk`. The SDK is still present in our dependency tree even though we're not using it directly.

## Error Details
```
POST https://cca-lite.coinbase.com/metrics 401 (Unauthorized)
@farcaster/frame-sdk is deprecated. Please use @farcaster/miniapp-sdk instead.
```

## Current Setup
- Using `@coinbase/onchainkit` for MiniKit functionality
- No direct imports of `@farcaster/frame-sdk` in our code
- The deprecated SDK is coming through `@coinbase/onchainkit` dependencies
- We've tried disabling it in `next.config.mjs` with `'@farcaster/frame-sdk': false`

## Questions for BASE AI

1. **How to properly remove the deprecated SDK?** Should we:
   - Use npm resolutions to override it?
   - Update `@coinbase/onchainkit` to a newer version?
   - Manually exclude it from webpack?
   - Something else?

2. **Why are we getting 401 errors?** Are these related to:
   - The deprecated SDK trying to make API calls?
   - MiniKit provider initialization issues?
   - Authentication problems with Coinbase APIs?

3. **Best practices for MiniKit apps:** What's the recommended approach for:
   - Handling deprecated dependencies in MiniKit projects?
   - Avoiding 401 errors in development/production?
   - Ensuring clean dependency trees?

4. **Alternative solutions:** Should we:
   - Switch to a different MiniKit version?
   - Use a different approach for Mini App development?
   - Implement custom solutions to avoid the deprecated SDK?

## Current Dependencies
```json
{
  "@coinbase/onchainkit": "^0.38.18",
  "next": "15.3.4",
  "react": "^18",
  "react-dom": "^18",
  "react-swipeable": "^7.0.2"
}
```

## Environment
- Next.js 14 with App Router
- MiniKit for Farcaster Mini App development
- Vercel deployment
- Both mobile and desktop testing

Please provide guidance on the recommended approach to resolve these issues. 