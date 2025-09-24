import { Client, type XmtpEnv, type Signer } from "@xmtp/node-sdk";
import { PaymentFacilitator } from '@coinbase/x402-sdk';

export interface XMTPAgentConfig {
  privateKey: string;
  encryptionKey: string;
  env: XmtpEnv;
  network: 'base' | 'mainnet';
}

export class CarManiaXMTPAgent {
  private client: Client;
  private facilitator: PaymentFacilitator;
  private config: XMTPAgentConfig;

  constructor(config: XMTPAgentConfig) {
    this.config = config;
    this.facilitator = new PaymentFacilitator({
      privateKey: config.privateKey,
      network: config.network
    });
  }

  async initialize() {
    const signer = {
      signMessage: async (message: Uint8Array) => {
        // Implement signing logic with your private key
        // This is a placeholder - implement actual signing
        return new Uint8Array();
      }
    };

    this.client = await Client.create(signer, {
      encryptionKey: new Uint8Array(Buffer.from(this.config.encryptionKey, 'hex')),
      env: this.config.env
    });

    await this.client.conversations.sync();
    console.log('✅ CarMania XMTP Agent initialized');
  }

  async startListening() {
    const stream = await this.client.conversations.streamAllMessages();
    
    for await (const message of stream) {
      // Ignore messages from the agent itself
      if (message?.senderInboxId === this.client.inboxId) continue;
      
      await this.handleMessage(message);
    }
  }

  private async handleMessage(message: any) {
    const conversation = await this.client.conversations.getConversationById(
      message.conversationId
    );

    const content = message.content;
    console.log('📨 Received message:', content);

    // Route messages based on content
    if (content.includes('floor price') || content.includes('price')) {
      await this.handleFloorPriceRequest(conversation, content);
    } else if (content.includes('buy') || content.includes('purchase')) {
      await this.handlePurchaseRequest(conversation, content);
    } else if (content.includes('help') || content.includes('what')) {
      await this.handleHelpRequest(conversation);
    } else {
      await this.handleGeneralQuery(conversation, content);
    }
  }

  private async handleFloorPriceRequest(conversation: any, content: string) {
    try {
      // Extract collection name from message
      const collection = this.extractCollection(content);
      
      if (!collection) {
        await conversation.send("Please specify an NFT collection name (e.g., 'cryptopunks floor price').");
        return;
      }

      // Try to get floor price data
      const response = await fetch(`/api/nft-floor/${collection}`);
      
      if (response.status === 402) {
        // Payment required - use x402
        await this.processPaymentAndRetry(
          conversation,
          `/api/nft-floor/${collection}`,
          `📊 Floor price for ${collection}:`
        );
      } else if (response.ok) {
        const data = await response.json();
        await conversation.send(`📊 ${collection} floor price: ${data.floorPrice} ETH`);
      } else {
        await conversation.send("❌ Unable to fetch floor price data.");
      }
    } catch (error) {
      await conversation.send("❌ Error fetching floor price data.");
    }
  }

  private async handlePurchaseRequest(conversation: any, content: string) {
    // Extract product information from message
    const product = this.extractProduct(content);
    
    if (!product) {
      await conversation.send("What would you like to purchase? Available: Summertime Blues NFT, Woodie Wagon NFT, Premium Collector NFT");
      return;
    }

    try {
      // Try to get product details
      const response = await fetch(`/api/product/${product.id}`);
      
      if (response.status === 402) {
        // Payment required - use x402
        await this.processPaymentAndRetry(
          conversation,
          `/api/product/${product.id}`,
          `🛒 Purchase ${product.name}:`
        );
      } else if (response.ok) {
        const data = await response.json();
        await conversation.send(`🛒 ${product.name} - ${data.price} ${data.currency}. Ready to purchase!`);
      }
    } catch (error) {
      await conversation.send("❌ Error processing purchase request.");
    }
  }

  private async handleHelpRequest(conversation: any) {
    await conversation.send(`🚗 Hi! I'm DRIVR, your AI car expert. I can help you with:

• **NFT Floor Prices** - Ask about any collection's floor price
• **Purchase NFTs** - Buy automotive NFTs from CarMania collection
• **Market Data** - Get real-time market information
• **Car Information** - Learn about specific car models and history

Just ask me anything about cars or NFTs!`);
  }

  private async handleGeneralQuery(conversation: any, content: string) {
    // Use your existing DRIVR logic here
    const response = await this.generateDRIVRResponse(content);
    await conversation.send(response);
  }

  private async processPaymentAndRetry(conversation: any, endpoint: string, successPrefix: string) {
    try {
      // Initial request to get payment details
      const response = await fetch(endpoint);
      const paymentDetails = await response.json();
      
      // Notify user of payment
      await conversation.send(`💰 Payment required: ${paymentDetails.amount} USDC. Processing...`);
      
      // Execute payment using x402
      const payment = await this.facilitator.createPayment({
        amount: paymentDetails.amount,
        recipient: paymentDetails.recipient,
        reference: paymentDetails.reference,
        currency: 'USDC'
      });
      
      // Retry with payment
      const retryResponse = await fetch(endpoint, {
        headers: { "X-PAYMENT": payment.payload }
      });
      
      if (retryResponse.ok) {
        const data = await retryResponse.json();
        await conversation.send(`${successPrefix} ${JSON.stringify(data, null, 2)}`);
      } else {
        await conversation.send("❌ Payment processed but service error occurred.");
      }
    } catch (error) {
      await conversation.send(`❌ Payment failed: ${error.message}`);
    }
  }

  private extractCollection(content: string): string | null {
    const words = content.toLowerCase().split(' ');
    const collections = ['cryptopunks', 'bayc', 'azuki', 'pudgypenguins', 'carmania', 'summertime', 'woodie'];
    const collectionIndex = words.findIndex(word => collections.includes(word));
    return collectionIndex !== -1 ? words[collectionIndex] : null;
  }

  private extractProduct(content: string): { id: string; name: string } | null {
    const input = content.toLowerCase();
    
    if (input.includes('summertime') || input.includes('blues')) {
      return { id: 'summertime-blues', name: 'Summertime Blues NFT' };
    } else if (input.includes('woodie') || input.includes('wagon')) {
      return { id: 'woodie-wagon', name: 'Woodie Wagon NFT' };
    } else if (input.includes('premium') || input.includes('collector')) {
      return { id: 'premium-collector', name: 'Premium Collector NFT' };
    }
    
    return null;
  }

  private async generateDRIVRResponse(content: string): Promise<string> {
    // Integrate with your existing DRIVR logic from ChatAgentCommerce.tsx
    // This is a simplified version - you can enhance it
    if (content.includes('car') || content.includes('automotive')) {
      return "🚗 I love talking about cars! What specific aspect interests you? Classic cars, modern supercars, or maybe some automotive NFTs?";
    } else if (content.includes('nft') || content.includes('collection')) {
      return "🎨 Our CarMania collection features amazing automotive NFTs! We have Summertime Blues, Woodie Wagon, and Premium Collector editions. Which interests you?";
    } else {
      return "🤔 I'm here to help with all things automotive and NFT-related! Feel free to ask about cars, our NFT collection, or anything else!";
    }
  }

  // Get agent address for users to message
  async getAgentAddress(): Promise<string> {
    const inboxState = await this.client.preferences.inboxState();
    return inboxState.identifiers[0].identifier;
  }
}
