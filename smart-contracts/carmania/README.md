# 🚗 CarMania Smart Contracts

Smart contracts for the CarMania NFT collection, deployed on Base Chain.

## 📋 Overview

**CarMania** is the flagship NFT collection of the CarCulture ecosystem, featuring legendary automobiles and car culture artifacts. These smart contracts handle NFT minting, ownership, and collection management.

## 🏗️ Contract Architecture

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
- Base Chain RPC access
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
```

### Environment Variables
```bash
# Required for deployment
PRIVATE_KEY=your_private_key
BASE_RPC_URL=your_base_rpc_url
ETHERSCAN_API_KEY=your_etherscan_key
```

## 📊 Contract Status

### Current Status: ✅ **Deployed and Functional**
- **Network**: Base Chain (Sepolia + Mainnet)
- **Contract**: CarManiaMiniApp.sol
- **Features**: NFT minting, ownership, metadata
- **Testing**: Comprehensive test coverage

### Deployment Addresses
- **Base Sepolia**: [Contract Address]
- **Base Mainnet**: [Contract Address]
- **Etherscan**: [BaseScan Link]

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

### AI Agent Integration
- **DRIVR Agent**: `../agents/carculture-drivr-agent/`
- **NFT Verification**: Ownership and access control
- **Provenance**: Story and metadata management

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Basic NFT contract deployment
- [x] Minting functionality
- [x] Ownership management
- [x] Base Chain integration

### Phase 2: Enhancement 🔄
- [ ] Advanced metadata features
- [ ] Provenance integration
- [ ] Community features
- [ ] Cross-collection functionality

### Phase 3: Advanced 🎯
- [ ] Governance mechanisms
- [ ] Reward systems
- [ ] Cross-chain bridges
- [ ] Enterprise features

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

## 🌐 Base Chain Integration

### Why Base Chain?
- **Coinbase Ecosystem**: Native integration
- **Low Gas Fees**: Cost-effective transactions
- **Fast Finality**: Quick transaction confirmation
- **Developer Friendly**: Excellent tooling and support

### Base Chain Features
- **Ethereum L2**: Scalable and secure
- **Smart Contract Support**: Full EVM compatibility
- **Bridge Support**: Easy asset transfer
- **Ecosystem Growth**: Expanding developer community

---

## 🏆 Onchain Summer Hackathon

This contract architecture is being developed for the Onchain Summer Hackathon, demonstrating:
- **Professional Solidity development**
- **Base Chain integration excellence**
- **Security-first smart contract design**
- **Scalable NFT collection architecture**

---

*Built with ❤️ for the automotive community by CarCulture*

**Status**: Production Ready
**Network**: Base Chain
**Standard**: ERC-721
**Features**: Minting, Ownership, Metadata, Access Control
