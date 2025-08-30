import { XMTPService } from './services/xmtp-service';
import { NFTVerificationService } from './services/nft-verification';
import { IntentHandlerService } from './services/intent-handler';
import { 
  CarManiaAgentConfig, 
  XMTPMessage, 
  AgentResponse, 
  AgentState,
  Action 
} from './types/agent';

export class DrivrAgent {
  private xmtpService: XMTPService;
  private nftVerificationService: NFTVerificationService;
  private intentHandlerService: IntentHandlerService;
  private config: CarManiaAgentConfig;
  private isRunning: boolean = false;

  constructor(config: CarManiaAgentConfig) {
    this.config = config;
    this.xmtpService = new XMTPService(config);
    this.nftVerificationService = new NFTVerificationService(config);
    this.intentHandlerService = new IntentHandlerService();
    
    // Register message handler
    this.xmtpService.registerMessageHandler('drivr-main', this.handleMessage.bind(this));
  }

  async start(): Promise<void> {
    try {
      console.log('🚗 Starting Drivr Agent...');
      
      // Initialize XMTP service
      await this.xmtpService.initialize();
      
      // Initialize NFT verification service
      console.log('✅ NFT verification service ready');
      
      this.isRunning = true;
      console.log(`🚀 Drivr Agent is now running!`);
      console.log(`📍 Agent wallet: ${this.xmtpService.getState().walletAddress}`);
      console.log(`🎯 Supported collections: ${this.config.supportedCollections.join(', ')}`);
      
    } catch (error) {
      console.error('❌ Failed to start Drivr Agent:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      console.log('🛑 Stopping Drivr Agent...');
      
      await this.xmtpService.disconnect();
      this.isRunning = false;
      
      console.log('✅ Drivr Agent stopped');
    } catch (error) {
      console.error('❌ Error stopping Drivr Agent:', error);
      throw error;
    }
  }

  private async handleMessage(message: XMTPMessage): Promise<void> {
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
      } else {
        await this.xmtpService.replyToMessage(message, response.content);
        console.log(`📝 Text-only response sent`);
      }
      
      // Log quick actions if any
      if (response.quickActions && response.quickActions.actions.length > 0) {
        console.log(`🔘 Quick actions available: ${response.quickActions.actions.map(a => a.label).join(', ')}`);
      }
      
      // Log metadata
      console.log(`📊 Response metadata: NFT verified: ${response.metadata?.nftVerified}, Access level: ${response.metadata?.accessLevel}`);
      
    } catch (error) {
      console.error('❌ Error handling message:', error);
      
      // Send error message to user
      try {
        await this.xmtpService.replyToMessage(message, 
          "Sorry, I encountered an error processing your message. Please try again or contact support if the issue persists."
        );
      } catch (replyError) {
        console.error('❌ Failed to send error message:', replyError);
      }
    }
  }

  async sendDirectMessage(userAddress: string, content: string): Promise<void> {
    try {
      await this.xmtpService.sendMessage(userAddress, content);
      console.log(`📤 Direct message sent to ${userAddress}`);
    } catch (error) {
      console.error('❌ Failed to send direct message:', error);
      throw error;
    }
  }

  async getActionById(actionId: string): Promise<Action | null> {
    return this.intentHandlerService.getActionById(actionId);
  }

  async executeAction(actionId: string, userAddress: string): Promise<void> {
    try {
      const action = await this.getActionById(actionId);
      if (!action) {
        throw new Error(`Action not found: ${actionId}`);
      }

      console.log(`🔘 Executing action: ${action.label} for user ${userAddress}`);

      // Handle different action types based on action ID
      if (action.id.includes('mint_nft')) {
        await this.handleMintAction(action, userAddress);
      } else if (action.id.includes('view_gallery')) {
        await this.handleGalleryAction(action, userAddress);
      } else if (action.id.includes('join_community')) {
        await this.handleCommunityAction(action, userAddress);
      } else if (action.id.includes('custom_action')) {
        await this.handleCustomAction(action, userAddress);
      } else {
        console.warn(`⚠️ Unknown action type: ${action.id}`);
      }

    } catch (error) {
      console.error('❌ Error executing action:', error);
      throw error;
    }
  }

  private async handleMintAction(action: Action, userAddress: string): Promise<void> {
    // Verify user has access to mint
    const nftVerification = await this.nftVerificationService.verifyNFTAccess(userAddress);
    
    if (!nftVerification.hasAccess || nftVerification.accessLevel === 'basic') {
      await this.sendDirectMessage(userAddress, 
        "You need premium or VIP access to mint NFTs. Get a CarMania NFT first!"
      );
      return;
    }

    const tier = action.id.includes('premium') ? 'premium' : 'vip';
    await this.sendDirectMessage(userAddress, 
      `Great! You have ${tier} access and can mint NFTs. I'll send you the minting interface shortly.`
    );
    
    // Here you would integrate with your minting contract
    console.log(`🎨 Minting action triggered for ${tier} tier user ${userAddress}`);
  }

  private async handleGalleryAction(action: Action, userAddress: string): Promise<void> {
    // Generate gallery URL based on action ID
    let galleryUrl = 'https://carmania.carculture.com/gallery';
    
    if (action.id.includes('premium')) {
      galleryUrl = 'https://carmania.carculture.com/premium-gallery';
    } else if (action.id.includes('vip')) {
      galleryUrl = 'https://carmania.carculture.com/vip-gallery';
    }

    await this.sendDirectMessage(userAddress, 
      `Here's your gallery access: ${galleryUrl}\n\nEnjoy exploring the CarMania collection! 🚗✨`
    );
  }

  private async handleCommunityAction(action: Action, userAddress: string): Promise<void> {
    // Generate community URL based on action ID
    let communityUrl = 'https://discord.gg/carculture';
    
    if (action.id.includes('premium')) {
      communityUrl = 'https://discord.gg/carculture-premium';
    } else if (action.id.includes('vip')) {
      communityUrl = 'https://discord.gg/carculture-vip';
    }

    await this.sendDirectMessage(userAddress, 
      `Welcome to the CarMania community! Join us here: ${communityUrl}\n\nWe're excited to have you! 🚗💪`
    );
  }

  private async handleCustomAction(action: Action, userAddress: string): Promise<void> {
    // Handle custom VIP actions
    await this.sendDirectMessage(userAddress, 
      "You have VIP access! I'll connect you with our VIP concierge service shortly. 🎉"
    );
    
    console.log(`🌟 Custom VIP action triggered for user ${userAddress}`);
  }

  getState(): AgentState {
    return this.xmtpService.getState();
  }

  isAgentRunning(): boolean {
    return this.isRunning;
  }

  getConfig(): CarManiaAgentConfig {
    return { ...this.config };
  }

  async refreshNFTCache(): Promise<void> {
    this.nftVerificationService.clearCache();
    console.log('🔄 NFT verification cache cleared');
  }

  getNFTCacheStats(): { size: number; entries: string[] } {
    return this.nftVerificationService.getCacheStats();
  }

  // Legacy method for backward compatibility
  async getQuickActionById(actionId: string): Promise<Action | null> {
    return this.getActionById(actionId);
  }

  async executeQuickAction(actionId: string, userAddress: string): Promise<void> {
    return this.executeAction(actionId, userAddress);
  }
}
