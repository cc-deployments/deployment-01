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
    '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', // CarMania ERC-721 (contains Surfing Woodie Wagon NFTs)
    '0x1c6d27a76f4f706cccb698acc236c31f886c5421', // CarMania ERC-1155
    '0x1839805916a9dcf0a4d88e6e043e8ae1b8dd865a', // CarMania ETH ERC-721
    '0xbcEAbF7b3c7b784589AFB411802c7c050c4dfc00', // CarMania ETH ERC-1155
  ],
  provenanceContractAddress: '0x0000000000000000000000000000000000000000',
  mintingContractAddress: '0x0000000000000000000000000000000000000000',
  communityContractAddress: '0x0000000000000000000000000000000000000000',
};

async function testPilotSystem() {
  try {
    console.log('🧪 Testing DRIVR PILOT System...');
    console.log('🏄‍♂️ PILOT: Surfing Woodie Wagon NFT Chat');
    
    // Create agent instance
    const agent = new DRIVRAgent(testConfig);
    
    // Test with a known address that might have CarMania NFTs
    const testAddress = '0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142'; // DRIVR wallet
    
    console.log(`\n🔍 Testing PILOT access for address: ${testAddress}`);
    console.log('📋 CarMania collection: 0x8ef0772347e0caed0119937175d7ef9636ae1aa0');
    
    // Test NFT verification
    const nftVerification = await agent.nftVerificationService.verifyNFTAccess(testAddress);
    
    console.log('\n📊 NFT Verification Results:');
    console.log('✅ Verification service working');
    console.log(`📍 Address: ${testAddress}`);
    console.log(`🎯 Has Access: ${nftVerification.hasAccess ? 'Yes' : 'No'}`);
    console.log(`🔐 Access Level: ${nftVerification.accessLevel}`);
    console.log(`🪙 Token IDs: ${nftVerification.tokenIds ? nftVerification.tokenIds.join(', ') : 'None'}`);
    
    if (nftVerification.error) {
      console.log(`⚠️ Error: ${nftVerification.error}`);
    }
    
    // Test PILOT service
    console.log('\n🏄‍♂️ Testing PILOT Service...');
    const pilotAccess = await agent.pilotService.checkPilotAccess(nftVerification);
    
    console.log(`🎯 PILOT Access: ${pilotAccess.hasPilotAccess ? 'GRANTED' : 'DENIED'}`);
    console.log(`🚗 Surfing Woodie NFTs: ${pilotAccess.surfingWoodieNFTs.length}`);
    
    if (pilotAccess.hasPilotAccess && pilotAccess.carData) {
      console.log('\n🚗 Car-Specific Data:');
      console.log(`   Model: ${pilotAccess.carData.carModel}`);
      console.log(`   Year: ${pilotAccess.carData.year}`);
      console.log(`   Color: ${pilotAccess.carData.color}`);
      console.log(`   Features: ${pilotAccess.carData.specialFeatures.join(', ')}`);
      
      // Test car-specific chat
      console.log('\n💬 Testing Car-Specific Chat...');
      const testMessages = [
        "Tell me about the history of this car",
        "What are the technical specs?",
        "What makes this car special?",
        "Tell me about surf culture",
        "What color is this car?"
      ];
      
      for (const message of testMessages) {
        const response = await agent.pilotService.generateCarSpecificResponse(
          message,
          pilotAccess.carData,
          pilotAccess.surfingWoodieNFTs[0]
        );
        console.log(`\n👤 User: ${message}`);
        console.log(`🤖 DRIVR: ${response}`);
      }
    } else {
      console.log('\n❌ No PILOT access - user needs Surfing Woodie Wagon NFT');
      console.log('📝 Note: SQL database integration needed to identify Surfing Woodie NFTs');
    }
    
    console.log('\n🎉 PILOT System Test Complete!');
    console.log('\n📝 Next Steps:');
    console.log('1. Add SQL database connection');
    console.log('2. Query database for Surfing Woodie Wagon NFTs');
    console.log('3. Test with actual Surfing Woodie Wagon NFT holders');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run test
testPilotSystem().catch(console.error);
