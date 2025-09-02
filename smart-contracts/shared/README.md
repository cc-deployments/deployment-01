# 🔗 Shared Smart Contract Components

Reusable interfaces, libraries, and utilities for the CarCulture smart contract ecosystem.

## 📋 Overview

**Shared Components** provides the foundation layer for all CarCulture smart contracts, ensuring consistency, reusability, and maintainability across the entire platform. These components are designed to be imported and used by collection-specific and platform-wide contracts.

## 🏗️ Component Architecture

### Directory Structure
```
shared/
├── interfaces/              # Contract interfaces
│   ├── IProvenance.sol     # Provenance interface
│   ├── ICommunity.sol      # Community interface
│   ├── IRegistry.sol       # Registry interface
│   └── ICollection.sol     # Collection interface
├── libraries/               # Utility libraries
│   ├── ProvenanceLib.sol   # Provenance utilities
│   ├── CommunityLib.sol    # Community utilities
│   ├── SecurityLib.sol     # Security utilities
│   └── MetadataLib.sol     # Metadata utilities
└── README.md               # This file
```

## 🔧 Interface Contracts

### IProvenance.sol
**Purpose**: Standard interface for provenance tracking across all collections

**Core Functions**:
```solidity
interface IProvenance {
    function addStoryHash(
        uint256 tokenId, 
        string memory arweaveHash, 
        string memory storyType
    ) external returns (bool);
    
    function verifyStoryHash(
        uint256 tokenId, 
        string memory arweaveHash
    ) external view returns (bool);
    
    function getProvenanceData(
        uint256 tokenId
    ) external view returns (ProvenanceData memory);
}
```

**Usage**: Implemented by DRIVRProvenance.sol and collection contracts

### ICommunity.sol
**Purpose**: Standard interface for community features and governance

**Core Functions**:
```solidity
interface ICommunity {
    function updateUserReputation(
        address user, 
        uint256 reputationChange
    ) external returns (bool);
    
    function getUserReputation(
        address user
    ) external view returns (uint256);
    
    function submitProposal(
        string memory description, 
        uint256 votingPeriod
    ) external returns (uint256);
}
```

**Usage**: Implemented by DRIVRCommunity.sol and collection contracts

### IRegistry.sol
**Purpose**: Standard interface for platform registry and discovery

**Core Functions**:
```solidity
interface IRegistry {
    function registerCollection(
        address collectionAddress, 
        string memory collectionName
    ) external returns (bool);
    
    function getCollectionInfo(
        address collectionAddress
    ) external view returns (CollectionInfo memory);
    
    function updateCollectionStatus(
        address collectionAddress, 
        bool isActive
    ) external returns (bool);
}
```

**Usage**: Implemented by DRIVRRegistry.sol and platform contracts

### ICollection.sol
**Purpose**: Standard interface for NFT collection integration

**Core Functions**:
```solidity
interface ICollection {
    function getTokenOwner(
        uint256 tokenId
    ) external view returns (address);
    
    function getTokenMetadata(
        uint256 tokenId
    ) external view returns (string memory);
    
    function supportsInterface(
        bytes4 interfaceId
    ) external view returns (bool);
}
```

**Usage**: Implemented by all collection contracts (CarMania, Future1, Future2)

## 📚 Utility Libraries

### ProvenanceLib.sol
**Purpose**: Utility functions for provenance management

**Key Functions**:
```solidity
library ProvenanceLib {
    function hashStory(
        string memory story, 
        address author, 
        uint256 timestamp
    ) internal pure returns (bytes32);
    
    function validateArweaveHash(
        string memory hash
    ) internal pure returns (bool);
    
    function formatProvenanceData(
        bytes32 storyHash, 
        uint256 timestamp, 
        address author
    ) internal pure returns (ProvenanceData memory);
}
```

**Usage**: Imported by provenance contracts and collection contracts

### CommunityLib.sol
**Purpose**: Utility functions for community management

**Key Functions**:
```solidity
library CommunityLib {
    function calculateReputation(
        uint256 currentRep, 
        uint256 action, 
        uint256 multiplier
    ) internal pure returns (uint256);
    
    function validateProposal(
        string memory description, 
        uint256 votingPeriod
    ) internal pure returns (bool);
    
    function formatVoteData(
        uint256 proposalId, 
        bool support, 
        uint256 weight
    ) internal pure returns (VoteData memory);
}
```

**Usage**: Imported by community contracts and governance systems

### SecurityLib.sol
**Purpose**: Security utilities and best practices

**Key Functions**:
```solidity
library SecurityLib {
    function validateAddress(
        address target
    ) internal pure returns (bool);
    
    function validateAmount(
        uint256 amount, 
        uint256 max
    ) internal pure returns (bool);
    
    function generateSalt(
        address user, 
        uint256 nonce
    ) internal pure returns (bytes32);
    
    function verifySignature(
        bytes32 messageHash, 
        bytes memory signature, 
        address signer
    ) internal pure returns (bool);
}
```

**Usage**: Imported by all contracts for security validation

### MetadataLib.sol
**Purpose**: Metadata management and formatting utilities

**Key Functions**:
```solidity
library MetadataLib {
    function formatTokenURI(
        string memory baseURI, 
        uint256 tokenId
    ) internal pure returns (string memory);
    
    function validateMetadata(
        string memory metadata
    ) internal pure returns (bool);
    
    function mergeMetadata(
        string memory base, 
        string memory additional
    ) internal pure returns (string memory);
}
```

**Usage**: Imported by collection contracts for metadata management

## 🚀 Usage Examples

### Importing Interfaces
```solidity
// In your collection contract
import "../shared/interfaces/IProvenance.sol";
import "../shared/interfaces/ICommunity.sol";

contract CarManiaCollection is ICollection {
    IProvenance public provenanceContract;
    ICommunity public communityContract;
    
    constructor(address _provenance, address _community) {
        provenanceContract = IProvenance(_provenance);
        communityContract = ICommunity(_community);
    }
}
```

### Using Libraries
```solidity
// In your contract
import "../shared/libraries/ProvenanceLib.sol";
import "../shared/libraries/SecurityLib.sol";

contract MyContract {
    using ProvenanceLib for *;
    using SecurityLib for *;
    
    function addStory(uint256 tokenId, string memory story) external {
        require(SecurityLib.validateAddress(msg.sender), "Invalid address");
        
        bytes32 storyHash = ProvenanceLib.hashStory(
            story, 
            msg.sender, 
            block.timestamp
        );
        
        // Process story hash...
    }
}
```

## 🛡️ Security Considerations

### Interface Security
- **Standard Functions**: Well-defined, tested interfaces
- **Access Control**: Consistent permission patterns
- **Error Handling**: Standardized error messages
- **Gas Optimization**: Efficient function signatures

### Library Security
- **Pure Functions**: No state changes, predictable behavior
- **Input Validation**: Comprehensive parameter checking
- **Gas Efficiency**: Optimized for minimal gas usage
- **Reentrancy Protection**: Safe from reentrancy attacks

## 🔗 Integration Guidelines

### Contract Implementation
1. **Import Required Interfaces**: Use standard interfaces for consistency
2. **Implement Required Functions**: Follow interface specifications exactly
3. **Use Utility Libraries**: Leverage shared libraries for common operations
4. **Maintain Compatibility**: Ensure backward compatibility when possible

### Testing Strategy
1. **Interface Testing**: Verify interface compliance
2. **Library Testing**: Test utility functions independently
3. **Integration Testing**: Test component interactions
4. **Security Testing**: Validate security utilities

## 📈 Development Workflow

### Adding New Components
1. **Define Interface**: Create clear interface specification
2. **Implement Library**: Develop utility functions
3. **Write Tests**: Comprehensive test coverage
4. **Update Documentation**: Clear usage examples
5. **Review & Deploy**: Security review and deployment

### Version Management
- **Semantic Versioning**: Follow semantic versioning principles
- **Backward Compatibility**: Maintain compatibility when possible
- **Migration Paths**: Provide upgrade paths for breaking changes
- **Deprecation Notices**: Clear communication about changes

## 🤝 Contributing

### Development Standards
- **Solidity Best Practices**: Follow latest Solidity guidelines
- **Gas Optimization**: Optimize for gas efficiency
- **Security First**: Prioritize security in all implementations
- **Documentation**: Clear, comprehensive documentation

### Code Review Process
1. **Interface Review**: Validate interface design
2. **Implementation Review**: Check implementation correctness
3. **Security Review**: Validate security considerations
4. **Testing Review**: Ensure adequate test coverage
5. **Documentation Review**: Verify documentation completeness

---

## 🔗 Related Documentation

- **Main Architecture**: `../../docs/ARCHITECTURE.md`
- **CarMania Contracts**: `../carmania/README.md`
- **DRIVR Contracts**: `../drivr/README.md`
- **Platform Overview**: `../../README.md`

---

*Built with ❤️ for the automotive community by CarCulture*

**Status**: Foundation Layer
**Purpose**: Reusable Components
**Standards**: Industry Best Practices
**Compatibility**: All CarCulture Contracts






