# CarMania App - User Flow & Organization

## 📍 Project Location
**Project Root:** `coinbase/fc-minikit/`

This is the main directory containing your CarMania app. All files and folders mentioned below are relative to this project root.

## 🚀 Deployment & URLs

### **Vercel Deployment**
- **Production URL:** https://web3-social-starter-fc-minikit.vercel.app
- **Manifest URL:** https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json
- **Build Status:** Auto-deploys on git push to main branch
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

### **Farcaster Mini App Resources**

#### **Loading Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/loading
- **Purpose:** How to load and test your Mini App in the Farcaster environment
- **Key Topics:** Development setup, testing procedures, debugging

#### **Publishing Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/publishing
- **Purpose:** How to publish your Mini App to the Farcaster ecosystem
- **Key Topics:** Submission process, review guidelines, deployment

### **Coinbase Wallet Mini App Resources**

#### **Compatibility Validator**
- **URL:** https://raw.githubusercontent.com/base/demos/refs/heads/master/minikit/mini-app-help/validate.txt
- **Purpose:** Validates Mini App compatibility with Coinbase Wallet
- **Key Topics:** Environment detection, haptics, Warpcast composer URLs, token swap, direct HTML links, required sdk.actions.ready() calls

## 📱 How Users Navigate Through Your App

### **Page 1: Landing Page** (`/`)
- **File:** `app/page.tsx`
- **Action:** Redirects to `/gallery-hero`
- **Purpose:** Entry point that immediately takes users to the main hero page

### **Page 2: Gallery Hero** (`/gallery-hero`) - **Main Landing Page**
- **File:** `app/gallery-hero/page.tsx`
- **Image:** `carmania-gallery-hero.png`
- **What users see:** CarMania gallery image with "Unlock the Ride" button and share arrow
- **User action:** 
  - Tap "Unlock the Ride" → Opens Manifold mint page
  - Swipe up → Goes to gallery-hero-2
  - Tap share arrow → Shares the app
- **Purpose:** Main gallery entry point with mint functionality

### **Page 3: Gallery Hero 2** (`/gallery-hero-2`)
- **File:** `app/gallery-hero-2/page.tsx`
- **Image:** `carmania-gallery-hero-2.png`
- **What users see:** Second gallery image (full screen)
- **User action:** 
  - Tap anywhere → Opens Manifold mint page
  - Swipe up → Goes to text-page
- **Purpose:** Additional gallery content with mint access

### **Page 4: Text Page** (`/text-page`)
- **File:** `app/text-page/page.tsx`
- **Image:** `text-page.png` (1260×2400px)
- **What users see:** Text content with invisible "Unlock the Ride" button overlay
- **User action:** 
  - Tap invisible button area (300px wide) → Opens Manifold mint page
  - Swipe up → Opens CarCulture Manifold profile
- **Debug features:** Toggle button for overlay visualization, container bounds display
- **Purpose:** Final content page with mint and profile links

## 🔄 Navigation Flow Summary

```
Landing Page (/) 
    ↓ (redirect)
Gallery Hero (/gallery-hero) - Main Landing Page
    ↓ (swipe up)
Gallery Hero 2 (/gallery-hero-2)
    ↓ (swipe up)
Text Page (/text-page)
    ↓ (swipe up)
Manifold Profile (external)
```

## 🎯 Key User Actions

1. **Minting:** Users can mint at multiple points:
   - Gallery Hero page ("Unlock the Ride" button)
   - Gallery Hero 2 page (tap anywhere)
   - Text Page (invisible "Unlock the Ride" button overlay - 300px wide interactive area)

2. **Sharing:** Share arrow appears on:
   - Landing page
   - Gallery Hero page

3. **Social Identity:** Button appears on:
   - Gallery Hero page (top right)

4. **Debug Features:** Available on all pages:
   - Debug toggle button (top-left corner)
   - Container bounds visualization (red border)
   - Button position overlays (yellow/cyan highlights)

## 📁 File Organization

```
coinbase/fc-minikit/
├── app/
│   ├── page.tsx              # Landing page (/)
│   ├── gallery-hero/
│   │   └── page.tsx         # Gallery Hero page (/gallery-hero)
│   ├── gallery-hero-2/
│   │   └── page.tsx         # Gallery Hero 2 page (/gallery-hero-2)
│   ├── text-page/
│   │   └── page.tsx         # Text page (/text-page)
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts     # Dynamic manifest API route
│   ├── components/
│   │   └── ShareArrow.tsx   # Reusable share component
│   └── layout.tsx           # App-wide layout
├── public/
│   ├── carmania-gallery-hero.png
│   ├── carmania-gallery-hero-2.png
│   ├── text-page.png
│   ├── screenshot1.png
│   ├── screenshot2.png
│   ├── screenshot3.png
│   ├── hero-v2.png
│   ├── splash.png
│   └── favicon.png
└── APP_FLOW.md              # This documentation file
```

## 🖼️ Image Mapping

- **Landing Page:** `carmania-gallery-hero.png`
- **Gallery Hero:** `carmania-gallery-hero.png`
- **Gallery Hero 2:** `carmania-gallery-hero-2.png`
- **Text Page:** `text-page.png`
- **Farcaster Splash:** `splash.png` (handled by Farcaster SDK)
- **Manifest Images:** `hero-v2.png`, `screenshot1.png`, `screenshot2.png`, `screenshot3.png`

## 🎨 Design Consistency

- **Size:** All pages use 1260px width × 2400px height
- **Images:** 1260px × 2400px full container coverage
- **Buttons:** Consistent red theme (#a32428, #ae262a)
- **Navigation:** Swipe up to advance, buttons for specific actions
- **Debug Mode:** Consistent debug overlays across all pages
- **Interactive Areas:** Optimized button sizes for better user experience

### **Button Positions (Gallery Hero Page)**
- **"Unlock the Ride" Button:**
  - Position: `left: 384px, top: 2180px`
  - Size: `width: 432px, height: 48px`
  - Centered: Yes (calculated as (1200 - 432) ÷ 2 = 384px)
  - Function: Opens Manifold mint page

- **"Share" Button:**
  - Position: `right: 97px, top: 2208px`
  - Size: `width: 48px, height: 24px`
  - Distance from right edge: 97px
  - Function: Shares the app URL

### **Container Dimensions**
- **Gallery Hero Container:** `1200px × 2400px`
- **Image:** `carmania-gallery-hero.png` (1260×2400px)
- **Debug Toggle:** Top-left corner (`top: 24px, left: 24px`)
- **Social Identity Button:** Top-right corner (`top: 24px, right: 24px`)

## 🔧 For Developers

- Each page is a separate folder with its own `page.tsx`
- Navigation uses Next.js router (`useRouter`)
- Swipe gestures use `react-swipeable`
- Images are optimized with Next.js `Image` component
- External links open in new tabs (`target="_blank"`)
- Debug overlays use absolute positioning with z-index layering
- Button coordinates are calculated for 1260×2400px container system
- Manifest is served as dynamic API route at `/.well-known/farcaster.json`

## 🚀 Deployment Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to Vercel (automatic on git push)
git add .
git commit -m "Update message"
git push
```

---

**Note:** This app is designed for Farcaster Mini Apps, so it's optimized for mobile viewing and swipe gestures.

## 📝 Development Change Log

### 2025-07-17: SDK Ready() Call Fix
- **Issue:** "Ready Not Called" error in Farcaster Mini App environment
- **Solution:** 
  - Updated `@farcaster/miniapp-sdk` from v0.1.6 to v0.1.7
  - Added `sdk.isInMiniApp()` environment detection before calling `ready()`
  - Implemented async/await pattern for SDK initialization
  - Added comprehensive error handling and logging
  - Updated all pages: gallery-hero, gallery-hero-2, text-page, manifold-gallery
- **Result:** ✅ App now loads successfully in Farcaster Preview Tool
- **Files Modified:**
  - `app/gallery-hero/page.tsx`
  - `app/gallery-hero-2/page.tsx`
  - `app/text-page/page.tsx`
  - `app/manifold-gallery/page.tsx`
  - `package.json` (SDK version update)
  - `app/sdk-test/page.tsx` (new debug page)

### 2025-07-17: Responsive Design Implementation (PLANNED)
- **Issue:** App too large for mobile, too small for desktop
- **Current State:** Fixed 1260×2400px dimensions
- **Planned Solution:** 
  - Add responsive CSS classes
  - Mobile: 100vw × 100vh (full viewport)
  - Desktop: Maintain aspect ratio with max-width
  - Mini App: Keep original 1260×2400px for compatibility
- **Revert Strategy:** Can easily revert by removing responsive classes
- **Files to Modify:**
  - `app/globals.css` (add responsive classes)
  - `app/gallery-hero/page.tsx` (add className)
  - `app/gallery-hero-2/page.tsx` (add className)
  - `app/text-page/page.tsx` (add className)
  - `app/manifold-gallery/page.tsx` (add className) 