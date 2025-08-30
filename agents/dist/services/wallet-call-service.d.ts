import { WalletSendCallsContent, CarStoryTransaction, CarManiaAgentConfig } from '../types/agent';
export declare class WalletCallService {
    private config;
    private provider;
    constructor(config: CarManiaAgentConfig);
    /**
     * Create a wallet call for storing car story provenance
     */
    createCarStoryTransaction(userAddress: string, carStory: CarStoryTransaction['carStory'], nftTokenId: string, collectionAddress: string): Promise<WalletSendCallsContent>;
    /**
     * Create a wallet call for minting new NFTs
     */
    createMintTransaction(userAddress: string, tier: 'premium' | 'vip', carDetails?: CarStoryTransaction['carStory']['carDetails']): Promise<WalletSendCallsContent>;
    /**
     * Create a wallet call for community actions (voting, proposals)
     */
    createCommunityTransaction(userAddress: string, action: 'vote' | 'propose' | 'stake', data: Record<string, any>): Promise<WalletSendCallsContent>;
    /**
     * Encode car story data for smart contract
     */
    private encodeCarStoryData;
    /**
     * Encode mint data for smart contract
     */
    private encodeMintData;
    /**
     * Encode community action data
     */
    private encodeCommunityData;
    /**
     * Get mint price for different tiers
     */
    private getMintPrice;
    /**
     * Verify transaction was successful
     */
    verifyTransaction(txHash: string): Promise<boolean>;
}
//# sourceMappingURL=wallet-call-service.d.ts.map