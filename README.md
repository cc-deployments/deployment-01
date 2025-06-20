# CarCulture Apps

This repository contains all CarCulture applications and shared infrastructure.

## Project Structure

### CCulture-Apps-Core
Core infrastructure and shared packages used across all applications.

- **packages/**
  - `auth/` - Authentication packages (Privy, Farcaster)
  - `social/` - Social integration (Neynar)
  - `storage/` - Storage solutions (Redis, Arweave)
  - `blockchain/` - Blockchain integrations
  - `ai/` - AI agent utilities
  - `ui/` - Shared UI components

### CCulture-Apps
All application implementations.

- **social/**
  - `neynar/` - Neynar mini-app
  - `carculture/` - CarCulture social app

- **coinbase/**
  - `car-of-the-day/` - Car of the Day MiniApp
  - `social-identity/` - Social Identity Card
  - `nft-gallery/` - CarMania NFT Gallery

- **ai/**
  - `agent-kit/` - AI Agent Kit
  - `ml-training/` - ML Training app

- **shared/**
  - `types/` - Shared TypeScript types
  - `utils/` - Shared utilities

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development:
```bash
npm run dev
```

## Development

- Use `npm run build` to build all packages
- Use `npm run lint` to lint all packages
- Use `npm run format` to format all files

## Contributing

Please read our contributing guidelines before submitting pull requests. 