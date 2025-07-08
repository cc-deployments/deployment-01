# Farcaster Mini App Manifest Documentation

This document describes the fields and current values for the Farcaster Mini App manifest served at:
`/.well-known/farcaster.json` on the domain `web3-social-starter-fc-minikit.vercel.app`

## Manifest Fields and Values

All manifest fields are now hardcoded in `coinbase/fc-minikit/app/api/manifest/route.ts`. All OpenGraph and SEO fields are now hardcoded in `coinbase/fc-minikit/app/layout.tsx`. Environment variables are no longer used for any public-facing metadata. Only secrets (such as Redis and Farcaster account association) remain in `.env`.

| Field                  | Value                                                                                                              | Description                                      |
|------------------------|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| version                | 1                                                                                                                  | Manifest version (must be "1")                   |
| name                   | CarCulture: CarMania Garage                                                                                        | App name (max 32 chars)                          |
| subtitle               | Daily Drops, Legendary Rides                                                                                       | Short, catchy subtitle (max 30 chars)            |
| description            | Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history. | User-facing app description (max 170 chars)      |
| iconUrl                | https://web3-social-starter-fc-minikit.vercel.app/favicon.png                                                      | App icon (1024x1024 PNG, no alpha)               |
| splashImageUrl         | https://web3-social-starter-fc-minikit.vercel.app/splash.png                                                       | Splash/loading image (200x200 PNG)               |
| splashBackgroundColor  | #a32428                                                                                                            | Splash screen background color (hex)             |
| homeUrl                | https://web3-social-starter-fc-minikit.vercel.app                                                                  | App launch URL                                   |
| webhookUrl             | https://web3-social-starter-fc-minikit.vercel.app/api/webhook                                                      | Webhook for notifications (optional)             |
| primaryCategory        | entertainment                                                                                                      | App category (lowercase, from allowed list)      |
| heroImageUrl           | https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png                                                      | Hero image (1200x630 PNG)                        |
| tagline                | Drive the Past. Claim the Future.                                                                                  | Marketing tagline (max 30 chars)                 |
| ogTitle                | CarCulture: CarMania Garage                                                                                        | Social share title (max 30 chars)                |
| ogDescription          | Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history. | Social share description (max 100 chars)         |
| ogImageUrl             | https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png                                                      | Social share image (1200x630 PNG)                |
| screenshotUrls         | https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png<br>https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png<br>https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png | Up to 3 screenshots (1284x2778px PNGs)           |
| tags                   | social, carculture, car, storytelling, nft                                                                         | Up to 5 tags, lowercase, no spaces/special chars |
| previewImageUrl        | https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png                                                      | Preview image (optional)                         |
| buttonTitle            | Unlock the Ride                                                                                                    | Button text for the app (optional)               |

## Required Environment Variables

- `FARCASTER_HEADER` — Farcaster account association header (secret)
- `FARCASTER_PAYLOAD` — Farcaster account association payload (secret)
- `FARCASTER_SIGNATURE` — Farcaster account association signature (secret)
- `REDIS_URL`, `REDIS_TOKEN` — (if used for backend notifications)
- `NEXT_PUBLIC_PRIVY_APP_ID` — **Required for Privy provider initialization**

## Notes
- All URLs must be HTTPS and publicly accessible.
- All values are current as of the latest deployment.
- Update this file whenever you change the manifest fields or values.
- Manifest, OpenGraph, and SEO fields are no longer set via environment variables. All public-facing metadata is now hardcoded in code.

---

**Reference:** [Farcaster Mini App Manifest Docs](https://miniapps.farcaster.xyz/docs/guides/publishing) 