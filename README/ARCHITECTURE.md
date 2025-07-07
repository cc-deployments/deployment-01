# [2025-07-02] Architecture and UI/UX Refactor Progress

## Recent Updates (July 1–2, 2025)
- Unified all social identity and wallet logic in `shared/identity/` (OnchainKit, Farcaster, wrappers, etc.)
- Removed legacy/duplicate folders and archived unused code (e.g., _archive_neynar_v2, duplicate coinbase folders)
- Modularized and cleaned up UI components; ongoing UI/UX simplification (e.g., removed TitleBar, streamlined SplashPage)
- OnchainKit is now the primary wallet/identity provider; Privy and legacy flows deprecated
- Manifest and icon updates in progress for improved MiniApp listing and discoverability
- Project structure and documentation are in sync with the onboarding schema and architectural diagram

# CCulture-Apps-New: Architecture Overview

## Monorepo Structure

```
CCulture-Apps-New/
  smart-contracts/         # Solidity, Foundry, Hardhat contracts (parent/child, registry, etc.)
  oracle/                  # Off-chain Oracle service for bridging proprietary data and smart contracts
  agents/                  # LLM/agent logic, prompt templates, and cross-app integrations
  coinbase/
    carculture-miniapp/
      app/
        components/        # Main UI components (CarManiaGallery, CarManiaNFTCard, etc.)
        tokens/            # Token/contract ABIs and frontend logic
      shared/
        identity/          # Centralized social identity/auth logic (OnchainKit, wrappers, etc.)
    socialidentity/        # Standalone app/demo for social identity/auth flows (legacy/demo)
    nft-gallery/           # (Archived) NFT gallery, now integrated into miniapp
  _archive_neynar_v2/      # Archived Farcaster demo/logic
  ... (other apps, packages, and infra)
```

## Key Architectural Decisions

- **Monorepo:** All apps, contracts, and shared logic live in a single repository for easy collaboration and code sharing.
- **Centralized Identity/Auth:** All wallet and social identity logic (OnchainKit, Farcaster, etc.) is centralized in `shared/identity/` for use across all apps and features.
- **Modular Components:** Features like the NFT gallery and minting are modularized as components, making them easy to reuse and maintain.
- **OnchainKit Integration:** OnchainKit is the primary toolkit for wallet connection, social identity, and onchain interactions, following Base ecosystem best practices.
- **Oracle Service:** Proprietary/off-chain data is bridged to smart contracts via a dedicated Oracle service, isolated for security and scalability.
- **Agents/LLM:** All AI/agent logic is centralized in the `agents/` directory for cross-app use and future expansion.
- **Naming Conventions:** PascalCase for React components, kebab-case/lowercase for folders and assets, camelCase for utilities/hooks.

## Best Practices

- **DRY Principle:** Shared logic is never duplicated—always imported from the appropriate shared directory.
- **Incremental Refactoring:** Major moves (identity, gallery, etc.) are tested and committed in small, logical steps.
- **Documentation:** Each major directory contains a README for onboarding and clarity.
- **Edge/AI Ready:** Structure is designed to support future edge computation and AI-driven features (e.g., Apple app, on-device LLMs).

## Future Directions

- Integrate Manifold for NFT minting and contract interaction.
- Continue UI/UX improvements and modularization.
- Expand Oracle and agent capabilities as new features are added.
- Prepare for mobile/edge deployments and privacy-centric computation.

## Environment & Secrets Management

- Each app (e.g., `coinbase/fc-minikit/`) has its own `.env` for public config.
- Shared secrets (API keys, auth secrets) are stored in the root `.env` (not checked into git) or a secrets manager.
- Example `.env` for MiniApp:
  ```
  NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=CarMania Garage
  NEXT_PUBLIC_URL=http://localhost:3001
  NEXT_PUBLIC_APP_HERO_IMAGE=https://your-image-url.png
  NEXT_PUBLIC_SPLASH_IMAGE=https://your-splash-image-url.png
  NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=#ffffff
  ```
- All secrets are accessed via `process.env` in code.

### Auth & Wallet Provider Setup

- OnchainKit is the primary wallet/identity provider.
- Shared logic lives in `shared/identity/`.
- To update auth config, edit the relevant `.env` or secrets manager entry.

### Deployment & Local Dev

- Run `npm run dev` in the app directory.
- If port 3000 is in use, Next.js will use the next available port (e.g., 3001).
- Ensure `.env` is present before starting the server.

---

*This document is a living overview. Update as the architecture evolves.*

# CarCulture Architecture (2025-07)

## Brand & Platform Strategy

- **CarCulture.com** is the main hub/landing page for the brand.
  - Top-level navigation links to all major features/verticals:
    - CarMania (daily drops, collectibles, mints)
    - Gallery (all collections, embedded from Manifold)
    - About/Story
    - Community/Events
    - Profiles (artist, collector, etc.)
    - Farcaster MiniApp ("Onchain Social")
    - Future features (games, AI, etc.)

- **Manifold Profile**: @carculture
  - Main profile for all collections (CarMania, CarLegends, etc.)
  - CarMania contracts featured as a "Custom Collection" or "Contracts" tile
  - Future collections added as they launch
  - Profile can be embedded in the MiniApp Gallery page or linked from main site

- **Farcaster**: @carculture
  - Main identity for all social and MiniApp branding
  - MiniApp: "CarCulture: CarMania Garage" (CarMania as first featured collection)
  - Navigation to future collections as they launch

- **MiniApp**: carmania.carculture.com
  - Focused on daily drops, minting, and gallery (with Manifold embed)
  - Clean separation from main site and other features

- **Subdomain Strategy**:
  - carmania.carculture.com: MiniApp (CarMania vertical)
  - profile.carculture.com or gallery.carculture.com: (optional) for custom gallery/profile
  - Main site remains at carculture.com

## Summary Table

| Platform         | Brand/Handle   | Content/Role                        |
|------------------|---------------|-------------------------------------|
| Main site        | CarCulture.com | Hub for all features/verticals      |
| Manifold         | @carculture    | Profile, all collections (CarMania, etc.) |
| Farcaster        | @carculture    | Main identity, MiniApp, social      |
| MiniApp          | carmania.carculture.com | CarMania drops, gallery, minting |

## Integration Notes
- Manifold supports EMBED tiles: can embed your Manifold gallery directly in MiniApp or main site.
- CarMania contracts live under @carculture profile on Manifold.
- All new collections should be added to @carculture profile for brand consistency.
- CarCulture.com navigation should link to all major features, including MiniApp and Manifold gallery.

## Next Steps
- [ ] Update Manifold profile to feature CarMania as a collection, keep profile as @carculture
- [ ] Embed Manifold gallery in MiniApp Gallery page
- [ ] Structure CarCulture.com as a hub with clear links to all features
- [ ] Set up subdomains in Cloudflare and Vercel as needed
- [ ] Keep all new collections under CarCulture umbrella

---

*This architecture supports scalable growth, brand consistency, and seamless integration across platforms.*

## Shared Authentication Architecture

### Overview
To ensure consistency, maintainability, and scalability across all CarCulture mini-apps, authentication logic is centralized in a shared package: `@cculture/privy`. This package is located in the monorepo at `packages/privy` and is consumed by all mini-apps (e.g., `fc-minikit`, `cb-minikit`).

### Why a Shared Auth Package?
- **Single Source of Truth:** All authentication logic, configuration, and UI components are maintained in one place.
- **Consistency:** All mini-apps provide a unified authentication experience for users.
- **Maintainability:** Updates or bug fixes to authentication only need to be made in one package.
- **Scalability:** New mini-apps can be added to the monorepo and immediately leverage the shared auth logic.

### How It Works
- The `@cculture/privy` package exports authentication providers, hooks, and components.
- Each mini-app includes `@cculture/privy` as a local dependency:
  ```json
  "@cculture/privy": "file:../../packages/privy"
  ```
- During development and deployment (including on Vercel), the local package is used, ensuring all apps are always in sync with the latest auth logic.

### Example Usage in a Mini-App
```js
// In fc-minikit or cb-minikit
import { PrivyProvider, usePrivyAuth } from '@cculture/privy';

function App() {
  return (
    <PrivyProvider>
      {/* ... */}
    </PrivyProvider>
  );
}
```

### Directory Structure
```
/packages/privy
  - index.js
  - package.json
  - (auth logic, hooks, components)
```
Each mini-app:
```
/coinbase/fc-minikit
  - package.json (depends on @cculture/privy)
/coinbase/cb-minikit
  - package.json (depends on @cculture/privy)
```

### Deployment Notes
- Vercel and local builds both use the local package reference.
- No need to publish `@cculture/privy` to npm unless you want to share it outside your monorepo.

--- 