// DRIVR Chat XMTP Client for FC Miniapp
import { Client, type XmtpEnv, Dm } from '@xmtp/browser-sdk';
import { 
  DRIVRXMTPConfig, 
  DRIVRMessage, 
  DRIVRConversation,
  DRIVRNotification 
} from '../../../../packages/shared-xmtp/src/types';

export class DRIVRChatClient {
  private client: Client | null = null;
  private config: DRIVRXMTPConfig;
  private isConnected: boolean = false;
  private conversations: DRIVRConversation[] = [];
  private currentConversation: DRIVRConversation | null = null;
  private messageHandlers: ((message: DRIVRMessage) => void)[] = [];
  private notificationHandlers: ((notification: DRIVRNotification) => void)[] = [];

  constructor() {
    this.config = {
      env: (process.env.NEXT_PUBLIC_XMTP_ENV as 'dev' | 'production') || 'dev',
    };
  }

  /**
   * Connect to XMTP with wallet
   */
  async connect(wallet: any): Promise<void> {
    try {
      if (!wallet) {
        throw new Error('Wallet required for XMTP connection');
      }

      // Create a proper signer from the wallet
      const signer = {
        type: 'EOA' as const,
        getIdentifier: () => ({
          identifier: wallet.address || wallet,
          identifierKind: 'Ethereum' as const,
        }),
        signMessage: async (message: string) => {
          if (typeof wallet.signMessage === 'function') {
            const signature = await wallet.signMessage(message);
            // Convert signature to Uint8Array if needed
            return typeof signature === 'string' 
              ? new TextEncoder().encode(signature)
              : signature;
          }
          throw new Error('Wallet does not support message signing');
        },
      };

      this.client = await Client.create(signer, {
        env: this.config.env as XmtpEnv,
      });

      this.isConnected = true;
      console.log('✅ DRIVR Chat connected to XMTP');
      
      // Load existing conversations
      await this.loadConversations();
      
      // Set up message listeners
      this.setupMessageListeners();
      
    } catch (error) {
      console.error('❌ Failed to connect to XMTP:', error);
      throw error;
    }
  }

  /**
   * Disconnect from XMTP
   */
  async disconnect(): Promise<void> {
    try {
      if (this.client) {
        // Clear local state
        this.client = null;
        this.isConnected = false;
        this.conversations = [];
        this.currentConversation = null;
        
        console.log('✅ DRIVR Chat disconnected from XMTP');
      }
    } catch (error) {
      console.error('❌ Failed to disconnect from XMTP:', error);
    }
  }

  /**
   * Load existing conversations
   */
  private async loadConversations(): Promise<void> {
    if (!this.client) return;

    try {
      const xmtpConversations = await this.client.conversations.list();
      
      // Filter and map conversations with async operations
      const filteredConversations: DRIVRConversation[] = [];
      
      for (const conv of xmtpConversations) {
        if (conv instanceof Dm) {
          const peerInboxId = await conv.peerInboxId();
          if (peerInboxId === process.env.NEXT_PUBLIC_DRIVR_AGENT_ADDRESS) {
            filteredConversations.push({
              id: conv.id,
              peerAddress: peerInboxId,
              messages: [],
              lastMessageAt: Date.now(),
              isActive: true,
            });
          }
        }
      }
      
      this.conversations = filteredConversations;

      console.log(`📋 Loaded ${this.conversations.length} DRIVR conversations`);
    } catch (error) {
      console.error('❌ Failed to load conversations:', error);
    }
  }

  /**
   * Set up message listeners
   */
  private setupMessageListeners(): void {
    if (!this.client) return;

    // Listen for new conversations
    this.client.conversations.stream({
      onValue: async (conversation) => {
        if (conversation instanceof Dm) {
          const peerInboxId = await conversation.peerInboxId();
          if (peerInboxId === process.env.NEXT_PUBLIC_DRIVR_AGENT_ADDRESS) {
            await this.handleNewConversation(conversation);
          }
        }
      }
    });

    // Listen for messages in existing conversations
    const conversations = this.client.conversations.list();
    conversations.then(convs => {
      convs.forEach(async (conversation) => {
        if (conversation instanceof Dm) {
          const peerInboxId = await conversation.peerInboxId();
          if (peerInboxId === process.env.NEXT_PUBLIC_DRIVR_AGENT_ADDRESS) {
            await conversation.stream({
              onValue: (message) => {
                this.handleIncomingMessage(message, peerInboxId);
              }
            });
          }
        }
      });
    });
  }

  /**
   * Handle new conversation
   */
  private async handleNewConversation(conversation: Dm): Promise<void> {
    const peerInboxId = await conversation.peerInboxId();
    const newConversation: DRIVRConversation = {
      id: conversation.id,
      peerAddress: peerInboxId,
      messages: [],
      lastMessageAt: Date.now(),
      isActive: true,
    };

    this.conversations.push(newConversation);
    
    // Set up message listener for new conversation
    await conversation.stream({
      onValue: (message: any) => {
        this.handleIncomingMessage(message, peerInboxId);
      }
    });
  }

  /**
   * Handle incoming message
   */
  private handleIncomingMessage(xmtpMessage: any, senderAddress: string): void {
    try {
      const drivrMessage: DRIVRMessage = {
        id: xmtpMessage.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderAddress,
        content: xmtpMessage.content || '',
        timestamp: xmtpMessage.sentAt || Date.now(),
        type: this.detectMessageType(xmtpMessage.content),
        metadata: this.extractMetadata(xmtpMessage),
      };

      // Add message to current conversation
      if (this.currentConversation) {
        this.currentConversation.messages.push(drivrMessage);
        this.currentConversation.lastMessageAt = drivrMessage.timestamp;
      }

      // Notify message handlers
      this.messageHandlers.forEach(handler => handler(drivrMessage));

      // Check for notifications
      if (drivrMessage.content.includes('🔔') || drivrMessage.content.includes('notification:')) {
        this.handleNotification(drivrMessage);
      }

    } catch (error) {
      console.error('❌ Failed to handle incoming message:', error);
    }
  }

  /**
   * Handle notification
   */
  private handleNotification(message: DRIVRMessage): void {
    const notification: DRIVRNotification = {
      type: 'nft_purchase',
      title: 'DRIVR Notification',
      message: message.content.replace(/🔔|notification:/g, '').trim(),
      timestamp: message.timestamp,
    };

    this.notificationHandlers.forEach(handler => handler(notification));
  }

  /**
   * Start conversation with DRIVR agent
   */
  async startConversationWithDRIVR(): Promise<DRIVRConversation> {
    if (!this.client) {
      throw new Error('XMTP client not connected');
    }

    const drivrAgentAddress = process.env.NEXT_PUBLIC_DRIVR_AGENT_ADDRESS;
    if (!drivrAgentAddress) {
      throw new Error('DRIVR agent address not configured');
    }

    try {
      // Create a new DM conversation with the DRIVR agent
      const conversation = await this.client.conversations.newDm(drivrAgentAddress);
      
      const newConversation: DRIVRConversation = {
        id: conversation.id,
        peerAddress: drivrAgentAddress,
        messages: [],
        lastMessageAt: Date.now(),
        isActive: true,
      };

      this.conversations.push(newConversation);
      this.currentConversation = newConversation;

      // Set up message listener
      await conversation.stream({
        onValue: (message: any) => {
          this.handleIncomingMessage(message, drivrAgentAddress);
        }
      });

      // Send initial greeting
      await conversation.send('Hello DRIVR! I\'d like to chat about automotive NFTs.');

      console.log('✅ Started conversation with DRIVR agent');
      return newConversation;

    } catch (error) {
      console.error('❌ Failed to start conversation with DRIVR:', error);
      throw error;
    }
  }

  /**
   * Send message to DRIVR agent
   */
  async sendMessage(content: string): Promise<void> {
    if (!this.client || !this.currentConversation) {
      throw new Error('Not connected to DRIVR agent');
    }

    try {
      // Get the existing conversation or create a new one
      const conversation = await this.client.conversations.newDm(
        this.currentConversation.peerAddress
      );
      
      await conversation.send(content);

      // Add message to local state
      const userMessage: DRIVRMessage = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderAddress: this.client.inboxId || 'unknown',
        content,
        timestamp: Date.now(),
        type: 'text',
      };

      this.currentConversation.messages.push(userMessage);
      this.currentConversation.lastMessageAt = userMessage.timestamp;

      console.log('✅ Message sent to DRIVR agent');
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Select conversation
   */
  selectConversation(conversationId: string): void {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      this.currentConversation = conversation;
    }
  }

  /**
   * Get conversations
   */
  getConversations(): DRIVRConversation[] {
    return this.conversations;
  }

  /**
   * Get current conversation
   */
  getCurrentConversation(): DRIVRConversation | null {
    return this.currentConversation;
  }

  /**
   * Get messages from current conversation
   */
  getMessages(): DRIVRMessage[] {
    return this.currentConversation?.messages || [];
  }

  /**
   * Add message handler
   */
  onMessage(handler: (message: DRIVRMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  /**
   * Add notification handler
   */
  onNotification(handler: (notification: DRIVRNotification) => void): void {
    this.notificationHandlers.push(handler);
  }

  /**
   * Remove message handler
   */
  offMessage(handler: (message: DRIVRMessage) => void): void {
    const index = this.messageHandlers.indexOf(handler);
    if (index > -1) {
      this.messageHandlers.splice(index, 1);
    }
  }

  /**
   * Remove notification handler
   */
  offNotification(handler: (notification: DRIVRNotification) => void): void {
    const index = this.notificationHandlers.indexOf(handler);
    if (index > -1) {
      this.notificationHandlers.splice(index, 1);
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
   * Get connection status
   */
  isConnectedToXMTP(): boolean {
    return this.isConnected && this.client !== null;
  }

  /**
   * Get client address
   */
  getClientAddress(): string | null {
    return this.client?.inboxId || null;
  }
}
