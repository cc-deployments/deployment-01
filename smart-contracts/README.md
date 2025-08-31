# 🏗️ CarCulture Smart Contracts

Professional smart contract architecture for the CarCulture ecosystem, built with Foundry and deployed on Base Chain.

## 📁 Directory Structure

```
smart-contracts/
├── carmania/                    # CarMania collection contracts
│   ├── src/
│   │   └── CarManiaMiniApp.sol # Main CarMania contract
│   ├── test/                    # Test files
│   ├── foundry.toml            # Foundry configuration
│   └── README.md               # Collection-specific docs
├── drivr/                       # DRIVR platform contracts
│   ├── src/
│   │   ├── DRIVRProvenance.sol # Universal provenance contract
│   │   ├── DRIVRCommunity.sol  # Community features
│   │   └── DRIVRRegistry.sol   # Platform registry
│   ├── test/                    # Test files
│   ├── foundry.toml            # Foundry configuration
│   └── README.md               # Platform-specific docs
└── shared/                      # Shared contract components
    ├── interfaces/              # Common interfaces
    │   ├── IProvenance.sol     # Provenance interface
    │   ├── ICommunity.sol      # Community interface
    │   └── IRegistry.sol       # Registry interface
    └── libraries/               # Reusable libraries
        ├── ProvenanceLib.sol    # Provenance utilities
        ├── CommunityLib.sol     # Community utilities
        └── SecurityLib.sol      # Security utilities
```

## 🚀 Quick Start

### Prerequisites
- [Foundry](https://getfoundry.sh/) installed
- Base Chain RPC access
- Environment variables configured

### Installation
```bash
# Navigate to specific contract directory
cd smart-contracts/carmania

# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test
```

## 🔧 Contract Development

### CarMania Collection
- **Location**: `smart-contracts/carmania/`
- **Purpose**: NFT collection and minting
- **Status**: ✅ Deployed and functional
- **Network**: Base Chain (Sepolia + Mainnet)

### DRIVR Platform
- **Location**: `smart-contracts/drivr/`
- **Purpose**: Universal provenance and community features
- **Status**: 🔄 In development
- **Features**: 
  - Provenance tracking for all collections
  - Community governance and rewards
  - Cross-collection functionality

### Shared Components
- **Location**: `smart-contracts/shared/`
- **Purpose**: Reusable interfaces and libraries
- **Usage**: Imported by collection and platform contracts
- **Benefits**: Code reuse, consistency, maintainability

## 🛡️ Security Features

### Multi-Signature Wallets
- **Minting Authority**: Multi-sig for collection management
- **Treasury**: Multi-sig for financial operations
- **Emergency**: Multi-sig for critical functions

### Access Control
- **Role-Based**: Different permissions for different functions
- **Time-Locks**: Delayed execution for critical operations
- **Pause Mechanism**: Emergency stop functionality

### Testing & Auditing
- **Comprehensive Tests**: 100% coverage target
- **Security Audits**: Professional third-party reviews
- **Formal Verification**: Mathematical proof of correctness

## 🌐 Deployment

### Base Chain Configuration
- **Sepolia Testnet**: Development and testing
- **Mainnet**: Production deployment
- **RPC Endpoints**: Configured in foundry.toml

### Environment Variables
```bash
# Required for deployment
PRIVATE_KEY=your_private_key
BASE_RPC_URL=your_base_rpc_url
ETHERSCAN_API_KEY=your_etherscan_key
```

## 📚 Documentation

### Contract-Specific Docs
- **CarMania**: `smart-contracts/carmania/README.md`
- **DRIVR**: `smart-contracts/drivr/README.md`
- **Shared**: `smart-contracts/shared/README.md`

### Architecture Docs
- **System Overview**: See main project README
- **Integration Guide**: How contracts work together
- **API Reference**: Function signatures and events

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch
3. **Develop** with tests
4. **Submit** pull request
5. **Review** and merge

### Code Standards
- **Solidity**: Latest stable version
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear comments and READMEs
- **Security**: Best practices and audits

## 🔗 Integration

### Frontend (fc-minikit)
- **Location**: `../coinbase/fc-minikit/`
- **Purpose**: User interface and Mini App
- **Integration**: Web3 calls to smart contracts

### AI Agent (carculture-drivr-agent)
- **Location**: `../agents/carculture-drivr-agent/`
- **Purpose**: AI-powered interactions and provenance
- **Integration**: On-chain data verification and updates

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] CarMania collection contracts
- [x] Basic minting and ownership
- [x] Base Chain deployment

### Phase 2: Platform 🔄
- [ ] DRIVR provenance contract
- [ ] Community governance
- [ ] Cross-collection functionality

### Phase 3: Advanced 🎯
- [ ] Advanced provenance features
- [ ] Community rewards system
- [ ] Cross-chain integration

## 🏆 Onchain Summer Hackathon

This smart contract architecture is being developed for the Onchain Summer Hackathon, showcasing:
- **Professional development** practices
- **Scalable architecture** design
- **Security-first** approach
- **Base Chain** integration excellence

---

*Built with ❤️ for the automotive community by CarCulture*

**Repository**: Private GitHub repository
**Status**: Active development
**Collaboration**: Open to qualified contributors

