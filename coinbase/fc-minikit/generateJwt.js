const { generateJwt } = require("@coinbase/cdp-sdk/auth");

const main = async () => {
  try {
    const token = await generateJwt({
      apiKeyId: "9JY151QC1Ee2Lqe9FIxdBZCedpbYY80L",
      apiKeySecret: "h5phdZH53XSAAk/6fnyFfPmhHPANng2Q5XtSHkLN+BSDkGqIIOh3bI4TJPxxMIc/A8kot87sfznORnUBgrsIUQ==",
      requestMethod: "GET",
      requestHost: "api.developer.coinbase.com",
      requestPath: "/platform/v1/wallets",
      expiresIn: 120 // Token validity in seconds
    });

    console.log("Generated JWT Token:");
    console.log(token);
  } catch (error) {
    console.error("Error generating JWT:", error.message);
  }
};

main();
