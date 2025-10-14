-- Database schema for Summertime Blues NFT testing
-- This will be used by the DRIVR agent for Postgres verification

-- Table for NFT ownership verification
CREATE TABLE IF NOT EXISTS nft_ownership (
    id SERIAL PRIMARY KEY,
    user_address VARCHAR(42) NOT NULL,
    collection_address VARCHAR(42) NOT NULL,
    token_id VARCHAR(100) NOT NULL,
    nft_name VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Summertime Blues specific data
CREATE TABLE IF NOT EXISTS summertime_blues_nfts (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(100) UNIQUE NOT NULL,
    nft_name VARCHAR(255) DEFAULT 'Summertime Blues',
    collection_address VARCHAR(42) DEFAULT '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    year VARCHAR(50),
    color VARCHAR(50),
    car_type VARCHAR(50),
    description TEXT,
    image_url VARCHAR(500),
    arweave_url VARCHAR(500),
    price_eth DECIMAL(18,8),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data for Summertime Blues
INSERT INTO summertime_blues_nfts (
    token_id,
    nft_name,
    manufacturer,
    model,
    year,
    color,
    car_type,
    description,
    image_url,
    arweave_url,
    price_eth
) VALUES (
    'summertime_blues_test',
    'Summertime Blues',
    'Chevrolet',
    'Chevrolet Suburban',
    '1970, 1970s',
    'Blue',
    'SUV',
    'Manufacturer: Chevrolet | Model: Chevrolet Suburban | Type: SUV | Color: Blue | Year: 1970, 1970s | Post-modern surfer wagon built on a Chevrolet Suburban in Southern California',
    'https://carmania.carculture.com/summertime_blues_placeholder.jpg',
    'https://ur4re6uytbzkxhvamuzhxaugfrpsfywiukkeabahnvddaumlcama.arweave.net/pHkSepiYcqueoGUye4KGLF8i4siilEAEB21GMFGLEBg',
    0.001
) ON CONFLICT (token_id) DO NOTHING;

-- Insert test ownership record (replace with actual user address)
INSERT INTO nft_ownership (
    user_address,
    collection_address,
    token_id,
    nft_name,
    is_verified
) VALUES (
    '0x1234567890123456789012345678901234567890', -- Replace with test user address
    '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    'summertime_blues_test',
    'Summertime Blues',
    TRUE
) ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_nft_ownership_user ON nft_ownership(user_address);
CREATE INDEX IF NOT EXISTS idx_nft_ownership_collection ON nft_ownership(collection_address);
CREATE INDEX IF NOT EXISTS idx_nft_ownership_token ON nft_ownership(token_id);
CREATE INDEX IF NOT EXISTS idx_summertime_token ON summertime_blues_nfts(token_id);
