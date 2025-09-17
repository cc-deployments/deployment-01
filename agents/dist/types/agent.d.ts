export interface CarManiaAgentConfig {
    walletPrivateKey: string;
    env: 'dev' | 'testnet' | 'production';
    openseaApiKey: string;
    baseRpcUrl: string;
    openseaBaseUrl: string;
    openseaApiEndpoint: string;
    supportedCollections: string[];
    provenanceContractAddress: string;
    mintingContractAddress: string;
    communityContractAddress: string;
}
export interface XMTPMessage {
    id: string;
    content: string;
    senderAddress: string;
    timestamp: Date;
    conversationId: string;
}
export interface AgentResponse {
    content: string;
    quickActions?: ActionsContent;
    metadata?: {
        nftVerified: boolean;
        collectionName?: string;
        accessLevel: 'basic' | 'premium' | 'vip';
    };
}
export interface ActionsContent {
    id: string;
    description: string;
    actions: Action[];
    expiresAt?: string;
}
export interface Action {
    id: string;
    label: string;
    imageUrl?: string;
    style?: 'primary' | 'secondary' | 'danger';
    expiresAt?: string;
}
export interface QuickAction {
    id: string;
    label: string;
    action: 'mint_nft' | 'view_gallery' | 'join_community' | 'custom';
    data?: Record<string, any>;
    url?: string;
}
export interface IntentContent {
    id: string;
    actionId: string;
    metadata?: Record<string, string | number | boolean | null>;
}
export interface NFTVerificationResult {
    hasAccess: boolean;
    collectionName?: string;
    tokenIds?: string[];
    accessLevel: 'basic' | 'premium' | 'vip';
    userAddress?: string;
    error?: string;
}
export interface OpenSeaNFT {
    tokenId: string;
    collectionName: string;
    contractAddress: string;
    imageUrl?: string;
    traits?: Record<string, any>;
}
export interface AgentState {
    isConnected: boolean;
    walletAddress: string;
    conversations: Map<string, ConversationState>;
    nftCache: Map<string, NFTVerificationResult>;
}
export interface ConversationState {
    conversationId: string;
    userAddress: string;
    lastInteraction: Date;
    nftVerified: boolean;
    accessLevel: 'basic' | 'premium' | 'vip';
    messageHistory: XMTPMessage[];
}
export interface Intent {
    type: 'greeting' | 'nft_inquiry' | 'gallery_access' | 'minting' | 'community' | 'help';
    confidence: number;
    entities: Record<string, any>;
}
export interface WalletSendCallsContent {
    id: string;
    calls: WalletCall[];
    expiresAt?: string;
}
export interface WalletCall {
    id: string;
    to: string;
    data: string;
    value?: string;
    description?: string;
}
export interface CarStoryTransaction {
    id: string;
    userAddress: string;
    carStory: {
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
    };
    nftTokenId: string;
    collectionAddress: string;
    timestamp: number;
}
export interface SurfingWoodieImage {
    id: string;
    tokenId: string;
    imageUrl: string;
    title: string;
    description: string;
    traits: Record<string, any>;
    ownerAddress: string;
    createdAt: Date;
}
export interface SurfingWoodieNFT {
    tokenId: string;
    imageUrl: string;
    title: string;
    description: string;
    traits: Record<string, any>;
    ownerAddress: string;
}
export interface CarSpecificData {
    carId: string;
    make: string;
    model: string;
    year: number;
    color: string;
    vin?: string;
    ownerAddress: string;
    nftTokenId: string;
    carModel?: string;
    specialFeatures?: string[];
    history?: string;
    technicalSpecs?: string;
    culturalSignificance?: string;
}
//# sourceMappingURL=agent.d.ts.map