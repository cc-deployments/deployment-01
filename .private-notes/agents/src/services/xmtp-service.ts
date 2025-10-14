import { Client } from '@xmtp/node-sdk';
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
      // Initialize wallet with proper address validation
      this.wallet = new ethers.Wallet(this.config.walletPrivateKey);
      this.state.walletAddress = this.wallet.address;
      
      // Validate address format for XMTP
      if (!ethers.isAddress(this.state.walletAddress)) {
        throw new Error(`Invalid wallet address: ${this.state.walletAddress}`);
      }

      console.log(`DRIVR Agent wallet address: ${this.wallet.address}`);
      console.log('XMTP V3 client initialization - working on proper integration');
      
      // For now, mark as connected without full XMTP initialization
      // This allows us to test the agent structure while we work on V3 API integration
      this.state.isConnected = true;
      console.log(`DRIVR Agent initialized with wallet: ${this.wallet.address}`);
      console.log('Note: XMTP V3 integration is in progress - messaging features will be added soon');

    } catch (error) {
      console.error('Failed to initialize XMTP service:', error);
      throw error;
    }
  }

  private async startMessageListener(): Promise<void> {
    console.log('Message listener setup - XMTP V3 integration in progress');
  }

  // Handle incoming messages with V3 API
  private async handleMessage(message: any): Promise<void> {
    console.log('Received message:', message);
    // TODO: Implement proper message handling for V3 API
  }

  async sendMessage(conversationId: string, content: string): Promise<void> {
    console.log(`[XMTP V3] Sending message to conversation: ${conversationId}`);
    console.log(`[XMTP V3] Message content: ${content}`);
    console.log('Note: XMTP V3 messaging implementation in progress');
  }

  // Send direct message to user address
  async sendDirectMessage(userAddress: string, content: string): Promise<void> {
    console.log(`[XMTP V3] Sending direct message to: ${userAddress}`);
    console.log(`[XMTP V3] Message content: ${content}`);
    console.log('Note: XMTP V3 messaging implementation in progress');
  }

  async replyToMessage(message: XMTPMessage, content: string): Promise<void> {
    await this.sendMessage(message.conversationId, content);
  }

  // New method: Send message with Quick Actions content type (BASE AI implementation)
  async sendMessageWithQuickActions(conversationId: string, response: AgentResponse): Promise<void> {
    console.log(`[XMTP V3] Sending Quick Actions message to conversation: ${conversationId}`);
    console.log(`[XMTP V3] Response content: ${response.content}`);
    if (response.quickActions) {
      console.log(`[XMTP V3] Quick Actions: ${JSON.stringify(response.quickActions)}`);
    }
    console.log('Note: XMTP V3 messaging implementation in progress');
  }

  // Enhanced reply method that supports Quick Actions
  async replyWithQuickActions(message: XMTPMessage, response: AgentResponse): Promise<void> {
    await this.sendMessageWithQuickActions(message.conversationId, response);
  }

  // New method: Send message with Wallet Send Calls content type
  async sendMessageWithWalletCalls(conversationId: string, content: string, walletCalls: WalletSendCallsContent): Promise<void> {
    console.log(`[XMTP V3] Sending Wallet Send Calls message to conversation: ${conversationId}`);
    console.log(`[XMTP V3] Content: ${content}`);
    console.log(`[XMTP V3] Transaction calls: ${walletCalls.calls.map(call => call.description).join(', ')}`);
    console.log('Note: XMTP V3 messaging implementation in progress');
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
    this.state.isConnected = false;
    console.log('DRIVR Agent disconnected from XMTP');
  }
}