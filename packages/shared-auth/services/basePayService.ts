// packages/shared-auth/services/basePayService.ts

import { pay, getPaymentStatus } from '@base-org/account';
import type { BasePayConfig, BasePayResult, BasePayService } from '../types/basePay';

class BasePayServiceImpl implements BasePayService {
  private isProcessing = false;
  private lastPayment?: BasePayResult;
  private error?: string;

  async pay(config: BasePayConfig): Promise<BasePayResult> {
    try {
      this.isProcessing = true;
      this.error = undefined;

      // Prepare the payment configuration
      const paymentConfig: any = {
        amount: config.amount,
        to: config.to,
        testnet: config.testnet ?? true, // Default to testnet for safety
        ...(config.callbackUrl && { callbackUrl: config.callbackUrl }),
      };

      // Convert our PayerInfo format to SDK format if provided
      if (config.payerInfo) {
        paymentConfig.payerInfo = {
          requests: {
            ...(config.payerInfo.email && { email: true }),
            ...(config.payerInfo.phone && { phone: true }),
            ...(config.payerInfo.name && { name: true }),
          }
        };
      }

      // Execute the payment
      const result = await pay(paymentConfig);

      // Create our standardized result
      const paymentResult: BasePayResult = {
        id: result.id,
        status: 'completed',
        amount: config.amount,
        to: config.to,
        // transactionHash will be undefined until we know the correct property name
      };

      this.lastPayment = paymentResult;
      this.isProcessing = false;

      return paymentResult;
    } catch (error) {
      this.isProcessing = false;
      this.error = error instanceof Error ? error.message : 'Payment failed';
      
      const errorResult: BasePayResult = {
        id: '',
        status: 'failed',
        amount: config.amount,
        to: config.to,
        error: this.error,
      };

      this.lastPayment = errorResult;
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string): Promise<BasePayResult> {
    try {
      const status = await getPaymentStatus({ id: paymentId });
      
      return {
        id: paymentId,
        status: (status as any).status || 'pending',
        amount: (status as any).amount || '',
        to: (status as any).to || '',
        transactionHash: (status as any).transactionHash,
        error: (status as any).error,
      };
    } catch (error) {
      throw new Error(`Failed to get payment status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  reset(): void {
    this.isProcessing = false;
    this.lastPayment = undefined;
    this.error = undefined;
  }

  getState() {
    return {
      isProcessing: this.isProcessing,
      lastPayment: this.lastPayment,
      error: this.error,
    };
  }
}

// Export singleton instance
export const basePayService = new BasePayServiceImpl();
