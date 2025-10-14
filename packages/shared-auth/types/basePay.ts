// packages/shared-auth/types/basePay.ts

export interface BasePayConfig {
  testnet?: boolean;
  amount: string;
  to: string;
  payerInfo?: PayerInfo;
  callbackUrl?: string;
  // StableLink enhancements
  paymentMethod?: 'crypto' | 'credit_card' | 'auto';
  productName?: string;
  productDescription?: string;
  productImage?: string;
  contractAddress?: string;
  tokenId?: string;
  mintUrl?: string;
}

export interface PayerInfo {
  email?: boolean;
  phone?: boolean;
  name?: boolean;
}

export interface BasePayResult {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: string;
  to: string;
  transactionHash?: string;
  error?: string;
  // StableLink enhancements
  paymentMethod?: 'crypto' | 'credit_card';
  paymentUrl?: string;
  smartWalletAddress?: string;
  onRampUrl?: string;
}

export interface BasePayState {
  isProcessing: boolean;
  lastPayment?: BasePayResult;
  error?: string;
}

export interface BasePayService {
  pay: (config: BasePayConfig) => Promise<BasePayResult>;
  getPaymentStatus: (paymentId: string) => Promise<BasePayResult>;
  reset: () => void;
  // StableLink enhancements
  createOnRampSession: (config: BasePayConfig) => Promise<{ paymentUrl: string; productId: string }>;
  createSmartWallet: (userInfo?: PayerInfo) => Promise<{ address: string; privateKey?: string }>;
  // OffRamp methods
  createOffRampSession: (config: OffRampConfig) => Promise<{ offRampUrl: string; sessionToken: string }>;
  getOffRampTransactionStatus: (partnerUserId: string) => Promise<OffRampTransactionStatus>;
  getOffRampConfig: () => Promise<OffRampConfigResponse>;
}

// Simplified CDP OnRamp types
export interface CDPOnRampResult {
  success: boolean;
  productId: string;
  paymentUrl: string;
  message: string;
  type: 'cdp_onramp';
}

// OffRamp types
export interface OffRampConfig {
  partnerUserId: string;
  redirectUrl: string;
  addresses: string[];
  asset?: string;
  network?: string;
  amount?: string;
}

export interface OffRampTransactionStatus {
  status: 'initiated' | 'pending' | 'completed' | 'failed';
  sellAmount?: string;
  asset?: string;
  network?: string;
  toAddress?: string;
  fromAddress?: string;
  error?: string;
}

export interface OffRampConfigResponse {
  countries: string[];
  currencies: string[];
  assets: string[];
  networks: string[];
}
