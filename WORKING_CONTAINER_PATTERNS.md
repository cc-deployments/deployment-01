# Working Container Patterns for Mini App

## 🎯 **Current Working Status (Latest)**
- ✅ **Container sizes**: All pages now have consistent sizing
- ✅ **Arrow navigation**: Works on all 4 pages
- ✅ **Structure**: All pages use the same proven container pattern
- ✅ **EIP5792 Integration**: Batch transactions implemented for enhanced UX
- ✅ **Enhanced Payment Flows**: Credit card + Crypto with atomic execution

## 📱 **Working Container Structure (Copy This Pattern)**

### **Main Container Pattern (Used by gallery-hero-2 and text-page):**
```tsx
return (
  <div 
    {...swipeHandlers}
    style={{
      position: 'relative',
      backgroundColor: '#000',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // Ensure MiniKit gestures work by not blocking touch events
      touchAction: 'manipulation',
      paddingTop: safeArea.top,
      paddingBottom: safeArea.bottom,
      paddingLeft: safeArea.left,
      paddingRight: safeArea.right,
    }}
  >
    {/* Image Container */}
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#000',
      position: 'relative',
      pointerEvents: 'auto',
      touchAction: 'manipulation',
    }}>
      <Image
        src="/page-image.png"
        alt="Page Description"
        width={1260}
        height={2400}
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'auto',
          touchAction: 'manipulation',
        }}
        priority
        unoptimized={true}
      />
    </div>
    
    {/* Buttons go here */}
  </div>
);
```

## 🎯 **Current Working Button Implementation (2025-08-19)**

### **Container Height & Button Placement:**
- **Container Height:** `height: '100vh'` (full viewport height)
- **Container Width:** `width: '100vw'` (full viewport width)
- **Button Type:** Invisible transparent clickable areas (`<div>` elements)
- **Positioning:** Absolute positioning with percentage-based coordinates
- **Z-Index:** `9999` to ensure buttons are above other elements

### **Working Button Positions:**
```tsx
// Gallery Hero Page
{/* UNLOCK Button Area - Positioned over the visible "UNLOCK the RIDE" button */}
<div
  style={{
    position: 'absolute',
    top: '75%',           // 75% from top
    left: '50%',          // Center horizontally
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: '200px',       // Cover full button area
    height: '60px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  }}
/>

{/* SHARE Button Area - Positioned at 75.8% */}
<div
  style={{
    position: 'absolute',
    top: '75.8%',         // 75.8% from top
    right: '20px',        // 20px from right edge
    zIndex: 9999,
    width: '80px',
    height: '40px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  }}
/>

// Text Page
{/* UNLOCK Button - Positioned at 63% */}
<div
  style={{
    position: 'absolute',
    top: '63%',           // 63% from top
    left: '50%',          // Center horizontally
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: '200px',
    height: '60px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  }}
/>
```

### **Key Success Factors:**
1. **No `onTouchStart`/`onTouchEnd`** - These were blocking `onClick` events
2. **High Z-Index** - `9999` ensures buttons are above other elements
3. **Transparent Background** - Buttons are invisible but clickable
4. **Percentage Positioning** - Works across different screen sizes
5. **Container-Based Layout** - Buttons positioned relative to main container

## 📤 **SHARE Button Implementation (Working Pattern)**

### **Current Working SHARE Button (Commit 199d344):**
The SHARE button now prioritizes Web Share API for mobile and falls back to OnchainKit's `useComposeCast` for desktop:

```tsx
import { useComposeCast } from '@coinbase/onchainkit/minikit';

export default function GalleryHero() {
  const { composeCast } = useComposeCast();
  
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('📤 Share button clicked');
    
    try {
      // Check if we're in Farcaster Mini App context
      const isInMiniApp = sdk.isInMiniApp();
      console.log('📱 Mini App context:', isInMiniApp);
      
      // For mobile Farcaster, try Web Share API first (more reliable)
      if (navigator.share) {
        console.log('📱 Using Web Share API (mobile-friendly)...');
        await navigator.share({
          title: 'CarMania Gallery',
          text: 'Check out CarMania Gallery - an amazing car collection mini app! 🚗✨',
          url: window.location.href
        });
        console.log('✅ Shared via Web Share API');
        return;
      }
      
      // Fallback to OnchainKit's composeCast for desktop
      if (composeCast && !isInMiniApp) {
        console.log('📱 Using OnchainKit composeCast (desktop)...');
        await composeCast({
          text: 'Check out CarMania Gallery - an amazing car collection mini app! 🚗✨',
          embeds: [window.location.href]
        });
        console.log('✅ Shared via OnchainKit composeCast');
        return;
      }
      
      // Final fallback to clipboard
      console.log('📋 Using clipboard fallback...');
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share this mini app in your Farcaster cast! 🚗✨');
      
    } catch (error) {
      console.error('❌ Share failed:', error);
      alert(`Please copy this link to share:\n\n${window.location.href}`);
    }
  };

  return (
    <div
      onClick={handleShare}
      style={{
        position: 'absolute',
        top: '75.8%',
        right: '20px',
        zIndex: 9999,
        width: '80px',
        height: '40px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }}
    />
  );
}
```

### **Key Requirements for SHARE Button:**
1. **MiniKitProvider Required**: Must be enabled in `providers.tsx` for `useComposeCast` to work
2. **QueryClient Setup**: OnchainKit provides the necessary QueryClient
3. **Mobile-First Approach**: `navigator.share` → `composeCast` (desktop only) → `clipboard.writeText`
4. **Context Detection**: Use `sdk.isInMiniApp()` to determine environment
5. **Error Handling**: Graceful degradation if sharing fails

### **Provider Setup (Required):**
```tsx
// coinbase/fc-minikit/app/providers.tsx
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

export function Providers(props: { children: ReactNode }) {
  useEffect(() => {
    sdk.actions.ready(); // Dismiss splash screen
  }, []);

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseChain}
    >
      {props.children}
    </MiniKitProvider>
  );
}
```

### **What We Tried (Don't Use):**
- ❌ `sdk.actions.share()` - This method doesn't exist
- ❌ Custom share handlers without OnchainKit
- ❌ Direct `window.shareCarMania` calls
- ❌ Disabled MiniKitProvider (breaks useComposeCast)

### **What Works:**
- ✅ **Mobile**: `navigator.share` opens native share sheet
- ✅ **Desktop**: `useComposeCast` opens Farcaster compose interface
- ✅ **Context Detection**: `sdk.isInMiniApp()` determines environment
- ✅ **Fallback Chain**: Web Share → ComposeCast → Clipboard
- ✅ **Proper error handling and logging**

## 🌐 **Base Mini App Hooks for External Navigation**
According to [Base Mini App documentation](https://docs.base.org/base-app/miniapps/overview#minikit-overview), external navigation should use the `useOpenUrl` hook:

```tsx
import { useOpenUrl } from '@coinbase/onchainkit/minikit';

export default function ManifoldGallery() {
  const openUrl = useOpenUrl();
  
  // CORRECT: Use useOpenUrl hook for external navigation
  const handleExternalNavigation = () => {
    openUrl('https://manifold.xyz/collection/your-collection');
  };
  
  return (
    <button onClick={handleExternalNavigation}>
      View on Manifold
    </button>
  );
}
```

### **INCORRECT: Don't Use setFrameReady for External Navigation**
The `manifold-gallery` page currently has this pattern which is wrong:

```tsx
// ❌ WRONG: This is for dismissing splash screen, not external navigation
await setFrameReady({ disableNativeGestures: true });

// ❌ WRONG: Direct window.location.href bypasses Mini App context
window.location.href = 'https://manifold.xyz/...';
```

### **Why useOpenUrl is Correct:**
1. **Mini App Context**: Maintains the Mini App environment
2. **Fallback Support**: Falls back to `window.open` when outside frame context
3. **Base Documentation**: Officially recommended in Base docs
4. **User Experience**: Proper Mini App navigation flow

## 🔧 **Key Changes Made:**

### **1. Container Structure (What Works):**
- `{...swipeHandlers}` on main container
- `width: '100vw', height: '100vh'` for full viewport
- `display: 'flex', flexDirection: 'column'` for centering
- `justifyContent: 'center', alignItems: 'center'` for content centering

### **2. What We Tried (Don't Use):**
- ❌ Complex scaling with CSS transforms
- ❌ Fixed pixel dimensions (1260px x 2400px)
- ❌ Multiple wrapper divs
- ❌ Complex conditional rendering patterns
- ❌ `setFrameReady()` for external navigation
- ❌ Direct `window.location.href` in Mini Apps

### **3. What We Kept (Working):**
- ✅ Simple image container structure
- ✅ `objectFit: 'cover'` for image scaling
- ✅ `touchAction: 'manipulation'` for MiniKit compatibility
- ✅ Safe area padding for mobile devices
- ✅ `setFrameReady({ disableNativeGestures: true })` for splash screen dismissal

## 📋 **Testing Checklist:**

### **Localhost Testing (Do First):**
1. ✅ Container sizes consistent across all pages
2. ✅ Arrow navigation works (up/down)
3. ✅ Buttons render and are clickable
4. ✅ Images load properly
5. ✅ No console errors

### **Mobile Testing (Do Second):**
1. ✅ MiniKit initializes (`Frame context available: true`)
2. ✅ Swipe navigation works
3. ✅ Buttons respond to touch
4. ✅ Container fits mobile viewport
5. ✅ External navigation uses proper Mini App hooks

## 🚫 **Common Mistakes to Avoid:**

1. **Don't over-engineer** - simple patterns work better
2. **Don't copy from broken pages** - always copy from working ones
3. **Don't change multiple things at once** - one fix at a time
4. **Don't ignore the working commit** - 862380f is our reference point
5. **Don't use setFrameReady for external navigation** - use useOpenUrl hook
6. **Don't use direct window.location.href** - breaks Mini App context

## 📚 **Reference Commits:**

- **Working Base**: `862380f` - Complete working version
- **Container Fix**: `0f3599d` - Fixed container sizes and navigation
- **SHARE Button Fix**: `7d19237` - Implemented useComposeCast with proper fallbacks
- **Mobile SHARE Fix**: `199d344` - Prioritized Web Share API for mobile compatibility
- **Current Status**: All pages working with consistent structure and functional SHARE button on both mobile and desktop

## 🔄 **Future Updates:**

When making changes:
1. **Test on localhost first**
2. **Make minimal changes**
3. **Update this document**
4. **Commit working changes**
5. **Test on mobile**
6. **Use Base documentation for Mini App patterns**

## 🚗 **UNLOCK THE RIDE Button - Manual Update System**

### **What It Unlocks:**
The "UNLOCK THE RIDE" button redirects users to the current CarMania NFT on Manifold, manually updated to match your latest Paragraph.xyz post.

### **How It Works:**
1. **User clicks "UNLOCK THE RIDE"** on any page
2. **MiniApp calls Next.js API**: `/api/latest-mint` (Vercel)
3. **API returns hardcoded car data** for current Paragraph post
4. **User redirects to Manifold** to mint the current car

### **Current Implementation:**
```typescript
// Button click handler in gallery-hero and text-page
const response = await fetch('/api/latest-mint');
const result = await response.json();
if (result.success && result.data.mint_url) {
  window.location.href = result.data.mint_url; // Redirect to Manifold
}
```

### **Data Source:**
- **API File**: `coinbase/fc-minikit/app/api/latest-mint/route.ts`
- **Current Method**: Hardcoded data (temporary fix for CSV reading issues)
- **Current Active**: "Flat Sea" (2025-09-10) - 1948 Chevrolet Woodie

### **Manual Update Workflow:**
1. **Publish new story on Paragraph.xyz**
2. **Get Manifold URL** from your new NFT mint
3. **Update Next.js API** with new car data:
   ```typescript
   const selectedMint: MintData = {
     publication_date: '2025-09-10',
     title: 'Flat Sea',
     mint_url: 'https://manifold.xyz/@carculture/id/4149807344',
     status: 'published',
     image_url: '',
     description: 'Ocean Breeze Woodie',
     make: 'Chevrolet',
     model: 'Woodie',
     year: '1948'
   };
   ```
4. **Commit and push** changes to GitHub
5. **Vercel auto-deploys** the updated API

### **Benefits:**
- ✅ **Immediate updates** - Change car instantly when you publish
- ✅ **Reliable deployment** - Vercel handles the infrastructure
- ✅ **Version controlled** - Track changes in git
- ✅ **Simple process** - One file edit, commit, push

### **Testing the Button:**
1. **Visit app**: `https://carmania.carculture.com`
2. **Click "UNLOCK THE RIDE"** button
3. **Verify redirect** to current Manifold mint page
4. **Check API**: `curl https://carmania.carculture.com/api/latest-mint`

### **Architecture Notes:**
- **NOT using Cloudflare API** - switched to Next.js API on Vercel
- **CSV reading disabled** - temporarily hardcoded due to deployment issues
- **Future plan**: Implement StableLink solution for dynamic updates

## 🚀 **EIP5792 Integration (NEW)**

### **What It Does:**
EIP5792 enables batch transactions, allowing multiple operations to be executed atomically in a single transaction. This significantly improves user experience and reduces gas costs.

### **Key Features:**
- **Atomic Execution**: All operations succeed together or fail together
- **Gas Optimization**: Single transaction instead of multiple separate ones
- **Enhanced UX**: Fewer confirmations, smoother flow
- **BASE Integration**: Optimized for Base ecosystem

### **Implementation:**
```typescript
// Batch transaction example
const batchCalls = createNFTPurchaseBatchCalls(
  nftContract,
  tokenId,
  price,
  buyerAddress
);

const result = await window.ethereum.request({
  method: 'wallet_sendCalls',
  params: [{
    version: '1.0',
    chainId: '0x2105', // Base mainnet
    calls: batchCalls,
    capabilities: {
      paymasterService: {
        url: 'https://paymaster.base.org'
      }
    }
  }]
});
```

### **Components Created:**
- **`EIP5792BatchTransaction.tsx`**: Core batch transaction component
- **`EnhancedStableLinkCommerce.tsx`**: Enhanced payment flows with EIP5792
- **`/eip5792-test`**: Test page for EIP5792 functionality

### **Benefits for CarMania:**
- ✅ **Faster NFT purchases**: Approve + purchase + mint in one transaction
- ✅ **Lower gas costs**: Batch operations reduce fees
- ✅ **Better reliability**: No partial failures
- ✅ **Professional UX**: Aligns with BASE recommendations

### **Testing:**
1. **Visit `/eip5792-test`** page
2. **Test batch transactions** with compatible wallet
3. **Try enhanced payment flows** (credit card + crypto)
4. **Monitor console** for transaction details

## 🎯 **FARCASTER EMBED STRATEGY (FUTURE IMPLEMENTATION)**

### **Current Flow Analysis:**
Based on the user flow diagram, the current CarMania miniapp flow is:

1. **Purple "Unlock the Ride" button** (Farcaster social card) → Opens miniapp
2. **Red "Unlock the Ride" button** (gallery-hero) → Directs to Manifold Mint page  
3. **White "Unlock the Ride" button** (text-page) → Directs to Manifold Mint page
4. **Manifold Mint page** = "Car of the day" (external, not our miniapp)
5. **Manifold Gallery** = External gallery

### **The Problem:**
- **"Car of the day"** is on Manifold (external)
- **Cannot add embed meta tags** to Manifold pages
- **No way to share** the current car as a rich card in Farcaster
- **Users see same generic image** every day when sharing miniapp

### **Proposed Solution:**
Create a **new page in the miniapp** that:

1. **Shows the current car** (before redirecting to Manifold)
2. **Has the embed meta tag** for rich sharing
3. **Can be shared** as a rich card in Farcaster
4. **Links to Manifold** when clicked

### **Implementation Plan:**
Create `carmania.carculture.com/car-of-the-day`:

```html
<!-- Embed meta tag for rich sharing -->
<meta name="fc:miniapp" content='{"version":"1","imageUrl":"{{current_car_image}}","button":{"title":"🚗 Collect {{current_car_name}}","action":{"type":"launch_miniapp","url":"https://carmania.carculture.com/car-of-the-day","name":"Carmania"}}}' />
```

### **New Flow:**
1. **Share:** `carmania.carculture.com/car-of-the-day`
2. **Farcaster shows:** Current car image with "Collect This Car" button
3. **Users click:** Opens miniapp page showing current car
4. **Page redirects:** To current Manifold mint

### **Benefits:**
- ✅ **Rich card sharing** - Users see actual car images, not generic miniapp
- ✅ **Daily content updates** - Fresh car each day via API
- ✅ **Maintains existing workflow** - Still uses Manifold for checkout
- ✅ **Social discovery** - Users find content through shares

### **Current Status:**
- **NOT IMPLEMENTING** until checkout issues resolved
- **Waiting for CDP and Manifold** ticket responses
- **Manifold checkout may not be solution** - need to examine OnchainKit NFT Mint card
- **Future consideration** - OnchainKit integration for native miniapp checkout

### **Technical Requirements:**
- **Dynamic page** that reads from existing API (`/api/latest-mint`)
- **Embed meta tag** with current car data
- **Redirect functionality** to Manifold mint page
- **Consistent with existing** container patterns and button implementations

---
*Last Updated: Added Farcaster Embed Strategy documentation - Future implementation plan for rich card sharing*
