// packages/shared-auth/types/basePay.ts

export interface BasePayConfig {
  testnet?: boolean;
  amount: string;
  to: string;
  payerInfo?: PayerInfo;
  callbackUrl?: string;
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
}
