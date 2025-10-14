import { CarManiaAgentConfig } from '../types/agent';
import { NFTMintingService } from './nft-minting-service';

export interface StableLinkProduct {
  id: string;
  name: string;
  description: string;
  price: number; // USD
  currency: 'USD';
  nftMetadata: {
    contractAddress: string;
    tokenId?: string;
    network: 'base' | 'ethereum';
    standard: 'ERC-721' | 'ERC-1155';
  };
  paymentLink: string;
  status: 'active' | 'inactive' | 'sold';
}

export interface StableLinkPayment {
  id: string;
  productId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  userAddress?: string;
  smartWalletAddress?: string;
  transactionHash?: string;
  createdAt: string;
  completedAt?: string;
}

export interface StableLinkWebhook {
  type: 'payment.completed' | 'payment.failed' | 'payment.refunded';
  data: StableLinkPayment;
  signature: string;
}

export class StableLinkService {
  private config: CarManiaAgentConfig;
  private baseUrl: string;
  private apiKey: string;
  private mintingService: NFTMintingService;

  constructor(config: CarManiaAgentConfig) {
    this.config = config;
    this.baseUrl = process.env.STABLELINK_API_URL || 'https://api.stablelink.xyz';
    this.apiKey = process.env.STABLELINK_API_KEY || '';
    this.mintingService = new NFTMintingService(config);
  }

  /**
   * Create a new NFT product in StableLink for credit card sales
   */
  async createNFTProduct(
    nftName: string,
    description: string,
    priceUSD: number,
    contractAddress: string,
    network: 'base' | 'ethereum' = 'base',
    standard: 'ERC-721' | 'ERC-1155' = 'ERC-721',
    tokenId?: string
  ): Promise<StableLinkProduct> {
    try {
      const productData = {
        name: nftName,
        description: description,
        price: priceUSD,
        currency: 'USD',
        type: 'nft',
        metadata: {
          contractAddress,
          tokenId,
          network,
          standard,
          collection: 'CarMania',
          category: 'Automotive NFT'
        },
        paymentMethods: ['credit_card', 'apple_pay', 'google_pay'],
        smartWallet: {
          enabled: true,
          network: network,
          autoCreate: true
        }
      };

      const response = await fetch(`${this.baseUrl}/api/v1/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Version': '2024-01'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error(`StableLink API error: ${response.status} ${response.statusText}`);
      }

      const product = await response.json();
      return this.mapStableLinkProduct(product);
    } catch (error) {
      console.error('Error creating StableLink product:', error);
      throw new Error(`Failed to create NFT product: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate a payment link for a specific NFT product
   */
  async generatePaymentLink(
    productId: string,
    userAddress?: string,
    metadata?: Record<string, any>
  ): Promise<string> {
    try {
      const paymentData = {
        productId,
        userAddress,
        metadata: {
          ...metadata,
          source: 'drivr-agent',
          timestamp: new Date().toISOString()
        },
        returnUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/payment/success`,
        cancelUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/payment/cancel`
      };

      const response = await fetch(`${this.baseUrl}/api/v1/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Version': '2024-01'
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error(`StableLink API error: ${response.status} ${response.statusText}`);
      }

      const payment = await response.json();
      return (payment as any).paymentUrl;
    } catch (error) {
      console.error('Error generating payment link:', error);
      throw new Error(`Failed to generate payment link: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get payment status by payment ID
   */
  async getPaymentStatus(paymentId: string): Promise<StableLinkPayment> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Version': '2024-01'
        }
      });

      if (!response.ok) {
        throw new Error(`StableLink API error: ${response.status} ${response.statusText}`);
      }

      const payment = await response.json();
      return this.mapStableLinkPayment(payment);
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw new Error(`Failed to get payment status: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Handle webhook notifications from StableLink
   */
  async handleWebhook(webhookData: StableLinkWebhook): Promise<void> {
    try {
      // Verify webhook signature
      if (!this.verifyWebhookSignature(webhookData)) {
        throw new Error('Invalid webhook signature');
      }

      const { type, data } = webhookData;

      switch (type) {
        case 'payment.completed':
          await this.handlePaymentCompleted(data);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(data);
          break;
        case 'payment.refunded':
          await this.handlePaymentRefunded(data);
          break;
        default:
          console.warn(`Unknown webhook type: ${type}`);
      }
    } catch (error) {
      console.error('Error handling StableLink webhook:', error);
      throw error;
    }
  }

  /**
   * Create a dynamic NFT product for DRIVR agent commerce
   */
  async createDynamicNFTProduct(
    userRequest: string,
    nftDetails: {
      name: string;
      description: string;
      priceUSD: number;
      contractAddress: string;
      network?: 'base' | 'ethereum';
      standard?: 'ERC-721' | 'ERC-1155';
    }
  ): Promise<{ product: StableLinkProduct; paymentLink: string }> {
    try {
      // Create the product
      const product = await this.createNFTProduct(
        nftDetails.name,
        nftDetails.description,
        nftDetails.priceUSD,
        nftDetails.contractAddress,
        nftDetails.network || 'base',
        nftDetails.standard || 'ERC-721'
      );

      // Generate payment link
      const paymentLink = await this.generatePaymentLink(product.id, undefined, {
        userRequest,
        agentGenerated: true,
        drivrSession: Date.now()
      });

      return { product, paymentLink };
    } catch (error) {
      console.error('Error creating dynamic NFT product:', error);
      throw new Error(`Failed to create dynamic NFT product: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Handle successful payment completion
   */
  private async handlePaymentCompleted(payment: StableLinkPayment): Promise<void> {
    try {
      console.log(`✅ Payment completed: ${payment.id} for product ${payment.productId}`);
      
      // Trigger NFT minting
      const mintingResult = await this.mintingService.mintNFTAfterPayment(payment);
      
      if (mintingResult.success) {
        console.log(`🎨 NFT minted successfully: ${mintingResult.transactionHash}`);
        
        // Send confirmation to user if we have their address
        if (payment.userAddress) {
          await this.sendPaymentConfirmation(payment, mintingResult);
        }
      } else {
        console.error(`❌ NFT minting failed: ${mintingResult.error}`);
        
        // Send error notification to user
        if (payment.userAddress) {
          await this.sendMintingErrorNotification(payment, mintingResult.error || 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Error handling payment completion:', error);
    }
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(payment: StableLinkPayment): Promise<void> {
    console.log(`❌ Payment failed: ${payment.id} for product ${payment.productId}`);
    // Handle failed payment logic
  }

  /**
   * Handle payment refund
   */
  private async handlePaymentRefunded(payment: StableLinkPayment): Promise<void> {
    console.log(`🔄 Payment refunded: ${payment.id} for product ${payment.productId}`);
    // Handle refund logic
  }

  /**
   * Send payment confirmation with minting details
   */
  private async sendPaymentConfirmation(payment: StableLinkPayment, mintingResult: any): Promise<void> {
    try {
      // This would integrate with your XMTP service
      console.log(`📧 Sending payment confirmation for ${payment.id}`);
      
      // TODO: Integrate with XMTP service
      // await this.xmtpService.sendMessage(payment.userAddress, {
      //   type: 'payment_confirmation',
      //   paymentId: payment.id,
      //   amount: payment.amount,
      //   currency: payment.currency,
      //   transactionHash: mintingResult.transactionHash,
      //   tokenId: mintingResult.tokenId
      // });
    } catch (error) {
      console.error('Error sending payment confirmation:', error);
    }
  }

  /**
   * Send minting error notification
   */
  private async sendMintingErrorNotification(payment: StableLinkPayment, error: string): Promise<void> {
    try {
      // This would integrate with your XMTP service
      console.log(`📧 Sending minting error notification for ${payment.id}`);
      
      // TODO: Integrate with XMTP service
      // await this.xmtpService.sendMessage(payment.userAddress, {
      //   type: 'minting_error',
      //   paymentId: payment.id,
      //   error: error
      // });
    } catch (error) {
      console.error('Error sending minting error notification:', error);
    }
  }



  /**
   * Verify webhook signature for security
   */
  private verifyWebhookSignature(webhook: StableLinkWebhook): boolean {
    // TODO: Implement proper webhook signature verification
    // This is a placeholder - you should implement proper HMAC verification
    return true;
  }

  /**
   * Map StableLink API response to our product interface
   */
  private mapStableLinkProduct(apiProduct: any): StableLinkProduct {
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      description: apiProduct.description,
      price: apiProduct.price,
      currency: apiProduct.currency,
      nftMetadata: {
        contractAddress: apiProduct.metadata.contractAddress,
        tokenId: apiProduct.metadata.tokenId,
        network: apiProduct.metadata.network,
        standard: apiProduct.metadata.standard
      },
      paymentLink: apiProduct.paymentUrl,
      status: apiProduct.status
    };
  }

  /**
   * Map StableLink API response to our payment interface
   */
  private mapStableLinkPayment(apiPayment: any): StableLinkPayment {
    return {
      id: apiPayment.id,
      productId: apiPayment.productId,
      amount: apiPayment.amount,
      currency: apiPayment.currency,
      status: apiPayment.status,
      userAddress: apiPayment.userAddress,
      smartWalletAddress: apiPayment.smartWalletAddress,
      transactionHash: apiPayment.transactionHash,
      createdAt: apiPayment.createdAt,
      completedAt: apiPayment.completedAt
    };
  }
}
