const { generateJwt } = require("@coinbase/cdp-sdk/auth");

const testAllAPIs = async () => {
const apiKeyId = "fb4934c8-ff4e-482c-b015-188c72a0223a";
const apiKeySecret = "WLEaZXvNkywJz61zE5pjNldado6hb5F0UEHtSeaI4dVZ2kFYiNYxiPURzWwD64hH9pUGgPF4tEdXP43LRoPwTw==";
  
  // List of APIs to test (from CDP Portal index)
  const apisToTest = [
    {
      name: "Wallets API",
      method: "GET",
      path: "/platform/v1/wallets",
      description: "List wallets"
    },
    {
      name: "Projects API", 
      method: "GET",
      path: "/platform/v1/projects",
      description: "List projects"
    },
    {
      name: "Project Details API",
      method: "GET", 
      path: "/platform/v1/projects/1cceb0e4-e690-40ac-8f3d-7d1f3da1417a",
      description: "Get specific project details"
    },
    {
      name: "Onramp Session Token API",
      method: "POST",
      path: "/onramp/v1/token",
      description: "Generate Onramp session token",
      body: {
        addresses: [{"address": "0x4315d134aCd3221a02dD380ADE3aF39Ce219037c", "blockchains": ["ethereum", "base"]}],
        clientIp: "127.0.0.1",
        assets: ["ETH", "USDC"]
      }
    },
    {
      name: "Onramp Buy Config API (CORRECTED)",
      method: "GET",
      path: "/onramp/v1/buy/config",
      description: "Get supported countries and currencies (corrected endpoint)"
    },
    {
      name: "Onramp Buy Options API",
      method: "GET", 
      path: "/onramp/v1/buy-options",
      description: "Get available buy options"
    },
    {
      name: "Onramp Quotes API",
      method: "POST",
      path: "/onramp/v1/quotes",
      description: "Generate Onramp quotes",
      body: {
        sourceCurrency: "USD",
        destinationCurrency: "ETH",
        amount: "100"
      }
    },
    {
      name: "Onramp Transaction Status API",
      method: "GET",
      path: "/onramp/v1/transactions/status",
      description: "Get transaction status"
    },
    {
      name: "Apple Pay Onramp API",
      method: "POST",
      path: "/onramp/v1/apple-pay",
      description: "Apple Pay Onramp integration",
      body: {
        amount: "10",
        currency: "USD"
      }
    },
    {
      name: "Offramp Session Token API (CORRECTED)",
      method: "POST", 
      path: "/onramp/v1/token",
      description: "Generate Offramp session token (same endpoint as Onramp)",
      body: {
        addresses: [{"address": "0x4315d134aCd3221a02dD380ADE3aF39Ce219037c", "blockchains": ["ethereum", "base"]}],
        clientIp: "127.0.0.1",
        assets: ["ETH", "USDC"]
      }
    },
    {
      name: "Offramp Quotes API (CORRECTED)",
      method: "POST",
      path: "/onramp/v1/sell/quote", 
      description: "Generate Offramp quotes (corrected endpoint)",
      body: {
        sourceCurrency: "ETH",
        destinationCurrency: "USD",
        amount: "0.1"
      }
    },
    {
      name: "Transfers API",
      method: "GET",
      path: "/platform/v1/transfers",
      description: "List transfers"
    },
    {
      name: "Server Wallet API",
      method: "GET",
      path: "/platform/v1/server-wallets",
      description: "List server wallets"
    },
    {
      name: "Embedded Wallet API",
      method: "GET", 
      path: "/platform/v1/embedded-wallets",
      description: "List embedded wallets"
    }
  ];

  console.log("🧪 Testing All CDP APIs\n");
  console.log("=" * 60);

  for (const api of apisToTest) {
    try {
      console.log(`\n🔍 Testing: ${api.name}`);
      console.log(`   Method: ${api.method} ${api.path}`);
      console.log(`   Description: ${api.description}`);
      
      // Generate JWT for this API
      const token = await generateJwt({
        apiKeyId: apiKeyId,
        apiKeySecret: apiKeySecret,
        requestMethod: api.method,
        requestHost: "api.developer.coinbase.com",
        requestPath: api.path,
        expiresIn: 120
      });

      // Prepare curl command
      let curlCmd = `curl -X ${api.method} "https://api.developer.coinbase.com${api.path}" \\\n`;
      curlCmd += `  -H "Authorization: Bearer ${token}" \\\n`;
      curlCmd += `  -H "Content-Type: application/json"`;
      
      if (api.body) {
        curlCmd += ` \\\n  -d '${JSON.stringify(api.body)}'`;
      }

      console.log(`   ✅ JWT Generated`);
      console.log(`   📋 Command: ${curlCmd.split('\n')[0]}...`);
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  console.log(`\n${"=" * 60}`);
  console.log("📝 Next Steps:");
  console.log("1. Run each curl command individually to test API access");
  console.log("2. Check which APIs return 200 vs 401/403");
  console.log("3. Focus on working APIs while waiting for approval on others");
};

testAllAPIs();


