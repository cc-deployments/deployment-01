# Question for BASE AI: SHARE Button Not Working on Mobile

## Issue
Our Farcaster Mini App SHARE button works on desktop but fails on mobile. 

## Current Implementation
```javascript
// Using MiniKit's useOpenUrl hook
import { useOpenUrl } from '@coinbase/onchainkit/minikit';
const openUrl = useOpenUrl();

// SHARE button onClick
onClick={() => {
  console.log('🎯 Share button clicked - using MiniKit openUrl');
  openUrl('/share');
}}
```

## Environment Details
- **Framework**: Next.js 15.3.4 with App Router
- **Mini App Library**: MiniKit (`@coinbase/onchainkit/minikit`)
- **Deployment**: Vercel
- **Mobile Testing**: iOS/Android via QR code

## Behavior
- ✅ **Desktop**: SHARE button works, navigates to `/share` page
- ❌ **Mobile**: SHARE button does not respond to touch
- ✅ **UNLOCK button**: Works on both desktop and mobile

## Questions for BASE AI
1. **Mobile Touch Issue**: Why does `openUrl('/share')` work on desktop but not mobile?
2. **MiniKit Mobile Compatibility**: Are there known issues with MiniKit's `useOpenUrl` on mobile devices?
3. **Alternative Approach**: Should we use a different MiniKit hook for mobile sharing?
4. **Touch Event Handling**: Do we need additional touch event handling for mobile?

**What's the correct MiniKit approach for mobile-compatible sharing?** 