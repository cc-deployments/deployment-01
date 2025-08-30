import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { CarManiaAgentConfig, XMTPMessage, AgentResponse, AgentState } from '../types/agent';

export class XMTPService {
  private client: Client | null = null;
  private wallet: ethers.Wallet | null = null;
  private config: CarManiaAgentConfig;
  private state: AgentState;
  private messageHandlers: Map<string, (message: XMTPMessage) => Promise<void>> = new Map();

  constructor(config: CarManiaAgentConfig) {
    this.config = config;
    this.state = {
      isConnected: false,
      walletAddress: '',
      conversations: new Map(),
      nftCache: new Map(),
    };
  }

  async initialize(): Promise<void> {
    try {
      // Initialize wallet
      this.wallet = new ethers.Wallet(this.config.walletPrivateKey);
      this.state.walletAddress = this.wallet.address;

      // Initialize XMTP client
      this.client = await Client.create(this.wallet, {
        env: 'production', // Use 'production' for mainnet, 'dev' for testnet
      });

      this.state.isConnected = true;
      console.log(`Drivr Agent initialized with wallet: ${this.wallet.address}`);

      // Start listening for messages
      await this.startMessageListener();
    } catch (error) {
      console.error('Failed to initialize XMTP service:', error);
      throw error;
    }
  }

  private async startMessageListener(): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not initialized');
    }

    // Listen for all conversations
    this.client.conversations.list().then((conversations) => {
      conversations.forEach((conversation) => {
        this.listenToConversation(conversation);
      });
    });

    // Listen for new conversations
    this.client.conversations.stream().on('conversation', (conversation) => {
      this.listenToConversation(conversation);
    });
  }

  private async listenToConversation(conversation: Conversation): Promise<void> {
    // Listen for messages in this conversation
    conversation.messages().then((messages) => {
      messages.forEach((message) => {
        this.handleMessage(conversation, message);
      });
    });

    // Listen for new messages
    conversation.messages().on('message', (message) => {
      this.handleMessage(conversation, message);
    });
  }

  private async handleMessage(conversation: Conversation, message: DecodedMessage): Promise<void> {
    if (message.senderAddress === this.state.walletAddress) {
      return; // Ignore our own messages
    }

    const xmtpMessage: XMTPMessage = {
      id: message.id,
      content: message.content,
      senderAddress: message.senderAddress,
      timestamp: message.sent,
      conversationId: conversation.topic,
    };

    // Update conversation state
    const conversationState = this.state.conversations.get(conversation.topic) || {
      conversationId: conversation.topic,
      userAddress: message.senderAddress,
      lastInteraction: new Date(),
      nftVerified: false,
      accessLevel: 'basic' as const,
      messageHistory: [],
    };

    conversationState.messageHistory.push(xmtpMessage);
    conversationState.lastInteraction = new Date();
    this.state.conversations.set(conversation.topic, conversationState);

    // Process message through registered handlers
    for (const handler of this.messageHandlers.values()) {
      try {
        await handler(xmtpMessage);
      } catch (error) {
        console.error('Error in message handler:', error);
      }
    }
  }

  async sendMessage(conversationId: string, content: string): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not initialized');
    }

    try {
      const conversation = await this.client.conversations.newConversation(conversationId);
      await conversation.send(content);
      console.log(`Message sent to conversation: ${conversationId}`);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  async replyToMessage(message: XMTPMessage, content: string): Promise<void> {
    await this.sendMessage(message.conversationId, content);
  }

  // New method: Send message with Quick Actions content type (BASE AI implementation)
  async sendMessageWithQuickActions(conversationId: string, response: AgentResponse): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not initialized');
    }

    try {
      const conversation = await this.client.conversations.newConversation(conversationId);
      
      if (response.quickActions) {
        // Send with Quick Actions content type and fallback text
        await conversation.send(response.content, {
          contentType: 'coinbase.com/actions:1.0',
          content: response.quickActions
        });
        console.log(`Quick Actions message sent to conversation: ${conversationId}`);
      } else {
        // Send regular text message
        await conversation.send(response.content);
        console.log(`Text message sent to conversation: ${conversationId}`);
      }
    } catch (error) {
      console.error('Failed to send Quick Actions message:', error);
      // Fallback to regular text message if Quick Actions fail
      try {
        await this.sendMessage(conversationId, response.content);
      } catch (fallbackError) {
        console.error('Fallback message also failed:', fallbackError);
        throw fallbackError;
      }
    }
  }

  // Enhanced reply method that supports Quick Actions
  async replyWithQuickActions(message: XMTPMessage, response: AgentResponse): Promise<void> {
    await this.sendMessageWithQuickActions(message.conversationId, response);
  }

  registerMessageHandler(id: string, handler: (message: XMTPMessage) => Promise<void>): void {
    this.messageHandlers.set(id, handler);
  }

  unregisterMessageHandler(id: string): void {
    this.messageHandlers.delete(id);
  }

  getState(): AgentState {
    return { ...this.state };
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
    this.state.isConnected = false;
    console.log('Drivr Agent disconnected from XMTP');
  }
}
