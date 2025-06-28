# Smart Contract Governance & Backend Strategy — 2025-06-26

## Summary of Discussion

### 1. Is Our MiniApp Governed by a Smart Contract?
- **Current State:**
  - The MiniApp is a frontend dApp that interacts with smart contracts (e.g., Manifold for NFT minting).
  - The rules (who can mint, what happens on mint, etc.) are defined by the smart contract, not the frontend.
- **Possibility:**
  - The MiniApp can be fully governed by a smart contract if all critical logic (minting, gating, access) is enforced on-chain.
  - This is a best practice in web3: the contract is the source of truth.

### 2. Backend Needs with Manifold
- **If using Manifold for NFT minting:**
  - Only a static frontend is needed (Next.js, Vercel, Netlify, Cloudflare Pages, etc.).
  - The frontend can call the Manifold contract directly from the browser.
  - No backend is required for minting, metadata, or NFT display.
- **Backend is only needed if:**
  - You want custom gating, analytics, notifications, or off-chain data storage.

### 3. Gating with Smart Contracts
- **Onchain gating examples:**
  - Token/NFT ownership (only holders can mint or access features)
  - Allowlist/Merkle tree (pre-approved addresses)
  - Time-based gating (minting windows)
  - Usage limits (per address)
- **How it works:**
  - The frontend checks wallet connection and calls the contract.
  - The contract enforces the rules; if not met, the transaction fails.

### 4. OnchainKit & MiniKit
- **OnchainKit:** Provides wallet connection, identity, and contract interaction components.
- **MiniKit:** Makes it easy to build mini apps for Farcaster Frames and onchain social platforms.
- Both are designed to work with smart contracts as the source of truth for gating and business logic.

### 5. Benefits of Smart Contract Governance
- Trustless, transparent, and composable
- No backend or centralized server can override the rules
- Community governance and upgradability possible

### 6. Next Steps
- Integrate Manifold contract with NFTMintCard (frontend only)
- Move gating logic into the smart contract for future extensibility
- Use OnchainKit/MiniKit for wallet connection and contract calls
- Deploy frontend as a static site; add backend only if/when needed

---

*This summary was generated on 2025-06-26 to capture the strategic discussion about smart contract governance, backend needs, and gating for the CarCulture MiniApp.* 