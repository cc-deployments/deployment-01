#!/bin/bash
# Simple setup script for 11 Surfing Woodie Wagon test database

echo "🏄‍♂️ Setting up CarMania PILOT Test Database (11 Surfing Woodie Images)..."

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
echo "🗄️ Setting up tables and data..."
psql -d carmania_pilot -f test_pilot_db.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
    echo ""
    echo "📊 Test the database:"
    echo "   cd /Users/carculture/Projects/CCulture-Apps-New/nft_car_system"
    echo "   python3 test_pilot_db.py"
    echo ""
    echo "🚀 Ready for PILOT testing with 11 Surfing Woodie Wagon images!"
else
    echo "❌ Database setup failed"
    exit 1
fi

