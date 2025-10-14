#!/bin/bash
# Setup script for EDITION-based PILOT database

echo "🏄‍♂️ Setting up CarMania PILOT Database (EDITION Mints)..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   macOS: brew services start postgresql"
    echo "   Ubuntu: sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "📋 Creating database..."
createdb carmania_pilot 2>/dev/null || echo "Database already exists"

# Run the SQL setup
echo "🗄️ Setting up EDITION tables and data..."
psql -d carmania_pilot -f edition_pilot_db.sql

if [ $? -eq 0 ]; then
    echo "✅ EDITION database setup complete!"
    echo ""
    echo "📊 Test the database:"
    echo "   cd /Users/carculture/Projects/CCulture-Apps-New/nft_car_system"
    echo "   python3 test_edition_db.py"
    echo ""
    echo "🔗 Update your filenames to match your HF ML data:"
    echo "   - Update the filename column in surfing_woodie_editions"
    echo "   - Update the manifold_id column with your real Manifold IDs"
    echo "   - Test with real ownership data"
    echo ""
    echo "🚀 Ready for PILOT testing with EDITION mints!"
else
    echo "❌ Database setup failed"
    exit 1
fi

