# Manifest Notes (2025-07-02)

**Note:**
- The Farcaster manifest for CarCulture: CarMania Garage is a dynamic (hosted) manifest.
- Any updates to the manifest endpoint (https://web3-social-starter-fc-minikit.vercel.app/api/manifest) or referenced images (such as hero.png) will be automatically picked up by Farcaster.
- There is no need to re-upload a static manifest file for changes to take effect.

# Farcaster Manifest Notes

## Found the Manifest Document!

The manifest document is located at: `coinbase/fc-minikit/public/.well-known/farcaster.json`

This is the manifest we created for the Farcaster Mini App **"CarCulture: CarMania Garage"**.

## Current Manifest Values (as of 2025-07-06)

- **name**: CarCulture: CarMania Garage
- **subtitle**: Daily Drops, Legendary Rides
- **tagline**: Drive the Past. Own the Moment.
- **description**: Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.
- **ogDescription**: Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.

> **Note:** All manifest values are now sourced from environment variables in `.env` and referenced in the codebase (see `layout.tsx` and `api/manifest/route.ts`).

### App Information
- **App Name**: "CarCulture: CarMania Garage"
- **App Icon**: https://web3-social-starter-fc-minikit.vercel.app/favicon.png
- **Primary Category**: "entertainment"
- **Button Title**: "Open CarMania Garage"

### Images
- **Screenshot**: https://web3-social-starter-fc-minikit.vercel.app/carmania-gallery-hero-2.png
- **Preview Image**: https://web3-social-starter-fc-minikit.vercel.app/splash.png
- **Hero Image**: https://web3-social-starter-fc-minikit.vercel.app/carmania-gallery-hero.png
- **Splash Screen Image**: https://web3-social-starter-fc-minikit.vercel.app/splash.png
- **Splash Background Color**: #6200EA

### App Flow
1. **Splash Screen** (`splash.png`) - Initial loading screen
2. **Hero Gallery** (`carmania-gallery-hero.png`) - Main gallery showcase  
3. **Secondary Gallery** (`carmania-gallery-hero-2.png`) - Additional gallery view
4. **Manifold Mint Page** - Daily car mint page (updates daily)
5. **Manifold Gallery** (`manifold.xyz/@carculture`) - Auto-updating gallery of all minted cars

### Social & Sharing
- **Social Share Title**: "CarCulture: CarMania Garage"
- **Social Share Description**: "CarCulture's CarMania Garage: iconic cars, stories, roadside attractions, and featured 'car of the day'."
- **Social Share Image**: https://web3-social-starter-fc-minikit.vercel.app/carmania-gallery-hero.png
- **Cast Share URL**: https://warpcast.com/~/compose?text=Check+out+CarCulture+CarMania+Garage!&channel=car

### Technical URLs
- **Home URL**: https://web3-social-starter-fc-minikit.vercel.app
- **Webhook URL**: https://web3-social-starter-fc-minikit.vercel.app/api/webhook

### Tags
- car, art, stories, social, nft

## Important Notes

This is the **static file version** of the manifest located in the public folder. 

**However**, there's also a **dynamic API route** at `coinbase/fc-minikit/app/api/manifest/route.ts` that serves manifest data from environment variables, which is what the app actually uses when deployed.

The static file and dynamic API route are **not automatically synced** and must be updated separately when changes are made.

### Manifold Integration
- **Daily Mint Page**: Updates daily with new car of the day
- **Gallery**: `manifold.xyz/@carculture` automatically updates with each new mint
- **Flow**: Users progress from app galleries → daily mint → full gallery collection

## Updates Made

- **2025-07-02**: Updated static manifest to match current Farcaster form values
- **2025-07-02**: Updated splash image reference to use the newly updated `splash.png`
- **2025-07-02**: Added all missing fields (splashBackgroundColor, buttonTitle, ogDescription, ogImage, screenshotUrl, previewImageUrl, heroImageUrl, castShareUrl, tags)
- **2025-07-02**: Updated description to "CarCulture's CarMania Garage: iconic cars, stories, roadside attractions, and featured 'car of the day'."
- **2025-07-02**: Updated screenshot to use `carmania-gallery-hero-2.png` to better reflect app flow
- **2025-07-02**: Corrected app flow to show 5-step journey including Manifold mint page and gallery

## Context

This manifest was being used for the Farcaster Hosted Manifest submission process. The user experienced issues with the submission form where the submit button was disabled without clear error messages, despite verifying all requirements were met. 