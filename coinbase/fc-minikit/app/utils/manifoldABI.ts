// coinbase/fc-minikit/app/utils/manifoldABI.ts

// Manifold Edition Contract ABI for direct integration
export const MANIFOLD_EDITION_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "bytes", "name": "data", "type": "bytes"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "price",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "maxSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "uri",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Manifold Edition Contract Addresses
export const MANIFOLD_CONTRACTS = {
  '4149840112': '0x1c6d27a76f4f706cccb698acc236c31f886c5421', // Low Tide
  '4149807344': '0x1c6d27a76f4f706cccb698acc236c31f886c5421', // Flat Sea  
  '4144040176': '0x1c6d27a76f4f706cccb698acc236c31f886c5421', // Summertime Blues
  '4169097456': '0x1c6d27a76f4f706cccb698acc236c31f886c5421', // Test 9
} as const;

// Direct Manifold minting function using Base Cards
export async function mintManifoldEditionDirect(
  sdk: any, // Base Account SDK
  tokenId: string,
  buyerAddress: string,
  amount: number = 1
) {
  try {
    console.log('🎯 Direct Manifold Edition Minting:', {
      tokenId,
      buyerAddress,
      amount,
      contractAddress: MANIFOLD_CONTRACTS[tokenId as keyof typeof MANIFOLD_CONTRACTS]
    });

    const contractAddress = MANIFOLD_CONTRACTS[tokenId as keyof typeof MANIFOLD_CONTRACTS];
    
    if (!contractAddress) {
      throw new Error(`No contract address found for token ${tokenId}`);
    }

    // Get the Base Smart Wallet provider
    const provider = sdk.getProvider();
    
    // Get current price from contract
    const priceResponse = await provider.request({
      method: 'eth_call',
      params: [
        {
          to: contractAddress,
          data: '0x' + Buffer.from('price(uint256)', 'utf8').toString('hex') + 
                tokenId.padStart(64, '0')
        },
        'latest'
      ]
    });

    const price = BigInt(priceResponse);
    console.log(`💰 Token ${tokenId} price: ${price.toString()} wei`);

    // Prepare mint transaction
    const mintData = provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: contractAddress,
          value: '0x' + price.toString(16),
          data: '0x' + 
            // Function selector for mint(address,uint256,uint256)
            '0x731133e9' +
            // Encode parameters
            buyerAddress.slice(2).padStart(64, '0') +
            tokenId.padStart(64, '0') +
            amount.toString(16).padStart(64, '0')
        }
      ]
    });

    console.log('🚀 Minting transaction sent:', mintData);
    
    return {
      success: true,
      transactionHash: mintData,
      tokenId,
      buyerAddress,
      contractAddress,
      price: price.toString(),
      message: 'Direct Manifold minting successful'
    };

  } catch (error) {
    console.error('❌ Direct Manifold minting failed:', error);
    throw error;
  }
}

// Alternative: Use Base Cards for seamless minting
export async function mintWithBaseCards(
  sdk: any,
  tokenId: string,
  buyerAddress: string
) {
  try {
    console.log('🎯 Base Cards Manifold Integration:', {
      tokenId,
      buyerAddress
    });

    const contractAddress = MANIFOLD_CONTRACTS[tokenId as keyof typeof MANIFOLD_CONTRACTS];
    
    // Use Base Cards for transaction
    const result = await sdk.sendTransaction({
      to: contractAddress,
      value: '0', // Will be set by contract
      data: '0x' + 
        // Function selector for mint(address,uint256,uint256)
        '0x731133e9' +
        // Encode parameters
        buyerAddress.slice(2).padStart(64, '0') +
        tokenId.padStart(64, '0') +
        '0000000000000000000000000000000000000000000000000000000000000001' // amount = 1
    });

    console.log('✅ Base Cards minting successful:', result);
    
    return {
      success: true,
      transactionHash: result.hash,
      tokenId,
      buyerAddress,
      contractAddress,
      message: 'Base Cards minting successful'
    };

  } catch (error) {
    console.error('❌ Base Cards minting failed:', error);
    throw error;
  }
}








