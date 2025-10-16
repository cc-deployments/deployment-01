const { generateJwt } = require("@coinbase/cdp-sdk/auth");

const generateOnrampSessionToken = async () => {
  try {
    // First, generate JWT for session token creation
const token = await generateJwt({
  apiKeyId: "fb4934c8-ff4e-482c-b015-188c72a0223a",
  apiKeySecret: "WLEaZXvNkywJz61zE5pjNldado6hb5F0UEHtSeaI4dVZ2kFYiNYxiPURzWwD64hH9pUGgPF4tEdXP43LRoPwTw==",
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
