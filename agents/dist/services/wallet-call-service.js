"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletCallService = void 0;
const ethers_1 = require("ethers");
class WalletCallService {
    constructor(config) {
        this.config = config;
        this.provider = new ethers_1.ethers.JsonRpcProvider(config.baseRpcUrl);
    }
    /**
     * Create a wallet call for storing car story provenance
     */
    async createCarStoryTransaction(userAddress, carStory, nftTokenId, collectionAddress) {
        // Create the transaction data for storing car story
        const transactionData = this.encodeCarStoryData(carStory, nftTokenId);
        const walletCall = {
            id: `car_story_${Date.now()}`,
            to: this.config.provenanceContractAddress, // Your provenance contract
            data: transactionData,
            value: '0', // No ETH transfer needed
            description: `Store car story for NFT #${nftTokenId}`,
        };
        return {
            id: `provenance_${Date.now()}`,
            calls: [walletCall],
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        };
    }
    /**
     * Create a wallet call for minting new NFTs
     */
    async createMintTransaction(userAddress, tier, carDetails) {
        const mintData = this.encodeMintData(tier, carDetails);
        const walletCall = {
            id: `mint_${tier}_${Date.now()}`,
            to: this.config.mintingContractAddress, // Your minting contract
            data: mintData,
            value: this.getMintPrice(tier), // Price in ETH
            description: `Mint ${tier} tier CarMania NFT`,
        };
        return {
            id: `mint_${Date.now()}`,
            calls: [walletCall],
            expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
        };
    }
    /**
     * Create a wallet call for community actions (voting, proposals)
     */
    async createCommunityTransaction(userAddress, action, data) {
        const communityData = this.encodeCommunityData(action, data);
        const walletCall = {
            id: `community_${action}_${Date.now()}`,
            to: this.config.communityContractAddress, // Your community contract
            data: communityData,
            value: action === 'stake' ? data.stakeAmount : '0',
            description: `${action.charAt(0).toUpperCase() + action.slice(1)} in CarMania community`,
        };
        return {
            id: `community_${Date.now()}`,
            calls: [walletCall],
            expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        };
    }
    /**
     * Encode car story data for smart contract
     */
    encodeCarStoryData(carStory, nftTokenId) {
        // This would be the actual ABI encoding for your provenance contract
        // Example structure:
        const carStoryData = {
            title: carStory.title,
            description: carStory.description,
            carDetails: carStory.carDetails,
            provenance: carStory.provenance,
            nftTokenId: nftTokenId,
            timestamp: Date.now(),
        };
        // For now, return a placeholder - you'll need to implement actual ABI encoding
        return ethers_1.ethers.AbiCoder.defaultAbiCoder().encode(['string', 'string', 'tuple(string,string,uint256,string)', 'tuple(string[],string[],string[])', 'string', 'uint256'], [
            carStoryData.title,
            carStoryData.description,
            [
                carStoryData.carDetails.make,
                carStoryData.carDetails.model,
                carStoryData.carDetails.year,
                carStoryData.carDetails.vin || '',
            ],
            [
                carStoryData.provenance.ownershipHistory,
                carStoryData.provenance.maintenanceRecords,
                carStoryData.provenance.modifications,
            ],
            carStoryData.nftTokenId,
            carStoryData.timestamp,
        ]);
    }
    /**
     * Encode mint data for smart contract
     */
    encodeMintData(tier, carDetails) {
        // Encode minting transaction data
        return ethers_1.ethers.AbiCoder.defaultAbiCoder().encode(['uint8', 'tuple(string,string,uint256,string)'], [
            tier === 'premium' ? 1 : 2,
            carDetails ? [
                carDetails.make,
                carDetails.model,
                carDetails.year,
                carDetails.vin || '',
            ] : ['', '', 0, ''],
        ]);
    }
    /**
     * Encode community action data
     */
    encodeCommunityData(action, data) {
        // Encode community transaction data
        return ethers_1.ethers.AbiCoder.defaultAbiCoder().encode(['uint8', 'bytes'], [
            action === 'vote' ? 1 : action === 'propose' ? 2 : 3,
            ethers_1.ethers.AbiCoder.defaultAbiCoder().encode(['string'], [JSON.stringify(data)]),
        ]);
    }
    /**
     * Get mint price for different tiers
     */
    getMintPrice(tier) {
        const prices = {
            premium: '0.01', // 0.01 ETH
            vip: '0.05', // 0.05 ETH
        };
        return ethers_1.ethers.parseEther(prices[tier]).toString();
    }
    /**
     * Verify transaction was successful
     */
    async verifyTransaction(txHash) {
        try {
            const receipt = await this.provider.getTransactionReceipt(txHash);
            return receipt?.status === 1; // 1 = success, 0 = failure
        }
        catch (error) {
            console.error('Failed to verify transaction:', error);
            return false;
        }
    }
}
exports.WalletCallService = WalletCallService;
//# sourceMappingURL=wallet-call-service.js.map