import { ethers } from 'ethers';
import { NFTVerificationResult, OpenSeaNFT, CarManiaAgentConfig } from '../types/agent';

export class NFTVerificationService {
  private config: CarManiaAgentConfig;
  private provider: ethers.JsonRpcProvider;
  private cache: Map<string, NFTVerificationResult> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(config: CarManiaAgentConfig) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(config.baseRpcUrl);
  }

  async verifyNFTAccess(userAddress: string): Promise<NFTVerificationResult> {
    const cacheKey = `${userAddress}_${Date.now()}`;
    
    // Check cache first
    const cached = this.getCachedResult(userAddress);
    if (cached) {
      return cached;
    }

    try {
      const result = await this.performNFTCheck(userAddress);
      
      // Cache the result
      this.cache.set(userAddress, result);
      this.cacheExpiry.set(userAddress, Date.now() + this.CACHE_DURATION);
      
      return result;
    } catch (error) {
      console.error('NFT verification failed:', error);
      return {
        hasAccess: false,
        accessLevel: 'basic',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async performNFTCheck(userAddress: string): Promise<NFTVerificationResult> {
    const results: NFTVerificationResult[] = [];

    // Check each supported collection
    for (const collectionAddress of this.config.supportedCollections) {
      try {
        const collectionResult = await this.checkCollection(userAddress, collectionAddress);
        if (collectionResult.hasAccess) {
          results.push(collectionResult);
        }
      } catch (error) {
        console.warn(`Failed to check collection ${collectionAddress}:`, error);
      }
    }

    // Determine highest access level
    if (results.length === 0) {
      return {
        hasAccess: false,
        accessLevel: 'basic',
      };
    }

    const highestLevel = this.getHighestAccessLevel(results);
    const allTokenIds = results.flatMap(r => r.tokenIds || []);
    const collectionNames = results.map(r => r.collectionName).filter(Boolean);

    return {
      hasAccess: true,
      accessLevel: highestLevel,
      tokenIds: allTokenIds,
      collectionName: collectionNames.join(', '),
    };
  }

  private async checkCollection(userAddress: string, collectionAddress: string): Promise<NFTVerificationResult> {
    try {
      // ERC-721 balance check
      const balance = await this.getERC721Balance(userAddress, collectionAddress);
      
      if (balance > 0) {
        // Get token IDs
        const tokenIds = await this.getTokenIds(userAddress, collectionAddress, balance);
        
        // Get collection metadata from OpenSea
        const collectionMetadata = await this.getOpenSeaCollectionMetadata(collectionAddress);
        
        return {
          hasAccess: true,
          collectionName: collectionMetadata.name,
          tokenIds: tokenIds,
          accessLevel: this.determineAccessLevel(collectionMetadata),
        };
      }

      return {
        hasAccess: false,
        accessLevel: 'basic',
      };
    } catch (error) {
      console.error(`Error checking collection ${collectionAddress}:`, error);
      return {
        hasAccess: false,
        accessLevel: 'basic',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async getERC721Balance(userAddress: string, contractAddress: string): Promise<bigint> {
    try {
      // ERC-721 balanceOf function
      const contract = new ethers.Contract(
        contractAddress,
        ['function balanceOf(address owner) view returns (uint256)'],
        this.provider
      );
      
      return await contract.balanceOf(userAddress);
    } catch (error) {
      console.error('Failed to get ERC-721 balance:', error);
      return BigInt(0);
    }
  }

  private async getTokenIds(userAddress: string, contractAddress: string, balance: bigint): Promise<string[]> {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        [
          'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
        ],
        this.provider
      );

      const tokenIds: string[] = [];
      const balanceNumber = Number(balance);

      for (let i = 0; i < balanceNumber; i++) {
        try {
          const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
          tokenIds.push(tokenId.toString());
        } catch (error) {
          console.warn(`Failed to get token ID at index ${i}:`, error);
        }
      }

      return tokenIds;
    } catch (error) {
      console.error('Failed to get token IDs:', error);
      return [];
    }
  }

  private async getOpenSeaCollectionMetadata(contractAddress: string): Promise<any> {
    try {
      const response = await fetch(
        `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`,
        {
          headers: {
            'X-API-KEY': this.config.openSeaApiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`OpenSea API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        name: data.collection?.name || 'Unknown Collection',
        description: data.collection?.description || '',
        externalUrl: data.collection?.external_url || '',
        imageUrl: data.collection?.image_url || '',
      };
    } catch (error) {
      console.error('Failed to fetch OpenSea collection metadata:', error);
      return {
        name: 'Unknown Collection',
        description: '',
        externalUrl: '',
        imageUrl: '',
      };
    }
  }

  private determineAccessLevel(collectionMetadata: any): 'basic' | 'premium' | 'vip' {
    // This is a simple heuristic - you can customize based on your needs
    const name = collectionMetadata.name.toLowerCase();
    
    if (name.includes('vip') || name.includes('premium') || name.includes('gold')) {
      return 'vip';
    } else if (name.includes('premium') || name.includes('silver')) {
      return 'premium';
    } else {
      return 'basic';
    }
  }

  private getHighestAccessLevel(results: NFTVerificationResult[]): 'basic' | 'premium' | 'vip' {
    const levels = results.map(r => r.accessLevel);
    
    if (levels.includes('vip')) return 'vip';
    if (levels.includes('premium')) return 'premium';
    return 'basic';
  }

  private getCachedResult(userAddress: string): NFTVerificationResult | null {
    const cached = this.cache.get(userAddress);
    const expiry = this.cacheExpiry.get(userAddress);
    
    if (cached && expiry && Date.now() < expiry) {
      return cached;
    }
    
    // Clean up expired cache
    if (expiry && Date.now() >= expiry) {
      this.cache.delete(userAddress);
      this.cacheExpiry.delete(userAddress);
    }
    
    return null;
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    };
  }
}
