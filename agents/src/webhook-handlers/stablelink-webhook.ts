import { Request, Response } from 'express';
import { DRIVRAgent } from '../carmania-agent';
import { StableLinkWebhook } from '../services/stablelink-service';

export class StableLinkWebhookHandler {
  private drivrAgent: DRIVRAgent;

  constructor(drivrAgent: DRIVRAgent) {
    this.drivrAgent = drivrAgent;
  }

  /**
   * Handle StableLink webhook notifications
   */
  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      console.log('📨 Received StableLink webhook:', req.body);

      // Verify webhook signature
      const signature = req.headers['x-stablelink-signature'] as string;
      if (!this.verifyWebhookSignature(req.body, signature)) {
        console.error('❌ Invalid webhook signature');
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      const webhookData: StableLinkWebhook = req.body;
      
      // Process the webhook with DRIVR agent
      await this.drivrAgent.handleStableLinkWebhook(webhookData);
      
      // Send success response
      res.status(200).json({ success: true, message: 'Webhook processed successfully' });
      
    } catch (error) {
      console.error('❌ Error processing StableLink webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Verify webhook signature for security
   */
  private verifyWebhookSignature(payload: any, signature: string): boolean {
    try {
      // TODO: Implement proper HMAC verification
      // This is a placeholder - you should implement proper signature verification
      // using the webhook secret from StableLink
      
      const webhookSecret = process.env.STABLELINK_WEBHOOK_SECRET;
      if (!webhookSecret) {
        console.warn('⚠️ No webhook secret configured');
        return true; // Allow in development
      }

      // In production, implement proper HMAC verification:
      // const expectedSignature = crypto
      //   .createHmac('sha256', webhookSecret)
      //   .update(JSON.stringify(payload))
      //   .digest('hex');
      // 
      // return signature === `sha256=${expectedSignature}`;
      
      return true; // Placeholder - implement proper verification
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  /**
   * Handle payment completion webhook
   */
  async handlePaymentCompleted(payment: any): Promise<void> {
    try {
      console.log(`✅ Payment completed: ${payment.id} for product ${payment.productId}`);
      
      // Extract user information from payment metadata
      const userAddress = payment.metadata?.userAddress;
      const nftName = payment.metadata?.nftName || 'CarMania NFT';
      
      if (userAddress) {
        // Send confirmation message to user
        await this.drivrAgent.sendDirectMessage(userAddress, 
          `🎉 **Payment Successful!**
          
Your ${nftName} has been purchased successfully!

💰 **Amount**: $${payment.amount} ${payment.currency}
🔗 **Transaction**: ${payment.transactionHash || 'Processing...'}
📱 **Smart Wallet**: ${payment.smartWalletAddress || 'Creating...'}

Your NFT will be minted and delivered to your smart wallet shortly. You'll receive another message once it's ready!

Thank you for choosing CarMania! 🚗✨`
        );
      }
      
      // TODO: Trigger NFT minting process
      // This would integrate with your existing minting contracts
      console.log(`🎨 Triggering NFT minting for payment ${payment.id}`);
      
    } catch (error) {
      console.error('Error handling payment completion:', error);
    }
  }

  /**
   * Handle payment failure webhook
   */
  async handlePaymentFailed(payment: any): Promise<void> {
    try {
      console.log(`❌ Payment failed: ${payment.id} for product ${payment.productId}`);
      
      const userAddress = payment.metadata?.userAddress;
      const nftName = payment.metadata?.nftName || 'CarMania NFT';
      
      if (userAddress) {
        await this.drivrAgent.sendDirectMessage(userAddress, 
          `❌ **Payment Failed**
          
Unfortunately, your payment for ${nftName} could not be processed.

💰 **Amount**: $${payment.amount} ${payment.currency}
📅 **Time**: ${new Date(payment.createdAt).toLocaleString()}

**Possible reasons:**
• Insufficient funds
• Card declined
• Network issues
• Invalid payment information

Please try again or contact support if the issue persists. I'm here to help! 🚗`
        );
      }
      
    } catch (error) {
      console.error('Error handling payment failure:', error);
    }
  }

  /**
   * Handle payment refund webhook
   */
  async handlePaymentRefunded(payment: any): Promise<void> {
    try {
      console.log(`🔄 Payment refunded: ${payment.id} for product ${payment.productId}`);
      
      const userAddress = payment.metadata?.userAddress;
      const nftName = payment.metadata?.nftName || 'CarMania NFT';
      
      if (userAddress) {
        await this.drivrAgent.sendDirectMessage(userAddress, 
          `🔄 **Refund Processed**
          
Your payment for ${nftName} has been refunded.

💰 **Amount**: $${payment.amount} ${payment.currency}
📅 **Refund Date**: ${new Date().toLocaleString()}

The refund should appear in your account within 3-5 business days, depending on your bank.

If you have any questions about this refund, please don't hesitate to ask! 🚗`
        );
      }
      
    } catch (error) {
      console.error('Error handling payment refund:', error);
    }
  }
}
