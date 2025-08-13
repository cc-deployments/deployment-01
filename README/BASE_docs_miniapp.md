# BASE Docs Mini App Compatibility

## Overview
Base App supports mini apps with specific compatibility requirements. This document outlines the key requirements and limitations for building mini apps that work in Coinbase Wallet.

## Key Requirements

### Using MiniKit (Recommended)
- MiniKit is the easiest way to build mini apps on Base
- Integrates seamlessly with OnchainKit components
- Provides Base App-specific hooks
- **If you use MiniKit, your mini app will work out of the box in Base App**

### Authentication Methods
1. **Sign In with Farcaster (SIWF)** - Native support in Base App
2. **Quick Auth** - Uses SIWF to issue JWT for session persistence
3. **Wallet Auth** - Standard wallet authentication
4. **Context Data** - Access to user context information

### Deeplinks and SDK Actions
- **Always use official SDK functions** instead of Farcaster-specific deeplinks
- Use `sdk.actions.openUrl()` for external navigation
- Use `sdk.actions.composeCast()` for casting functionality
- Avoid direct HTML links to third-party websites

### Wallet Interactions
Three ways to access EIP-1193 Ethereum Provider:
1. **OnchainKit Wallet Component** (Recommended)
2. **Wagmi**
3. **Browser Window**

## Currently Unsupported Features

### Environment Detection
- `sdk.isInMiniApp()` - **NOT SUPPORTED**
- Use `context.client.clientFid` instead (Base App returns `309857`)

### Haptic Feedback
- All haptic related SDK methods:
  - `sdk.haptics.impactOccurred()`
  - `sdk.haptics.notificationOccurred()`
  - `sdk.haptics.selectionChanged()`

### Token Actions
- `sdk.actions.swapToken()`
- `sdk.actions.sendToken()`

### Navigation & Links
- Direct HTML links to third-party websites (`<a href=`, `<Link href=`)
- Warpcast/Farcaster composer intent URLs (`warpcast.com/~/compose`, `farcaster.com/~/compose`)

### Context Features
- Share extensions
- `sdk.context.location`

## Supported Chains
- Base
- Mainnet
- Optimism
- Arbitrum
- Polygon
- Zora
- BNB
- Avalanche C-Chain

## Metadata Requirements

### Mini App Store Listing
| Field    | Purpose                              | Limitations                                    |
| -------- | ------------------------------------ | ---------------------------------------------- |
| iconUrl  | Main icon                            | 1024x1024 px PNG, no alpha                     |
| name     | Display name of the app              | 30 characters, no emojis or special characters |
| subtitle | Short description under the app name | 30 characters, no emojis or special characters |

### Mini App Store Page
| Field          | Purpose                                        | Limitations                                     |
| -------------- | ---------------------------------------------- | ----------------------------------------------- |
| description    | Promotional message displayed on Mini App Page | 170 characters, no emojis or special characters |
| screenshotUrls | Visual previews of the app, max 3 screens      | Portrait, 1284 x 2778                           |

### Search & Discovery
| Field           | Purpose                               | Options                                                                                                                                                       |
| --------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| primaryCategory | Primary category of app               | One of: games, social, finance, utility, productivity, health-fitness, news-media, music, shopping, education, developer-tools, entertainment, art-creativity |
| tags            | Descriptive tags for filtering/search | up to 5 tags                                                                                                                                                  |

### Promotional Assets
| Field        | Purpose                                                | Limitations           |
| ------------ | ------------------------------------------------------ | --------------------- |
| heroImageUrl | Promotional display image on top of the mini app store | 1200 x 630px (1.91:1) |
| tagline      | Marketing tagline should be punchy and descriptive     | 30 characters         |

### Sharing Experience
| Field         | Purpose                                    | Limitations           |
| ------------- | ------------------------------------------ | --------------------- |
| ogTitle       | Open Graph title for social sharing        | 30 characters         |
| ogDescription | Open Graph description for social sharing  | 100 characters        |
| ogImageUrl    | Promotional image (same as app hero image) | 1200 x 630px (1.91:1) |

## Example Manifest
```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
    "payload": "eyJkb21haW4iOiJyZXdhcmRzLndhcnBjYXN0LmNvbSJ9",
    "signature": "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUyZGU4ZGU1MWU0MThiYjU4ZjVmZmQxYjRjNDBiNGVlZTRhNDcwNmVmNjhlMzQ0ZGQ5MDBkYmQyMmNlMmVlZGY5ZGQ0N2JlNWRmNzMwYzUxNjE4OWVjZDJjY2Y0MDFj"
  },
  "frame": {
    "version": "1",
    "name": "Example Mini App",
    "iconUrl": "https://example.com/app.png",
    "splashImageUrl": "https://example.com/logo.png",
    "splashBackgroundColor": "#000000",
    "homeUrl": "https://example.com",
    "webhookUrl": "https://example.com/api/webhook",
    "subtitle": "Example Mini App subtitle",
    "description": "Example Mini App subtitle",
    "screenshotUrls": [
      "https://example.com/screenshot1.png",
      "https://example.com/screenshot2.png",
      "https://example.com/screenshot3.png"
    ],
    "primaryCategory": "social",
    "tags": [
      "example",
      "mini app",
      "Base App"
    ],
    "heroImageUrl": "https://example.com/og.png",
    "tagline": "Example Mini App tagline",
    "ogTitle": "Example Mini App",
    "ogDescription": "Example Mini App description",
    "ogImageUrl": "https://example.com/og.png"
  }
}
```

## Development Notes
- Use `sdk.actions.openUrl()` for external navigation instead of direct HTML links
- Use `sdk.actions.composeCast()` instead of Warpcast composer URLs
- Implement visual feedback alternatives for haptic feedback
- Avoid relying on location context for core functionality
- Check `context.client.clientFid` for Base App detection (returns `309857`)

## AI-Powered Compatibility Checking
Base provides a validate.txt file for AI tools to automatically check codebase for Base App compatibility issues. This is experimental and should only be used for analysis and reporting purposes.

## Notifications
Two ways to integrate notifications:
1. **Use Neynar** (Recommended) - Hosted webhook interface with built-in user token management
2. **Use Your Own Infrastructure** - Custom notification system

## Source
[Base Documentation - Mini Apps Compatibility](https://docs.base.org/wallet-app/introduction/mini-apps#mini-apps-compatibility-in-coinbase-wallet)

---

**Last Updated:** 2025-01-27  
**Status:** Active documentation for Base App mini apps compatibility 