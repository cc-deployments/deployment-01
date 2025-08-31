# 🚗 CarMania Smart Contracts

Smart contracts for the CarMania NFT collection, deployed on Base Chain and Ethereum L1 using Manifold Studios.

## 📋 Overview

**CarMania** is the flagship NFT collection of the CarCulture ecosystem, featuring legendary automobiles and car culture artifacts. These smart contracts handle NFT minting, ownership, and collection management across multiple networks and standards.

## 🏗️ Contract Architecture

### **4-Contract Multi-Network Architecture** ✅

**BASE Chain (L2):**
- **ERC-721**: `0x8ef0772347e0caed0119937175d7ef9636ae1aa0`
- **ERC-1155**: `0x1c6d27a76f4f706cccb698acc236c31f886c5421`

**Ethereum L1:**
- **ERC-721**: `0x1839805916a9dcf0a4d88e6e043e8ae1b8dd865a`
- **ERC-1155**: `0xB4d5Cb1198BF68C8076B72D554b5EbB45B824221`

### Main Contract: `CarManiaMiniApp.sol`
- **Purpose**: NFT collection management and minting
- **Standard**: ERC-721 compatible
- **Features**: 
  - NFT minting and ownership
  - Metadata management
  - Access control and permissions
  - Base Chain integration

### Supporting Contracts
- **Access Control**: Role-based permissions
- **Metadata**: NFT attributes and properties
- **Treasury**: Collection financial management

## 🚀 Quick Start

### Prerequisites
- [Foundry](https://getfoundry.sh/) installed
- Base Chain and Ethereum L1 RPC access
- Environment variables configured

### Installation & Build
```bash
# Navigate to CarMania contracts
cd smart-contracts/carmania

# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test
```

### Deployment
```bash
# Deploy to Base Sepolia (testnet)
forge script script/Deploy.s.sol --rpc-url base-sepolia --broadcast --verify

# Deploy to Base Mainnet
forge script script/Deploy.s.sol --rpc-url base-mainnet --broadcast --verify

# Deploy to Ethereum L1
forge script script/Deploy.s.sol --rpc-url ethereum-mainnet --broadcast --verify
```

## 🔧 Configuration

### Foundry Configuration (`foundry.toml`)
```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

# OpenZeppelin remappings
remappings = [
    "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/"
]

[rpc_endpoints]
base-sepolia = "https://sepolia.base.org"
base-mainnet = "https://mainnet.base.org"
ethereum-mainnet = "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY"
```

### Environment Variables
```bash
# Required for deployment
PRIVATE_KEY=your_private_key
BASE_RPC_URL=your_base_rpc_url
ETHEREUM_RPC_URL=your_ethereum_rpc_url
ETHERSCAN_API_KEY=your_etherscan_key
```

## 📊 Contract Status

### Current Status: ✅ **All 4 Contracts Deployed and Functional**
- **Networks**: Base Chain (L2) + Ethereum L1
- **Standards**: ERC-721 + ERC-1155
- **Features**: NFT minting, ownership, metadata
- **Testing**: Comprehensive test coverage

### Deployment Addresses

**BASE Chain (L2):**
- **ERC-721**: [0x8ef0772347e0caed0119937175d7ef9636ae1aa0](https://basescan.org/address/0x8ef0772347e0caed0119937175d7ef9636ae1aa0)
- **ERC-1155**: [0x1c6d27a76f4f706cccb698acc236c31f886c5421](https://basescan.org/address/0x1c6d27a76f4f706cccb698acc236c31f886c5421)

**Ethereum L1:**
- **ERC-721**: [0x1839805916a9dcf0a4d88e6e043e8ae1b8dd865a](https://etherscan.io/address/0x1839805916a9dcf0a4d88e6e043e8ae1b8dd865a)
- **ERC-1155**: [0xB4d5Cb1198BF68C8076B72D554b5EbB45B824221](https://etherscan.io/address/0xB4d5Cb1198BF68C8076B72D554b5EbB45B824221)

## 🛡️ Security Features

### Access Control
- **Role-Based Permissions**: Different access levels for different functions
- **Multi-Signature Support**: Enhanced security for critical operations
- **Time-Lock Mechanisms**: Delayed execution for important functions
- **Emergency Pause**: Ability to halt operations if needed

### Testing & Auditing
- **Test Coverage**: 100% target for all functions
- **Security Tests**: Comprehensive security validation
- **Integration Tests**: End-to-end functionality testing
- **Audit Ready**: Professional security review preparation

## 🔗 Integration

### Frontend Integration
- **Mini App**: `../coinbase/fc-minikit/`
- **Web3 Calls**: Direct contract interaction
- **User Interface**: NFT display and management
- **Multi-Network**: Support for all 4 contracts

### AI Agent Integration
- **DRIVR Agent**: `../agents/carculture-drivr-agent/`
- **NFT Verification**: Ownership and access control
- **Provenance**: Story and metadata management
- **Cross-Network**: Unified data across all contracts

### DRIVR Platform Integration
- **Provenance Tracking**: Universal provenance across all contracts
- **Community Features**: Unified community across networks
- **Registry System**: Contract discovery and management
- **Cross-Collection**: Seamless user experience

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Basic NFT contract deployment (all 4 contracts)
- [x] Minting functionality
- [x] Ownership management
- [x] Base Chain and Ethereum L1 integration

### Phase 2: Enhancement 🔄
- [ ] Advanced metadata features
- [ ] Provenance integration with DRIVR
- [ ] Community features
- [ ] Cross-collection functionality
- [ ] Cross-network bridge development

### Phase 3: Advanced 🎯
- [ ] Governance mechanisms
- [ ] Reward systems
- [ ] Cross-chain bridges
- [ ] Enterprise features
- [ ] Advanced provenance features

## 🧪 Testing

### Test Structure
```
test/
├── CarMania.t.sol          # Main contract tests
├── AccessControl.t.sol     # Permission tests
├── Metadata.t.sol          # Metadata tests
└── Integration.t.sol       # End-to-end tests
```

### Running Tests
```bash
# Run all tests
forge test

# Run specific test file
forge test --match-contract CarMania

# Run with verbose output
forge test -vvv

# Run with gas reporting
forge test --gas-report
```

## 📚 Documentation

### Contract Functions
- **Minting**: `mint(address to, uint256 tokenId)`
- **Metadata**: `tokenURI(uint256 tokenId)`
- **Ownership**: `ownerOf(uint256 tokenId)`
- **Access Control**: `hasRole(bytes32 role, address account)`

### Events
- **Minted**: `TokenMinted(address indexed to, uint256 indexed tokenId)`
- **Metadata Updated**: `MetadataUpdated(uint256 indexed tokenId)`
- **Role Granted**: `RoleGranted(bytes32 indexed role, address indexed account)`

## 🤝 Contributing

### Development Guidelines
1. **Follow Solidity best practices**
2. **Write comprehensive tests**
3. **Update documentation**
4. **Security-first approach**

### Code Standards
- **Solidity**: Latest stable version
- **Testing**: 100% coverage target
- **Documentation**: Clear comments
- **Security**: Professional standards

## 🌐 Multi-Network Integration

### Why Multiple Networks?
- **Base Chain**: Coinbase ecosystem, low gas fees, fast finality
- **Ethereum L1**: Maximum security, liquidity, and adoption
- **Dual Standards**: ERC-721 for unique NFTs, ERC-1155 for fungible/semi-fungible

### Network Features
- **Base Chain**: L2 scaling, EVM compatibility, bridge support
- **Ethereum L1**: Full decentralization, maximum security, ecosystem growth
- **Cross-Network**: Unified user experience, shared metadata

## 🏆 Onchain Summer Hackathon

This contract architecture is being developed for the Onchain Summer Hackathon, demonstrating:
- **Professional Solidity development**
- **Multi-network integration excellence**
- **Security-first smart contract design**
- **Scalable NFT collection architecture**
- **Manifold Studios platform expertise**

---

*Built with ❤️ for the automotive community by CarCulture*

**Status**: Production Ready (All 4 Contracts)
**Networks**: Base Chain (L2) + Ethereum L1
**Standards**: ERC-721 + ERC-1155
**Features**: Minting, Ownership, Metadata, Access Control, Cross-Network
