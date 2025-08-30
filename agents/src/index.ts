// Main exports for Drivr Base App Chat Agent
export { DrivrAgent } from './carmania-agent';
export { XMTPService } from './services/xmtp-service';
export { NFTVerificationService } from './services/nft-verification';
export { IntentHandlerService } from './services/intent-handler';

// Types and interfaces
export type {
  CarManiaAgentConfig,
  XMTPMessage,
  AgentResponse,
  QuickAction,
  NFTVerificationResult,
  OpenSeaNFT,
  AgentState,
  ConversationState,
  Intent,
} from './types/agent';

// Configuration and utilities
export { config, validateConfig, getConfigForEnvironment } from './config';
export { testAgent } from './test-agent';

// Main entry point
import { DrivrAgent } from './carmania-agent';
import { config, validateConfig } from './config';

// Main function
async function main(): Promise<void> {
  try {
    console.log('🚗 Drivr Base App Chat Agent');
    console.log('================================');
    
    // Validate configuration
    validateConfig(config);
    console.log('✅ Configuration validated');
    
    // Create and start agent
    const agent = new DrivrAgent(config);
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Received SIGINT, shutting down gracefully...');
      await agent.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
      await agent.stop();
      process.exit(0);
    });
    
    // Start the agent
    await agent.start();
    
    // Keep the process running
    console.log('🔄 Agent is running. Press Ctrl+C to stop.');
    
  } catch (error) {
    console.error('❌ Failed to start Drivr Agent:', error);
    process.exit(1);
  }
}

// Start the agent if this file is run directly
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}
