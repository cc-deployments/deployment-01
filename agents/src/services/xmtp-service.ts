import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { CarManiaAgentConfig, XMTPMessage, AgentResponse, AgentState, WalletSendCallsContent } from '../types/agent';

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
      console.log(`DRIVR Agent initialized with wallet: ${this.wallet.address}`);

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
    this.client.conversations.stream().then((stream) => {
      (stream as any).on('conversation', (conversation: any) => {
        this.listenToConversation(conversation);
      });
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
    conversation.messages().then((messages) => {
      // Handle existing messages
      messages.forEach((message) => {
        this.handleMessage(conversation, message);
      });
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

  // Send direct message to user address
  async sendDirectMessage(userAddress: string, content: string): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not initialized');
    }

    try {
      const conversation = await this.client.conversations.newConversation(userAddress);
      await conversation.send(content);
      console.log(`Direct message sent to: ${userAddress}`);
    } catch (error) {
      console.error('Failed to send direct message:', error);
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
          contentType: 'coinbase.com/actions:1.0' as any,
          content: response.quickActions
        } as any);
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

  // New method: Send message with Wallet Send Calls content type
  async sendMessageWithWalletCalls(conversationId: string, content: string, walletCalls: WalletSendCallsContent): Promise<void> {
    if (!this.client) {
      throw new Error('XMTP client not initialized');
    }

    try {
      const conversation = await this.client.conversations.newConversation(conversationId);
      
      // Send with wallet send calls content type
      await conversation.send(content, {
        contentType: 'xmtp.org/walletSendCalls:1.0' as any,
        content: walletCalls
      } as any);
      
      console.log(`Wallet Send Calls message sent to conversation: ${conversationId}`);
      console.log(`Transaction calls: ${walletCalls.calls.map(call => call.description).join(', ')}`);
    } catch (error) {
      console.error('Failed to send Wallet Send Calls message:', error);
      // Fallback to regular text message if wallet calls fail
      try {
        await this.sendMessage(conversationId, content);
      } catch (fallbackError) {
        console.error('Fallback message also failed:', fallbackError);
        throw fallbackError;
      }
    }
  }

  // Enhanced reply method that supports Wallet Calls
  async replyWithWalletCalls(message: XMTPMessage, content: string, walletCalls: WalletSendCallsContent): Promise<void> {
    await this.sendMessageWithWalletCalls(message.conversationId, content, walletCalls);
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
    console.log('DRIVR Agent disconnected from XMTP');
  }
}
