-- CarMania PILOT Database for EDITION Mints
-- Matches by filename to Hugging Face ML data
-- Location: /Users/carculture/Projects/CCulture-Apps-New/nft_car_system/

-- Create simple tables for EDITION mints
CREATE TABLE IF NOT EXISTS surfing_woodie_editions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    filename VARCHAR(255) UNIQUE NOT NULL, -- Links to HF ML data
    manifold_id VARCHAR(50) UNIQUE, -- For URL generation
    manifold_url TEXT, -- Full Manifold URL
    is_surfing_woodie BOOLEAN DEFAULT TRUE, -- All are Surfing Woodie
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS edition_ownership (
    id SERIAL PRIMARY KEY,
    edition_id INTEGER REFERENCES surfing_woodie_editions(id),
    owner_address VARCHAR(42) NOT NULL,
    quantity_owned INTEGER DEFAULT 1, -- For EDITION mints
    last_verified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(edition_id, owner_address)
);

-- Insert 11 Surfing Woodie Wagon EDITION mints
-- These will be populated with your actual data
INSERT INTO surfing_woodie_editions (title, contract_address, filename, manifold_id, manifold_url, is_surfing_woodie) VALUES
('Classic Surf Wagon #1', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-1.jpg', '4144040176', 'https://manifold.xyz/@carculture/id/4144040176', TRUE),
('Beach Cruiser #2', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-2.jpg', '4144040177', 'https://manifold.xyz/@carculture/id/4144040177', TRUE),
('Surf City Special #3', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-3.jpg', '4144040178', 'https://manifold.xyz/@carculture/id/4144040178', TRUE),
('California Dreamer #4', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-4.jpg', '4144040179', 'https://manifold.xyz/@carculture/id/4144040179', TRUE),
('Sunset Cruiser #5', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-5.jpg', '4144040180', 'https://manifold.xyz/@carculture/id/4144040180', TRUE),
('Beach Bum Special #6', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-6.jpg', '4144040181', 'https://manifold.xyz/@carculture/id/4144040181', TRUE),
('Wave Rider #7', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-7.jpg', '4144040182', 'https://manifold.xyz/@carculture/id/4144040182', TRUE),
('Surf Shack Special #8', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-8.jpg', '4144040183', 'https://manifold.xyz/@carculture/id/4144040183', TRUE),
('Beach Patrol #9', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-9.jpg', '4144040184', 'https://manifold.xyz/@carculture/id/4144040184', TRUE),
('Surf Legend #10', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-10.jpg', '4144040185', 'https://manifold.xyz/@carculture/id/4144040185', TRUE),
('Beach Classic #11', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 'surfing-woodie-11.jpg', '4144040186', 'https://manifold.xyz/@carculture/id/4144040186', TRUE);

-- Insert test ownership (all owned by test address)
INSERT INTO edition_ownership (edition_id, owner_address, quantity_owned) VALUES
(1, '0x1234567890123456789012345678901234567890', 1),
(2, '0x1234567890123456789012345678901234567890', 1),
(3, '0x1234567890123456789012345678901234567890', 1),
(4, '0x1234567890123456789012345678901234567890', 1),
(5, '0x1234567890123456789012345678901234567890', 1),
(6, '0x1234567890123456789012345678901234567890', 1),
(7, '0x1234567890123456789012345678901234567890', 1),
(8, '0x1234567890123456789012345678901234567890', 1),
(9, '0x1234567890123456789012345678901234567890', 1),
(10, '0x1234567890123456789012345678901234567890', 1),
(11, '0x1234567890123456789012345678901234567890', 1);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_editions_filename ON surfing_woodie_editions(filename);
CREATE INDEX IF NOT EXISTS idx_editions_manifold_id ON surfing_woodie_editions(manifold_id);
CREATE INDEX IF NOT EXISTS idx_ownership_owner ON edition_ownership(owner_address);
CREATE INDEX IF NOT EXISTS idx_ownership_edition ON edition_ownership(edition_id);

-- Create view for easy querying
CREATE OR REPLACE VIEW surfing_woodie_editions_with_ownership AS
SELECT 
    swe.id,
    swe.title,
    swe.contract_address,
    swe.filename,
    swe.manifold_id,
    swe.manifold_url,
    swe.is_surfing_woodie,
    eo.owner_address,
    eo.quantity_owned,
    eo.last_verified
FROM surfing_woodie_editions swe
LEFT JOIN edition_ownership eo ON swe.id = eo.edition_id
WHERE swe.is_surfing_woodie = TRUE;

-- Function to check if user owns any Surfing Woodie editions
CREATE OR REPLACE FUNCTION user_owns_surfing_woodie(p_owner_address VARCHAR(42))
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM edition_ownership eo
        JOIN surfing_woodie_editions swe ON eo.edition_id = swe.id
        WHERE eo.owner_address = p_owner_address 
        AND swe.is_surfing_woodie = TRUE
        AND eo.quantity_owned > 0
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get Surfing Woodie editions owned by user
CREATE OR REPLACE FUNCTION get_user_surfing_woodie_editions(p_owner_address VARCHAR(42))
RETURNS TABLE(
    edition_id INTEGER,
    title VARCHAR(255),
    filename VARCHAR(255),
    manifold_url TEXT,
    quantity_owned INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        swe.id,
        swe.title,
        swe.filename,
        swe.manifold_url,
        eo.quantity_owned
    FROM surfing_woodie_editions swe
    JOIN edition_ownership eo ON swe.id = eo.edition_id
    WHERE eo.owner_address = p_owner_address 
    AND swe.is_surfing_woodie = TRUE
    AND eo.quantity_owned > 0;
END;
$$ LANGUAGE plpgsql;

-- Show results
SELECT 'EDITION database created!' as status;
SELECT 'surfing_woodie_editions' as table_name, COUNT(*) as record_count FROM surfing_woodie_editions
UNION ALL
SELECT 'edition_ownership' as table_name, COUNT(*) as record_count FROM edition_ownership;

