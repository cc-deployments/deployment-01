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

// Base App Quick Actions Content Type (coinbase.com/actions:1.0)
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

// Legacy QuickAction interface for backward compatibility
export interface QuickAction {
  id: string;
  label: string;
  action: 'mint_nft' | 'view_gallery' | 'join_community' | 'custom';
  data?: Record<string, any>;
  url?: string;
}

// Intent Content Type (coinbase.com/intent:1.0)
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

// Wallet Send Calls Content Type (xmtp.org/walletSendCalls:1.0)
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

// Transaction Types for NFT Holders
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
