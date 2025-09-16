-- CarMania PILOT Database Setup
-- Surfing Woodie Wagon NFT Chat System
-- Location: /Users/carculture/Projects/CCulture-Apps-New/nft_car_system/

-- Create database (run this first if creating new database)
-- CREATE DATABASE carmania_pilot;

-- Connect to the database
-- \c carmania_pilot;

-- Create surfing_woodie_images table
-- Stores the 11 Surfing Woodie Wagon images and their ML-trained data
CREATE TABLE IF NOT EXISTS surfing_woodie_images (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(50) UNIQUE NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    ardrive_file_id VARCHAR(255), -- ArDrive file ID for trained data
    huggingface_model_path VARCHAR(255), -- Hugging Face model path
    car_model VARCHAR(255) NOT NULL,
    year VARCHAR(10) NOT NULL,
    color VARCHAR(100) NOT NULL,
    special_features TEXT[] DEFAULT '{}',
    history TEXT NOT NULL,
    technical_specs TEXT NOT NULL,
    cultural_significance TEXT NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    ml_confidence_score DECIMAL(5,4), -- ML model confidence (0.0000-1.0000)
    training_data_hash VARCHAR(64), -- Hash of training data for verification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create carmania_nfts table
-- Tracks NFT ownership and links to Surfing Woodie images
CREATE TABLE IF NOT EXISTS carmania_nfts (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(50) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    owner_address VARCHAR(42) NOT NULL,
    is_surfing_woodie BOOLEAN DEFAULT FALSE,
    image_id INTEGER REFERENCES surfing_woodie_images(id),
    nft_metadata JSONB, -- Store full NFT metadata
    last_verified TIMESTAMP, -- When NFT ownership was last verified
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(token_id, contract_address)
);

-- Create ml_training_sessions table
-- Track ML training sessions and model versions
CREATE TABLE IF NOT EXISTS ml_training_sessions (
    id SERIAL PRIMARY KEY,
    session_name VARCHAR(255) NOT NULL,
    model_type VARCHAR(100) NOT NULL, -- 'car_recognition', 'car_chat', etc.
    huggingface_repo VARCHAR(255), -- Hugging Face repository
    ardrive_folder_id VARCHAR(255), -- ArDrive folder ID
    training_data_hash VARCHAR(64),
    model_accuracy DECIMAL(5,4),
    training_duration INTEGER, -- Duration in minutes
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'training', 'completed', 'failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_carmania_nfts_token_id 
    ON carmania_nfts(token_id);

CREATE INDEX IF NOT EXISTS idx_carmania_nfts_owner 
    ON carmania_nfts(owner_address);

CREATE INDEX IF NOT EXISTS idx_carmania_nfts_surfing_woodie 
    ON carmania_nfts(is_surfing_woodie);

CREATE INDEX IF NOT EXISTS idx_surfing_woodie_ardrive 
    ON surfing_woodie_images(ardrive_file_id);

CREATE INDEX IF NOT EXISTS idx_surfing_woodie_huggingface 
    ON surfing_woodie_images(huggingface_model_path);

-- Insert sample data for testing (11 Surfing Woodie Wagon images)
-- These will be replaced with your actual trained data
INSERT INTO surfing_woodie_images (
    token_id, image_name, image_url, car_model, year, color, 
    special_features, history, technical_specs, cultural_significance, rarity,
    ml_confidence_score, training_data_hash
) VALUES 
(
    '1', 'Classic Surf Wagon #1', 'https://carmania.carculture.com/surfing-woodie-1.jpg',
    '1947 Ford Woodie Wagon', '1947', 'Natural Wood with Dark Panels',
    ARRAY['Wood paneling', 'Surfboard rack', 'Classic 1940s styling', 'Hand-crafted woodwork'],
    'This iconic 1947 Ford Woodie Wagon represents the golden age of American automotive design. These vehicles were built with real wood paneling and were popular among surfers and beachgoers in California. The woodie wagon became an icon of surf culture and 1940s Americana.',
    'Engine: 239 cu in Flathead V8, Transmission: 3-speed manual, Body: Wood and steel construction, Weight: 3,200 lbs, Top Speed: 75 mph, Suspension: Independent front, live rear axle',
    'The woodie wagon is deeply embedded in American surf culture and represents freedom, adventure, and the California lifestyle. It''s featured in countless movies, songs, and artwork as a symbol of the surfing era and post-war optimism.',
    'Rare', 0.95, 'abc123def456'
),
(
    '2', 'Beach Cruiser Woodie #2', 'https://carmania.carculture.com/surfing-woodie-2.jpg',
    '1948 Ford Woodie Wagon', '1948', 'Mahogany Wood with Chrome Accents',
    ARRAY['Mahogany panels', 'Chrome trim', 'Beach cruiser styling', 'Custom surfboard mounts'],
    'The 1948 Ford Woodie Wagon continued the tradition of hand-crafted wooden bodywork. This particular model features mahogany panels and chrome accents, making it a favorite among beach communities along the California coast.',
    'Engine: 239 cu in Flathead V8, Transmission: 3-speed manual, Body: Mahogany and steel, Weight: 3,250 lbs, Top Speed: 78 mph',
    'This model represents the peak of woodie wagon popularity, appearing in numerous surf films and becoming synonymous with the California beach lifestyle.',
    'Very Rare', 0.92, 'def456ghi789'
),
(
    '3', 'Surf City Special #3', 'https://carmania.carculture.com/surfing-woodie-3.jpg',
    '1946 Ford Woodie Wagon', '1946', 'Ash Wood with Red Accents',
    ARRAY['Ash wood construction', 'Red pinstriping', 'Custom surfboard storage', 'Vintage surf decals'],
    'The 1946 Ford Woodie Wagon marked the beginning of the post-war surf culture boom. With its ash wood construction and distinctive styling, it became the vehicle of choice for early surf pioneers.',
    'Engine: 239 cu in Flathead V8, Transmission: 3-speed manual, Body: Ash wood and steel, Weight: 3,180 lbs, Top Speed: 72 mph',
    'This early model helped establish the woodie wagon as the ultimate surf vehicle, carrying boards to remote beaches and becoming a symbol of the emerging surf culture.',
    'Legendary', 0.98, 'ghi789jkl012'
);

-- Insert sample NFT ownership data
INSERT INTO carmania_nfts (
    token_id, contract_address, owner_address, is_surfing_woodie, image_id,
    nft_metadata, last_verified
) VALUES 
(
    '1', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 
    '0x1234567890123456789012345678901234567890', 
    TRUE, 1,
    '{"name": "Classic Surf Wagon #1", "description": "A legendary 1947 Ford Woodie Wagon", "image": "https://carmania.carculture.com/surfing-woodie-1.jpg"}',
    CURRENT_TIMESTAMP
),
(
    '2', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 
    '0x2345678901234567890123456789012345678901', 
    TRUE, 2,
    '{"name": "Beach Cruiser Woodie #2", "description": "A stunning 1948 Ford Woodie Wagon", "image": "https://carmania.carculture.com/surfing-woodie-2.jpg"}',
    CURRENT_TIMESTAMP
),
(
    '3', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 
    '0x3456789012345678901234567890123456789012', 
    TRUE, 3,
    '{"name": "Surf City Special #3", "description": "An iconic 1946 Ford Woodie Wagon", "image": "https://carmania.carculture.com/surfing-woodie-3.jpg"}',
    CURRENT_TIMESTAMP
);

-- Create view for easy querying of Surfing Woodie NFTs with their data
CREATE OR REPLACE VIEW surfing_woodie_nfts AS
SELECT 
    cn.token_id,
    cn.contract_address,
    cn.owner_address,
    cn.nft_metadata,
    cn.last_verified,
    si.image_name,
    si.image_url,
    si.car_model,
    si.year,
    si.color,
    si.special_features,
    si.history,
    si.technical_specs,
    si.cultural_significance,
    si.rarity,
    si.ml_confidence_score,
    si.ardrive_file_id,
    si.huggingface_model_path
FROM carmania_nfts cn
JOIN surfing_woodie_images si ON cn.image_id = si.id
WHERE cn.is_surfing_woodie = TRUE;

-- Create function to update ML confidence scores
CREATE OR REPLACE FUNCTION update_ml_confidence(
    p_token_id VARCHAR(50),
    p_confidence DECIMAL(5,4)
) RETURNS VOID AS $$
BEGIN
    UPDATE surfing_woodie_images 
    SET ml_confidence_score = p_confidence, updated_at = CURRENT_TIMESTAMP
    WHERE token_id = p_token_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to verify NFT ownership
CREATE OR REPLACE FUNCTION verify_nft_ownership(
    p_token_id VARCHAR(50),
    p_owner_address VARCHAR(42)
) RETURNS BOOLEAN AS $$
DECLARE
    is_owner BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM carmania_nfts 
        WHERE token_id = p_token_id 
        AND owner_address = p_owner_address
        AND is_surfing_woodie = TRUE
    ) INTO is_owner;
    
    -- Update last_verified timestamp
    IF is_owner THEN
        UPDATE carmania_nfts 
        SET last_verified = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE token_id = p_token_id AND owner_address = p_owner_address;
    END IF;
    
    RETURN is_owner;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO carmania_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO carmania_user;

COMMENT ON TABLE surfing_woodie_images IS 'Stores 11 Surfing Woodie Wagon images with ML training data from Hugging Face/ArDrive';
COMMENT ON TABLE carmania_nfts IS 'Tracks NFT ownership and links to Surfing Woodie images';
COMMENT ON TABLE ml_training_sessions IS 'Tracks ML training sessions and model versions';
COMMENT ON VIEW surfing_woodie_nfts IS 'Easy view for querying Surfing Woodie NFTs with their complete data';

-- Show created tables
SELECT 'Database setup complete!' as status;
SELECT 'surfing_woodie_images' as table_name, COUNT(*) as record_count FROM surfing_woodie_images
UNION ALL
SELECT 'carmania_nfts' as table_name, COUNT(*) as record_count FROM carmania_nfts
UNION ALL
SELECT 'ml_training_sessions' as table_name, COUNT(*) as record_count FROM ml_training_sessions;
