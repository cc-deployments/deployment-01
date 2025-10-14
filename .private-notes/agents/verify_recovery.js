const { ethers } = require('ethers');

// Function to verify recovery phrase
function verifyRecoveryPhrase(mnemonic, expectedAddress) {
  try {
    // Create wallet from mnemonic
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    
    console.log('Recovery phrase verification:');
    console.log('============================');
    console.log('Derived address:', wallet.address);
    console.log('Expected address:', expectedAddress);
    console.log('Match:', wallet.address.toLowerCase() === expectedAddress.toLowerCase());
    
    // Try different derivation paths
    console.log('\nTrying different derivation paths:');
    console.log('==================================');
    
    const derivationPaths = [
      "m/44'/60'/0'/0/0",
      "m/44'/60'/0'/0/1", 
      "m/44'/60'/0'/0/2",
      "m/44'/60'/1'/0/0",
      "m/44'/60'/1'/0/1"
    ];
    
    derivationPaths.forEach((path, index) => {
      try {
        const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
        const derivedWallet = hdNode.derivePath(path);
        console.log(`Path ${path}: ${derivedWallet.address}`);
        if (derivedWallet.address.toLowerCase() === expectedAddress.toLowerCase()) {
          console.log(`✅ FOUND MATCH at path: ${path}`);
        }
      } catch (error) {
        console.log(`Path ${path}: Error - ${error.message}`);
      }
    });
    
  } catch (error) {
    console.error('Error verifying recovery phrase:', error.message);
  }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node verify_recovery.js "your recovery phrase" "expected address"');
  console.log('Example: node verify_recovery.js "word1 word2 word3..." "0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142"');
  process.exit(1);
}

const mnemonic = args[0];
const expectedAddress = args[1];

verifyRecoveryPhrase(mnemonic, expectedAddress);


