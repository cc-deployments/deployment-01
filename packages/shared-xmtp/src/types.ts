// Shared XMTP types for DRIVR platform
export interface DRIVRXMTPConfig {
  env: 'dev' | 'production';
  privateKey?: string;
  wallet?: any;
}

export interface DRIVRMessage {
  id: string;
  senderAddress: string;
  content: string;
  timestamp: number;
  type: 'text' | 'payment' | 'nft' | 'quick_action';
  metadata?: {
    paymentAmount?: string;
    nftId?: string;
    actionType?: string;
    [key: string]: any;
  };
}

export interface DRIVRQuickAction {
  id: string;
  label: string;
  action: string;
  description?: string;
  requiresPayment?: boolean;
  paymentAmount?: string;
}

export interface DRIVRPaymentRequest {
  amount: string;
  currency: string;
  recipient: string;
  description: string;
  nftId?: string;
}

export interface DRIVRResponse {
  content: string;
  quickActions?: DRIVRQuickAction[];
  paymentRequest?: DRIVRPaymentRequest;
  nftData?: {
    id: string;
    name: string;
    imageUrl: string;
    contractAddress: string;
    tokenId: string;
  };
}

export interface DRIVRConversation {
  id: string;
  peerAddress: string;
  messages: DRIVRMessage[];
  lastMessageAt: number;
  isActive: boolean;
}

export interface DRIVRNotification {
  type: 'nft_purchase' | 'price_alert' | 'auction_update' | 'new_drop' | 'payment_received';
  title: string;
  message: string;
  data?: any;
  timestamp: number;
}



























