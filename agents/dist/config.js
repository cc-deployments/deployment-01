"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.validateConfig = validateConfig;
exports.getConfigForEnvironment = getConfigForEnvironment;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Configuration for Drivr Agent
exports.config = {
    walletPrivateKey: process.env.CARMANIA_AGENT_PRIVATE_KEY || '',
    env: process.env.NODE_ENV || 'production',
    openseaApiKey: process.env.OPENSEA_API_KEY || '',
    baseRpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    openseaBaseUrl: 'https://api.opensea.io',
    openseaApiEndpoint: '/api/v1',
    supportedCollections: [
    // Add your CarMania NFT collection addresses here
    // Example: '0x1234567890123456789012345678901234567890',
    // You can add multiple collections for different tiers
    ],
    // Smart Contract Addresses (Base chain)
    provenanceContractAddress: process.env.PROVENANCE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    mintingContractAddress: process.env.MINTING_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    communityContractAddress: process.env.COMMUNITY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
};
// Validate configuration
function validateConfig(config) {
    const errors = [];
    if (!config.walletPrivateKey) {
        errors.push('CARMANIA_AGENT_PRIVATE_KEY is required');
    }
    if (!config.openseaApiKey) {
        errors.push('OPENSEA_API_KEY is required');
    }
    if (config.supportedCollections.length === 0) {
        errors.push('At least one supported collection address is required');
    }
    if (errors.length > 0) {
        throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
}
// Get environment-specific configuration
function getConfigForEnvironment(env) {
    const baseConfig = { ...exports.config };
    switch (env) {
        case 'development':
            baseConfig.baseRpcUrl = 'https://sepolia.base.org';
            // baseConfig.agentName = 'DRIVR Dev'; // Removed - not in interface
            break;
        case 'testnet':
            baseConfig.baseRpcUrl = 'https://sepolia.base.org';
            // baseConfig.agentName = 'DRIVR Test'; // Removed - not in interface
            break;
        case 'production':
            baseConfig.baseRpcUrl = 'https://mainnet.base.org';
            // baseConfig.agentName = 'DRIVR'; // Removed - not in interface
            break;
    }
    return baseConfig;
}
//# sourceMappingURL=config.js.map