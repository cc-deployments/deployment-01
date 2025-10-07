// Main DRIVR Agent with XMTP Integration
import { DRIVRXMTPService } from './services/drivr-xmtp-service';
import { DRIVR_XMTP_CONFIG, DRIVR_AGENT_CONFIG } from './config/drivr-xmtp-config';
import { DRIVRMessage, DRIVRResponse } from '../../../packages/shared-xmtp/src/types';

export class DRIVRAgent {
  private xmtpService: DRIVRXMTPService;
  private isRunning: boolean = false;

  constructor() {
    this.xmtpService = new DRIVRXMTPService(DRIVR_XMTP_CONFIG);
  }

  /**
   * Start the DRIVR agent
   */
  async start(): Promise<void> {
    try {
      console.log('🚀 Starting DRIVR Agent...');
      
      // Initialize XMTP service
      await this.xmtpService.initialize();
      
      this.isRunning = true;
      console.log('✅ DRIVR Agent started successfully');
      console.log(`📡 Agent Name: ${DRIVR_AGENT_CONFIG.AGENT_NAME}`);
      console.log(`🌐 Basename: ${DRIVR_AGENT_CONFIG.AGENT_BASENAME}`);
      console.log(`🔗 Network: ${DRIVR_AGENT_CONFIG.BASE_RPC_URL}`);
      
    } catch (error) {
      console.error('❌ Failed to start DRIVR Agent:', error);
      throw error;
    }
  }

  /**
   * Stop the DRIVR agent
   */
  async stop(): Promise<void> {
    try {
      console.log('🛑 Stopping DRIVR Agent...');
      
      await this.xmtpService.stop();
      this.isRunning = false;
      
      console.log('✅ DRIVR Agent stopped successfully');
    } catch (error) {
      console.error('❌ Failed to stop DRIVR Agent:', error);
      throw error;
    }
  }

  /**
   * Get agent status
   */
  getStatus(): { isRunning: boolean; config: typeof DRIVR_AGENT_CONFIG } {
    return {
      isRunning: this.isRunning,
      config: DRIVR_AGENT_CONFIG
    };
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
    if (!this.isRunning) {
      throw new Error('DRIVR Agent is not running');
    }

    await this.xmtpService.sendNotification(recipientAddress, notification);
  }

  /**
   * Process test message (for development)
   */
  async processTestMessage(message: string): Promise<DRIVRResponse> {
    const testMessage: DRIVRMessage = {
      id: `test-${Date.now()}`,
      senderAddress: 'test-user',
      content: message,
      timestamp: Date.now(),
      type: 'text',
    };

    // Simulate message processing
    return this.simulateMessageProcessing(testMessage);
  }

  /**
   * Simulate message processing for testing
   */
  private simulateMessageProcessing(message: DRIVRMessage): DRIVRResponse {
    const content = message.content.toLowerCase();

    if (content.includes('hello') || content.includes('hi')) {
      return {
        content: `Hello! I'm DRIVR, your CarCulture AI assistant! 🚗\n\nI can help you with automotive NFTs. What would you like to explore?`,
        quickActions: [
          {
            id: 'browse_nfts',
            label: 'Browse NFTs',
            action: 'browse_nfts',
            description: 'View available collections'
          }
        ]
      };
    }

    if (content.includes('nft')) {
      return {
        content: `I found some amazing automotive NFTs for you! 🎨\n\n**Featured Collections:**\n• CarMania Woodie Wagons\n• Classic Muscle Cars\n• Vintage Racing Cars`,
        quickActions: [
          {
            id: 'woodie_wagons',
            label: 'Woodie Wagons',
            action: 'show_woodie_wagons',
            description: 'View Woodie Wagon collection'
          }
        ]
      };
    }

    return {
      content: `I understand you're asking about "${message.content}". Let me help you with that!\n\nI'm DRIVR, your automotive NFT assistant. What specific aspect would you like to explore?`,
      quickActions: [
        {
          id: 'explore_nfts',
          label: 'Explore NFTs',
          action: 'explore_nfts',
          description: 'Browse available collections'
        }
      ]
    };
  }
}

// Export singleton instance
export const drivrAgent = new DRIVRAgent();

































