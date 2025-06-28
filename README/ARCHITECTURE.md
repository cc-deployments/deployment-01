# [2025-07-01] Directory structure and stubs implemented

On July 1, 2025, the directory structure and stub files were created to match the architecture plan and onboarding diagram. This includes:
- All key folders (smart-contracts, oracle, agents, coinbase/carculture-miniapp/app/components, tokens/abi, shared/identity)
- Stub files for all major components, token ABIs, and identity logic
- Structure is now ready for onboarding, development, and further modularization

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

---

*This document is a living overview. Update as the architecture evolves.* 