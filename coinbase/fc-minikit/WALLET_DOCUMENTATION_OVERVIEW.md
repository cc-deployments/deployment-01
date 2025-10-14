# CarCulture Wallet Documentation Overview

## 📋 Current Wallet Documentation

Based on the codebase analysis, here are the wallet-related documents and configurations:

### 1. **SECURITY_SETUP.md** - Multi-Signature Wallet Setup
- **SAFE #1: NFT Sales Revenue** (2 signers)
  - Purpose: Receives funds from NFT sales and commerce operations
  - Network: Base mainnet
  - Use cases: StableLink transactions, revenue management, gas fees

- **SAFE #2: Cold Storage NFTs** (3 signers)
  - Purpose: Secure long-term storage of valuable NFTs
  - Network: Base mainnet
  - Use cases: High-value CarMania NFTs, rare/limited editions, backup storage

### 2. **SAFE_CONFIGURATION.md** - Environment Variables
```bash
# SAFE #1: NFT Sales Revenue (2 signers)
NEXT_PUBLIC_SAFE_REVENUE_ADDRESS=0x0000000000000000000000000000000000000000

# SAFE #2: Cold Storage NFTs (3 signers)  
NEXT_PUBLIC_SAFE_COLD_STORAGE_ADDRESS=0x0000000000000000000000000000000000000000
```

### 3. **STABLELINK_TESTING_GUIDE.md** - Current Issues
- **BLOCKED**: BASE Smart Wallet (L3ldrivr.base.eth) not connecting to dApps
- **Status**: Reported to BASE Discord, waiting for resolution
- **Workaround**: Direct Manifold integration, alternative wallets

## 🔍 Identified Wallet Addresses

### Production Wallets
- **CarCulture Smart Wallet**: `0x048a22DAB92f2c1e7Deb3847Ca151B888aAb0F1C` (L3ldrivr.base.eth)
- **Farcaster Wallet**: `0xF74FE33d71bF46cDC006FE0F2888783174fE2aA2`
- **SAFE #1 (Revenue)**: `0x7d9bfEC6bDA952128D0321DeDa02199527A7b989`
- **SAFE #2 (NFT Storage)**: `0xBA03D53507412639795bDb3591aa3EE3ADe1881C`

### Test/Development Wallets
- **DRIVR CB.ID Wallet**: `0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142` (drivr.cb.id)
- **BasePay Recipient**: `0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6`

### Basename
- **DRIVR Basename**: `drivr.base.eth` (owned by CarCulture.eth)
- **Current Issue**: Not migrated to smart wallet yet

## 🏗️ Wallet Architecture

### Revenue Flow
1. **NFT Sales** → StableLink → **SAFE #1** (Revenue)
2. **Gas Payments** ← **SAFE #1** (Operations)
3. **Team Distribution** ← **SAFE #1** (Payments)

### Asset Management
1. **Minted NFTs** → **SAFE #2** (Cold Storage)
2. **High-value NFTs** → **SAFE #2** (Secure Custody)
3. **Emergency Recovery** ← **SAFE #2** (Backup)

## ⚠️ Current Issues

### 1. **Complex Basename Migration Status**
- **carculture.base.eth**: Funds migrated ✅, basename still on old wallet ❌
- **drivr.base.eth**: Not migrated yet ❌, owned by CarCulture.eth
- **L3ldrivr.base.eth**: Smart wallet ready (`0x048a22DAB92f2c1e7Deb3847Ca151B888aAb0F1C`)
- **Migration Required**: Both basenames need 4 transactions each to smart wallet

### 2. **SAFE Addresses Now Set** ✅
- **SAFE #1 (Revenue)**: `0x7d9bfEC6bDA952128D0321DeDa02199527A7b989`
- **SAFE #2 (NFT Storage)**: `0xBA03D53507412639795bDb3591aa3EE3ADe1881C`
- **Environment variables**: Need to be updated with actual addresses

### 3. **Wallet Connection Issues**
- BASE Smart Wallet (L3ldrivr.base.eth) not connecting to dApps
- Reported to BASE Discord, awaiting resolution

### 4. **Basename Ownership Complexity**
- **carculture.eth**: Farcaster username (imported, currently posting)
- **carculture.base.eth**: Base basename (funds migrated, basename not migrated)
- **drivr.base.eth**: Base basename (owned by CarCulture.eth, not migrated)
- **Migration Strategy**: Need to consolidate all basenames to smart wallet

## 📝 Missing Documentation

### What's NOT Documented
1. **Signer information** for multi-sig wallets
2. **Private key management** strategy
3. **Recovery procedures** for each wallet type
4. **Wallet funding** procedures
5. **Emergency contact** information
6. **Basename migration step-by-step guide**

### What's Partially Documented
1. **Environment variables** (templates exist, actual values need updating)
2. **Integration points** (some components updated, others pending)
3. **Security procedures** (outlined but not fully implemented)
4. **Basename migration** (process understood, execution pending)

## 🎯 Next Steps

### Immediate Actions Needed
1. **Update environment variables** with actual SAFE addresses
2. **Complete carculture.base.eth migration** (4 transactions)
3. **Migrate drivr.base.eth** to smart wallet (4 transactions)
4. **Resolve wallet connection issues** with BASE team
5. **Document signer information** securely
6. **Test multi-sig operations** with small amounts

### Documentation Gaps to Fill
1. **Basename migration step-by-step guide**
2. **Private key management** procedures
3. **Recovery protocols** for each wallet
4. **Funding procedures** for testnet and mainnet
5. **Emergency procedures** and contacts
6. **Basename consolidation strategy**

## 🔧 Configuration Files

### Environment Variables Needed
```bash
# SAFE Wallets (ACTUAL ADDRESSES PROVIDED)
NEXT_PUBLIC_SAFE_REVENUE_ADDRESS=0x7d9bfEC6bDA952128D0321DeDa02199527A7b989
NEXT_PUBLIC_SAFE_COLD_STORAGE_ADDRESS=0xBA03D53507412639795bDb3591aa3EE3ADe1881C

# Smart Wallet
SMART_WALLET_ADDRESS=0x048a22DAB92f2c1e7Deb3847Ca151B888aAb0F1C

# Agent Wallets
CARMANIA_AGENT_PRIVATE_KEY=0x[ACTUAL_PRIVATE_KEY]
DRIVR_CB_ID_WALLET=0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142

# Basenames (after migration)
NEXT_PUBLIC_PRIMARY_BASENAME=carculture.base.eth
DRIVR_BASENAME=drivr.base.eth

# Network Configuration
BASE_RPC_URL=https://mainnet.base.org
BASE_TESTNET_RPC_URL=https://sepolia.base.org
```

## 📚 **CDP Embedded Wallets Configuration**

### **CDP Project Configuration**
- **Project Name**: `carculture`
- **Project ID**: `1cceb0e4-e690-40ac-8f3d-7d1f3da1417a`
- **Portal URL**: `portal.cdp.coinbase.com/products/embedded-wallets/`

### **CDP Domains Configuration** ✅
- ✅ **Local Development**: `http://localhost:3000`
- ✅ **Production Domain**: `https://carculture.com`
- ❌ **Mini App Domain**: `https://carmania.carculture.com` (NEEDS TO BE ADDED)

### **Required Action**
- **Add Domain**: `https://carmania.carculture.com` to CDP Portal
- **Reason**: CORS policies require exact domain matching - subdomains don't inherit from root domain
- **Location**: CDP Portal → Embedded Wallets → Domains → Add domain

### **CDP Session Token Documentation**

### **CDP Quickstart Approach**
- **Documentation**: [CDP Onramp Quickstart](https://docs.cdp.coinbase.com/onramp-&-offramp/introduction/quickstart)
- **Simple Setup**: Just need CDP Project ID and URL generation
- **No Complex Auth**: Basic integration doesn't require JWT tokens
- **Testing Limits**: 25 transactions up to $5 each for testing

### **Current Status**
- ✅ **OffRamp UI implemented** - Complete user interface
- ✅ **CDP Project ID configured** - `1cceb0e4-e690-40ac-8f3d-7d1f3da1417a`
- ✅ **Simple URL generation** - Using CDP quickstart format
- 🎯 **Testing**: Should work with basic CDP setup

### **Implementation Notes**
1. **CDP Project ID** - Already configured
2. **Simple URL format** - `https://pay.coinbase.com/buy/select-asset?appId=...`
3. **No session tokens** - Not required for basic integration
4. **Testing limits** - 25 transactions, $5 each

## 📚 **CDP Postman Environment & Collections**

### **CDP Postman Environment (Required)**
- **Download**: [CDP Postman Environment](https://docs.cdp.coinbase.com/get-started/downloads/coinbase_developer_platform.postman_environment.json)
- **Contains**: API Key Name, Private Key, Base URLs, Environment variables
- **Purpose**: Required for all CDP API collections

### **Onramp Postman Collection**
- **Download**: [Onramp Postman Collection](https://docs.cdp.coinbase.com/get-started/downloads/onramp.postman_collection.json)
- **Contains**: Session Token API, Onramp APIs, Offramp APIs, Transaction Status
- **Purpose**: Test and implement CDP payment flows

### **Key API Endpoints from Postman Collection**
1. **Create Session Token**: `POST https://api.developer.coinbase.com/onramp/v1/token`
2. **Offramp Config**: `GET https://api.developer.coinbase.com/onramp/v1/sell/config`
3. **Offramp Options**: `GET https://api.developer.coinbase.com/onramp/v1/sell/options`
4. **Offramp Quote**: `POST https://api.developer.coinbase.com/onramp/v1/sell/quote`
5. **Offramp Transaction Status**: `GET https://api.developer.coinbase.com/onramp/v1/sell/user/{partner_user_id}/transactions`

### **Current API Key Status**
- ✅ **CDP Project ID**: `1cceb0e4-e690-40ac-8f3d-7d1f3da1417a`
- ✅ **CDP Client API Key**: `EkLP8filqrKyDZrEyPYc4cqgEsn7gDrk` (present in .env)
- ❌ **CDP API Key Name**: Missing (needed for JWT signing)
- ❌ **CDP Private Key**: Missing (needed for JWT signing)

### **Why OffRamp is Failing**
- **Root Cause**: Missing CDP API Key Name and Private Key
- **Error**: "Invalid sessionToken" because we can't generate proper JWT tokens
- **Solution**: Wait for CDP onboarding approval, then add missing API credentials

### **Sandbox Testing**
- **Available**: 25 transactions up to $5 each for testing
- **Purpose**: Test Onramp/Offramp functionality before production
- **Access**: Available after CDP onboarding approval

---
