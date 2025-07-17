# Farcaster Mini App Manifest Documentation

## Farcaster UI Field Order (for Manual Entry)

Use this section to copy-paste values directly into the Farcaster Mini App submission form, in the order shown in the UI:

1. **Domain**
   ```
   web3-social-starter-fc-minikit.vercel.app
   ```
2. **App Name**
   ```
   CarCulture: CarMania Garage
   ```
3. **App Icon**
   ```
   https://web3-social-starter-fc-minikit.vercel.app/favicon.png
   ```
4. **Subtitle**
   ```
   Collect the Classics. Cruise the Future.
   ```
5. **Description**
   ```
   Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.
   ```
6. **Primary Category**
   ```
   entertainment
   ```
7. **Screenshots** (enter each URL in a separate field)
   ```
   https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png
   https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png
   https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png
   ```
8. **Preview Image**
   ```
   https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png
   ```
9. **Hero Image**
   ```
   https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png
   ```
10. **Splash Screen Image**
    ```
    https://web3-social-starter-fc-minikit.vercel.app/splash.png
    ```
11. **Splash Background Color**
    ```
    #a32428
    ```
12. **Search Tags**
    ```
    car, art, storytelling, social, collectibles
    ```
13. **Marketing Tagline**
    ```
    Daily Drops. Legendary Rides.
    ```
14. **Button Title**
    ```
    Unlock the Ride
    ```
15. **Social Share Title**
    ```
    CarCulture: CarMania Garage
    ```
16. **Social Share Description**
    ```
    Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles
    ```
17. **Social Share Image**
    ```
    https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png
    ```
18. **Home URL**
    ```
    https://web3-social-starter-fc-minikit.vercel.app
    ```
19. **Webhook URL**
    ```
    https://web3-social-starter-fc-minikit.vercel.app/api/webhook
    ```

---

## Quick Reference for Farcaster Submission

- **Manifest Domain:**
  ```
  web3-social-starter-fc-minikit.vercel.app
  ```
- **Manifest URL:**
  ```
  https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json
  ```

> **Note:** For Farcaster submission, enter only the domain (not the full URL) in the "Manifest Domain" field. The system will automatically look for the manifest at `https://<domain>/.well-known/farcaster.json`.

## Manifest Fields and Values

All manifest fields are now hardcoded in `coinbase/fc-minikit/app/.well-known/farcaster.json/route.ts`. All OpenGraph and SEO fields are now hardcoded in `coinbase/fc-minikit/app/layout.tsx`. Environment variables are no longer used for any public-facing metadata. Only secrets (such as Redis and Farcaster account association) remain in `.env`.

| Field                  | Value                                                                                                              | Description                                      |
|------------------------|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| version                | 1                                                                                                                  | Manifest version (must be "1")                   |
| name                   | CarCulture: CarMania Garage                                                                                        | App name (max 32 chars)                          |
| subtitle               | Collect the Classics. Cruise the Future.                                                                                       | Short, catchy subtitle (max 50 chars)            |
| description            | Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history. | User-facing app description (max 170 chars)      |
| iconUrl                | https://web3-social-starter-fc-minikit.vercel.app/favicon.png                                                      | App icon (1024x1024 PNG, no alpha)               |
| splashImageUrl         | https://web3-social-starter-fc-minikit.vercel.app/splash.png                                                       | Splash/loading image (200x200 PNG)               |
| splashBackgroundColor  | #a32428                                                                                                            | Splash screen background color (hex)             |
| homeUrl                | https://web3-social-starter-fc-minikit.vercel.app                                                                  | App launch URL                                   |
| webhookUrl             | https://web3-social-starter-fc-minikit.vercel.app/api/webhook                                                      | Webhook for notifications (optional)             |
| primaryCategory        | entertainment                                                                                                      | App category (lowercase, from allowed list)      |
| heroImageUrl           | https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png                                              | Hero image (1200x630 PNG)                        |
| tagline                | Daily Drops. Legendary Rides.                                                                                  | Marketing tagline (max 30 chars)                 |
| ogTitle                | CarCulture: CarMania Garage                                                                                        | Social share title (max 30 chars)                |
| ogDescription          | Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles | Social share description (96 chars)         |
| ogImageUrl             | https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png                                              | Social share image (1200x630 PNG)                |
| castShareUrl           | https://web3-social-starter-fc-minikit.vercel.app/car                                                              | URL shared when users cast about the Mini App    |
| screenshotUrls         | https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png<br>https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png<br>https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png | Up to 3 screenshots (1284x2778px PNGs)           |
| tags                   | car, art, storytelling, social, collectibles                                                                         | Up to 5 tags, lowercase, no spaces/special chars |
| previewImageUrl        | https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png                                                      | Preview image (optional)                         |
| buttonTitle            | Unlock the Ride                                                                                                    | Button text for the app (optional)               |

## Current Manifest JSON Structure

```json
{
  "accountAssociation": {
    "header": "FARCASTER_HEADER_PLACEHOLDER",
    "payload": "FARCASTER_PAYLOAD_PLACEHOLDER", 
    "signature": "FARCASTER_SIGNATURE_PLACEHOLDER"
  },
  "miniapp": {
    "version": "1",
    "name": "CarCulture: CarMania Garage",
    "subtitle": "Collect the Classics. Cruise the Future.",
    "description": "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
    "iconUrl": "https://web3-social-starter-fc-minikit.vercel.app/favicon.png",
    "splashImageUrl": "https://web3-social-starter-fc-minikit.vercel.app/splash.png",
    "splashBackgroundColor": "#a32428",
    "homeUrl": "https://web3-social-starter-fc-minikit.vercel.app",
    "webhookUrl": "https://web3-social-starter-fc-minikit.vercel.app/api/webhook",
    "primaryCategory": "entertainment",
    "heroImageUrl": "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
    "tagline": "Daily Drops. Legendary Rides.",
    "ogTitle": "CarCulture: CarMania Garage",
    "ogDescription": "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles",
    "ogImageUrl": "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
    "castShareUrl": "https://web3-social-starter-fc-minikit.vercel.app/car",
    "screenshotUrls": [
      "https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png",
      "https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png",
      "https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png"
    ],
    "tags": [
      "car",
      "art", 
      "storytelling",
      "social",
      "collectibles"
    ],
    "previewImageUrl": "https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png",
    "buttonTitle": "Unlock the Ride"
  }
}
```

## Required Environment Variables

- `FARCASTER_HEADER` — Farcaster account association header (secret)
- `FARCASTER_PAYLOAD` — Farcaster account association payload (secret)
- `FARCASTER_SIGNATURE` — Farcaster account association signature (secret)
- `REDIS_URL`, `REDIS_TOKEN` — (if used for backend notifications)
- `NEXT_PUBLIC_PRIVY_APP_ID` — **Required for Privy provider initialization**

## Recent Updates (July 2025)

- ✅ **Manifest Location**: Moved from `/api/manifest` to `/.well-known/farcaster.json` as dynamic API route
- ✅ **Tags Updated**: Changed from `social, carculture, car, storytelling, nft` to `car, art, storytelling, social, collectibles`
- ✅ **Social Share Description**: Updated to "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles" (96 characters)
- ✅ **Screenshots**: Using `screenshot1.png`, `screenshot2.png`, `screenshot3.png` instead of archive versions
- ✅ **Dynamic API Route**: Manifest now served from `app/.well-known/farcaster.json/route.ts`

## Notes
- All URLs must be HTTPS and publicly accessible.
- All values are current as of the latest deployment.
- Update this file whenever you change the manifest fields or values.
- Manifest, OpenGraph, and SEO fields are no longer set via environment variables. All public-facing metadata is now hardcoded in code.
- The manifest is served as a dynamic API route at `/.well-known/farcaster.json` for proper Farcaster MiniKit compliance.

---

**Reference:** [Farcaster Mini App Manifest Docs](https://miniapps.farcaster.xyz/docs/guides/publishing) 