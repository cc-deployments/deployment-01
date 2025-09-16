# 🗄️ CarMania PILOT Database Setup

## PostgreSQL Database for Surfing Woodie Wagon NFTs

This guide will help you set up the PostgreSQL database for the CarMania PILOT program.

## 📋 Prerequisites

1. **PostgreSQL installed** (version 12 or higher)
2. **Database user** with CREATE privileges
3. **Node.js** with pg package installed

## 🚀 Quick Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database User

```bash
# Connect to PostgreSQL
psql -U postgres

# Create user and database
CREATE USER carmania_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE carmania_pilot OWNER carmania_user;
GRANT ALL PRIVILEGES ON DATABASE carmania_pilot TO carmania_user;
\q
```

### 3. Set Environment Variables

Create a `.env` file in the agents directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=carmania_pilot
DB_USER=carmania_user
DB_PASSWORD=your_secure_password
DB_SSL=false
```

### 4. Run Database Setup

```bash
cd /Users/carculture/Projects/CCulture-Apps-New/agents
node setup-database.js
```

## 📊 Database Schema

### `surfing_woodie_images` Table
Stores the 11 Surfing Woodie Wagon images and their metadata:

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Unique identifier |
| `token_id` | VARCHAR(50) | NFT token ID |
| `image_name` | VARCHAR(255) | Human-readable name |
| `image_url` | TEXT | Image URL |
| `car_model` | VARCHAR(255) | Car model (e.g., "1947 Ford Woodie Wagon") |
| `year` | VARCHAR(10) | Year of the car |
| `color` | VARCHAR(100) | Car color description |
| `special_features` | TEXT[] | Array of special features |
| `history` | TEXT | Car history and background |
| `technical_specs` | TEXT | Technical specifications |
| `cultural_significance` | TEXT | Cultural importance |
| `rarity` | VARCHAR(50) | Rarity level |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### `carmania_nfts` Table
Tracks NFT ownership and links to Surfing Woodie images:

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Unique identifier |
| `token_id` | VARCHAR(50) | NFT token ID |
| `contract_address` | VARCHAR(42) | Contract address (0x8ef0772347e0caed0119937175d7ef9636ae1aa0) |
| `owner_address` | VARCHAR(42) | Current owner's wallet address |
| `is_surfing_woodie` | BOOLEAN | TRUE if this is a Surfing Woodie Wagon NFT |
| `image_id` | INTEGER | Foreign key to surfing_woodie_images |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## 🏄‍♂️ PILOT Data Population

After setting up the database, you'll need to populate it with your 11 Surfing Woodie Wagon images:

### 1. Add Images to `surfing_woodie_images`

```sql
INSERT INTO surfing_woodie_images (
  token_id, image_name, image_url, car_model, year, color, 
  special_features, history, technical_specs, cultural_significance, rarity
) VALUES (
  '1', 'Classic Surf Wagon #1', 'https://carmania.carculture.com/surfing-woodie-1.jpg',
  '1947 Ford Woodie Wagon', '1947', 'Natural Wood with Dark Panels',
  ARRAY['Wood paneling', 'Surfboard rack', 'Classic styling'],
  'This iconic 1947 Ford Woodie Wagon represents the golden age of American automotive design...',
  'Engine: Flathead V8, Transmission: 3-speed manual, Weight: 3,200 lbs',
  'The woodie wagon is deeply embedded in American surf culture...',
  'Rare'
);
```

### 2. Add NFT Ownership to `carmania_nfts`

```sql
INSERT INTO carmania_nfts (
  token_id, contract_address, owner_address, is_surfing_woodie, image_id
) VALUES (
  '1', '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', 
  '0x1234567890123456789012345678901234567890', 
  TRUE, 1
);
```

## 🧪 Testing the Setup

Run the PILOT system test:

```bash
node test-pilot-system.js
```

This will:
1. Connect to the database
2. Check for Surfing Woodie Wagon NFTs
3. Test car-specific chat functionality

## 🔧 Troubleshooting

### Connection Issues
- Verify PostgreSQL is running: `brew services list | grep postgresql`
- Check credentials in `.env` file
- Ensure database exists: `psql -U carmania_user -d carmania_pilot -c "SELECT 1;"`

### Permission Issues
- Grant proper privileges to your user
- Check if user can create tables

### SSL Issues
- Set `DB_SSL=false` for local development
- Set `DB_SSL=true` for production with proper certificates

## 📝 Next Steps

1. **Populate the database** with your 11 Surfing Woodie Wagon images
2. **Add NFT ownership data** for testing
3. **Test the PILOT system** with real NFT holders
4. **Deploy to production** when ready

---

**Ready to populate your 11 Surfing Woodie Wagon images! 🏄‍♂️**
