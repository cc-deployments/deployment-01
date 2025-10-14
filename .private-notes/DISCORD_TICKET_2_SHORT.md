# Discord Message - Ticket 8090392: Vercel Deployment Blocked

Hi Sohey,

**Separate Issue**: We have a critical Vercel deployment blocker preventing us from sharing a live demo of the NFTMintCard issues described in our ticket 14729681

## Current Status - Vercel Deployment Blocked

🚫 **Build Failure**: We cannot deploy to Vercel due to persistent React Error #31 during static generation  
🚫 **Error Location**: React Error #31 occurs during prerendering of `/404` page, even with `export const dynamic = 'force-dynamic'`  
🚫 **Next.js Version**: Using Next.js 15.5.3 - considering if this is a version compatibility issue  

## What We've Tried

### ✅ **Completed Fixes:**
1. **Removed invalid CSS** - Fixed `:contains()` pseudo-class rules
2. **Fixed API routes** - Added `export const dynamic = 'force-static'` to all API routes
3. **Optimized providers** - Removed redundant `BaseAuthProvider`
4. **Added output: export** - Disabled static generation to avoid React Error #31
5. **Removed Manifold API routes** - Deleted unnecessary API routes

### ❌ **Still Failing:**
- React Error #31 persists during prerendering of `/404` page
- Build process fails even with `export const dynamic = 'force-dynamic'`
- Error: "Objects are not valid as a React child (found: object with keys {$$typeof, type, key, ref, props})"

## Our Questions

1. **React Error #31:** Is this a known issue with React 19 + Next.js 15.5.3 + OnchainKit?
2. **Vercel Timeouts:** Why are builds taking 45+ minutes and timing out?
3. **output: 'export':** Is this the correct approach for OnchainKit MiniKit apps?

## Context

**Local development works perfectly** - issue is production deployment only. We need to be able to share with you.

**Repository:** `cc-deployments/deployment-01` (sohey-testing branch)  
**Priority:** URGENT - Production deployment blocked for 2+ days

**Request**: Can you help us resolve the React Error #31 deployment blocker so we can share a live demo?