-- Weekly Batch Car Addition Script
-- Use this when you create 7 cars on Manifold Studios

-- First, clear existing cars (optional - only if you want a fresh start)
-- DELETE FROM cars;

-- Example: Adding 7 cars for the week of August 16-22, 2025 (Saturday-Friday)
-- Created on Friday evening, published Saturday-Friday
-- Replace the mint_urls with your actual Manifold Edition URLs

INSERT INTO cars (
  title, description, make, model, year, vehicle_type, 
  image_url, mint_url, contract_type, contract_address, 
  edition_size, metadata_url, publication_date, status, is_active
) VALUES 
-- Monday, July 7
(
  'Thunderbird at Lone Cypress',
  'Classic American luxury meets coastal beauty',
  'Ford',
  'Thunderbird',
  1957,
  'Convertible',
  'https://arweave.net/nOVdYejNGUOh9cf3xxWEQNVMpSx6CY91VpnTU0jgAs',
  'https://app.manifold.xyz/c/thunderbird-lone-cypress', -- REPLACE with your actual URL
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  25,
  'https://arweave.net/nOVdYejNGUOh9cf3xxWEQNVMpSx6CY91VpnTU0jgAs',
  '2025-07-07',
  'published',
  0
),
-- Tuesday, July 8
(
  'Westward Ho',
  'Pioneering spirit of the American frontier',
  'Studebaker',
  'Champion',
  1950,
  'Sedan',
  'https://arweave.net/example-image-url-1',
  'https://app.manifold.xyz/c/westward-ho', -- REPLACE with your actual URL
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  25,
  'https://arweave.net/example-metadata-url-1',
  '2025-07-08',
  'published',
  0
),
-- Wednesday, July 9
(
  'Target Practice',
  'Precision and focus on the range',
  'Chevrolet',
  'Corvette',
  1963,
  'Sports Car',
  'https://arweave.net/example-image-url-2',
  'https://app.manifold.xyz/c/target-practice', -- REPLACE with your actual URL
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  25,
  'https://arweave.net/example-metadata-url-2',
  '2025-07-09',
  'published',
  0
),
-- Thursday, July 10
(
  'Bargemobile',
  'Luxury floating down the river',
  'Cadillac',
  'Fleetwood Eldorado Convertible',
  1974,
  'Convertible',
  'https://arweave.net/example-image-url-3',
  'https://app.manifold.xyz/c/bargemobile', -- REPLACE with your actual URL
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  10,
  'https://arweave.net/example-metadata-url-3',
  '2025-07-10',
  'published',
  0
),
-- Friday, July 11
(
  'Teenyosaurus',
  'Compact power in a small package',
  'Nash',
  'Metropolitan',
  1955,
  'Economy Car',
  'https://arweave.net/W4HXhc_KU9hBJw1L2geJ3CLuUK7111Hv05el0NpFe2g',
  'https://app.manifold.xyz/c/teenyosaurus',
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  25,
  'https://6csb6mgwl4pxku7fjel5ojgmaguesili247mlgeambylpf34ui5q.arweave.net/8KQfMNZfH3VT5UkX1yTMAahJIWjXPsWYgGBwt5d8ojs',
  '2025-07-11',
  'published',
  0
),
-- Saturday, July 12
(
  'Weekend Warrior',
  'Ready for adventure',
  'Jeep',
  'Wrangler',
  1995,
  'SUV',
  'https://arweave.net/example-image-url-4',
  'https://app.manifold.xyz/c/weekend-warrior', -- REPLACE with your actual URL
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  25,
  'https://arweave.net/example-metadata-url-4',
  '2025-07-12',
  'published',
  0
),
-- Sunday, July 13
(
  'Sunday Drive',
  'Leisurely cruise through the countryside',
  'Mercedes-Benz',
  '300SL',
  1955,
  'Roadster',
  'https://arweave.net/example-image-url-5',
  'https://app.manifold.xyz/c/sunday-drive', -- REPLACE with your actual URL
  'BASE 721',
  '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
  25,
  'https://arweave.net/example-metadata-url-5',
  '2025-07-13',
  'published',
  0
);

-- Verify your weekly batch
SELECT 
  title, 
  publication_date, 
  mint_url, 
  status 
FROM cars 
WHERE publication_date >= '2025-07-12' 
ORDER BY publication_date;

-- Check which car will be active today
SELECT 
  title, 
  publication_date, 
  mint_url 
FROM cars 
WHERE publication_date = date('now') 
  AND status = 'published';
