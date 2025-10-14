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

**✅ COMPLETED - Database ID: `3f77a2ef-cccb-4334-8b29-3d82de26c370`**

### 2. Create KV Namespace
```bash
# Create KV namespace for caching
wrangler kv namespace create "CARMANIA_CACHE"

# This will output a namespace ID - copy it and update wrangler.toml
```

**✅ COMPLETED - KV Namespace ID: `0602ae677d7d46cfbc06751d79a727ce`**

### 3. Create R2 Bucket
```bash
# Create R2 bucket for storage
wrangler r2 bucket create carmania-storage
```

**✅ COMPLETED - R2 Bucket: `carmania-storage`**

### 4. Update Configuration
1. Open `wrangler.toml`
2. Replace `your-database-id-here` with the actual D1 database ID
3. Replace `your-kv-id-here` with the actual KV namespace ID

**✅ COMPLETED - Configuration updated with real IDs**

### 5. Initialize Database
```bash
# Apply the database schema
wrangler d1 execute carmania-db --file=./schema.sql
```

### 6. Deploy Worker
```bash
# Deploy the worker
wrangler deploy
```

**✅ COMPLETED - Worker deployed to: `https://ccult.carculture-com.workers.dev`**

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

## GitHub Actions API Token Setup

### **✅ WORKING SOLUTION (User API Token)**

We use a **User API Token** with the following permissions that have been tested and confirmed working:

#### **Required Permissions (Tested & Working):**
- **Account** → **Workers Scripts** → `Edit`
- **Account** → **Workers KV Storage** → `Edit`
- **Account** → **Workers R2 Storage** → `Edit`
- **Account** → **Workers Builds Configuration** → `Edit`
- **Account** → **Workers Observability** → `Read`

#### **Account Resources:**
- **Include**: `carculture.com`

### **Step-by-Step Token Creation:**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"** → **"Custom token"**
3. Set **Token name**: `GitHub Actions - CarMania Workers`
4. Add the permissions listed above
5. Set Account Resources to `carculture.com`
6. Click **"Create Token"** and copy immediately
7. Add to GitHub Secrets as `CLOUDFLARE_API_TOKEN`

### **Testing Token Locally:**
```bash
cd coinbase/cloudflare-api
export CLOUDFLARE_API_TOKEN='your-token-here'
wrangler whoami  # Test authentication
wrangler deploy --dry-run  # Test deployment
```

### **✅ Verification Commands:**
```bash
# Test authentication
wrangler whoami

# Test deployment (dry-run)
wrangler deploy --dry-run

# Expected output shows:
# - Account: carculture.com
# - All bindings accessible (D1, KV, R2)
# - No authentication errors
```

### **🔄 Future Improvement (Pre-Launch):**
- **Migrate to Account API Tokens** for better security
- **Add to TODO** before production launch
- **Follow Cloudflare best practices** for team environments 

## **🏗️ BASE AI Monorepo Architecture Recommendation**

### **Current Issue:**
Cloudflare Worker files are mixed inside the FC MiniApp directory:
```
coinbase/fc-minikit/
├── app/           # Next.js MiniApp
├── src/index.js   # Cloudflare Worker ❌ (mixed)
└── wrangler.toml  # Cloudflare config
```

### **BASE AI's Recommended Structure:**
```
CCulture-Apps-New/
├── coinbase/
│   ├── fc-minikit/           # Next.js MiniApp (clean)
│   │   ├── app/
│   │   └── (no Cloudflare files)
│   ├── socialidentity/       # Social Identity web app
│   ├── web-app/             # Main web app
│   └── cloudflare-api/      # Separate Cloudflare Worker
│       ├── src/index.js
│       └── wrangler.toml
└── packages/
    ├── shared-auth/         # Shared authentication
    ├── shared-config/       # Shared environment config
    └── shared-ui/          # Shared UI components
```

### **Benefits of BASE AI's Structure:**
- ✅ **Separation of concerns** - Each app has its own directory
- ✅ **Shared dependencies** - All apps use shared packages
- ✅ **Clean deployment** - Each app can deploy independently
- ✅ **Easy maintenance** - Clear boundaries between apps
- ✅ **Scalable architecture** - Easy to add new apps

### **Migration Steps:**
1. Create `coinbase/cloudflare-api/` directory
2. Move `src/index.js` and `wrangler.toml` from `fc-minikit/`
3. Update deployment scripts to target correct directories
4. Test all apps work with new structure

## **✅ LIVE WORKER STATUS**

### **🌐 Your Live Worker URL:**
```
https://ccult.carculture-com.workers.dev
```

### **🔗 API Endpoints Available:**
- **Health Check**: `https://ccult.carculture-com.workers.dev/`
- **Get All Cars**: `https://ccult.carculture-com.workers.dev/api/cars`
- **Get Active Car**: `https://ccult.carculture-com.workers.dev/api/cars/active`
- **Create Mint**: `POST https://ccult.carculture-com.workers.dev/api/mints`

### **✅ Deployment Status:**
- **Worker Name**: `ccult`
- **Database**: Connected (D1)
- **Cache**: Connected (KV)
- **Storage**: Connected (R2)
- **CORS**: Enabled for all origins
- **Status**: ✅ LIVE AND OPERATIONAL

## **📋 COMPLETE API VALUES FOR RECORDS**

### **🔐 Cloudflare Account Details:**
- **Account Name**: `carculture.com`
- **Account ID**: `b890b200e5f45415e66944982aad0a23`
- **Email**: `cindy.lewis@me.com`

### **⚙️ Cloudflare Worker Configuration:**
- **Worker Name**: `ccult`
- **Main File**: `index.js`
- **Compatibility Date**: `2024-01-01`

### **🗄️ Database & Storage Resources:**

#### **D1 Database:**
- **Binding**: `DB`
- **Database Name**: `carmania-db`
- **Database ID**: `3f77a2ef-cccb-4334-8b29-3d82de26c370`

#### **KV Namespace (Cache):**
- **Binding**: `CACHE`
- **Namespace ID**: `0602ae677d7d46cfbc06751d79a727ce`
- **Name**: `CARMANIA_CACHE`

#### **R2 Bucket (Storage):**
- **Binding**: `STORAGE`
- **Bucket Name**: `carmania-storage`

### **🔑 Token Permissions (Updated 2025-07-26):**
- `account (read)`
- `user (read)` ✅ (Includes Memberships)
- `workers (write)`
- `workers_kv (write)`
- `workers_routes (write)`
- `workers_scripts (write)`
- `workers_tail (read)`
- `d1 (write)`
- `pages (write)`
- `zone (read)`
- `ssl_certs (write)`
- `ai (write)`
- `queues (write)`
- `pipelines (write)`
- `secrets_store (write)`
- `containers (write)`
- `cloudchamber (write)`
- `offline_access`

### **🌐 GitHub Repository:**
- **Repository**: `flatout/web3-social-starter`
- **GitHub Secret**: `CLOUDFLARE_API_TOKEN`
- **Token Name**: `GitHub Actions - CarMania Workers`

## **🛠️ Deployment Workflow**

### **Step-by-Step Process (Completed):**

1. **✅ Login to Cloudflare**
   ```bash
   wrangler login
   ```

2. **✅ Get Database IDs**
   ```bash
   wrangler d1 list
   wrangler kv namespace list
   ```

3. **✅ Create wrangler.toml**
   - Added real database IDs
   - Configured bindings
   - Removed build script

4. **✅ Create Worker Source Code**
   - Created `src/index.js`
   - Implemented API endpoints
   - Added CORS headers

5. **✅ Deploy Worker**
   ```bash
   wrangler deploy
   ```

6. **✅ Update Wrangler CLI**
   ```bash
   npm install -g wrangler@latest
   # Updated from 4.24.4 to 4.26.0
   ```

### **🔧 Troubleshooting:**

**Issue**: `npm run build:worker` missing
**Solution**: Remove build script from `wrangler.toml`

**Issue**: GitHub Actions failing on Cloudflare Workers
**Solution**: Add `wrangler.toml` and `src/index.js` to repository

**Issue**: Missing database IDs
**Solution**: Use `wrangler d1 list` and `wrangler kv namespace list`

### **📊 Current Configuration:**
```toml
# wrangler.toml
name = "ccult"
main = "src/index.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "carmania-db"
database_id = "3f77a2ef-cccb-4334-8b29-3d82de26c370"

[[kv_namespaces]]
binding = "CACHE"
id = "0602ae677d7d46cfbc06751d79a727ce"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "carmania-storage"
```

### **🚀 Next Steps:**
1. **Test API endpoints** using the URLs above
2. **Integrate with MiniApp** to use these endpoints
3. **Monitor deployments** in GitHub Actions
4. **Add authentication** for production use 

## **⚠️ CRITICAL: Database Sync Issue (2025-09-01)**

### **Problem Identified:**
- **Local CSV files** (`sql_carculture_public_local/`) contain all NFT data with correct dates
- **Cloudflare D1 database** is **EMPTY** (no cars table data)
- **API endpoints** serve from empty D1 database, causing "wiped out test images"
- **Calendar sync issue**: File timestamps show August 2025 dates, but system date is September 1, 2025

### **Current Status:**
- ✅ **Local CSV files**: Complete NFT data (9 entries)
- ❌ **D1 Database**: Empty cars table
- ❌ **API**: Returns no data (serves from empty D1)
- ❌ **Sync**: No connection between local files and live database

### **Solution Required:**
1. **Populate D1 database** with data from local CSV files
2. **Add new "Summertime Blues" NFT** to both local and D1
3. **Establish sync process** between local tracking and live API
4. **Fix date timestamps** in local files

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

## **🎯 CURRENT RECENT IMAGE WORKFLOW (2025-07-27)**

### **Quick Fix Implementation:**
- **Previous URL**: `https://app.manifold.xyz/c/man-driving-car` (April 22, 2025 - outdated)
- **Current URL**: `https://app.manifold.xyz/c/light-bulb-moment` (July 4, 2025 - current)
- **Status**: ✅ All "Unlock the Ride" buttons updated to current recent image

### **Updated Files:**
1. **`text-page/page.tsx`** - Updated hardcoded URL
2. **`gallery-hero/page.tsx`** - Updated hardcoded URL  
3. **`gallery-hero-2/page.tsx`** - Updated hardcoded URL

### **Next Steps for Dynamic System:**
1. **Populate Cloudflare Database** with current images from CSV
2. **Implement API Integration** to fetch most recent mint URL
3. **Update Documentation** with full dynamic workflow

### **Database Analysis Results:**
- **Most Recent Published**: "Light Bulb Moment" (July 4, 2025)
- **Latest Scheduled**: "Teenyosaurus" (July 9, 2025)
- **Current Active**: "Light Bulb Moment" - `https://app.manifold.xyz/c/light-bulb-moment` 