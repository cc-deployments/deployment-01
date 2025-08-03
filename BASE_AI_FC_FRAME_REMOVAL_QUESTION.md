# Question for BASE AI: Removing fc:frame Conflicts for Farcaster Mini App

## Issue Description
Our Farcaster Mini App was showing a black screen with "Loading..." on Vercel deployment due to conflicting meta tags.

## Current Implementation
```tsx
// layout.tsx - BEFORE (causing conflicts)
<head>
  <meta name="fc:miniapp" content='{"version":"1",...}' />
  <meta name="fc:frame" content='{"version":"1",...}' />  // ❌ CONFLICTING
</head>

// layout.tsx - AFTER (fixed)
export const metadata: Metadata = {
  title: 'CarCulture: CarMania Garage',
  description: 'Explore the ultimate car gallery experience',
  other: {
    'fc:miniapp': '{"version":"1",...}'  // ✅ ONLY MINI APP
  }
}
```

## Technical Details
- **Framework**: Next.js 15.3.4 with App Router
- **Mini App Library**: MiniKit (`@coinbase/onchainkit/minikit`)
- **Deployment**: Vercel
- **Issue**: Manual `<head>` tags in App Router + conflicting `fc:frame` meta tag

## Problem Analysis
1. **Manual `<head>` tags** - Not allowed in Next.js App Router
2. **Conflicting meta tags** - `fc:frame` and `fc:miniapp` both present
3. **Runtime errors** - Causing black screen with "Loading..." on Vercel
4. **Build successful** - No compilation errors, but runtime issues

## Questions for BASE AI

### 1. **Meta Tag Conflicts**
- **Is it correct to remove `fc:frame` entirely for Mini Apps?**
- **Should we use only `fc:miniapp` for Farcaster Mini Apps?**
- **Are there any backward compatibility concerns?**

### 2. **Next.js App Router Best Practices**
- **Is using `metadata.other` the correct approach for custom meta tags?**
- **Should we avoid manual `<head>` tags in App Router?**
- **What's the proper way to add custom meta tags in App Router?**

### 3. **Mini App vs Frame Confusion**
- **What's the difference between `fc:frame` and `fc:miniapp`?**
- **When should we use each one?**
- **Are they mutually exclusive or can they coexist?**

### 4. **Deployment Issues**
- **Why would conflicting meta tags cause runtime errors?**
- **Is the black screen issue related to meta tag conflicts?**
- **What's the proper debugging approach for Mini App deployment issues?**

## Expected Behavior
- **Mini App should load properly** on Vercel without black screen
- **Only `fc:miniapp` meta tag** should be present
- **No `fc:frame` conflicts** in the HTML output
- **Proper Mini App functionality** in Farcaster clients

## Current Status
- ✅ **Build successful** - No compilation errors
- ✅ **Meta tags fixed** - Only `fc:miniapp` present
- ❌ **Still showing "Loading..."** - Runtime error persists
- ❌ **Component not rendering** - Stuck in loading state

**What's the correct approach for Farcaster Mini App meta tag configuration and deployment?** 