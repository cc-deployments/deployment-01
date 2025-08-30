import { NFTVerificationResult, CarManiaAgentConfig } from '../types/agent';
export declare class NFTVerificationService {
    private config;
    private provider;
    private cache;
    private cacheExpiry;
    private readonly CACHE_DURATION;
    constructor(config: CarManiaAgentConfig);
    verifyNFTAccess(userAddress: string): Promise<NFTVerificationResult>;
    private performNFTCheck;
    private checkCollection;
    private getERC721Balance;
    private getTokenIds;
    private getOpenSeaCollectionMetadata;
    private determineAccessLevel;
    private getHighestAccessLevel;
    private getCachedResult;
    clearCache(): void;
    getCacheStats(): {
        size: number;
        entries: string[];
    };
}
//# sourceMappingURL=nft-verification.d.ts.map