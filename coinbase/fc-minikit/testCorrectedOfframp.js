const { generateJwt } = require("@coinbase/cdp-sdk/auth");

const testCorrectedOfframp = async () => {
  const apiKeyId = "fb4934c8-ff4e-482c-b015-188c72a0223a";
  const apiKeySecret = "WLEaZXvNkywJz61zE5pjNldado6hb5F0UEHtSeaI4dVZ2kFYiNYxiPURzWwD64hH9pUGgPF4tEdXP43LRoPwTw==";
  
  console.log("🧪 Testing CORRECTED Offramp Endpoints\n");
  console.log("=" * 60);

  // Test 1: Offramp Session Token (using same endpoint as Onramp)
  try {
    console.log("\n🔍 Test 1: Offramp Session Token (CORRECTED)");
    console.log("   Method: POST /onramp/v1/token");
    console.log("   Description: Generate Offramp session token using Onramp endpoint");
    
    const token1 = await generateJwt({
      apiKeyId: apiKeyId,
      apiKeySecret: apiKeySecret,
      requestMethod: "POST",
      requestHost: "api.developer.coinbase.com",
      requestPath: "/onramp/v1/token",
      expiresIn: 120
    });

    const curlCmd1 = `curl -X POST "https://api.developer.coinbase.com/onramp/v1/token" \\
  -H "Authorization: Bearer ${token1}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "addresses": [{"address": "0x4315d134aCd3221a02dD380ADE3aF39Ce219037c", "blockchains": ["ethereum", "base"]}],
    "clientIp": "127.0.0.1",
    "assets": ["ETH", "USDC"]
  }'`;

    console.log(`   ✅ JWT Generated`);
    console.log(`   📋 Command: ${curlCmd1.split('\n')[0]}...`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Offramp Quotes (using corrected sell/quote endpoint)
  try {
    console.log("\n🔍 Test 2: Offramp Quotes (CORRECTED)");
    console.log("   Method: POST /onramp/v1/sell/quote");
    console.log("   Description: Generate Offramp quotes using corrected endpoint");
    
    const token2 = await generateJwt({
      apiKeyId: apiKeyId,
      apiKeySecret: apiKeySecret,
      requestMethod: "POST",
      requestHost: "api.developer.coinbase.com",
      requestPath: "/onramp/v1/sell/quote",
      expiresIn: 120
    });

    const curlCmd2 = `curl -X POST "https://api.developer.coinbase.com/onramp/v1/sell/quote" \\
  -H "Authorization: Bearer ${token2}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceCurrency": "ETH",
    "destinationCurrency": "USD",
    "amount": "0.1"
  }'`;

    console.log(`   ✅ JWT Generated`);
    console.log(`   📋 Command: ${curlCmd2.split('\n')[0]}...`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: Onramp Buy Config (corrected countries endpoint)
  try {
    console.log("\n🔍 Test 3: Onramp Buy Config (CORRECTED)");
    console.log("   Method: GET /onramp/v1/buy/config");
    console.log("   Description: Get supported countries and currencies using corrected endpoint");
    
    const token3 = await generateJwt({
      apiKeyId: apiKeyId,
      apiKeySecret: apiKeySecret,
      requestMethod: "GET",
      requestHost: "api.developer.coinbase.com",
      requestPath: "/onramp/v1/buy/config",
      expiresIn: 120
    });

    const curlCmd3 = `curl -X GET "https://api.developer.coinbase.com/onramp/v1/buy/config" \\
  -H "Authorization: Bearer ${token3}" \\
  -H "Content-Type: application/json"`;

    console.log(`   ✅ JWT Generated`);
    console.log(`   📋 Command: ${curlCmd3.split('\n')[0]}...`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log(`\n${"=" * 60}`);
  console.log("📝 Next Steps:");
  console.log("1. Run each curl command individually to test API access");
  console.log("2. Check if corrected endpoints return 200 vs 404");
  console.log("3. Update CDP support ticket with results");
};

testCorrectedOfframp();

