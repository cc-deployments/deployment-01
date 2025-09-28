// DRIVR Payment Service with Safe fallback
import { DRIVRPaymentRequest } from '../../../../packages/shared-xmtp/src/types';
import { SafePaymentService, createDRIVRSafeServices } from '../../../../packages/shared-xmtp/src/safe-integration';

export interface PaymentResult {
  success: boolean;
  method: 'x402' | 'basepay' | 'safe';
  transactionHash?: string;
  safeTxHash?: string;
  error?: string;
  requiresApproval?: boolean;
}

export class DRIVRPaymentService {
  private safeServices: ReturnType<typeof createDRIVRSafeServices>;

  constructor() {
    this.safeServices = createDRIVRSafeServices();
  }

  /**
   * Process payment with fallback chain
   */
  async processPayment(paymentRequest: DRIVRPaymentRequest): Promise<PaymentResult> {
    console.log('💳 Processing DRIVR payment:', paymentRequest);

    // Try x402 payment first
    try {
      const x402Result = await this.tryX402Payment(paymentRequest);
      if (x402Result.success) {
        return { ...x402Result, method: 'x402' };
      }
    } catch (error) {
      console.log('⚠️ x402 payment failed, trying Base Pay...');
    }

    // Try Base Pay as second option
    try {
      const basePayResult = await this.tryBasePayPayment(paymentRequest);
      if (basePayResult.success) {
        return { ...basePayResult, method: 'basepay' };
      }
    } catch (error) {
      console.log('⚠️ Base Pay failed, falling back to Safe multisig...');
    }

    // Fall back to Safe multisig
    try {
      const safeResult = await this.safeServices.revenueSafe.createPayment(paymentRequest);
      return { ...safeResult, method: 'safe' };
    } catch (error) {
      console.error('❌ All payment methods failed:', error);
      return {
        success: false,
        method: 'safe',
        error: 'All payment methods failed',
      };
    }
  }

  /**
   * Try x402 payment
   */
  private async tryX402Payment(paymentRequest: DRIVRPaymentRequest): Promise<PaymentResult> {
    try {
      // Simulate x402 payment
      // In real implementation, integrate with x402 SDK
      
      console.log('🔄 Attempting x402 payment...');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success/failure based on amount
      const amount = parseFloat(paymentRequest.amount);
      if (amount > 0.1) {
        throw new Error('Amount too high for x402');
      }

      return {
        success: true,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'x402 payment failed',
      };
    }
  }

  /**
   * Try Base Pay payment
   */
  private async tryBasePayPayment(paymentRequest: DRIVRPaymentRequest): Promise<PaymentResult> {
    try {
      // Simulate Base Pay payment
      // In real implementation, integrate with Base Pay SDK
      
      console.log('🔄 Attempting Base Pay payment...');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success/failure based on amount
      const amount = parseFloat(paymentRequest.amount);
      if (amount > 0.05) {
        throw new Error('Amount too high for Base Pay');
      }

      return {
        success: true,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base Pay payment failed',
      };
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(transactionHash: string, method: 'x402' | 'basepay' | 'safe'): Promise<PaymentResult> {
    try {
      if (method === 'safe') {
        return await this.safeServices.revenueSafe.checkTransactionStatus(transactionHash);
      }

      // For x402 and Base Pay, simulate status check
      return {
        success: true,
        transactionHash,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Status check failed',
      };
    }
  }

  /**
   * Get payment methods available
   */
  getAvailablePaymentMethods(): Array<{
    method: 'x402' | 'basepay' | 'safe';
    name: string;
    description: string;
    maxAmount?: string;
    requiresApproval?: boolean;
  }> {
    return [
      {
        method: 'x402',
        name: 'x402 Autonomous Payment',
        description: 'Seamless, gasless transactions',
        maxAmount: '0.1 ETH',
      },
      {
        method: 'basepay',
        name: 'Base Pay',
        description: 'Easy payment with Base Pay',
        maxAmount: '0.05 ETH',
      },
      {
        method: 'safe',
        name: 'Safe Multisig',
        description: 'Secure multisig approval required',
        requiresApproval: true,
      },
    ];
  }

  /**
   * Get Safe service for direct access
   */
  getSafeService(): SafePaymentService {
    return this.safeServices.revenueSafe;
  }
}
