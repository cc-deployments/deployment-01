# Question for BASE AI: Runtime Errors in Farcaster Mini App

## Current Issues:
1. **Vercel deployment shows "Loading..." on black background** - app partially loads but doesn't fully render
2. **Console shows 401 Unauthorized errors** for `cca-lite.coinbase.co` POST requests
3. **Mobile swipe gestures not working** - can't navigate off gallery-hero page
4. **Desktop localhost also has gesture issues**

## Error Details:
- App compiles successfully locally
- Component renders (`🎨 GalleryHero component rendering...`)
- MiniKit hooks work (`🔍 composeCast available: true`)
- But app gets stuck on loading screen in Vercel deployment
- 401 errors suggest authentication issues with Coinbase services

## Question for BASE AI:
**What is the correct debugging sequence for Farcaster Mini App runtime errors? Specifically:**

1. **Should we fix the 401 Unauthorized errors first, or focus on mobile swipe gestures?**
2. **Are the 401 errors from `cca-lite.coinbase.co` blocking the app from fully loading?**
3. **What's the proper way to handle SDK initialization when there are authentication errors?**
4. **Should we implement fallback behavior when SDK fails to initialize?**

The app works locally but fails on Vercel deployment. What's the debugging priority? 