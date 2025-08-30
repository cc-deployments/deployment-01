import { ethers } from 'ethers';
import { WalletSendCallsContent, WalletCall, CarStoryTransaction, CarManiaAgentConfig } from '../types/agent';

export class WalletCallService {
  private config: CarManiaAgentConfig;
  private provider: ethers.JsonRpcProvider;

  constructor(config: CarManiaAgentConfig) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(config.baseRpcUrl);
  }

  /**
   * Create a wallet call for storing car story provenance
   */
  async createCarStoryTransaction(
    userAddress: string,
    carStory: CarStoryTransaction['carStory'],
    nftTokenId: string,
    collectionAddress: string
  ): Promise<WalletSendCallsContent> {
    
    // Create the transaction data for storing car story
    const transactionData = this.encodeCarStoryData(carStory, nftTokenId);
    
    const walletCall: WalletCall = {
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
  async createMintTransaction(
    userAddress: string,
    tier: 'premium' | 'vip',
    carDetails?: CarStoryTransaction['carStory']['carDetails']
  ): Promise<WalletSendCallsContent> {
    
    const mintData = this.encodeMintData(tier, carDetails);
    
    const walletCall: WalletCall = {
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
  async createCommunityTransaction(
    userAddress: string,
    action: 'vote' | 'propose' | 'stake',
    data: Record<string, any>
  ): Promise<WalletSendCallsContent> {
    
    const communityData = this.encodeCommunityData(action, data);
    
    const walletCall: WalletCall = {
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
  private encodeCarStoryData(
    carStory: CarStoryTransaction['carStory'],
    nftTokenId: string
  ): string {
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
    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['string', 'string', 'tuple(string,string,uint256,string)', 'tuple(string[],string[],string[])', 'string', 'uint256'],
      [
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
      ]
    );
  }

  /**
   * Encode mint data for smart contract
   */
  private encodeMintData(
    tier: 'premium' | 'vip',
    carDetails?: CarStoryTransaction['carStory']['carDetails']
  ): string {
    // Encode minting transaction data
    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['uint8', 'tuple(string,string,uint256,string)'],
      [
        tier === 'premium' ? 1 : 2,
        carDetails ? [
          carDetails.make,
          carDetails.model,
          carDetails.year,
          carDetails.vin || '',
        ] : ['', '', 0, ''],
      ]
    );
  }

  /**
   * Encode community action data
   */
  private encodeCommunityData(action: string, data: Record<string, any>): string {
    // Encode community transaction data
    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['uint8', 'bytes'],
      [
        action === 'vote' ? 1 : action === 'propose' ? 2 : 3,
        ethers.AbiCoder.defaultAbiCoder().encode(['string'], [JSON.stringify(data)]),
      ]
    );
  }

  /**
   * Get mint price for different tiers
   */
  private getMintPrice(tier: 'premium' | 'vip'): string {
    const prices = {
      premium: '0.01', // 0.01 ETH
      vip: '0.05',     // 0.05 ETH
    };
    return ethers.parseEther(prices[tier]).toString();
  }

  /**
   * Verify transaction was successful
   */
  async verifyTransaction(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      return receipt?.status === 1; // 1 = success, 0 = failure
    } catch (error) {
      console.error('Failed to verify transaction:', error);
      return false;
    }
  }
}
