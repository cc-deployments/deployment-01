// Test script for DRIVR Agent XMTP integration
import { DRIVRAgent } from './drivr-agent';
import { DRIVR_XMTP_CONFIG } from './config/drivr-xmtp-config';

async function testDRIVRAgent() {
  console.log('🧪 Testing DRIVR Agent XMTP Integration...\n');

  try {
    // Check configuration
    console.log('📋 Configuration Check:');
    console.log(`- XMTP Environment: ${DRIVR_XMTP_CONFIG.env}`);
    console.log(`- Private Key: ${DRIVR_XMTP_CONFIG.privateKey ? '✅ Set' : '❌ Missing'}`);
    console.log('');

    if (!DRIVR_XMTP_CONFIG.privateKey) {
      console.log('❌ DRIVR_AGENT_PRIVATE_KEY not set in environment variables');
      console.log('Please set your DRIVR agent private key in .env file');
      return;
    }

    // Create DRIVR agent instance
    const agent = new DRIVRAgent();
    
    // Test agent status
    console.log('📊 Agent Status:');
    const status = agent.getStatus();
    console.log(`- Running: ${status.isRunning ? '✅ Yes' : '❌ No'}`);
    console.log(`- Agent Name: ${status.config.AGENT_NAME}`);
    console.log(`- Basename: ${status.config.AGENT_BASENAME}`);
    console.log('');

    // Test message processing (without XMTP connection)
    console.log('💬 Testing Message Processing:');
    const testMessages = [
      'Hello DRIVR!',
      'Show me available NFTs',
      'Check current prices',
      'Find Woodie Wagon NFTs',
      'I want to buy an NFT'
    ];

    for (const message of testMessages) {
      console.log(`\nUser: ${message}`);
      const response = await agent.processTestMessage(message);
      console.log(`DRIVR: ${response.content.substring(0, 100)}...`);
      
      if (response.quickActions && response.quickActions.length > 0) {
        console.log(`Quick Actions: ${response.quickActions.length} available`);
      }
    }

    console.log('\n✅ DRIVR Agent test completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('1. Set up your DRIVR agent wallet');
    console.log('2. Configure XMTP environment variables');
    console.log('3. Start the agent with: npm run start');
    console.log('4. Test with real XMTP messages');

  } catch (error) {
    console.error('❌ DRIVR Agent test failed:', error);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDRIVRAgent().catch(console.error);
}

export { testDRIVRAgent };
