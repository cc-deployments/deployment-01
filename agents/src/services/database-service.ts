import { Pool, PoolClient } from 'pg';

export interface SurfingWoodieEdition {
  id: number;
  title: string;
  contract_address: string;
  filename: string; // Links to HF ML data
  manifold_id: string;
  manifold_url: string;
  is_surfing_woodie: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface EditionOwnership {
  id: number;
  edition_id: number;
  owner_address: string;
  quantity_owned: number;
  last_verified: Date;
  created_at: Date;
}

export interface CarManiaNFT {
  id: number;
  token_id: string;
  contract_address: string;
  owner_address: string;
  is_surfing_woodie: boolean;
  image_id?: number;
  created_at: Date;
  updated_at: Date;
}

export class DatabaseService {
  private pool: Pool;
  private isConnected: boolean = false;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'carmania_pilot',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Handle pool errors
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      this.isConnected = false;
    });
  }

  async connect(): Promise<void> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      this.isConnected = true;
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
    this.isConnected = false;
    console.log('🔌 Database disconnected');
  }

  // EDITION-based methods for Surfing Woodie Wagon NFTs
  async isUserSurfingWoodieOwner(userAddress: string): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      const query = `SELECT user_owns_surfing_woodie($1)`;
      const result = await this.pool.query(query, [userAddress]);
      return result.rows[0].user_owns_surfing_woodie;
    } catch (error) {
      console.error(`Error checking Surfing Woodie ownership for ${userAddress}:`, error);
      return false;
    }
  }

  async getUserSurfingWoodieEditions(userAddress: string): Promise<SurfingWoodieEdition[]> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      const query = `SELECT * FROM get_user_surfing_woodie_editions($1)`;
      const result = await this.pool.query(query, [userAddress]);
      
      return result.rows.map(row => ({
        id: row.edition_id,
        title: row.title,
        contract_address: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
        filename: row.filename,
        manifold_id: row.manifold_id,
        manifold_url: row.manifold_url,
        is_surfing_woodie: true,
        created_at: new Date(),
        updated_at: new Date()
      }));
    } catch (error) {
      console.error(`Error fetching Surfing Woodie editions for ${userAddress}:`, error);
      return [];
    }
  }

  async getSurfingWoodieEditionByFilename(filename: string): Promise<SurfingWoodieEdition | null> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      const query = `
        SELECT * FROM surfing_woodie_editions 
        WHERE filename = $1 AND is_surfing_woodie = TRUE
      `;
      const result = await this.pool.query(query, [filename]);
      
      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: row.id,
        title: row.title,
        contract_address: row.contract_address,
        filename: row.filename,
        manifold_id: row.manifold_id,
        manifold_url: row.manifold_url,
        is_surfing_woodie: row.is_surfing_woodie,
        created_at: row.created_at,
        updated_at: row.updated_at
      };
    } catch (error) {
      console.error(`Error fetching Surfing Woodie edition by filename ${filename}:`, error);
      return null;
    }
  }

  // Legacy method for backward compatibility
  async isTokenSurfingWoodie(tokenId: string): Promise<boolean> {
    // For EDITION mints, we check by user ownership instead
    return false; // This method is not used for EDITION mints
  }

  async getSurfingWoodieData(tokenId: string): Promise<SurfingWoodieImage | null> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      const query = `
        SELECT 
          si.*,
          cn.owner_address
        FROM surfing_woodie_images si
        JOIN carmania_nfts cn ON si.id = cn.image_id
        WHERE cn.token_id = $1 AND cn.contract_address = $2
      `;
      const result = await this.pool.query(query, [
        tokenId,
        '0x8ef0772347e0caed0119937175d7ef9636ae1aa0'
      ]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: row.id,
        token_id: row.token_id,
        image_name: row.image_name,
        image_url: row.image_url,
        car_model: row.car_model,
        year: row.year,
        color: row.color,
        special_features: row.special_features || [],
        history: row.history,
        technical_specs: row.technical_specs,
        cultural_significance: row.cultural_significance,
        rarity: row.rarity,
        created_at: row.created_at,
        updated_at: row.updated_at
      };
    } catch (error) {
      console.error(`Error fetching Surfing Woodie data for token ${tokenId}:`, error);
      return null;
    }
  }

  async getAllSurfingWoodieImages(): Promise<SurfingWoodieImage[]> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      const query = 'SELECT * FROM surfing_woodie_images ORDER BY id';
      const result = await this.pool.query(query);

      return result.rows.map(row => ({
        id: row.id,
        token_id: row.token_id,
        image_name: row.image_name,
        image_url: row.image_url,
        car_model: row.car_model,
        year: row.year,
        color: row.color,
        special_features: row.special_features || [],
        history: row.history,
        technical_specs: row.technical_specs,
        cultural_significance: row.cultural_significance,
        rarity: row.rarity,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));
    } catch (error) {
      console.error('Error fetching all Surfing Woodie images:', error);
      return [];
    }
  }

  async createTables(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      const client = await this.pool.connect();
      
      // Create surfing_woodie_images table
      await client.query(`
        CREATE TABLE IF NOT EXISTS surfing_woodie_images (
          id SERIAL PRIMARY KEY,
          token_id VARCHAR(50) UNIQUE NOT NULL,
          image_name VARCHAR(255) NOT NULL,
          image_url TEXT NOT NULL,
          car_model VARCHAR(255) NOT NULL,
          year VARCHAR(10) NOT NULL,
          color VARCHAR(100) NOT NULL,
          special_features TEXT[] DEFAULT '{}',
          history TEXT NOT NULL,
          technical_specs TEXT NOT NULL,
          cultural_significance TEXT NOT NULL,
          rarity VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create carmania_nfts table
      await client.query(`
        CREATE TABLE IF NOT EXISTS carmania_nfts (
          id SERIAL PRIMARY KEY,
          token_id VARCHAR(50) NOT NULL,
          contract_address VARCHAR(42) NOT NULL,
          owner_address VARCHAR(42) NOT NULL,
          is_surfing_woodie BOOLEAN DEFAULT FALSE,
          image_id INTEGER REFERENCES surfing_woodie_images(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(token_id, contract_address)
        )
      `);

      // Create indexes for better performance
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_carmania_nfts_token_id 
        ON carmania_nfts(token_id)
      `);
      
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_carmania_nfts_owner 
        ON carmania_nfts(owner_address)
      `);
      
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_carmania_nfts_surfing_woodie 
        ON carmania_nfts(is_surfing_woodie)
      `);

      client.release();
      console.log('✅ Database tables created successfully');
    } catch (error) {
      console.error('❌ Error creating database tables:', error);
      throw error;
    }
  }

  async getConnectionStatus(): Promise<boolean> {
    return this.isConnected;
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1');
      client.release();
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }
}
