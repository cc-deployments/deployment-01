-- CarMania Database Schema

-- Cars table for NFT drops
CREATE TABLE cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contract_address TEXT NOT NULL,
  car_name TEXT NOT NULL,
  date TEXT NOT NULL,
  splash_image_url TEXT,
  mint_image_url TEXT,
  description TEXT,
  mint_type TEXT CHECK(mint_type IN ('ERC-721', 'ERC-1155')) DEFAULT 'ERC-1155',
  duration INTEGER DEFAULT 7,
  is_active BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users table for tracking interactions
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mint transactions table
CREATE TABLE mints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  car_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  transaction_hash TEXT NOT NULL,
  minted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Admin actions log
CREATE TABLE admin_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  details TEXT,
  performed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_cars_active ON cars(is_active);
CREATE INDEX idx_cars_date ON cars(date);
CREATE INDEX idx_mints_car_id ON mints(car_id);
CREATE INDEX idx_mints_user_id ON mints(user_id);
CREATE INDEX idx_users_wallet ON users(wallet_address); 