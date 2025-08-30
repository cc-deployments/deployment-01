"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRIVRAgent = void 0;
const xmtp_service_1 = require("./services/xmtp-service");
const nft_verification_1 = require("./services/nft-verification");
const intent_handler_1 = require("./services/intent-handler");
const wallet_call_service_1 = require("./services/wallet-call-service");
class DRIVRAgent {
    constructor(config) {
        this.isRunning = false;
        this.config = config;
        this.xmtpService = new xmtp_service_1.XMTPService(config);
        this.nftVerificationService = new nft_verification_1.NFTVerificationService(config);
        this.intentHandlerService = new intent_handler_1.IntentHandlerService();
        this.walletCallService = new wallet_call_service_1.WalletCallService(config);
        // Register message handler
        this.xmtpService.registerMessageHandler('drivr-main', this.handleMessage.bind(this));
    }
    async start() {
        try {
            console.log('🚗 Starting DRIVR Agent...');
            // Initialize XMTP service
            await this.xmtpService.initialize();
            // Initialize NFT verification service
            console.log('✅ NFT verification service ready');
            this.isRunning = true;
            console.log(`🚀 DRIVR Agent is now running!`);
            console.log(`📍 Agent wallet: ${this.xmtpService.getState().walletAddress}`);
            console.log(`🎯 Supported collections: ${this.config.supportedCollections.join(', ')}`);
        }
        catch (error) {
            console.error('❌ Failed to start Drivr Agent:', error);
            throw error;
        }
    }
    async stop() {
        try {
            console.log('🛑 Stopping DRIVR Agent...');
            await this.xmtpService.disconnect();
            this.isRunning = false;
            console.log('✅ DRIVR Agent stopped');
        }
        catch (error) {
            console.error('❌ Error stopping DRIVR Agent:', error);
            throw error;
        }
    }
    async handleMessage(message) {
        try {
            console.log(`📨 Received message from ${message.senderAddress}: ${message.content}`);
            // Analyze user intent
            const intent = await this.intentHandlerService.analyzeIntent(message);
            console.log(`🧠 Intent detected: ${intent.type} (confidence: ${intent.confidence})`);
            // Verify NFT access
            const nftVerification = await this.nftVerificationService.verifyNFTAccess(message.senderAddress);
            console.log(`🔐 NFT verification: ${nftVerification.hasAccess ? 'Access granted' : 'No access'} (${nftVerification.accessLevel})`);
            // Generate response with Quick Actions and fallback text
            const response = this.intentHandlerService.generateResponse(intent, nftVerification);
            console.log(`💬 Generated response: ${response.content.substring(0, 100)}...`);
            // Send response with Quick Actions (includes fallback text automatically)
            if (response.quickActions && response.quickActions.actions.length > 0) {
                await this.xmtpService.replyWithQuickActions(message, response);
                console.log(`🔘 Quick Actions sent with fallback text`);
            }
            else {
                await this.xmtpService.replyToMessage(message, response.content);
                console.log(`📝 Text-only response sent`);
            }
            // Log quick actions if any
            if (response.quickActions && response.quickActions.actions.length > 0) {
                console.log(`🔘 Quick actions available: ${response.quickActions.actions.map(a => a.label).join(', ')}`);
            }
            // Log metadata
            console.log(`📊 Response metadata: NFT verified: ${response.metadata?.nftVerified}, Access level: ${response.metadata?.accessLevel}`);
        }
        catch (error) {
            console.error('❌ Error handling message:', error);
            // Send error message to user
            try {
                await this.xmtpService.replyToMessage(message, "Sorry, I encountered an error processing your message. Please try again or contact support if the issue persists.");
            }
            catch (replyError) {
                console.error('❌ Failed to send error message:', replyError);
            }
        }
    }
    async sendDirectMessage(userAddress, content) {
        try {
            await this.xmtpService.sendMessage(userAddress, content);
            console.log(`📤 Direct message sent to ${userAddress}`);
        }
        catch (error) {
            console.error('❌ Failed to send direct message:', error);
            throw error;
        }
    }
    async getActionById(actionId) {
        return this.intentHandlerService.getActionById(actionId);
    }
    async executeAction(actionId, userAddress) {
        try {
            const action = await this.getActionById(actionId);
            if (!action) {
                throw new Error(`Action not found: ${actionId}`);
            }
            console.log(`🔘 Executing action: ${action.label} for user ${userAddress}`);
            // Handle different action types based on action ID
            if (action.id.includes('mint_nft')) {
                await this.handleMintAction(action, userAddress);
            }
            else if (action.id.includes('view_gallery')) {
                await this.handleGalleryAction(action, userAddress);
            }
            else if (action.id.includes('join_community')) {
                await this.handleCommunityAction(action, userAddress);
            }
            else if (action.id.includes('custom_action')) {
                await this.handleCustomAction(action, userAddress);
            }
            else {
                console.warn(`⚠️ Unknown action type: ${action.id}`);
            }
        }
        catch (error) {
            console.error('❌ Error executing action:', error);
            throw error;
        }
    }
    /**
     * Handle car story submission from NFT holder
     * This creates a wallet call for storing provenance on-chain
     */
    async handleCarStorySubmission(userAddress, carStory) {
        try {
            console.log(`📝 Processing car story submission from ${userAddress}`);
            // Verify user has NFT access
            const nftVerification = await this.nftVerificationService.verifyNFTAccess(userAddress);
            if (!nftVerification.hasAccess) {
                await this.xmtpService.sendDirectMessage(userAddress, "You need to own a CarMania NFT to submit car stories. Get your NFT first!");
                return;
            }
            // Get the user's NFT token ID (first one found)
            const tokenId = nftVerification.tokenIds?.[0];
            const collectionAddress = this.config.supportedCollections[0]; // Use first supported collection
            if (!tokenId) {
                await this.xmtpService.sendDirectMessage(userAddress, "Unable to verify your NFT. Please try again or contact support.");
                return;
            }
            // Create wallet call for storing car story
            const walletCalls = await this.walletCallService.createCarStoryTransaction(userAddress, carStory, tokenId, collectionAddress);
            // Send wallet call message to user
            const message = `🚗 Car Story Submission Ready!\n\n` +
                `Title: ${carStory.title}\n` +
                `Car: ${carStory.carDetails.year} ${carStory.carDetails.make} ${carStory.carDetails.model}\n` +
                `NFT: #${tokenId}\n\n` +
                `I've prepared a transaction to store your car story on-chain. ` +
                `Click the transaction button below to submit it to the blockchain.`;
            await this.xmtpService.sendMessageWithWalletCalls(userAddress, message, walletCalls);
            console.log(`✅ Car story wallet call sent to ${userAddress} for NFT #${tokenId}`);
        }
        catch (error) {
            console.error('❌ Error handling car story submission:', error);
            await this.xmtpService.sendDirectMessage(userAddress, "Sorry, I encountered an error processing your car story. Please try again.");
        }
    }
    async handleMintAction(action, userAddress) {
        // Verify user has access to mint
        const nftVerification = await this.nftVerificationService.verifyNFTAccess(userAddress);
        if (!nftVerification.hasAccess || nftVerification.accessLevel === 'basic') {
            await this.sendDirectMessage(userAddress, "You need premium or VIP access to mint NFTs. Get a CarMania NFT first!");
            return;
        }
        const tier = action.id.includes('premium') ? 'premium' : 'vip';
        await this.sendDirectMessage(userAddress, `Great! You have ${tier} access and can mint NFTs. I'll send you the minting interface shortly.`);
        // Here you would integrate with your minting contract
        console.log(`🎨 Minting action triggered for ${tier} tier user ${userAddress}`);
    }
    async handleGalleryAction(action, userAddress) {
        // Generate gallery URL based on action ID
        let galleryUrl = 'https://carmania.carculture.com/gallery';
        if (action.id.includes('premium')) {
            galleryUrl = 'https://carmania.carculture.com/premium-gallery';
        }
        else if (action.id.includes('vip')) {
            galleryUrl = 'https://carmania.carculture.com/vip-gallery';
        }
        await this.sendDirectMessage(userAddress, `Here's your gallery access: ${galleryUrl}\n\nEnjoy exploring the CarMania collection! 🚗✨`);
    }
    async handleCommunityAction(action, userAddress) {
        // Generate community URL based on action ID
        let communityUrl = 'https://discord.gg/carculture';
        if (action.id.includes('premium')) {
            communityUrl = 'https://discord.gg/carculture-premium';
        }
        else if (action.id.includes('vip')) {
            communityUrl = 'https://discord.gg/carculture-vip';
        }
        await this.sendDirectMessage(userAddress, `Welcome to the CarMania community! Join us here: ${communityUrl}\n\nWe're excited to have you! 🚗💪`);
    }
    async handleCustomAction(action, userAddress) {
        // Handle custom VIP actions
        await this.sendDirectMessage(userAddress, "You have VIP access! I'll connect you with our VIP concierge service shortly. 🎉");
        console.log(`🌟 Custom VIP action triggered for user ${userAddress}`);
    }
    getState() {
        return this.xmtpService.getState();
    }
    isAgentRunning() {
        return this.isRunning;
    }
    getConfig() {
        return { ...this.config };
    }
    async refreshNFTCache() {
        this.nftVerificationService.clearCache();
        console.log('🔄 NFT verification cache cleared');
    }
    getNFTCacheStats() {
        return this.nftVerificationService.getCacheStats();
    }
    // Legacy method for backward compatibility
    async getQuickActionById(actionId) {
        return this.getActionById(actionId);
    }
    async executeQuickAction(actionId, userAddress) {
        return this.executeAction(actionId, userAddress);
    }
}
exports.DRIVRAgent = DRIVRAgent;
//# sourceMappingURL=carmania-agent.js.map