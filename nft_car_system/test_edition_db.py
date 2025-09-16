#!/usr/bin/env python3
"""
Test script for EDITION-based PILOT database
Tests filename matching to Hugging Face ML data
"""

import psycopg2
from psycopg2.extras import RealDictCursor
import os

def test_edition_database():
    """Test the EDITION-based pilot database"""
    print("🏄‍♂️ Testing CarMania PILOT Database (EDITION Mints)...")
    
    # Database connection
    db_config = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'port': os.getenv('DB_PORT', '5432'),
        'database': os.getenv('DB_NAME', 'carmania_pilot'),
        'user': os.getenv('DB_USER', 'postgres'),
        'password': os.getenv('DB_PASSWORD', 'password')
    }
    
    try:
        conn = psycopg2.connect(**db_config)
        print("✅ Connected to database")
        
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Test 1: Count Surfing Woodie editions
            cursor.execute("SELECT COUNT(*) as count FROM surfing_woodie_editions")
            result = cursor.fetchone()
            print(f"📊 Surfing Woodie editions: {result['count']}")
            
            # Test 2: List all editions with Manifold URLs
            cursor.execute("""
                SELECT title, filename, manifold_id, manifold_url 
                FROM surfing_woodie_editions 
                ORDER BY id
            """)
            editions = cursor.fetchall()
            print(f"\n🏄‍♂️ Surfing Woodie Wagon Editions:")
            for edition in editions:
                print(f"  {edition['title']}")
                print(f"    Filename: {edition['filename']}")
                print(f"    Manifold ID: {edition['manifold_id']}")
                print(f"    URL: {edition['manifold_url']}")
                print()
            
            # Test 3: Test filename lookup (this will match to your HF ML data)
            test_filename = "surfing-woodie-1.jpg"
            cursor.execute("""
                SELECT * FROM surfing_woodie_editions 
                WHERE filename = %s
            """, (test_filename,))
            result = cursor.fetchone()
            if result:
                print(f"🔍 Filename lookup test:")
                print(f"  Found: {result['title']}")
                print(f"  Manifold URL: {result['manifold_url']}")
                print(f"  Is Surfing Woodie: {result['is_surfing_woodie']}")
            
            # Test 4: Test ownership functions
            test_owner = "0x1234567890123456789012345678901234567890"
            cursor.execute("SELECT user_owns_surfing_woodie(%s)", (test_owner,))
            owns_woodie = cursor.fetchone()[0]
            print(f"\n🔐 User owns Surfing Woodie editions: {owns_woodie}")
            
            # Test 5: Get user's editions
            cursor.execute("SELECT * FROM get_user_surfing_woodie_editions(%s)", (test_owner,))
            user_editions = cursor.fetchall()
            print(f"📋 User's Surfing Woodie editions: {len(user_editions)}")
            for edition in user_editions:
                print(f"  - {edition['title']} (Qty: {edition['quantity_owned']})")
            
            # Test 6: Test the view
            cursor.execute("SELECT COUNT(*) as count FROM surfing_woodie_editions_with_ownership")
            result = cursor.fetchone()
            print(f"\n👀 View records: {result['count']}")
        
        conn.close()
        print("\n🎉 EDITION database test completed successfully!")
        print("\n📝 Next steps:")
        print("1. Update the filenames to match your actual HF ML data")
        print("2. Update Manifold IDs to your real edition IDs")
        print("3. Test with real ownership data")
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        print("\n📝 Setup instructions:")
        print("1. Install PostgreSQL")
        print("2. Create database: CREATE DATABASE carmania_pilot;")
        print("3. Run: psql -d carmania_pilot -f edition_pilot_db.sql")
        print("4. Update database credentials in this script")

if __name__ == "__main__":
    test_edition_database()
