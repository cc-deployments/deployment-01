const { DRIVRAgent } = require('./dist/carmania-agent');

// Test with real configuration
const testConfig = {
  walletPrivateKey: process.env.CARMANIA_AGENT_PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000',
  env: 'production',
  openseaApiKey: process.env.OPENSEA_API_KEY || 'test_key',
  baseRpcUrl: 'https://mainnet.base.org',
  openseaBaseUrl: 'https://api.opensea.io',
  openseaApiEndpoint: '/api/v1',
  supportedCollections: [
    '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', // CarMania ERC-721
    '0x1c6d27a76f4f706cccb698acc236c31f886c5421', // CarMania ERC-1155
    '0x1839805916a9dcf0a4d88e6e043e8ae1b8dd865a', // CarMania ETH ERC-721
    '0xbcEAbF7b3c7b784589AFB411802c7c050c4dfc00', // CarMania ETH ERC-1155
  ],
  provenanceContractAddress: '0x0000000000000000000000000000000000000000',
  mintingContractAddress: '0x0000000000000000000000000000000000000000',
  communityContractAddress: '0x0000000000000000000000000000000000000000',
};

async function testNFTVerification() {
  try {
    console.log('🧪 Testing DRIVR NFT Verification...');
    
    // Create agent instance
    const agent = new DRIVRAgent(testConfig);
    
    // Test with a known address that might have NFTs
    const testAddress = '0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142'; // DRIVR wallet
    
    console.log(`\n🔍 Testing NFT verification for address: ${testAddress}`);
    console.log('📋 Supported collections:', testConfig.supportedCollections);
    
    // Test NFT verification
    const nftVerification = await agent.nftVerificationService.verifyNFTAccess(testAddress);
    
    console.log('\n📊 NFT Verification Results:');
    console.log('✅ Verification service working');
    console.log(`📍 Address: ${testAddress}`);
    console.log(`🎯 Has Access: ${nftVerification.hasAccess ? 'Yes' : 'No'}`);
    console.log(`🔐 Access Level: ${nftVerification.accessLevel}`);
    
    if (nftVerification.error) {
      console.log(`⚠️ Error: ${nftVerification.error}`);
    }
    
    // Test intent handling
    console.log('\n🧠 Testing Intent Handler...');
    const testMessage = "I want to view my CarMania NFTs";
    const intent = await agent.intentHandlerService.processIntent(testMessage);
    console.log(`📝 Intent: ${intent.type}`);
    console.log(`🎯 Confidence: ${intent.confidence}`);
    console.log(`📋 Entities: ${JSON.stringify(intent.entities)}`);
    
    console.log('\n🎉 NFT Verification Test Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run test
testNFTVerification().catch(console.error);
