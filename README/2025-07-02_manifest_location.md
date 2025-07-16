# Manifest Notes (2025-07-16)

**Note:**
- The Farcaster manifest for CarCulture: CarMania Garage is now served as a **dynamic API route** at `/.well-known/farcaster.json`
- Any updates to the manifest endpoint (https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json) or referenced images will be automatically picked up by Farcaster.
- There is no need to re-upload a static manifest file for changes to take effect.

# Farcaster Manifest Notes

## Current Manifest Location

The manifest is now served as a **dynamic API route** at: `coinbase/fc-minikit/app/.well-known/farcaster.json/route.ts`

This is the manifest for the Farcaster Mini App **"CarCulture: CarMania Garage"**.

## Current Manifest Values (as of 2025-07-16)

- **name**: CarCulture: CarMania Garage
- **subtitle**: Daily Car Culture Collectibles
- **tagline**: Daily Drops. Legendary Rides.
- **description**: Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.
- **ogDescription**: Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles (96 chars)

> **Note:** All manifest values are now hardcoded in the dynamic API route. Environment variables are only used for secrets (Farcaster account association).

### App Information
- **App Name**: "CarCulture: CarMania Garage"
- **App Icon**: https://web3-social-starter-fc-minikit.vercel.app/favicon.png
- **Primary Category**: "entertainment"
- **Button Title**: "Unlock the Ride"

### Images
- **Screenshots**: 
  - https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png
  - https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png
  - https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png
- **Preview Image**: https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png
- **Hero Image**: https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png
- **Splash Screen Image**: https://web3-social-starter-fc-minikit.vercel.app/splash.png
- **Splash Background Color**: #a32428 (brand red)

### App Flow
1. **Splash Screen** (`splash.png`) - Initial loading screen
2. **Gallery Hero** (`/gallery-hero`) - Main gallery showcase  
3. **Gallery Hero 2** (`/gallery-hero-2`) - Additional gallery view
4. **Text Page** (`/text-page`) - Information page with Manifold link
5. **Manifold Gallery** (`manifold.xyz/@carculture`) - Auto-updating gallery of all minted cars

### Social & Sharing
- **Social Share Title**: "CarCulture: CarMania Garage"
- **Social Share Description**: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles"
- **Social Share Image**: https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png

### Technical URLs
- **Home URL**: https://web3-social-starter-fc-minikit.vercel.app
- **Webhook URL**: https://web3-social-starter-fc-minikit.vercel.app/api/webhook
- **Manifest URL**: https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json

### Tags
- car, art, storytelling, social, collectibles

## Important Notes

This is now a **dynamic API route** that serves the manifest JSON from `coinbase/fc-minikit/app/.well-known/farcaster.json/route.ts`.

The manifest is automatically generated and served at the correct Farcaster endpoint `/.well-known/farcaster.json` for proper MiniKit compliance.

### Manifold Integration
- **Gallery Navigation**: Swipe up from text page to navigate to `manifold.xyz/@carculture`
- **Flow**: Users progress from app galleries → text page → Manifold gallery collection

## Recent Updates (July 2025)

- ✅ **Manifest Location**: Moved from `/api/manifest` to `/.well-known/farcaster.json` as dynamic API route
- ✅ **Tags Updated**: Changed from `social, carculture, car, storytelling, nft` to `car, art, storytelling, social, collectibles`
- ✅ **Social Share Description**: Updated to "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles" (96 characters)
- ✅ **Screenshots**: Using `screenshot1.png`, `screenshot2.png`, `screenshot3.png` instead of archive versions
- ✅ **Dynamic API Route**: Manifest now served from `app/.well-known/farcaster.json/route.ts`
- ✅ **Subtitle**: Updated to "Daily Car Culture Collectibles"
- ✅ **Tagline**: Updated to "Daily Drops. Legendary Rides."

## Updates Made

- **2025-07-16**: Moved manifest to dynamic API route at `/.well-known/farcaster.json`
- **2025-07-16**: Updated tags to `car, art, storytelling, social, collectibles`
- **2025-07-16**: Updated social share description to include "collectibles"
- **2025-07-16**: Updated subtitle to "Daily Car Culture Collectibles"
- **2025-07-02**: Updated static manifest to match current Farcaster form values
- **2025-07-02**: Updated splash image reference to use the newly updated `splash.png`
- **2025-07-02**: Added all missing fields (splashBackgroundColor, buttonTitle, ogDescription, ogImage, screenshotUrl, previewImageUrl, heroImageUrl, castShareUrl, tags)
- **2025-01-XX**: Fixed manifest for Farcaster submission - Updated social share description to exactly 95 characters: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day'"
- **2025-01-XX**: Fixed splash background color from purple (#6200EA) to brand red (#a32428) to match app configuration
- **2025-01-XX**: Corrected hero image to use hero-v2.png instead of gallery image
- **2025-01-XX**: Updated subtitle to "Daily Drops, Legendary Rides" and button title to "Open CarMania Garage"
- **2025-01-XX**: Redeployed to Vercel with all manifest fixes applied

## Context

This manifest is now served as a dynamic API route for the Farcaster MiniKit submission process. The recent updates address the specific requirements for Farcaster MiniKit compliance and improve the app's discoverability through updated tags and descriptions. 