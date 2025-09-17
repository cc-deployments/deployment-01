const { Pool } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  console.log('🗄️ Setting up CarMania PILOT Database...');
  
  // Connect to PostgreSQL
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'carmania_pilot',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL');

    // Create database if it doesn't exist
    console.log('📋 Creating database schema...');
    
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

    // Create indexes
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

    console.log('✅ Database tables created successfully');

    // Show table structure
    console.log('\n📊 Database Schema:');
    console.log('┌─────────────────────────┬─────────────────────────────────┐');
    console.log('│ Table                   │ Description                     │');
    console.log('├─────────────────────────┼─────────────────────────────────┤');
    console.log('│ surfing_woodie_images   │ 11 Surfing Woodie Wagon images  │');
    console.log('│ carmania_nfts          │ NFT ownership and metadata      │');
    console.log('└─────────────────────────┴─────────────────────────────────┘');

    console.log('\n🏄‍♂️ Ready for PILOT data!');
    console.log('📝 Next steps:');
    console.log('1. Add your 11 Surfing Woodie Wagon images to surfing_woodie_images');
    console.log('2. Add NFT ownership data to carmania_nfts');
    console.log('3. Set is_surfing_woodie = TRUE for Surfing Woodie NFTs');

    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupDatabase().catch(console.error);

