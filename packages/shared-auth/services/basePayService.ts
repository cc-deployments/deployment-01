// packages/shared-auth/services/basePayService.ts

import { pay, getPaymentStatus } from '@base-org/account';
import type { BasePayConfig, BasePayResult, BasePayService, PayerInfo } from '../types/basePay';

class BasePayServiceImpl implements BasePayService {
  private isProcessing = false;
  private lastPayment?: BasePayResult;
  private error?: string;

  async pay(config: BasePayConfig): Promise<BasePayResult> {
    try {
      this.isProcessing = true;
      this.error = undefined;

      // Determine payment method
      const paymentMethod = config.paymentMethod || 'auto';
      
      // If credit card payment is requested, use CDP OnRamp
      if (paymentMethod === 'credit_card' || (paymentMethod === 'auto' && config.productName)) {
        return await this.handleCreditCardPayment(config);
      }

      // Otherwise, use standard Base Pay for crypto payments
      return await this.handleCryptoPayment(config);
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

  private async handleCryptoPayment(config: BasePayConfig): Promise<BasePayResult> {
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
      paymentMethod: 'crypto',
      // transactionHash will be undefined until we know the correct property name
    };

    this.lastPayment = paymentResult;
    this.isProcessing = false;

    return paymentResult;
  }

  private async handleCreditCardPayment(config: BasePayConfig): Promise<BasePayResult> {
    // Create CDP OnRamp session
    const onRampSession = await this.createOnRampSession(config);
    
    // Return result with OnRamp URL for frontend to handle
    const paymentResult: BasePayResult = {
      id: onRampSession.productId,
      status: 'pending',
      amount: config.amount,
      to: config.to,
      paymentMethod: 'credit_card',
      onRampUrl: onRampSession.paymentUrl,
    };

    this.lastPayment = paymentResult;
    this.isProcessing = false;

    return paymentResult;
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

  async createOnRampSession(config: BasePayConfig): Promise<{ paymentUrl: string; productId: string }> {
    try {
      // Get CDP Project ID from environment
      const projectId = process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a';
      const productId = `cdp_${Date.now()}`;
      
      // OnchainKit removed - use manual URL construction
      const paymentUrl = `https://pay.coinbase.com/buy/select-asset?appId=${projectId}&defaultAsset=ETH&defaultNetwork=base&presetCryptoAmount=${config.amount}`;

      return {
        paymentUrl,
        productId
      };
    } catch (error) {
      throw new Error(`Failed to create OnRamp session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async createSmartWallet(userInfo?: PayerInfo): Promise<{ address: string; privateKey?: string }> {
    try {
      // For now, return a placeholder implementation
      // In production, this would integrate with CDP's smart wallet creation
      const address = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      return {
        address,
        // In production, private key would be securely generated and stored
        privateKey: undefined
      };
    } catch (error) {
      throw new Error(`Failed to create smart wallet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // OFFRAMP METHODS - Sell crypto for fiat
  async createOffRampSession(config: {
    partnerUserId: string;
    redirectUrl: string;
    addresses: string[];
    asset?: string;
    network?: string;
    amount?: string;
  }): Promise<{ offRampUrl: string; sessionToken: string }> {
    try {
      // Get CDP Project ID from environment
      const projectId = process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a';
      
      // Generate session token via API route
      const sessionResponse = await fetch('/api/cdp/session-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerUserId: config.partnerUserId,
          redirectUrl: config.redirectUrl,
        }),
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to generate session token');
      }

      const { sessionToken } = await sessionResponse.json();
      
      // Construct proper OffRamp URL with session token
      // Using the correct OffRamp endpoint, not OnRamp
      const params = new URLSearchParams({
        partnerUserId: config.partnerUserId,
        redirectUrl: config.redirectUrl,
        sessionToken: sessionToken,
        ...(config.addresses.length > 0 && { addresses: config.addresses.join(',') }),
        ...(config.asset && { asset: config.asset }),
        ...(config.network && { network: config.network }),
        ...(config.amount && { amount: config.amount }),
      });
      
      // Use the correct OffRamp URL format
      const offRampUrl = `https://pay.coinbase.com/v3/sell/input?${params.toString()}`;

      console.log('🔍 Generated OffRamp URL:', offRampUrl);
      console.log('🔍 Session Token:', sessionToken);

      return {
        offRampUrl,
        sessionToken
      };
    } catch (error) {
      throw new Error(`Failed to create OffRamp session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getOffRampTransactionStatus(partnerUserId: string): Promise<{
    status: 'initiated' | 'pending' | 'completed' | 'failed';
    sellAmount?: string;
    asset?: string;
    network?: string;
    toAddress?: string;
    fromAddress?: string;
    error?: string;
  }> {
    try {
      // In production, this would call the CDP OffRamp Transaction Status API
      // For now, return a mock response
      return {
        status: 'pending',
        sellAmount: '0.1',
        asset: 'ETH',
        network: 'base',
        toAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // BasePay recipient
        fromAddress: '0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142', // DRIVR CB.ID Wallet
      };
    } catch (error) {
      throw new Error(`Failed to get OffRamp transaction status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getOffRampConfig(): Promise<{
    countries: string[];
    currencies: string[];
    assets: string[];
    networks: string[];
  }> {
    try {
      // In production, this would call the CDP OffRamp Config API
      // For now, return mock data
      return {
        countries: ['US', 'CA', 'GB', 'DE', 'FR'],
        currencies: ['USD', 'CAD', 'GBP', 'EUR'],
        assets: ['ETH', 'BTC', 'USDC', 'USDT'],
        networks: ['base', 'ethereum', 'polygon'],
      };
    } catch (error) {
      throw new Error(`Failed to get OffRamp config: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
