#!/usr/bin/env node

/**
 * Farcaster Manifest Generator
 * This script helps generate the accountAssociation credentials manually
 * 
 * Usage: node generate-manifest.js
 */

const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Farcaster Manifest Generator');
console.log('===============================\n');

console.log('📋 This script will help you generate manifest credentials manually.');
console.log('   You will need your Farcaster FID and a wallet to sign.\n');

console.log('Step 1: Enter your Farcaster details\n');

rl.question('Enter your Farcaster FID (e.g., 270170): ', (fid) => {
  rl.question('Enter your domain (e.g., carmania.carculture.com): ', (domain) => {
    rl.question('Enter your wallet address (0x...): ', (walletAddress) => {
      
      console.log('\n📝 Generating manifest structure...\n');
      
      // Generate the header (FID + wallet type + key)
      const header = {
        fid: parseInt(fid),
        type: "custody",
        key: walletAddress
      };
      
      // Generate the payload (domain)
      const payload = {
        domain: domain
      };
      
      // Convert to base64
      const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64');
      const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64');
      
      console.log('✅ Generated manifest structure:\n');
      console.log('📄 Header (base64):');
      console.log(headerB64);
      console.log('\n📄 Payload (base64):');
      console.log(payloadB64);
      console.log('\n⚠️  IMPORTANT: You still need to generate the signature!');
      console.log('\n📋 Next steps:');
      console.log('1. Copy the header and payload above');
      console.log('2. Use a tool like https://farcaster.xyz/domains to generate the signature');
      console.log('3. Or use MetaMask to sign a message with your wallet');
      console.log('4. Update your manifest with the complete credentials');
      
      console.log('\n🔑 Complete manifest structure:');
      console.log('```json');
      console.log('{');
      console.log('  "accountAssociation": {');
      console.log(`    "header": "${headerB64}",`);
      console.log(`    "payload": "${payloadB64}",`);
      console.log('    "signature": "YOUR_SIGNATURE_HERE"');
      console.log('  }');
      console.log('}');
      console.log('```');
      
      rl.close();
    });
  });
});

rl.on('close', () => {
  console.log('\n🔒 Remember: Keep your wallet secure and never share private keys!');
  process.exit(0);
});




