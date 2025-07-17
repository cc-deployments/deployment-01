# Cloudflare Backend Setup for CarMania

## Overview
This setup creates a Cloudflare Workers backend with D1 database, KV storage, and R2 object storage for the CarMania MiniApp.

## Prerequisites
- Cloudflare account (you're already logged in)
- Wrangler CLI installed (`npm install -g wrangler`)

## Setup Steps

### 1. Create D1 Database
```bash
# Create the database
wrangler d1 create carmania-db

# This will output a database ID - copy it and update wrangler.toml
```

### 2. Create KV Namespace
```bash
# Create KV namespace for caching
wrangler kv:namespace create "CARMANIA_CACHE"

# This will output a namespace ID - copy it and update wrangler.toml
```

### 3. Create R2 Bucket
```bash
# Create R2 bucket for storage
wrangler r2 bucket create carmania-storage
```

### 4. Update Configuration
1. Open `wrangler.toml`
2. Replace `your-database-id-here` with the actual D1 database ID
3. Replace `your-kv-id-here` with the actual KV namespace ID

### 5. Initialize Database
```bash
# Apply the database schema
wrangler d1 execute carmania-db --file=./schema.sql
```

### 6. Deploy Worker
```bash
# Deploy the worker
npm run deploy:worker
```

## API Endpoints

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/active` - Get active car
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Mints
- `POST /api/mints` - Record mint transaction

## Environment Variables
The worker uses these bindings:
- `DB` - D1 database for car and user data
- `CACHE` - KV namespace for caching
- `STORAGE` - R2 bucket for file storage

## Local Development
```bash
# Start local development server
npm run dev:worker
```

## Integration with MiniApp
Update your MiniApp components to use these API endpoints instead of localStorage.

## Security Notes
- CORS is enabled for all origins (update for production)
- No authentication implemented (add as needed)
- Consider adding rate limiting for production 

## **How to Access Your Live Worker**

Now that you've enabled the workers.dev route, your Worker should be accessible at a URL like:

```
https://carculture-miniapp-backend.<your-account>.workers.dev
```

- `<your-account>` is usually your Cloudflare account's chosen subdomain (sometimes your account name or email prefix).
- You can find the exact public URL in the "Domains & Routes" section of your Worker's settings, right next to the "Enable" button you clicked.

### **What to Do Next**

1. **Look for the full workers.dev URL in the dashboard.**
   - It should be listed under "Domains & Routes" after you enabled it.
   - It will look something like:  
     `https://carculture-miniapp-backend.<your-subdomain>.workers.dev`

2. **Copy and visit that URL in your browser.**
   - Try appending `/api/cars` to test your API endpoint:  
     `https://carculture-miniapp-backend.<your-subdomain>.workers.dev/api/cars`

3. **If you get a response, your backend is live!**

---

**If you're not sure what your workers.dev subdomain is, let me know what you see in the "Domains & Routes" section after enabling, and I'll help you find the exact URL.**

You're almost done—let me know what you see or if you need help finding your public Worker URL! 

## **Local SQL Database Structure**

### **Location**: `sql_carculture_public_local/`

The project uses CSV files as a local SQL database for tracking assets and content:

### **1. NFT Collection Database** (`sql_carculture_public_local.csv`)
- **Purpose**: Tracks all published NFTs
- **Key fields**: `filename`, `Chain`, `Contract`, `arweave_image_url`, `title`, `description`, `make`, `model`, `year`, `vehicle_type`
- **Contains**: 9 NFT entries including "The Thing", "Barn Fresh", "Light Bulb Moment", etc.

### **2. Cloudflare Assets Database** (`cloudflare_assets_public.csv`)
- **Purpose**: Tracks Cloudflare R2 web assets
- **Key fields**: `filename`, `url`, `description`, `tags`, `uploaded_at`, `usage`, `size_bytes`, `content_type`
- **Contains**: Share images, logos, and other web assets
- **Current assets**:
  - `carmania-share.png` - Farcaster Mini App embed image
  - `carculture-logo-black-transp.png` - Black logo (9,694 bytes)
  - `carculture-logo-wing-white-trans.png` - White wing logo (2040px)

### **3. Content Schedule Database** (`carculture_content_schedule.csv`)
- **Purpose**: Content planning and publication schedule
- **Key fields**: `content_type`, `publication_date`, `title`, `description`, `status`
- **Contains**: Scheduled content from July 2-9, 2025

### **R2 Public URLs**
- **Base URL**: `https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/`
- **Bucket**: `carmania-storage`
- **All assets**: Under 1024 character limit for Farcaster embeds

### **Git Tracking**
- ✅ **Tracked**: All CSV database files
- ❌ **Untracked**: Binary image files (intentional)
- **Version control**: Database structure and metadata only 