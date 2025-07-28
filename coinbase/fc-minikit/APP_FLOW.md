# CarMania App - User Flow & Organization

## 🏗️ **MONOREPO ARCHITECTURE - BASE AI RECOMMENDATIONS** (2025-01-27)

### **🏛️ Architecture Strategy: Separate Layouts Per App with Shared Providers**

**BASE AI Recommendation:** Each app should have its own layout that imports shared providers from the root.

#### **📁 Recommended Structure:**
```
CCulture-Apps-New/
├── packages/
│   ├── shared-ui/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── shared-auth/
│   │   └── (authentication providers)
│   ├── shared-utils/
│   │   ├── constants/
│   │   ├── helpers/
│   │   └── types/
│   └── shared-config/
│       ├── eslint-config/
│       ├── typescript-config/
│       └── tailwind-config/
├── coinbase/
│   ├── fc-minikit/          # Farcaster MiniApp
│   │   └── app/
│   │       └── layout.tsx   # App-specific layout
│   ├── socialidentity/       # Social Identity App
│   │   └── app/
│   │       └── layout.tsx   # App-specific layout
│   └── nft-gallery/         # NFT Gallery App
│       └── app/
│           └── layout.tsx   # App-specific layout
└── app/                     # Root app (optional)
    └── layout.tsx           # Root layout (if needed)
```

#### **🔧 Development Strategy: Separate Dev Servers with Unified Tooling**

**BASE AI Recommendation:** Use separate dev servers for complex setups with different app types (MiniApp, standard web app, etc.)

**Tools:**
- **concurrently** - For managing multiple dev servers
- **nx** - For advanced monorepo management

**Implementation:**
```json
// Root package.json
{
  "scripts": {
    "dev:fc": "cd coinbase/fc-minikit && npm run dev",
    "dev:social": "cd coinbase/socialidentity && npm run dev",
    "dev:gallery": "cd coinbase/nft-gallery && npm run dev",
    "dev:all": "concurrently \"npm run dev:fc\" \"npm run dev:social\" \"npm run dev:gallery\""
  }
}
```

#### **🚀 Deployment Strategy: Separate Configs Per App**

**BASE AI Recommendation:** Each app should have its own deployment config since they serve different purposes.

- **Farcaster MiniApp:** Requires manifest file, specific deployment
- **Social Identity App:** Standard web app deployment
- **NFT Gallery:** Standard web app deployment

#### **📦 Shared Components and Utilities Location**

**BASE AI Recommendation:** Centralize shared code in packages directory.

**TypeScript Path Mapping:**
```json
// apps/*/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/shared-auth": ["../../packages/shared-auth"],
      "@/shared-ui": ["../../packages/shared-ui"],
      "@/shared-utils": ["../../packages/shared-utils"]
    }
  }
}
```

#### **🔧 Resolving Current Layout.tsx Conflicts**

**BASE AI Steps:**
1. **Move shared logic to packages:** Extract common providers and configurations
2. **Make layouts app-specific:** Each app imports what it needs from packages
3. **Use consistent naming:** Ensure each app's layout serves its specific purpose
4. **Implement proper TypeScript paths:** Configure path mapping in each app's tsconfig.json

---

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

### **Dynamic Manifest System - CONFIRMED WORKING** ✅
**IMPORTANT:** The app IS using a dynamic manifest API. The `vercel.json` redirect is inactive.

- **Manifest API Route:** `app/.well-known/farcaster.json/route.ts` ✅ **ACTIVE**
- **Manifest Endpoint:** `/.well-known/farcaster.json` (served dynamically) ✅ **WORKING**
- **Purpose:** All Farcaster embed data, app metadata, and configuration is served dynamically
- **Updates:** Changes to the manifest require updating the API route and redeploying
- **Structure:** Uses proper Farcaster Mini App manifest structure with `frame` wrapper
- **Key Fields:** `splashImageUrl`, `iconUrl`, `heroImageUrl`, `screenshotUrls` (not `splash`, `icon`, etc.)

### **Manifest Verification** ✅
- **Live Test:** `curl https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json` returns data
- **Status:** HTTP 200 OK, serving dynamic content from `route.ts`
- **Webhook URL:** Currently set to Neynar webhook (updated in route.ts)
- **Note:** The `vercel.json` redirect to hosted manifest is inactive/overridden

## ✅ EMBED VALIDATION - RESOLVED (2025-07-20)

### **Embed Status: VALID** ✅
- **FC Embed Tool:** https://miniapps.farcaster.xyz/tools/embed
- **Domain:** `web3-social-starter-fc-minikit.vercel.app`
- **Status:** All checks passed (HTTP 200, Embed Present, Embed Valid)
- **Preview:** Shows "CARMANIA" with car image and "Unlock the Ride" button

### **Key Fixes Implemented:**
1. **✅ Corrected Manifest Structure:** Changed from `"miniapp"` to `"frame"` structure
2. **✅ Fixed Image URLs:** All images now return HTTP 200 OK
3. **✅ Added Required Fields:** All metadata fields properly configured
4. **✅ Cloudflare R2 Integration:** Share images hosted on Cloudflare R2

## 🔔 **NOTIFICATIONS - NEYNAR INTEGRATION** ✅

### **Architecture: Neynar-Managed (No Redis Required)**
- **Webhook URL:** `https://api.neynar.com/f/app/70171be3-816f-416d-b846-4328fb0d210a/event` ✅ **UPDATED**
- **Token Management:** Handled automatically by Neynar
- **Analytics:** Built-in dashboard at dev.neynar.com
- **Benefits:** No custom storage, automatic token management, built-in analytics

### **Key Features:**
- ✅ **Automatic token management** - Neynar handles add/remove/revoke
- ✅ **Built-in analytics** - Track notification performance
- ✅ **Targeted notifications** - Filter by user criteria
- ✅ **Rate limiting protection** - Neynar handles Farcaster limits
- ✅ **Simplified architecture** - No Redis or custom webhook code needed

### **Notification Flow:**
1. **User adds mini app** → Neynar webhook receives event
2. **User enables notifications** → Neynar stores token automatically
3. **Send notification** → Use Neynar API with targeting filters
4. **Analytics** → View performance in Neynar dashboard

### **Neynar API Key Setup - STEP BY STEP** 🔑

#### **Step 1: Local Development (.env.local)**
Create or edit `coinbase/fc-minikit/.env.local`:
```bash
# Neynar API Key for local development
NEYNAR_API_KEY=your_actual_neynar_api_key_here

# Other local development variables (if needed)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key_here
```

#### **Step 2: Production (Vercel Environment Variables)**
1. Go to your Vercel dashboard
2. Select your project: `web3-social-starter-fc-minikit`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `NEYNAR_API_KEY`
   - **Value:** `your_actual_neynar_api_key_here`
   - **Environment:** Production (and Preview if desired)
5. Click **Save**

#### **Step 3: Verify Setup**
Test locally:
```bash
cd coinbase/fc-minikit
npm run dev
# Check that process.env.NEYNAR_API_KEY is available
```

#### **Step 4: Usage in Code**
```typescript
import { sendBroadcastNotification } from '@/lib/neynar-notifications';

// The API key is automatically available from environment variables
const result = await sendBroadcastNotification(
  "🚗 New CarMania Drop!",
  "Check out today's featured car!",
  process.env.NEYNAR_API_KEY!
);
```

### **Why Environment Variables for Neynar API Key:**
- ✅ **Security**: API keys should never be hardcoded
- ✅ **Local Testing**: Test notifications during development
- ✅ **Flexibility**: Easy to change/rotate keys
- ✅ **Best Practice**: Secrets belong in environment variables
- ✅ **Different from Manifest**: Manifest data is public, API keys are private

## ✅ CBW COMPATIBILITY - COMPLETED (2025-01-27)

### **Base App Compatibility Status: 100%** ✅
- **Environment Detection:** Using `context.client.clientFid === 309857`
- **Navigation:** Using `sdk.actions.openUrl()` for external links
- **Haptics:** Removed all unsupported haptic calls
- **SDK Methods:** Only using supported Base App methods

### **Key Changes Made:**
1. **✅ Eliminated `sdk.isInMiniApp()`** - Using recommended context checking
2. **✅ Removed haptic feedback** - Not supported in Base App
3. **✅ Updated navigation** - Using SDK actions instead of direct links
4. **✅ Simplified environment detection** - Direct context checking

## 📱 **APP STRUCTURE & NAVIGATION**

### **Main Pages:**
1. **Gallery Hero (`/gallery-hero`)**: Main landing page with car showcase
2. **Gallery Hero 2 (`/gallery-hero-2`)**: Secondary car showcase page
3. **Text Page (`/text-page`)**: Information page with swipe navigation
4. **Manifold Gallery (`/manifold-gallery`)**: Redirect to Manifold.xyz
5. **Social Identity (`/socialidentity`)**: Wallet connection and identity display

### **Navigation Flow (REVISED - 2025-07-28):**
```
Gallery Hero → Gallery Hero 2 → Text Page → Manifold Gallery (redirect)
     ↓
Social Identity (wallet connection)
```

### **Swipe Navigation (REVISED - 2025-07-28):**
- **Gallery Hero:** Swipe Up → Gallery Hero 2, Swipe Down → No action (first page)
- **Gallery Hero 2:** Swipe Up → Text Page, Swipe Down → Gallery Hero
- **Text Page:** Swipe Up → Manifold Gallery, Swipe Down → Gallery Hero 2
- **Tap Buttons:** Direct navigation to specific pages

### **Previous Navigation Flow (ARCHIVED):**
```
Gallery Hero → Text Page → Gallery Hero 2 → Manifold Gallery (redirect)
```

## 🔧 **TECHNICAL ARCHITECTURE**

### **Frontend Stack:**
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS with custom theme
- **State Management:** React hooks and context
- **Navigation:** React Swipeable for touch gestures

### **Backend Services:**
- **Hosting:** Vercel (automatic deployments)
- **Notifications:** Neynar managed webhook (no Redis needed)
- **Storage:** Cloudflare R2 for images
- **Analytics:** Neynar dashboard

### **Blockchain Integration:**
- **Network:** Base (L2)
- **Wallet:** Coinbase Wallet SDK
- **NFTs:** Manifold.xyz integration
- **Authentication:** Farcaster SIWF

## 📊 **DEPLOYMENT & ENVIRONMENT**

### **Environment Variables Setup:**

#### **Local Development (.env.local):**
```bash
# Neynar API Key (REQUIRED for notifications)
NEYNAR_API_KEY=your_actual_neynar_api_key_here

# OnchainKit (if needed for local testing)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key_here

# Farcaster account association (secrets - already in route.ts)
# These are hardcoded in the manifest, no env vars needed
```

#### **Production (Vercel Environment Variables):**
```bash
# Neynar API Key (REQUIRED for notifications)
NEYNAR_API_KEY=your_actual_neynar_api_key_here

# OnchainKit (if needed)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key_here
```

### **Build & Deploy:**
```bash
# Local development
npm run dev

# Production build
npm run build

# Deploy to Vercel (automatic on git push)
git push origin main
```

## 🎯 **CURRENT STATUS & NEXT STEPS**

### **✅ Completed:**
1. **✅ CBW Compatibility**: COMPLETED - All patterns refactored and tested
2. **✅ Embed Validation**: COMPLETED - Farcaster dev tools working
3. **✅ Manifest Structure**: COMPLETED - Account association fixed
4. **✅ Neynar Integration**: COMPLETED - Webhook configured, no Redis needed
5. **✅ Dynamic Manifest**: CONFIRMED WORKING - API route serving data correctly

### **🔄 Next Priority:**
**Neynar API Key Setup** - Complete environment variable configuration:
1. Add Neynar API key to `.env.local` for local development
2. Add Neynar API key to Vercel environment variables for production
3. Test notification functionality locally
4. Test notification functionality in production

### **Phase 2: Production Deployment**
1. **✅ Embed Validation**: COMPLETED - Farcaster dev tools working
2. **✅ Manifest Structure**: COMPLETED - Account association fixed
3. **🔄 Production Testing**: 
   - Test in actual CBW environment
   - Test in Warpcast app
   - Validate all navigation flows
   - Test notification delivery

### **Phase 3: Advanced Features**
1. **🔄 Real-time Updates**: Implement live data updates
2. **🔄 Analytics**: Add usage tracking and metrics
3. **🔄 Performance**: Optimize loading times and responsiveness

## 📅 PROGRESS UPDATE - 2025-01-27 (NEYNAR INTEGRATION COMPLETE)

### **✅ Completed Today:**
- **Neynar Integration**: Webhook URL updated to use Neynar managed system
- **Redis Removal**: No longer needed - Neynar handles all token management
- **Simplified Architecture**: Removed custom webhook code and Redis dependencies
- **Analytics Ready**: Built-in Neynar dashboard for notification performance
- **Documentation**: Updated APP_FLOW.md with Neynar integration details
- **Manifest Verification**: Confirmed dynamic API route is working correctly

### **🎯 Current Status:**
- **CBW Compatibility**: ✅ 100% Complete
- **Embed Validation**: ✅ Working
- **Neynar Integration**: ✅ Complete
- **Dynamic Manifest**: ✅ Confirmed Working
- **Localhost Testing**: ✅ All simulations passing
- **Ready for Production**: ✅ All patterns CBW-compatible

### **🔄 Next Priority:**
**Neynar API Key Setup** - Complete environment variable configuration:
- Add Neynar API key to `.env.local` for local development
- Add Neynar API key to Vercel environment variables for production
- Test notification functionality

## 🔍 **IMPORTANT NOTES**

### **Manifest System Clarification:**
- **Dynamic API Route**: `app/.well-known/farcaster.json/route.ts` ✅ **ACTIVE**
- **Vercel Redirect**: In `vercel.json` but inactive/overridden by Next.js API route
- **Live Verification**: `curl` test confirms dynamic route is serving data
- **Webhook URL**: Updated to Neynar webhook in route.ts

### **Environment Variables Strategy:**
- **Manifest Data**: Hardcoded in `route.ts` (no env vars needed - it's public data)
- **API Keys/Secrets**: Go in `.env.local` and Vercel env vars (private data)
- **Neynar API Key**: REQUIRED in environment variables for notification functionality
- **Farcaster Account Association**: Hardcoded in route.ts (already public)

### **File Structure:**
```
coinbase/fc-minikit/
├── .env.local                    ← Add Neynar API key here
├── app/
│   └── .well-known/
│       └── farcaster.json/
│           └── route.ts          ← Manifest data (hardcoded)
├── lib/
│   └── neynar-notifications.ts   ← Uses NEYNAR_API_KEY env var
└── ...
```

---

**Last Updated:** 2025-01-27  
**Status:** ✅ Neynar integration complete - Environment variable setup needed

## 🏗️ **MONOREPO DEPLOYMENT CONFIGURATION** (2025-01-27)

### **📦 Monorepo Structure:**
```
CCulture-Apps-New/
├── coinbase/
│   ├── fc-minikit/          ← Farcaster MiniApp (main focus)
│   ├── socialidentity/       ← Social Identity App  
│   ├── nft-gallery/         ← NFT Gallery App
│   └── components/          ← Shared Components
├── packages/                ← Shared Packages
├── app/                     ← Root App (if any)
├── README/                  ← Documentation
├── TODO/                    ← TODO Lists
├── smart-contracts/         ← Smart Contracts
├── oracle/                  ← Oracle Services
├── agents/                  ← AI Agents
├── .github/workflows/       ← GitHub Actions
└── vercel.json             ← Monorepo Deployment Config
```

### **🚀 Comprehensive Deployment Strategy:**

#### **GitHub Actions Workflow:**
- **File**: `.github/workflows/cloudflare-only.yml` (renamed to deploy-monorepo.yml)
- **Trigger**: Any push to `main` branch
- **Scope**: **ENTIRE MONOREPO** (not just fc-minikit)
- **Jobs**: 
  1. **Deploy to Vercel** (All Apps)
  2. **Deploy Cloudflare Workers** (fc-minikit only)

#### **Vercel Configuration:**
- **Monorepo Setup**: Configured to deploy entire repository
- **Multiple Apps**: Supports all apps in `coinbase/` directory
- **Turborepo**: Uses workspaces for efficient builds
- **Build Command**: Builds all apps in parallel
- **Framework**: Next.js for all apps

#### **Cloudflare Workers:**
- **Location**: `coinbase/fc-minikit/wrangler.toml`
- **Source**: `coinbase/fc-minikit/src/index.js`
- **Deployment**: From fc-minikit directory
- **Database**: D1 Database (`carmania-db`)
- **Cache**: KV Namespace (`CARMANIA_CACHE`)
- **Storage**: R2 Bucket (`carmania-storage`)

### **✅ Current Deployment Status:**

#### **GitHub Actions:**
- ✅ **Comprehensive Workflow**: Deploys entire monorepo
- ✅ **Vercel Integration**: All apps deploy to Vercel
- ✅ **Cloudflare Workers**: API backend deployment
- ✅ **Dependencies**: Cloudflare waits for Vercel completion
- 🔄 **Auto-deploy**: Triggers on any git push to main

#### **Vercel:**
- ✅ **Monorepo Configuration**: Updated `vercel.json` for multi-app support
- ✅ **Build Commands**: Configured for all `coinbase/*` apps
- ✅ **Framework Detection**: Next.js for all apps
- 🔄 **Auto-deploy**: Triggers on git push to main

#### **Cloudflare Workers:**
- ✅ **Files in Correct Location**: `coinbase/fc-minikit/`
- ✅ **Local Deployment**: `wrangler deploy` working
- ✅ **Database Connected**: D1 database operational
- ✅ **API Endpoints**: Cars and Mints endpoints ready
- 🔄 **GitHub Actions**: Deploys automatically after Vercel

### **🎯 Deployment Flow:**
1. **Git Push** → Triggers GitHub Actions
2. **GitHub Actions** → Deploys entire monorepo
3. **Vercel Job** → Builds and deploys all apps in `coinbase/` directory
4. **Cloudflare Job** → Deploys Workers from `coinbase/fc-minikit/`

### **📋 Required Secrets:**
- `VERCEL_TOKEN`: Vercel deployment token
- `ORG_ID`: Vercel organization ID
- `PROJECT_ID`: Vercel project ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token

### **🔧 Configuration Files:**
- **`.github/workflows/cloudflare-only.yml`**: Comprehensive deployment workflow
- **Root `vercel.json`**: Monorepo deployment configuration
- **`coinbase/fc-minikit/vercel.json`**: App-specific headers
- **`coinbase/fc-minikit/wrangler.toml`**: Cloudflare Workers config
- **`turbo.json`**: Turborepo build pipeline
- **Root `package.json`**: Workspace configuration

---

\\\\\\\\\\\\
/////////

Based on the search results, I can provide you with the best approach to fix your Farcaster Mini App's mobile layout issue. The documentation shows that mobile optimization is a key consideration for Mini Apps.

## Recommended Solution: Use `maxHeight: '100vh'` with responsive design

For optimal mobile UX in Farcaster Mini Apps, use **responsive height with `maxHeight: '100vh'`** combined with proper button positioning. Here's why this is the best approach:

```css
.gallery-container {
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.gallery-image {
  width: 100%;
  height: auto;
  max-height: 70vh; /* Constrain image height */
  object-fit: cover;
}

.button-container {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 1rem;
  border-top: 1px solid #eee;
}
```

## Why This Approach Works Best

1. **Maintains Visual Design**: Preserves your 1260×2400 aspect ratio while preventing excessive scrolling
2. **Mobile-First**: Ensures buttons are always accessible without scrolling
3. **Farcaster Compatibility**: Works within Mini App constraints and safe areas
4. **User Experience**: Follows mobile UX best practices for social apps

## Additional Considerations for Farcaster Mini Apps

From the documentation, Mini Apps have specific mobile requirements:

- **Safe Area Handling**: MiniKit automatically applies `safeAreaInsets` to prevent overlap with parent app elements
- **Mobile Optimization**: The framework handles responsive design automatically
- **Screenshot Requirements**: Use portrait orientation (1284 x 2778) for app store screenshots

## Alternative Approaches (Less Recommended)

- **`height: '100vh'` with `objectFit: 'cover'`**: May crop important image content
- **Mobile-specific aspect ratio**: Could break visual consistency across devices
- **Different layout approach**: Unnecessary complexity for this use case

The `maxHeight: '100vh'` approach gives you the best balance of maintaining your visual design while ensuring optimal mobile usability in Farcaster Mini Apps.
