#!/usr/bin/env python3
"""
Simple test script for 11 Surfing Woodie Wagon images
Tests database connection and basic queries
"""

import psycopg2
from psycopg2.extras import RealDictCursor
import os

def test_database():
    """Test the simple pilot database"""
    print("🧪 Testing CarMania PILOT Database (11 Surfing Woodie Images)...")
    
    # Database connection (update these for your setup)
    db_config = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'port': os.getenv('DB_PORT', '5432'),
        'database': os.getenv('DB_NAME', 'carmania_pilot'),
        'user': os.getenv('DB_USER', 'postgres'),
        'password': os.getenv('DB_PASSWORD', 'password')
    }
    
    try:
        # Connect to database
        conn = psycopg2.connect(**db_config)
        print("✅ Connected to database")
        
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Test 1: Count Surfing Woodie images
            cursor.execute("SELECT COUNT(*) as count FROM surfing_woodie_images")
            result = cursor.fetchone()
            print(f"📊 Surfing Woodie images: {result['count']}")
            
            # Test 2: List all images
            cursor.execute("SELECT token_id, image_name, car_model, year, rarity FROM surfing_woodie_images ORDER BY token_id")
            images = cursor.fetchall()
            print(f"\n🏄‍♂️ Surfing Woodie Wagon Images:")
            for img in images:
                print(f"  {img['token_id']}. {img['image_name']} - {img['car_model']} ({img['year']}) - {img['rarity']}")
            
            # Test 3: Count NFTs
            cursor.execute("SELECT COUNT(*) as count FROM carmania_nfts WHERE is_surfing_woodie = TRUE")
            result = cursor.fetchone()
            print(f"\n🪙 Surfing Woodie NFTs: {result['count']}")
            
            # Test 4: Test NFT ownership
            test_owner = "0x1234567890123456789012345678901234567890"
            cursor.execute("""
                SELECT COUNT(*) as count 
                FROM carmania_nfts 
                WHERE owner_address = %s AND is_surfing_woodie = TRUE
            """, (test_owner,))
            result = cursor.fetchone()
            print(f"🔐 NFTs owned by test address: {result['count']}")
            
            # Test 5: Get specific image data
            cursor.execute("""
                SELECT si.*, cn.owner_address
                FROM surfing_woodie_images si
                JOIN carmania_nfts cn ON si.id = cn.image_id
                WHERE si.token_id = '1'
            """)
            result = cursor.fetchone()
            if result:
                print(f"\n🚗 Sample Image Data:")
                print(f"  Name: {result['image_name']}")
                print(f"  Car: {result['car_model']} ({result['year']})")
                print(f"  Color: {result['color']}")
                print(f"  Features: {', '.join(result['special_features'])}")
                print(f"  Owner: {result['owner_address']}")
            
            # Test 6: Test Surfing Woodie detection
            test_token = "1"
            cursor.execute("""
                SELECT is_surfing_woodie 
                FROM carmania_nfts 
                WHERE token_id = %s
            """, (test_token,))
            result = cursor.fetchone()
            print(f"\n✅ Token {test_token} is Surfing Woodie: {result['is_surfing_woodie']}")
        
        conn.close()
        print("\n🎉 Database test completed successfully!")
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        print("\n📝 Setup instructions:")
        print("1. Install PostgreSQL")
        print("2. Create database: CREATE DATABASE carmania_pilot;")
        print("3. Run: psql -d carmania_pilot -f test_pilot_db.sql")
        print("4. Update database credentials in this script")

if __name__ == "__main__":
    test_database()
