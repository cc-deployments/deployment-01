// Temporarily commented out for build fix - will restore after deployment
/*
import { Client, type XmtpEnv, type Signer } from "@xmtp/node-sdk";
import { PaymentFacilitator } from '@coinbase/x402-sdk';
import { AGENT_CONFIG } from '../config/agent';

export interface XMTPAgentConfig {
  privateKey: string;
  encryptionKey: string;
  env: XmtpEnv;
  network: 'base' | 'mainnet';
}

export class CarCultureXMTPAgent {
  private client: Client;
  private paymentFacilitator: PaymentFacilitator;
  private config: XMTPAgentConfig;

  constructor(config: XMTPAgentConfig) {
    this.config = config;
    this.client = new Client();
    this.paymentFacilitator = new PaymentFacilitator();
  }

  async initialize() {
    try {
      // Initialize XMTP client
      await this.client.init({
        privateKey: this.config.privateKey,
        env: this.config.env,
        encryptionKey: this.config.encryptionKey
      });

      // Initialize payment facilitator
      await this.paymentFacilitator.initialize({
        network: this.config.network,
        privateKey: this.config.privateKey
      });

      console.log('✅ CarCulture XMTP Agent initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize CarCulture XMTP Agent:', error);
      throw error;
    }
  }

  async sendMessage(to: string, message: string, paymentRequired?: boolean) {
    try {
      if (paymentRequired) {
        // Create payment request
        const paymentRequest = await this.paymentFacilitator.createPaymentRequest({
          amount: '0.001', // 0.001 USDC
          currency: 'USDC',
          recipient: AGENT_CONFIG.walletAddress,
          description: 'CarCulture NFT Purchase'
        });

        // Send message with payment request
        await this.client.sendMessage(to, {
          text: message,
          paymentRequest: paymentRequest
        });
      } else {
        // Send regular message
        await this.client.sendMessage(to, message);
      }

      console.log('✅ Message sent successfully');
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  }

  async handleIncomingMessage(from: string, message: any) {
    try {
      // Process incoming message
      console.log(`📨 Message from ${from}:`, message);

      // Check if payment is included
      if (message.payment) {
        // Verify payment
        const paymentVerified = await this.paymentFacilitator.verifyPayment(message.payment);
        
        if (paymentVerified) {
          // Process paid message
          await this.processPaidMessage(from, message);
        } else {
          // Request payment
          await this.sendMessage(from, 'Payment required to continue. Please send 0.001 USDC.', true);
        }
      } else {
        // Process free message
        await this.processFreeMessage(from, message);
      }
    } catch (error) {
      console.error('❌ Failed to handle incoming message:', error);
    }
  }

  private async processPaidMessage(from: string, message: any) {
    // Handle paid messages (NFT purchases, premium features, etc.)
    console.log('💰 Processing paid message from:', from);
    
    // Add your paid message logic here
    await this.sendMessage(from, 'Thank you for your payment! Your NFT purchase is being processed.');
  }

  private async processFreeMessage(from: string, message: any) {
    // Handle free messages (general inquiries, help, etc.)
    console.log('💬 Processing free message from:', from);
    
    // Add your free message logic here
    await this.sendMessage(from, 'Hello! I can help you with CarCulture NFT purchases. Send a payment to unlock premium features.');
  }
}
*/