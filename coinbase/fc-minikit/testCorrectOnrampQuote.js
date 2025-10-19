const { generateJwt } = require("@coinbase/cdp-sdk/auth");

const testCorrectOnrampQuote = async () => {
  const apiKeyId = process.env.CDP_API_KEY_ID || "fb4934c8-ff4e-482c-b015-188c72a0223a";
  const apiKeySecret = process.env.CDP_API_KEY_SECRET;

  if (!apiKeySecret) {
    console.error("❌ CDP_API_KEY_SECRET environment variable is required");
    console.log("Please set CDP_API_KEY_SECRET in your environment or .env file");
    return;
  }

  console.log("🧪 Testing CORRECT Onramp Quote Endpoint from CDP Support");
  console.log("=" * 60);

  try {
    // Generate JWT for the correct endpoint
    const token = await generateJwt({
      apiKeyId: apiKeyId,
      apiKeySecret: apiKeySecret,
      requestMethod: "POST",
      requestHost: "api.developer.coinbase.com",
      requestPath: "/onramp/v1/buy/quote",
      expiresIn: 120
    });

    console.log("✅ JWT Generated successfully");
    console.log(`Token: ${token.substring(0, 50)}...`);

    // Prepare the request body for quote generation
    const quoteData = {
      sourceCurrency: "USD",
      destinationCurrency: "ETH", 
      amount: "100",
      country: "US" // CDP mentioned country param is required
    };

    console.log("\n📋 Quote Request Data:");
    console.log(JSON.stringify(quoteData, null, 2));

    // Generate curl command
    const curlCmd = `curl -X POST "https://api.developer.coinbase.com/onramp/v1/buy/quote" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(quoteData)}'`;

    console.log("\n🔧 Curl Command:");
    console.log(curlCmd);

    console.log("\n📝 Next Steps:");
    console.log("1. Run the curl command above to test the endpoint");
    console.log("2. Check if it returns 200 OK or error");
    console.log("3. Compare with our previous /onramp/v1/quotes attempts");

  } catch (error) {
    console.error("❌ Error generating JWT:", error.message);
  }
};

testCorrectOnrampQuote();

