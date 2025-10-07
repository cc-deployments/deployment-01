// DRIVR Agent XMTP Service
import { Client, type XmtpEnv } from '@xmtp/node-sdk';
import { 
  DRIVRXMTPConfig, 
  DRIVRMessage, 
  DRIVRResponse, 
  DRIVRQuickAction,
  DRIVRPaymentRequest 
} from '../../../packages/shared-xmtp/src/types';

export class DRIVRXMTPService {
  private client: Client;
  private config: DRIVRXMTPConfig;
  private isInitialized: boolean = false;
  private messageHandlers: Map<string, (message: DRIVRMessage) => Promise<void>> = new Map();

  constructor(config: DRIVRXMTPConfig) {
    this.config = config;
    this.client = new Client();
  }

  /**
   * Initialize XMTP client for DRIVR agent
   */
  async initialize(): Promise<void> {
    try {
      if (!this.config.privateKey) {
        throw new Error('DRIVR agent private key required for XMTP initialization');
      }

      await this.client.init({
        privateKey: this.config.privateKey,
        env: this.config.env as XmtpEnv,
      });

      this.isInitialized = true;
      console.log('✅ DRIVR XMTP Agent initialized successfully');
      
      // Start listening for messages
      await this.startListening();
    } catch (error) {
      console.error('❌ Failed to initialize DRIVR XMTP Agent:', error);
      throw error;
    }
  }

  /**
   * Start listening for incoming messages
   */
  private async startListening(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('XMTP client not initialized');
    }

    // Listen for all conversations
    const conversations = await this.client.conversations.list();
    
    for (const conversation of conversations) {
      // Set up message handler for each conversation
      conversation.on('message', async (message) => {
        await this.handleIncomingMessage(message, conversation.peerAddress);
      });
    }

    console.log('🎧 DRIVR XMTP Agent listening for messages...');
  }

  /**
   * Handle incoming XMTP message
   */
  private async handleIncomingMessage(xmtpMessage: any, senderAddress: string): Promise<void> {
    try {
      console.log(`📨 DRIVR received message from ${senderAddress}: ${xmtpMessage.content}`);

      // Parse message to DRIVR format
      const drivrMessage: DRIVRMessage = {
        id: xmtpMessage.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderAddress,
        content: xmtpMessage.content || '',
        timestamp: xmtpMessage.sentAt || Date.now(),
        type: this.detectMessageType(xmtpMessage.content),
        metadata: this.extractMetadata(xmtpMessage),
      };

      // Process message with DRIVR AI logic
      const response = await this.processDRIVRMessage(drivrMessage);
      
      // Send response back to user
      await this.sendResponse(senderAddress, response);

    } catch (error) {
      console.error('❌ Failed to handle incoming message:', error);
    }
  }

  /**
   * Process message with DRIVR AI logic
   */
  private async processDRIVRMessage(message: DRIVRMessage): Promise<DRIVRResponse> {
    const content = message.content.toLowerCase();

    // Handle different types of messages
    if (content.includes('hello') || content.includes('hi')) {
      return this.generateGreetingResponse();
    }

    if (content.includes('nft') || content.includes('car')) {
      return this.generateNFTResponse(message);
    }

    if (content.includes('price') || content.includes('floor')) {
      return this.generatePriceResponse(message);
    }

    if (content.includes('buy') || content.includes('purchase')) {
      return this.generatePurchaseResponse(message);
    }

    if (content.includes('help')) {
      return this.generateHelpResponse();
    }

    // Default response
    return this.generateDefaultResponse(message);
  }

  /**
   * Generate greeting response
   */
  private generateGreetingResponse(): DRIVRResponse {
    return {
      content: `Hello! I'm DRIVR, your CarCulture AI assistant! 🚗\n\nI can help you with:\n• Discovering automotive NFTs\n• Checking floor prices and market data\n• Finding specific car models\n• Processing purchases with x402 payments\n\nWhat would you like to explore today?`,
      quickActions: [
        {
          id: 'browse_nfts',
          label: 'Browse NFTs',
          action: 'browse_nfts',
          description: 'View available automotive NFTs'
        },
        {
          id: 'check_prices',
          label: 'Check Prices',
          action: 'check_prices',
          description: 'Get latest floor prices'
        },
        {
          id: 'find_car',
          label: 'Find Specific Car',
          action: 'find_car',
          description: 'Search for a particular car model'
        }
      ]
    };
  }

  /**
   * Generate NFT-related response
   */
  private generateNFTResponse(message: DRIVRMessage): DRIVRResponse {
    return {
      content: `I found some amazing automotive NFTs for you! 🎨\n\n**Featured Collections:**\n• CarMania Woodie Wagons\n• Classic Muscle Cars\n• Vintage Racing Cars\n\nWould you like to see specific details or check prices?`,
      quickActions: [
        {
          id: 'woodie_wagons',
          label: 'Woodie Wagons',
          action: 'show_woodie_wagons',
          description: 'View Woodie Wagon collection'
        },
        {
          id: 'muscle_cars',
          label: 'Muscle Cars',
          action: 'show_muscle_cars',
          description: 'View Muscle Car collection'
        },
        {
          id: 'racing_cars',
          label: 'Racing Cars',
          action: 'show_racing_cars',
          description: 'View Racing Car collection'
        }
      ]
    };
  }

  /**
   * Generate price response
   */
  private generatePriceResponse(message: DRIVRMessage): DRIVRResponse {
    return {
      content: `📊 **Current Floor Prices:**\n\n• Woodie Wagons: 0.05 ETH\n• Muscle Cars: 0.08 ETH\n• Racing Cars: 0.12 ETH\n\n*Prices updated 2 minutes ago*\n\nWould you like to set up price alerts or view detailed market data?`,
      quickActions: [
        {
          id: 'price_alerts',
          label: 'Set Price Alerts',
          action: 'set_price_alerts',
          description: 'Get notified when prices change',
          requiresPayment: true,
          paymentAmount: '0.001 ETH'
        },
        {
          id: 'market_data',
          label: 'Detailed Market Data',
          action: 'show_market_data',
          description: 'View comprehensive market analysis',
          requiresPayment: true,
          paymentAmount: '0.002 ETH'
        }
      ]
    };
  }

  /**
   * Generate purchase response
   */
  private generatePurchaseResponse(message: DRIVRMessage): DRIVRResponse {
    return {
      content: `🛒 **Ready to Purchase!**\n\nI can help you buy automotive NFTs using x402 payments. This allows for seamless, gasless transactions.\n\nWhich NFT would you like to purchase?`,
      quickActions: [
        {
          id: 'purchase_woodie',
          label: 'Buy Woodie Wagon',
          action: 'purchase_woodie',
          description: 'Purchase a Woodie Wagon NFT',
          requiresPayment: true,
          paymentAmount: '0.05 ETH'
        },
        {
          id: 'purchase_muscle',
          label: 'Buy Muscle Car',
          action: 'purchase_muscle',
          description: 'Purchase a Muscle Car NFT',
          requiresPayment: true,
          paymentAmount: '0.08 ETH'
        }
      ],
      paymentRequest: {
        amount: '0.05',
        currency: 'ETH',
        recipient: process.env.DRIVR_AGENT_ADDRESS || '0x0000000000000000000000000000000000000000',
        description: 'DRIVR NFT Purchase',
        nftId: 'woodie-wagon-001'
      }
    };
  }

  /**
   * Generate help response
   */
  private generateHelpResponse(): DRIVRResponse {
    return {
      content: `🆘 **DRIVR Help Center**\n\n**Available Commands:**\n• "Show NFTs" - Browse available collections\n• "Check prices" - Get current floor prices\n• "Find [car model]" - Search for specific cars\n• "Buy [NFT]" - Purchase an NFT\n• "Set alerts" - Set up price notifications\n\n**Payment Methods:**\n• x402 autonomous payments\n• Base Pay integration\n• Safe multisig fallback\n\nNeed more help? Just ask!`,
      quickActions: [
        {
          id: 'tutorial',
          label: 'View Tutorial',
          action: 'show_tutorial',
          description: 'Step-by-step guide'
        },
        {
          id: 'contact_support',
          label: 'Contact Support',
          action: 'contact_support',
          description: 'Get human assistance'
        }
      ]
    };
  }

  /**
   * Generate default response
   */
  private generateDefaultResponse(message: DRIVRMessage): DRIVRResponse {
    return {
      content: `I understand you're asking about "${message.content}". Let me help you with that!\n\nI'm DRIVR, your automotive NFT assistant. I can help you discover, analyze, and purchase automotive NFTs.\n\nWhat specific aspect would you like to explore?`,
      quickActions: [
        {
          id: 'explore_nfts',
          label: 'Explore NFTs',
          action: 'explore_nfts',
          description: 'Browse available collections'
        },
        {
          id: 'get_help',
          label: 'Get Help',
          action: 'get_help',
          description: 'Learn how to use DRIVR'
        }
      ]
    };
  }

  /**
   * Send response to user
   */
  private async sendResponse(recipientAddress: string, response: DRIVRResponse): Promise<void> {
    try {
      const conversation = await this.client.conversations.newConversation(recipientAddress);
      
      // Format response content
      let content = response.content;
      
      // Add quick actions as text
      if (response.quickActions && response.quickActions.length > 0) {
        content += '\n\n**Quick Actions:**\n';
        response.quickActions.forEach((action, index) => {
          content += `${index + 1}. ${action.label}`;
          if (action.requiresPayment && action.paymentAmount) {
            content += ` (${action.paymentAmount})`;
          }
          content += '\n';
        });
      }

      // Add payment request info
      if (response.paymentRequest) {
        content += `\n\n**Payment Required:** ${response.paymentRequest.amount} ${response.paymentRequest.currency}`;
        content += `\n**Description:** ${response.paymentRequest.description}`;
      }

      await conversation.send(content);
      console.log('✅ DRIVR response sent successfully');
    } catch (error) {
      console.error('❌ Failed to send response:', error);
    }
  }

  /**
   * Detect message type from content
   */
  private detectMessageType(content: string): DRIVRMessage['type'] {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('payment') || lowerContent.includes('$') || lowerContent.includes('eth')) {
      return 'payment';
    }
    if (lowerContent.includes('nft') || lowerContent.includes('car')) {
      return 'nft';
    }
    if (lowerContent.includes('action:') || lowerContent.includes('quick:')) {
      return 'quick_action';
    }
    return 'text';
  }

  /**
   * Extract metadata from message
   */
  private extractMetadata(message: any): DRIVRMessage['metadata'] {
    const metadata: DRIVRMessage['metadata'] = {};

    // Extract payment information
    if (message.content?.includes('$')) {
      const amountMatch = message.content.match(/\$(\d+\.?\d*)/);
      if (amountMatch) {
        metadata.paymentAmount = amountMatch[1];
      }
    }

    // Extract NFT information
    if (message.content?.includes('nft')) {
      const nftMatch = message.content.match(/nft[:\s]+(\w+)/i);
      if (nftMatch) {
        metadata.nftId = nftMatch[1];
      }
    }

    return metadata;
  }

  /**
   * Send notification to user
   */
  async sendNotification(recipientAddress: string, notification: {
    type: 'nft_purchase' | 'price_alert' | 'auction_update' | 'new_drop';
    title: string;
    message: string;
    data?: any;
  }): Promise<void> {
    try {
      const conversation = await this.client.conversations.newConversation(recipientAddress);
      
      const notificationMessage = `🔔 **${notification.title}**\n\n${notification.message}`;
      await conversation.send(notificationMessage);
      
      console.log(`✅ Notification sent to ${recipientAddress}`);
    } catch (error) {
      console.error('❌ Failed to send notification:', error);
    }
  }

  /**
   * Stop the XMTP service
   */
  async stop(): Promise<void> {
    try {
      // Close all conversations
      const conversations = await this.client.conversations.list();
      for (const conversation of conversations) {
        // Note: XMTP doesn't have a direct close method, but we can stop listening
        conversation.off('message', () => {});
      }
      
      this.isInitialized = false;
      console.log('✅ DRIVR XMTP Agent stopped');
    } catch (error) {
      console.error('❌ Failed to stop DRIVR XMTP Agent:', error);
    }
  }
}

































