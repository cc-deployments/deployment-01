import { CarManiaAgentConfig, AgentState, Action } from './types/agent';
export declare class DRIVRAgent {
    private xmtpService;
    private nftVerificationService;
    private intentHandlerService;
    private walletCallService;
    private stableLinkService;
    private config;
    private isRunning;
    constructor(config: CarManiaAgentConfig);
    start(): Promise<void>;
    stop(): Promise<void>;
    private handleMessage;
    sendDirectMessage(userAddress: string, content: string): Promise<void>;
    getActionById(actionId: string): Promise<Action | null>;
    executeAction(actionId: string, userAddress: string): Promise<void>;
    /**
     * Handle car story submission from NFT holder
     * This creates a wallet call for storing provenance on-chain
     */
    handleCarStorySubmission(userAddress: string, carStory: {
        title: string;
        description: string;
        carDetails: {
            make: string;
            model: string;
            year: number;
            vin?: string;
        };
        provenance: {
            ownershipHistory: string[];
            maintenanceRecords: string[];
            modifications: string[];
        };
    }): Promise<void>;
    private handleMintAction;
    /**
     * Handle AI-powered NFT commerce with credit card payments
     */
    handleCommerceRequest(userAddress: string, userMessage: string): Promise<void>;
    /**
     * Parse user message to extract commerce intent
     */
    private parseCommerceIntent;
    /**
     * Send commerce response with payment options
     */
    private sendCommerceResponse;
    /**
     * Handle StableLink webhook notifications
     */
    handleStableLinkWebhook(webhookData: any): Promise<void>;
    /**
     * Check if message is commerce-related
     */
    private isCommerceMessage;
    private handleGalleryAction;
    private handleCommunityAction;
    private handleCustomAction;
    getState(): AgentState;
    isAgentRunning(): boolean;
    getConfig(): CarManiaAgentConfig;
    refreshNFTCache(): Promise<void>;
    getNFTCacheStats(): {
        size: number;
        entries: string[];
    };
    getQuickActionById(actionId: string): Promise<Action | null>;
    executeQuickAction(actionId: string, userAddress: string): Promise<void>;
}
//# sourceMappingURL=carmania-agent.d.ts.map