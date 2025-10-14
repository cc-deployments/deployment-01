# Discord Message - Ticket 1: NFTMintCard Issues

Hi Sohey,

We're experiencing fundamental issues with NFTMintCard component despite following the documentation exactly. Our case was submitted on 9/28 with your reply on 10/9. We implemented embedded wallet (+onramp) and updated to React 19 and OnchainKit v1.1.1. We own four Manifold sovereign contracts and have tried to integrate into NFTMintCard following Advanced Usage. We can connect wallet but cannot complete NFT purchase or delivery.

## Critical Documentation Issues Found

1. **Missing Pricing Documentation**
   - Documentation shows `useNFTData` returning only `title` and `imageUrl`
   - No guidance on pricing for `NFTAssetCost` component

2. **Incomplete useNFTData Documentation**
   - Missing required fields like `contractAddress`, `tokenId`, `description`

3. **mediaType: 'unknown' Error**
   - All image URLs return `mediaType: 'unknown'` error, even direct ones
   - Documentation doesn't explain how to fix this

## Critical Security Issue

NFTMintCard requires direct image URLs, exposing high-resolution master assets to anyone who inspects the browser. We need marketplace URL support (like OpenSea) to protect assets while enabling minting functionality.

## Our Questions

1. Can NFTMintCard work with OpenSea marketplace URLs instead of direct image URLs?

## Context

We own sovereign NFT contracts and want to use Base's minting system while protecting image assets from free access.

**Request**: How can we use our Manifold sovereign contracts with OpenSea marketplace URLs? We are approaching 2500 NFTs in our vault: the Advanced Usage documentation is not working with our Manifold contracts. Reservoir no longer supports NFTs. OpenSea works with Manifold contracts and has an API - can NFTMintCard support OpenSea URLs for asset protection?

**Test Environment**: We have a single NFTMintCard test page at `http://localhost:3000/test-single-nftmintcard` that demonstrates these issues.

---

**Repository:** `cc-deployments/deployment-01` (sohey-testing branch)