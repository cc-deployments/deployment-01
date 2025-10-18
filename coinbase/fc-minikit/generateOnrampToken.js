const { generateJwt } = require("@coinbase/cdp-sdk/auth");

const generateOnrampSessionToken = async () => {
  try {
    const apiKeySecret = process.env.CDP_API_KEY_SECRET;
    
    if (!apiKeySecret) {
      console.error("❌ CDP_API_KEY_SECRET environment variable is required");
      console.log("Please set CDP_API_KEY_SECRET in your environment or .env file");
      return;
    }
    
    // First, generate JWT for session token creation
const token = await generateJwt({
  apiKeyId: process.env.CDP_API_KEY_ID || "fb4934c8-ff4e-482c-b015-188c72a0223a",
  apiKeySecret: apiKeySecret,
  requestMethod: "POST",
  requestHost: "api.developer.coinbase.com",
  requestPath: "/onramp/v1/token",
  expiresIn: 120
});

    console.log("Generated JWT Token for Onramp Session:");
    console.log(token);
    
    // Now we can use this token to create a session
    const sessionData = {
      addresses: [
        {
          address: "0x4315d134aCd3221a02dD380ADE3aF39Ce219037c",
          blockchains: ["ethereum", "base"]
        }
      ],
      clientIp: "127.0.0.1", // For testing
      assets: ["ETH", "USDC"]
    };

    console.log("\nSession Data to POST:");
    console.log(JSON.stringify(sessionData, null, 2));
    
  } catch (error) {
    console.error("Error generating JWT:", error.message);
  }
};

generateOnrampSessionToken();
