/**
 * Edition Data Service
 * Loads and manages your NFT edition data from SQL database
 */

export interface EditionData {
  filename: string;
  chain: string;
  contract: string;
  arweave_image_url: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: string;
  vehicle_type: string;
  mint_url: string;
  edition_size?: number;
  json_metadata?: string;
}

export interface EditionDisplayData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  carInfo: {
    make: string;
    model: string;
    year: string;
    vehicle_type: string;
  };
  contract: string;
  chain: string;
  mintUrl: string;
  editionSize?: number;
}

class EditionDataService {
  private editions: EditionData[] = [];
  private isLoaded = false;

  /**
   * Load edition data from your SQL database
   * For hackathon demo, we'll use the CSV data you have
   */
  async loadEditions(): Promise<EditionData[]> {
    if (this.isLoaded) {
      return this.editions;
    }

    try {
      // For hackathon demo, we'll use the data from your CSV
      // In production, this would connect to your SQL database
      const demoEditions: EditionData[] = [
        {
          filename: "CAR00JGG14226152-Barnfresh_wm.jpg",
          chain: "BASE 1155",
          contract: "0x1c6d27a76f4f706cccb698acc236c31f886c5421",
          arweave_image_url: "https://arweave.net/qCO_kXgLaXhaVP8DqmTddFOW86YsLWnmU0hJA6S5fws",
          title: "Barn Fresh",
          description: "Jaguar fresh from the \"barn\" and ready for the highest auto auction bidder",
          make: "Jaguar",
          model: "Jaguar XK120 Drophead Coupe",
          year: "1953",
          vehicle_type: "Drophead Coupe, Sports Car",
          mint_url: "https://manifold.gallery/base:0x1c6d27a76f4f706cccb698acc236c31f886c5421",
          edition_size: undefined
        },
        {
          filename: "Light Bulb Moment",
          chain: "BASE 1155",
          contract: "0x1c6d27a76f4f706cccb698acc236c31f886c5421",
          arweave_image_url: "https://assets.manifold.xyz/optimized/9506c8005f134daeb4c9eb06e80fff99f42bb5b71467549e1ad8639ee906139f/w_1024.jpg",
          title: "Light Bulb Moment",
          description: "When I was four-years-old, my father put me on his lap and let me drive our Volkswagen Beetle...",
          make: "Volkswagen",
          model: "Beetle",
          year: "1964",
          vehicle_type: "Coupe",
          mint_url: "https://app.manifold.xyz/c/light-bulb-moment",
          edition_size: 25
        },
        {
          filename: "Bargemobile",
          chain: "BASE 721",
          contract: "0x8ef0772347e0caed0119937175d7ef9636ae1aa0",
          arweave_image_url: "",
          title: "Bargemobile",
          description: "",
          make: "Cadillac",
          model: "Cadillac Fleetwood Eldorado Convertible",
          year: "1974",
          vehicle_type: "Convertible",
          mint_url: "",
          edition_size: 10
        },
        {
          filename: "Teenyosaurus",
          chain: "BASE 721",
          contract: "0x8ef0772347e0caed0119937175d7ef9636ae1aa0",
          arweave_image_url: "https://arweave.net/W4HXhc_KU9hBJw1L2geJ3CLuUK7111Hv05el0NpFe2g",
          title: "Teenyosaurus",
          description: "",
          make: "Nash",
          model: "Metropolitan",
          year: "1955",
          vehicle_type: "Economy Car",
          mint_url: "",
          edition_size: 25
        }
      ];

      this.editions = demoEditions;
      this.isLoaded = true;
      
      console.log(`✅ Loaded ${this.editions.length} editions for hackathon demo`);
      return this.editions;
      
    } catch (error) {
      console.error('Failed to load editions:', error);
      throw new Error('Failed to load edition data');
    }
  }

  /**
   * Get all editions
   */
  async getAllEditions(): Promise<EditionData[]> {
    return this.loadEditions();
  }

  /**
   * Get edition by ID (filename)
   */
  async getEditionById(id: string): Promise<EditionData | null> {
    const editions = await this.loadEditions();
    return editions.find(edition => edition.filename === id) || null;
  }

  /**
   * Get editions by chain
   */
  async getEditionsByChain(chain: string): Promise<EditionData[]> {
    const editions = await this.loadEditions();
    return editions.filter(edition => edition.chain === chain);
  }

  /**
   * Get editions by make
   */
  async getEditionsByMake(make: string): Promise<EditionData[]> {
    const editions = await this.loadEditions();
    return editions.filter(edition => edition.make.toLowerCase() === make.toLowerCase());
  }

  /**
   * Get editions by year range
   */
  async getEditionsByYearRange(startYear: number, endYear: number): Promise<EditionData[]> {
    const editions = await this.loadEditions();
    return editions.filter(edition => {
      const year = parseInt(edition.year);
      return year >= startYear && year <= endYear;
    });
  }

  /**
   * Convert to display format for MiniApp
   */
  async getDisplayData(): Promise<EditionDisplayData[]> {
    const editions = await this.loadEditions();
    
    return editions.map(edition => ({
      id: edition.filename,
      title: edition.title,
      description: edition.description,
      imageUrl: edition.arweave_image_url || '/placeholder-car.jpg',
      carInfo: {
        make: edition.make,
        model: edition.model,
        year: edition.year,
        vehicle_type: edition.vehicle_type
      },
      contract: edition.contract,
      chain: edition.chain,
      mintUrl: edition.mint_url,
      editionSize: edition.edition_size
    }));
  }

  /**
   * Search editions by text
   */
  async searchEditions(query: string): Promise<EditionData[]> {
    const editions = await this.loadEditions();
    const lowerQuery = query.toLowerCase();
    
    return editions.filter(edition => 
      edition.title.toLowerCase().includes(lowerQuery) ||
      edition.make.toLowerCase().includes(lowerQuery) ||
      edition.model.toLowerCase().includes(lowerQuery) ||
      edition.vehicle_type.toLowerCase().includes(lowerQuery) ||
      edition.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get edition statistics
   */
  async getEditionStats() {
    const editions = await this.loadEditions();
    
    const stats = {
      total: editions.length,
      byChain: {} as Record<string, number>,
      byMake: {} as Record<string, number>,
      byYear: {} as Record<string, number>,
      totalEditionSize: 0
    };

    editions.forEach(edition => {
      // Chain stats
      stats.byChain[edition.chain] = (stats.byChain[edition.chain] || 0) + 1;
      
      // Make stats
      if (edition.make && edition.make !== 'Nil') {
        stats.byMake[edition.make] = (stats.byMake[edition.make] || 0) + 1;
      }
      
      // Year stats
      if (edition.year && edition.year !== 'Nil') {
        stats.byYear[edition.year] = (stats.byYear[edition.year] || 0) + 1;
      }
      
      // Edition size
      if (edition.edition_size) {
        stats.totalEditionSize += edition.edition_size;
      }
    });

    return stats;
  }
}

// Export singleton instance
export const editionDataService = new EditionDataService();

// Export the class for testing
export { EditionDataService };


