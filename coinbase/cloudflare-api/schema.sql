-- CarMania Database Schema
-- Based on your CSV data structure

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  make TEXT,
  model TEXT,
  year INTEGER,
  vehicle_type TEXT,
  image_url TEXT,
  mint_url TEXT NOT NULL,
  contract_type TEXT,
  contract_address TEXT,
  edition_size INTEGER,
  metadata_url TEXT,
  publication_date TEXT NOT NULL, -- YYYY-MM-DD format
  status TEXT DEFAULT 'draft',
  is_active INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mints table for tracking transactions
CREATE TABLE IF NOT EXISTS mints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  car_id INTEGER NOT NULL,
  user_fid TEXT,
  transaction_hash TEXT,
  mint_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Index for active car queries
CREATE INDEX IF NOT EXISTS idx_cars_active ON cars(is_active);
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_created ON cars(created_at);

-- Insert your current active car (Light Bulb Moment)
INSERT INTO cars (
  title, description, make, model, year, vehicle_type, 
  image_url, mint_url, contract_type, contract_address, 
  edition_size, metadata_url, publication_date, status, is_active
) VALUES (
  'Light Bulb Moment',
  'When I was four-years-old my father put me on his lap and let me drive our Volkswagen Beetle. My mother screamed. My father shifted the gears. I concentrated on keeping our precious bug on the road. This was my Light Bulb Moment: I morphed into what I am today the Drivr.',
  'Volkswagen',
  'Beetle',
  1964,
  'Coupe',
  'https://assets.manifold.xyz/optimized/9506c8005f134daeb4c9eb06e80fff99f42bb5b71467549e1ad8639ee906139f/w_1204.jpg',
  'https://app.manifold.xyz/c/light-bulb-moment',
  'BASE 1155',
  '0x1c6d27a76f4f706cccb698acc236c31f886c5421',
  10,
  'https://assets.manifold.xyz/optimized/9506c8005f134daeb4c9eb06e80fff99f42bb5b71467549e1ad8639ee906139f/w_1024.jpg',
  '2025-07-04',
  'published',
  1
);
