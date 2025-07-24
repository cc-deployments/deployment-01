# CarMania App - User Flow & Organization

## 📍 Project Location
**Project Root:** `coinbase/fc-minikit/`

This is the main directory containing your CarMania app. All files and folders mentioned below are relative to this project root.

## 🚀 Deployment & URLs

### **Vercel Deployment**
- **Production URL:** https://web3-social-starter-fc-minikit.vercel.app
- **Manifest URL:** https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json
- **Build Status:** ✅ Auto-deploys on git push to main branch
- **Environment:** Production environment with environment variables

### **Local Development**
- **Dev Server:** `npm run dev` (runs on http://localhost:3000)
- **Local Manifest:** http://localhost:3000/.well-known/farcaster.json
- **Hot Reload:** Enabled for development

### **Dynamic Manifest System**
**IMPORTANT:** The entire app is driven by a dynamic manifest API. There is NO static manifest file.

- **Manifest API Route:** `app/.well-known/farcaster.json/route.ts`
- **Manifest Endpoint:** `/.well-known/farcaster.json` (served dynamically)
- **Purpose:** All Farcaster embed data, app metadata, and configuration is served dynamically
- **Updates:** Changes to the manifest require updating the API route and redeploying
- **Structure:** Uses proper Farcaster Mini App manifest structure with `miniapp` wrapper
- **Key Fields:** `splashImageUrl`, `iconUrl`, `heroImageUrl`, `screenshotUrls` (not `splash`, `icon`, etc.)

## ✅ EMBED VALIDATION - RESOLVED (2025-07-20)

### **Embed Status: VALID** ✅
- **FC Embed Tool:** https://miniapps.farcaster.xyz/tools/embed
- **Domain:** `web3-social-starter-fc-minikit.vercel.app`
- **Status:** All checks passed (HTTP 200, Embed Present, Embed Valid)
- **Preview:** Shows "CARMANIA" with car image and "Unlock the Ride" button

### **Key Fixes Implemented:**
1. **✅ Corrected Manifest Structure:** Changed from `"frame"` to `"miniapp"` structure
2. **✅ Added Embed Meta Tags:** `fc:miniapp` and `fc:frame` meta tags in HTML head
3. **✅ Removed Duplicate Metadata:** Single source of truth in root layout
4. **✅ Fixed TypeScript Errors:** Removed incorrect JSX usage of FarcasterMetaTags
5. **✅ Cloudflare R2 Integration:** Embed image accessible at `https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png`

### **Embed Meta Tags Configuration:**
```html
<meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_miniapp","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"Car Culture: CarMania Garage","splashImageUrl":"https://i.imgur.com/y3PmlLB.jpeg","splashBackgroundColor":"#a32428"}}}' />
<meta name="fc:frame" content='{"version":"1","imageUrl":"https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_frame","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"Car Culture: CarMania Garage","splashImageUrl":"https://i.imgur.com/y3PmlLB.jpeg","splashBackgroundColor":"#a32428"}}}' />
```

## 🎯 Farcaster Mini App Resources

### **Loading Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/loading
- **Purpose:** How to load and test your Mini App in the Farcaster environment
- **Key Topics:** Development setup, testing procedures, debugging

### **Publishing Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/publishing
- **Purpose:** How to publish your Mini App to the Farcaster ecosystem
- **Key Topics:** Submission process, review guidelines, deployment

### **Embed Tool**
- **URL:** https://miniapps.farcaster.xyz/tools/embed
- **Purpose:** Test embed validation and preview
- **Status:** ✅ Working - All validation checks passed

## 📱 App Pages & Navigation

### **Main Pages & Image Assets:**
1. **Gallery Hero** (`/gallery-hero`) - Main car showcase with swipe navigation
   - **Image:** `/carmania-gallery-hero.png`
2. **Gallery Hero 2** (`/gallery-hero-2`) - Alternative car showcase  
   - **Image:** `/carmania-gallery-hero-2.png`
3. **Text Page** (`/text-page`) - Information page with "Unlock the Ride" button
   - **Image:** `/text-page.png`
4. **Manifold Gallery** (`/manifold-gallery`) - NFT gallery integration
   - **Data Source:** SQL database (`carculture_content_schedule.csv`)
   - **External Link:** https://manifold.xyz/@carculture
5. **Social Identity** (`/socialidentity`) - Wallet connection and identity features

### **Navigation Flow:**
- **Swipe Up:** Navigate to next page
- **Swipe Down:** Navigate to previous page
- **Button Click:** Launch external links (Manifold, etc.)

## 🔧 Technical Implementation

### **SDK Integration:**
- **Farcaster Mini App SDK:** `@farcaster/miniapp-sdk`
- **SDK Initialization:** Automatic in each page component
- **Ready State:** `sdk.actions.ready()` called on page load

### **Responsive Design:**
- **Aspect Ratio:** 1260x2400px maintained across devices
- **Mobile Optimization:** Touch events and swipe detection
- **Desktop Support:** Mouse events and keyboard navigation

### **Image Assets:**
- **Cloudflare R2:** Public bucket for embed images
- **Embed Image:** `https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png`
- **Local Images:** Stored in `public/` directory

## 🏦 Coinbase Wallet (CBW) Compatibility - 2025-01-27

### **🔍 Compatibility Analysis:**
Following BASE AI recommendations for CBW Mini App compatibility, we identified and resolved compatibility issues:

### **❌ Issues Found:**
1. **Environment Detection Pattern:** Using `isInMiniApp` state variables instead of direct context checking
   - **Files Affected:** `text-page/page.tsx`, `gallery-hero/page.tsx`, `gallery-hero-2/page.tsx`, `socialidentity/page.tsx`, `sdk-test/page.tsx`, `manifold-gallery/page.tsx`
   - **Issue:** Not following BASE AI's recommended pattern for CBW compatibility

### **✅ Required Pattern Found:**
- **Ready State Pattern:** `sdk.actions.ready()` properly implemented in all pages
- **No Haptics Usage:** No `sdk.haptics.*` calls found
- **No Warpcast Composer URLs:** No `warpcast.com/~/compose` or `farcast.com/~/compose` URLs
- **No Token Swap:** No `swapToken` usage found

### **🔧 Refactoring Changes:**
**Before (Incompatible):**
```typescript
const [isInMiniApp, setIsInMiniApp] = useState(false);
// ...
const baseAppStatus = context?.client?.clientFid === 309857;
setIsInMiniApp(baseAppStatus);
// ...
if (isInMiniApp) {
  sdk.actions.openUrl('/next-page');
} else {
  window.location.href = '/next-page';
}
```

**After (CBW Compatible):**
```typescript
// Direct context checking - no state variables needed
try {
  const context = await sdk.context;
  if (context?.client?.clientFid === 309857) {
    sdk.actions.openUrl('/next-page');
  } else {
    window.location.href = '/next-page';
  }
} catch (error) {
  console.error('Navigation error:', error);
  window.location.href = '/next-page';
}
```

### **📋 Implementation Status:**
- ✅ **text-page/page.tsx** - Refactored to use direct context checking
- ✅ **gallery-hero/page.tsx** - Refactored to use direct context checking
- 🔄 **gallery-hero-2/page.tsx** - Pending refactor
- 🔄 **socialidentity/page.tsx** - Pending refactor
- 🔄 **sdk-test/page.tsx** - Pending refactor
- 🔄 **manifold-gallery/page.tsx** - Pending refactor

### **🎯 Benefits:**
1. **Eliminates State Management Complexity:** No need to store environment state in React state
2. **More Explicit and Reliable:** Clear about which specific client you're targeting
3. **Follows BASE AI Best Practices:** Uses the officially recommended approach
4. **More Compatible with CBW:** Direct comparison is more reliable than stored state

### **🧪 Testing Results:**
- ✅ **Localhost Testing:** Pages load without errors
- ✅ **Navigation Working:** Swipe and keyboard navigation functional
- ✅ **No Console Errors:** Clean JavaScript execution
- ✅ **Fast Refresh Working:** Development server responding correctly

---

## 🚀 Next Steps

### **Immediate:**
- ✅ **Embed validation working**
- ✅ **App deployed and functional**
- ✅ **Manifest structure correct**
- 🔄 **CBW compatibility refactoring in progress**

### **Future Enhancements:**
- [ ] **Complete CBW compatibility refactoring**
- [ ] **Test in Farcaster Preview Tool**
- [ ] **Submit to Farcaster Mini App directory**
- [ ] **Submit to Coinbase Wallet Mini App directory**
- [ ] **Add more car showcases**
- [ ] **Enhance wallet integration**

---

**Last Updated:** 2025-01-27  
**Status:** ✅ Embed validation successful - CBW compatibility refactoring in progress

## 📅 PROGRESS UPDATE - 2025-07-21 (16 HOUR SESSION)

### **🎯 Today's Major Accomplishments:**
- ✅ **Debug overlay buttons removed** from gallery-hero page - clean mobile interface
- ✅ **ESLint warnings resolved** - Fixed exhaustive-deps warnings with useCallback
- ✅ **Base App compatibility validated** - Used official validator tool
- ✅ **Navigation issues identified** - Found differences between stable 4PM version and current code
- ✅ **Manifold gallery analysis complete** - Determined current approach is better than 4PM version

### **🔍 Key Findings:**
1. **Manifold Gallery Concept:** Current redirect page approach is correct (not image-based)
2. **Stable Version Analysis:** 4PM version used wrong image (`screenshot1.png` not manifold-related)
3. **Navigation Logic:** Current conditional `sdk.actions.openUrl()` approach is better for Base App compatibility
4. **Debug Cleanup:** Removed all debug overlay buttons for production-ready interface

### **🚨 Current Issues Identified:**
- **Manifold Gallery:** Current gradient background approach is correct, but needs simplification
- **Navigation:** Complex conditional logic works but could be streamlined
- **Image Assets:** Confirmed no manifold-specific images exist (correct approach is redirect page)

### **📋 Next Session Priorities:**
1. **Simplify manifold-gallery page** - Remove complex overlays, keep redirect functionality
2. **Test navigation flow** - Verify swipe up from text-page to manifold-gallery works
3. **Mobile testing** - Confirm all pages work properly on mobile devices
4. **Base App submission** - Prepare for Coinbase Wallet Mini App submission

### **💡 Technical Notes:**
- **Current approach is better** than 4PM version for manifold-gallery
- **Base App compatibility** maintained with conditional navigation
- **Debug overlays removed** - production-ready interface achieved
- **ESLint clean** - all warnings resolved

---

**Session Duration:** 16 hours  
**Status:** Major progress made, ready for next development session