import { NFTVerificationResult } from '../types/agent';
import { DatabaseService, SurfingWoodieImage } from './database-service';

export interface SurfingWoodieNFT {
  tokenId: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
}

export interface CarSpecificData {
  carModel: string;
  year: string;
  color: string;
  specialFeatures: string[];
  history: string;
  technicalSpecs: string;
  culturalSignificance: string;
}

export class PilotService {
  private carmaniaCollectionAddress: string;
  public databaseService: DatabaseService;
  private carDataCache: Map<string, CarSpecificData> = new Map();

  constructor(carmaniaCollectionAddress: string) {
    this.carmaniaCollectionAddress = carmaniaCollectionAddress;
    this.databaseService = new DatabaseService();
  }

  /**
   * Check if user has Surfing Woodie Wagon EDITION NFTs from CarMania collection
   */
  async checkPilotAccess(nftVerification: NFTVerificationResult): Promise<{
    hasPilotAccess: boolean;
    surfingWoodieNFTs: SurfingWoodieNFT[];
    carData: CarSpecificData | null;
  }> {
    // For EDITION mints, check if user owns any Surfing Woodie editions
    const userAddress = nftVerification.userAddress || '';
    
    if (!userAddress) {
      return {
        hasPilotAccess: false,
        surfingWoodieNFTs: [],
        carData: null
      };
    }

    // Check if user owns any Surfing Woodie editions
    const isOwner = await this.databaseService.isUserSurfingWoodieOwner(userAddress);
    
    if (!isOwner) {
      return {
        hasPilotAccess: false,
        surfingWoodieNFTs: [],
        carData: null
      };
    }

    // Get user's Surfing Woodie editions
    const editions = await this.databaseService.getUserSurfingWoodieEditions(userAddress);
    
    if (editions.length === 0) {
      return {
        hasPilotAccess: false,
        surfingWoodieNFTs: [],
        carData: null
      };
    }

    // Convert editions to SurfingWoodieNFT format
    const surfingWoodieNFTs: SurfingWoodieNFT[] = editions.map(edition => ({
      tokenId: edition.manifold_id, // Use Manifold ID as token ID
      metadata: {
        name: edition.title,
        description: `A classic Surfing Woodie Wagon from the CarMania collection`,
        image: `https://carmania.carculture.com/${edition.filename}`,
        attributes: [
          { trait_type: "Type", value: "Surfing Woodie Wagon" },
          { trait_type: "Collection", value: "CarMania" },
          { trait_type: "Edition", value: "Limited" }
        ]
      }
    }));

    // Get car-specific data for the first edition (by filename)
    const carData = await this.getCarSpecificData(editions[0].filename);

    return {
      hasPilotAccess: true,
      surfingWoodieNFTs,
      carData
    };
  }

  /**
   * Find Surfing Woodie Wagon NFTs from CarMania collection
   */
  private async findSurfingWoodieNFTs(tokenIds: string[]): Promise<SurfingWoodieNFT[]> {
    const nfts: SurfingWoodieNFT[] = [];

    for (const tokenId of tokenIds) {
      try {
        // TODO: Query SQL database to check if this tokenId is a Surfing Woodie Wagon
        // This would check your SQL database for Surfing Woodie Wagon NFTs
        const isSurfingWoodie = await this.checkIfSurfingWoodie(tokenId);
        
        if (isSurfingWoodie) {
          const nft: SurfingWoodieNFT = {
            tokenId,
            metadata: {
              name: `Surfing Woodie Wagon #${tokenId}`,
              description: "A classic 1940s woodie wagon with surfboard on top",
              image: "https://carmania.carculture.com/surfing-woodie-wagon.png",
              attributes: [
                { trait_type: "Year", value: "1947" },
                { trait_type: "Color", value: "Wood Panel" },
                { trait_type: "Style", value: "Surf Wagon" },
                { trait_type: "Rarity", value: "Rare" }
              ]
            }
          };
          nfts.push(nft);
        }
      } catch (error) {
        console.error(`Error checking NFT ${tokenId}:`, error);
      }
    }

    return nfts;
  }

  /**
   * Check if a tokenId is a Surfing Woodie Wagon NFT in SQL database
   */
  private async checkIfSurfingWoodie(tokenId: string): Promise<boolean> {
    try {
      return await this.databaseService.isTokenSurfingWoodie(tokenId);
    } catch (error) {
      console.error(`Error checking Surfing Woodie status for token ${tokenId}:`, error);
      return false;
    }
  }

  /**
   * Get car-specific data for chat from SQL database (by filename)
   */
  private async getCarSpecificData(filename: string): Promise<CarSpecificData | null> {
    if (!filename) return null;

    // Check cache first
    if (this.carDataCache.has(filename)) {
      return this.carDataCache.get(filename)!;
    }

    try {
      // Get edition data by filename
      const edition = await this.databaseService.getSurfingWoodieEditionByFilename(filename);
      
      if (!edition) {
        return null;
      }

      // For now, return sample data based on filename
      // This will be replaced with actual HF ML data lookup
      const carData: CarSpecificData = {
        carModel: edition.title,
        year: "1947", // Default year, will be from HF ML data
        color: "Natural Wood with Dark Panels", // Default, will be from HF ML data
        specialFeatures: [
          "Wood paneling construction",
          "Surfboard mounting system",
          "Classic 1940s styling",
          "Hand-crafted woodwork"
        ],
        history: `The ${edition.title} represents the golden age of American automotive design. These vehicles were built with real wood paneling and were popular among surfers and beachgoers in California.`,
        technicalSpecs: "Engine: Flathead V8, Transmission: 3-speed manual, Body: Wood and steel construction, Weight: ~3,200 lbs, Top Speed: ~75 mph",
        culturalSignificance: "The woodie wagon is deeply embedded in American surf culture and represents freedom, adventure, and the California lifestyle. It's featured in countless movies, songs, and artwork as a symbol of the surfing era."
      };

      // Cache the data
      this.carDataCache.set(filename, carData);
      return carData;
    } catch (error) {
      console.error('Error fetching car data from database:', error);
      return null;
    }
  }

  /**
   * Generate car-specific chat response based on user message and NFT data
   */
  async generateCarSpecificResponse(
    userMessage: string, 
    carData: CarSpecificData,
    nft: SurfingWoodieNFT
  ): Promise<string> {
    // Simple keyword-based response generation
    // TODO: Replace with actual LLM integration using ArDrive data
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('history') || message.includes('story')) {
      return `The ${carData.carModel} has a rich history! ${carData.history} Your NFT (#${nft.tokenId}) represents this iconic piece of American automotive culture.`;
    }
    
    if (message.includes('spec') || message.includes('technical') || message.includes('engine')) {
      return `Here are the technical specs for your ${carData.carModel}: ${carData.technicalSpecs}`;
    }
    
    if (message.includes('feature') || message.includes('special')) {
      return `Your ${carData.carModel} has some amazing features: ${carData.specialFeatures.join(', ')}. The wood paneling was hand-crafted and each wagon was unique!`;
    }
    
    if (message.includes('surf') || message.includes('beach') || message.includes('california')) {
      return `The ${carData.carModel} is a true surf culture icon! ${carData.culturalSignificance} Your woodie wagon would have been perfect for carrying surfboards to the beach.`;
    }
    
    if (message.includes('color') || message.includes('paint')) {
      return `Your ${carData.carModel} features ${carData.color}. The natural wood finish with dark wood panels was the signature look of these classic wagons.`;
    }
    
    // Default response
    return `That's a great question about your ${carData.carModel}! This ${carData.year} woodie wagon is a true classic. What would you like to know about it? I can tell you about its history, technical specs, features, or cultural significance.`;
  }

  /**
   * Get available chat topics for the car
   */
  getAvailableTopics(carData: CarSpecificData): string[] {
    return [
      "History and background",
      "Technical specifications", 
      "Special features",
      "Surf culture significance",
      "Color and styling",
      "Rarity and value",
      "Maintenance tips",
      "Collector information"
    ];
  }

  /**
   * Clear cache (useful for testing)
   */
  clearCache(): void {
    this.carDataCache.clear();
  }
}
