// Utility functions for Manifold contract interaction

export interface ManifoldNFTInfo {
  contractAddress: string;
  tokenId: string;
  url: string;
  price?: number;
  currency?: 'ETH' | 'USDC';
}

/**
 * Extract contract address and token ID from Manifold URL
 * Format: https://manifold.xyz/@username/id/[TOKEN_ID]
 */
export function parseManifoldURL(url: string): ManifoldNFTInfo | null {
  try {
    const urlObj = new URL(url);
    
    // Check if it's a Manifold URL
    if (!urlObj.hostname.includes('manifold.xyz')) {
      return null;
    }
    
    // Extract token ID from path like /@username/id/TOKEN_ID
    const pathMatch = urlObj.pathname.match(/\/@[^\/]+\/id\/(\d+)/);
    if (!pathMatch) {
      return null;
    }
    
    const tokenId = pathMatch[1];
    
    // For now, we'll use a placeholder contract address
    // In a real implementation, you'd need to query Manifold's API
    // to get the actual contract address for each token
    const contractAddress = '0x8ef0772347e0caed0119937175d7ef9636ae1aa0'; // Base ERC-721 contract
    
    return {
      contractAddress,
      tokenId,
      url,
      price: 1.0, // Default price in USDC
      currency: 'USDC'
    };
  } catch (error) {
    console.error('Error parsing Manifold URL:', error);
    return null;
  }
}

/**
 * Create proper ABI-encoded data for Manifold contract interaction
 * This is a simplified version - real implementation would need
 * to query the actual contract ABI
 */
export function createManifoldPurchaseData(
  contractAddress: string,
  tokenId: string,
  buyerAddress: string,
  price: string
): string {
  // For Manifold contracts, we typically need to call a purchase function
  // The exact function signature depends on the contract
  
  // Helper function to pad hex values
  const padHex = (value: string, length: number = 64) => {
    const hex = value.startsWith('0x') ? value.slice(2) : value;
    return hex.padStart(length, '0');
  };

  // Helper function to encode address
  const encodeAddress = (address: string) => {
    return address.toLowerCase().replace('0x', '').padStart(64, '0');
  };

  // Helper function to encode uint256
  const encodeUint256 = (value: string) => {
    const hex = BigInt(value).toString(16);
    return hex.padStart(64, '0');
  };

  // For now, we'll use a simplified approach
  // In reality, you'd need to:
  // 1. Query the contract ABI
  // 2. Encode the proper function call
  // 3. Handle different contract types (ERC-721 vs ERC-1155)
  
  // Placeholder: purchase function with tokenId and buyer
  const functionSelector = '0x' + 'purchase(uint256,address)'.slice(0, 8); // Simplified
  const encodedTokenId = encodeUint256(tokenId);
  const encodedBuyer = encodeAddress(buyerAddress);
  
  return `0x${encodedTokenId}${encodedBuyer}`;
}

/**
 * Get Manifold contract ABI for common functions
 * This is a simplified version - real implementation would fetch from contract
 */
export const MANIFOLD_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "purchase",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"internalType": "address", "name": "to", "type": "address"}
    ],
    "name": "purchaseTo",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "price",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

/**
 * Test data for CarMania NFTs
 */
export const CARMANIA_NFTS: ManifoldNFTInfo[] = [
  {
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169111792',
    url: 'https://manifold.xyz/@carculture/id/4169111792',
    price: 1.0,
    currency: 'USDC'
  },
  {
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169128176',
    url: 'https://manifold.xyz/@carculture/id/4169128176',
    price: 1.0,
    currency: 'USDC'
  },
  {
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4169124080',
    url: 'https://manifold.xyz/@carculture/id/4169124080',
    price: 1.0,
    currency: 'USDC'
  }
];

