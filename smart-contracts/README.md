# 🏗️ CarCulture Smart Contracts

Professional smart contract architecture for the CarCulture ecosystem, built with Manifold Studios and deployed on Base Chain and Ethereum L1.

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
├── shared/                      # Shared contract components
│   ├── interfaces/              # Common interfaces
│   │   ├── IProvenance.sol     # Provenance interface
│   │   ├── ICommunity.sol      # Community interface
│   │   └── IRegistry.sol       # Registry interface
│   └── libraries/               # Reusable libraries
│       ├── ProvenanceLib.sol    # Provenance utilities
│       ├── CommunityLib.sol     # Community utilities
│       └── SecurityLib.sol      # Security utilities
├── README.md                    # This main documentation
├── CONTRACT_ARCHITECTURE_SUMMARY.md # Complete 4-contract overview
├── CarMania_Smart_Contract_Roadmap.md # Development roadmap
├── 2025-08-16_smartcontract.md # Smart contract governance strategy
└── SMART_CONTRACT_CONFIGURATION_2025-08-19.md # Configuration details
```

## 🚀 Quick Start

### Prerequisites
- [Foundry](https://getfoundry.sh/) installed
- Base Chain and Ethereum L1 RPC access
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

### CarMania Collection - 4 Contract Architecture ✅
- **Location**: `smart-contracts/carmania/`
- **Purpose**: NFT collection and minting across networks
- **Status**: ✅ All 4 contracts deployed and functional
- **Networks**: Base Chain (L2) + Ethereum L1

#### **Deployed Contracts**

**BASE Chain (L2):**
- **ERC-721**: `0x8ef0772347e0caed0119937175d7ef9636ae1aa0`
- **ERC-1155**: `0x1c6d27a76f4f706cccb698acc236c31f886c5421`

**Ethereum L1:**
- **ERC-721**: `0x1839805916a9dcf0a4d88e6e043e8ae1b8dd865a`
- **ERC-1155**: `0xB4d5Cb1198BF68C8076B72D554b5EbB45B824221`

#### **Contract Features**
- **NFT Minting**: Both standards supported
- **Metadata Management**: Arweave integration
- **Access Control**: Role-based permissions
- **Cross-Network**: Unified user experience

### DRIVR Platform
- **Location**: `smart-contracts/drivr/`
- **Purpose**: Universal provenance and community features
- **Status**: 🔄 In development
- **Features**: 
  - Provenance tracking for all collections
  - Community governance and rewards
  - Cross-collection functionality
  - Cross-network integration

### Shared Components
- **Location**: `smart-contracts/shared/`
- **Purpose**: Reusable interfaces and libraries
- **Usage**: Imported by collection and platform contracts
- **Benefits**: Code reuse, consistency, maintainability

## 📚 **Documentation Overview**

### **Core Documentation**
- **README.md** (this file) - Main architecture overview
- **CONTRACT_ARCHITECTURE_SUMMARY.md** - Complete 4-contract architecture details
- **CarMania_Smart_Contract_Roadmap.md** - Development phases and timeline
- **2025-08-16_smartcontract.md** - Smart contract governance strategy
- **SMART_CONTRACT_CONFIGURATION_2025-08-19.md** - Technical configuration details

### **Contract-Specific Docs**
- **CarMania**: `smart-contracts/carmania/README.md`
- **DRIVR**: `smart-contracts/drivr/README.md`
- **Shared**: `smart-contracts/shared/README.md`

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

### Network Configuration
- **Base Chain**: L2 scaling with low gas fees
- **Ethereum L1**: Mainnet security and liquidity
- **RPC Endpoints**: Configured in foundry.toml

### Environment Variables
```bash
# Required for deployment
PRIVATE_KEY=your_private_key
BASE_RPC_URL=your_base_rpc_url
ETHEREUM_RPC_URL=your_ethereum_rpc_url
ETHERSCAN_API_KEY=your_etherscan_key
```

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch
3. **Develop** with tests
4. **Submit** pull request
5. **Review** and merge

### Code Standards
- **Solidity**: Latest stable version
- **Testing**: 100% coverage target
- **Documentation**: Clear comments and READMEs
- **Security**: Professional standards

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
- [x] CarMania collection contracts (all 4 deployed)
- [x] Basic minting and ownership
- [x] Base Chain and Ethereum L1 deployment

### Phase 2: Platform 🔄
- [ ] DRIVR provenance contract
- [ ] Community governance
- [ ] Cross-collection functionality
- [ ] Cross-network integration

### Phase 3: Advanced 🎯
- [ ] Advanced provenance features
- [ ] Community rewards system
- [ ] Cross-chain bridges
- [ ] Enterprise integrations

## 🏆 Onchain Summer Hackathon

This smart contract architecture is being developed for the Onchain Summer Hackathon, showcasing:
- **Professional development** practices
- **Scalable architecture** design
- **Security-first** approach
- **Multi-network** integration excellence
- **Manifold Studios** platform expertise

---

## 🔗 **Next Steps**

1. **Continue DRIVR Platform Development** - Focus on provenance and community contracts
2. **Test Cross-Network Functionality** - Ensure seamless user experience
3. **Develop Advanced Features** - Implement governance and reward systems
4. **Security Auditing** - Professional review of all contracts
5. **Documentation** - Complete integration guides and API references

---

*Built with ❤️ for the automotive community by CarCulture*

**Repository**: Private GitHub repository
**Status**: Active development
**Collaboration**: Open to qualified contributors

