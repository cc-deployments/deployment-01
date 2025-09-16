-- Simple test database for 11 Surfing Woodie Wagon images
-- Run this to create a minimal test database

-- Create simple tables
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
    rarity VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS carmania_nfts (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(50) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    owner_address VARCHAR(42) NOT NULL,
    is_surfing_woodie BOOLEAN DEFAULT FALSE,
    image_id INTEGER REFERENCES surfing_woodie_images(id),
    UNIQUE(token_id, contract_address)
);

-- Insert 11 Surfing Woodie Wagon images
INSERT INTO surfing_woodie_images (token_id, image_name, image_url, car_model, year, color, special_features, history, technical_specs, cultural_significance, rarity) VALUES
('1', 'Classic Surf Wagon #1', 'https://carmania.carculture.com/surfing-woodie-1.jpg', '1947 Ford Woodie Wagon', '1947', 'Natural Wood with Dark Panels', ARRAY['Wood paneling', 'Surfboard rack', 'Classic styling'], 'The iconic 1947 Ford Woodie Wagon represents the golden age of American automotive design.', 'Engine: Flathead V8, 3-speed manual, Wood/steel body', 'Deeply embedded in American surf culture and California lifestyle.', 'Rare'),
('2', 'Beach Cruiser #2', 'https://carmania.carculture.com/surfing-woodie-2.jpg', '1948 Ford Woodie Wagon', '1948', 'Mahogany Wood with Chrome', ARRAY['Mahogany panels', 'Chrome trim', 'Beach cruiser styling'], 'The 1948 Ford Woodie continued the tradition of hand-crafted wooden bodywork.', 'Engine: Flathead V8, 3-speed manual, Mahogany/steel body', 'Peak of woodie wagon popularity in surf films.', 'Very Rare'),
('3', 'Surf City Special #3', 'https://carmania.carculture.com/surfing-woodie-3.jpg', '1946 Ford Woodie Wagon', '1946', 'Ash Wood with Red Accents', ARRAY['Ash wood construction', 'Red pinstriping', 'Custom surfboard storage'], 'The 1946 Ford Woodie marked the beginning of the post-war surf culture boom.', 'Engine: Flathead V8, 3-speed manual, Ash wood/steel body', 'Helped establish the woodie wagon as the ultimate surf vehicle.', 'Legendary'),
('4', 'California Dreamer #4', 'https://carmania.carculture.com/surfing-woodie-4.jpg', '1949 Ford Woodie Wagon', '1949', 'Birch Wood with Blue Accents', ARRAY['Birch panels', 'Blue pinstriping', 'Custom surfboard mounts'], 'The 1949 Ford Woodie featured the latest in post-war automotive styling.', 'Engine: Flathead V8, 3-speed manual, Birch/steel body', 'Symbol of the emerging California surf culture and beach lifestyle.', 'Rare'),
('5', 'Sunset Cruiser #5', 'https://carmania.carculture.com/surfing-woodie-5.jpg', '1950 Ford Woodie Wagon', '1950', 'Oak Wood with Yellow Accents', ARRAY['Oak construction', 'Yellow trim', 'Sunset styling'], 'The 1950 Ford Woodie represented the transition to modern automotive design.', 'Engine: Flathead V8, 3-speed manual, Oak/steel body', 'Bridge between classic woodie era and modern surf culture.', 'Very Rare'),
('6', 'Beach Bum Special #6', 'https://carmania.carculture.com/surfing-woodie-6.jpg', '1945 Ford Woodie Wagon', '1945', 'Pine Wood with Green Accents', ARRAY['Pine panels', 'Green pinstriping', 'Vintage surf decals'], 'The 1945 Ford Woodie was one of the last pre-war models with full wood construction.', 'Engine: Flathead V8, 3-speed manual, Pine/steel body', 'Represents the end of an era and beginning of surf culture.', 'Legendary'),
('7', 'Wave Rider #7', 'https://carmania.carculture.com/surfing-woodie-7.jpg', '1951 Ford Woodie Wagon', '1951', 'Cedar Wood with White Accents', ARRAY['Cedar construction', 'White trim', 'Wave patterns'], 'The 1951 Ford Woodie featured the last year of full wood bodywork.', 'Engine: Flathead V8, 3-speed manual, Cedar/steel body', 'Final chapter in the classic woodie wagon era.', 'Rare'),
('8', 'Surf Shack Special #8', 'https://carmania.carculture.com/surfing-woodie-8.jpg', '1944 Ford Woodie Wagon', '1944', 'Maple Wood with Brown Accents', ARRAY['Maple panels', 'Brown trim', 'Surf shack styling'], 'The 1944 Ford Woodie was built during wartime with limited production.', 'Engine: Flathead V8, 3-speed manual, Maple/steel body', 'Rare wartime production model highly prized by collectors.', 'Legendary'),
('9', 'Beach Patrol #9', 'https://carmania.carculture.com/surfing-woodie-9.jpg', '1952 Ford Woodie Wagon', '1952', 'Walnut Wood with Gold Accents', ARRAY['Walnut construction', 'Gold trim', 'Beach patrol styling'], 'The 1952 Ford Woodie marked the end of the classic woodie era.', 'Engine: Flathead V8, 3-speed manual, Walnut/steel body', 'Last of the true woodie wagons before plastic took over.', 'Very Rare'),
('10', 'Surf Legend #10', 'https://carmania.carculture.com/surfing-woodie-10.jpg', '1943 Ford Woodie Wagon', '1943', 'Cherry Wood with Red Accents', ARRAY['Cherry panels', 'Red pinstriping', 'Legend styling'], 'The 1943 Ford Woodie was one of the rarest wartime production models.', 'Engine: Flathead V8, 3-speed manual, Cherry/steel body', 'Ultimate collector''s item from the woodie wagon era.', 'Legendary'),
('11', 'Beach Classic #11', 'https://carmania.carculture.com/surfing-woodie-11.jpg', '1953 Ford Woodie Wagon', '1953', 'Teak Wood with Silver Accents', ARRAY['Teak construction', 'Silver trim', 'Classic styling'], 'The 1953 Ford Woodie was the final year of production for woodie wagons.', 'Engine: Flathead V8, 3-speed manual, Teak/steel body', 'End of an era - the last true woodie wagon ever produced.', 'Legendary');

-- Insert test NFT ownership (all owned by test address)
INSERT INTO carmania_nfts (token_id, contract_address, owner_address, is_surfing_woodie, image_id) VALUES
('1', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 1),
('2', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 2),
('3', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 3),
('4', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 4),
('5', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 5),
('6', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 6),
('7', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 7),
('8', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 8),
('9', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 9),
('10', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 10),
('11', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', '0x1234567890123456789012345678901234567890', TRUE, 11);

-- Show results
SELECT 'Test database created!' as status;
SELECT 'surfing_woodie_images' as table_name, COUNT(*) as record_count FROM surfing_woodie_images
UNION ALL
SELECT 'carmania_nfts' as table_name, COUNT(*) as record_count FROM carmania_nfts;
