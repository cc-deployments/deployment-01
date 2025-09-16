"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMTPService = void 0;
const ethers_1 = require("ethers");
class XMTPService {
    constructor(config) {
        this.client = null;
        this.wallet = null;
        this.messageHandlers = new Map();
        this.config = config;
        this.state = {
            isConnected: false,
            walletAddress: '',
            conversations: new Map(),
            nftCache: new Map(),
        };
    }
    async initialize() {
        try {
            // Initialize wallet with proper address validation
            this.wallet = new ethers_1.ethers.Wallet(this.config.walletPrivateKey);
            this.state.walletAddress = this.wallet.address;
            // Validate address format for XMTP
            if (!ethers_1.ethers.isAddress(this.state.walletAddress)) {
                throw new Error(`Invalid wallet address: ${this.state.walletAddress}`);
            }
            console.log(`DRIVR Agent wallet address: ${this.wallet.address}`);
            console.log('XMTP V3 client initialization - working on proper integration');
            // For now, mark as connected without full XMTP initialization
            // This allows us to test the agent structure while we work on V3 API integration
            this.state.isConnected = true;
            console.log(`DRIVR Agent initialized with wallet: ${this.wallet.address}`);
            console.log('Note: XMTP V3 integration is in progress - messaging features will be added soon');
        }
        catch (error) {
            console.error('Failed to initialize XMTP service:', error);
            throw error;
        }
    }
    async startMessageListener() {
        console.log('Message listener setup - XMTP V3 integration in progress');
    }
    // Handle incoming messages with V3 API
    async handleMessage(message) {
        console.log('Received message:', message);
        // TODO: Implement proper message handling for V3 API
    }
    async sendMessage(conversationId, content) {
        console.log(`[XMTP V3] Sending message to conversation: ${conversationId}`);
        console.log(`[XMTP V3] Message content: ${content}`);
        console.log('Note: XMTP V3 messaging implementation in progress');
    }
    // Send direct message to user address
    async sendDirectMessage(userAddress, content) {
        console.log(`[XMTP V3] Sending direct message to: ${userAddress}`);
        console.log(`[XMTP V3] Message content: ${content}`);
        console.log('Note: XMTP V3 messaging implementation in progress');
    }
    async replyToMessage(message, content) {
        await this.sendMessage(message.conversationId, content);
    }
    // New method: Send message with Quick Actions content type (BASE AI implementation)
    async sendMessageWithQuickActions(conversationId, response) {
        console.log(`[XMTP V3] Sending Quick Actions message to conversation: ${conversationId}`);
        console.log(`[XMTP V3] Response content: ${response.content}`);
        if (response.quickActions) {
            console.log(`[XMTP V3] Quick Actions: ${JSON.stringify(response.quickActions)}`);
        }
        console.log('Note: XMTP V3 messaging implementation in progress');
    }
    // Enhanced reply method that supports Quick Actions
    async replyWithQuickActions(message, response) {
        await this.sendMessageWithQuickActions(message.conversationId, response);
    }
    // New method: Send message with Wallet Send Calls content type
    async sendMessageWithWalletCalls(conversationId, content, walletCalls) {
        console.log(`[XMTP V3] Sending Wallet Send Calls message to conversation: ${conversationId}`);
        console.log(`[XMTP V3] Content: ${content}`);
        console.log(`[XMTP V3] Transaction calls: ${walletCalls.calls.map(call => call.description).join(', ')}`);
        console.log('Note: XMTP V3 messaging implementation in progress');
    }
    // Enhanced reply method that supports Wallet Calls
    async replyWithWalletCalls(message, content, walletCalls) {
        await this.sendMessageWithWalletCalls(message.conversationId, content, walletCalls);
    }
    registerMessageHandler(id, handler) {
        this.messageHandlers.set(id, handler);
    }
    unregisterMessageHandler(id) {
        this.messageHandlers.delete(id);
    }
    getState() {
        return { ...this.state };
    }
    async disconnect() {
        this.state.isConnected = false;
        console.log('DRIVR Agent disconnected from XMTP');
    }
}
exports.XMTPService = XMTPService;
//# sourceMappingURL=xmtp-service.js.map