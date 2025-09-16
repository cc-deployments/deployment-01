#!/usr/bin/env python3
"""
CarMania PILOT Database Service
Integrates with Hugging Face models and ArDrive data
Location: /Users/carculture/Projects/CCulture-Apps-New/nft_car_system/
"""

import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import List, Dict, Optional, Tuple
import hashlib
from datetime import datetime

class PilotDatabaseService:
    def __init__(self, db_config: Dict[str, str] = None):
        """
        Initialize database connection
        """
        if db_config is None:
            db_config = {
                'host': os.getenv('DB_HOST', 'localhost'),
                'port': os.getenv('DB_PORT', '5432'),
                'database': os.getenv('DB_NAME', 'carmania_pilot'),
                'user': os.getenv('DB_USER', 'postgres'),
                'password': os.getenv('DB_PASSWORD', 'password')
            }
        
        self.db_config = db_config
        self.connection = None
        self.carmania_collection_address = '0x8ef0772347e0caed0119937175d7ef9636ae1aa0'
    
    def connect(self):
        """Connect to PostgreSQL database"""
        try:
            self.connection = psycopg2.connect(**self.db_config)
            print("✅ Connected to CarMania PILOT database")
            return True
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            return False
    
    def disconnect(self):
        """Disconnect from database"""
        if self.connection:
            self.connection.close()
            print("🔌 Database disconnected")
    
    def is_token_surfing_woodie(self, token_id: str) -> bool:
        """Check if a token ID is a Surfing Woodie Wagon NFT"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    SELECT is_surfing_woodie 
                    FROM carmania_nfts 
                    WHERE token_id = %s AND contract_address = %s
                """, (token_id, self.carmania_collection_address))
                
                result = cursor.fetchone()
                return result[0] if result else False
        except Exception as e:
            print(f"Error checking Surfing Woodie status for token {token_id}: {e}")
            return False
    
    def get_surfing_woodie_data(self, token_id: str) -> Optional[Dict]:
        """Get complete Surfing Woodie data for a token ID"""
        try:
            with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("""
                    SELECT 
                        si.*,
                        cn.owner_address,
                        cn.nft_metadata
                    FROM surfing_woodie_images si
                    JOIN carmania_nfts cn ON si.id = cn.image_id
                    WHERE cn.token_id = %s AND cn.contract_address = %s
                """, (token_id, self.carmania_collection_address))
                
                result = cursor.fetchone()
                return dict(result) if result else None
        except Exception as e:
            print(f"Error fetching Surfing Woodie data for token {token_id}: {e}")
            return None
    
    def get_all_surfing_woodie_images(self) -> List[Dict]:
        """Get all Surfing Woodie images with their data"""
        try:
            with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM surfing_woodie_images ORDER BY id")
                return [dict(row) for row in cursor.fetchall()]
        except Exception as e:
            print(f"Error fetching all Surfing Woodie images: {e}")
            return []
    
    def add_surfing_woodie_image(self, image_data: Dict) -> bool:
        """Add a new Surfing Woodie image with ML data"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO surfing_woodie_images (
                        token_id, image_name, image_url, ardrive_file_id, 
                        huggingface_model_path, car_model, year, color, 
                        special_features, history, technical_specs, 
                        cultural_significance, rarity, ml_confidence_score, 
                        training_data_hash
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                """, (
                    image_data['token_id'],
                    image_data['image_name'],
                    image_data['image_url'],
                    image_data.get('ardrive_file_id'),
                    image_data.get('huggingface_model_path'),
                    image_data['car_model'],
                    image_data['year'],
                    image_data['color'],
                    image_data.get('special_features', []),
                    image_data['history'],
                    image_data['technical_specs'],
                    image_data['cultural_significance'],
                    image_data['rarity'],
                    image_data.get('ml_confidence_score'),
                    image_data.get('training_data_hash')
                ))
                self.connection.commit()
                print(f"✅ Added Surfing Woodie image: {image_data['image_name']}")
                return True
        except Exception as e:
            print(f"❌ Error adding Surfing Woodie image: {e}")
            return False
    
    def add_nft_ownership(self, token_id: str, owner_address: str, 
                         image_id: int, nft_metadata: Dict = None) -> bool:
        """Add NFT ownership record"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO carmania_nfts (
                        token_id, contract_address, owner_address, 
                        is_surfing_woodie, image_id, nft_metadata, last_verified
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s
                    )
                    ON CONFLICT (token_id, contract_address) 
                    DO UPDATE SET 
                        owner_address = EXCLUDED.owner_address,
                        is_surfing_woodie = EXCLUDED.is_surfing_woodie,
                        image_id = EXCLUDED.image_id,
                        nft_metadata = EXCLUDED.nft_metadata,
                        last_verified = EXCLUDED.last_verified,
                        updated_at = CURRENT_TIMESTAMP
                """, (
                    token_id,
                    self.carmania_collection_address,
                    owner_address,
                    True,  # This is a Surfing Woodie NFT
                    image_id,
                    json.dumps(nft_metadata) if nft_metadata else None,
                    datetime.now()
                ))
                self.connection.commit()
                print(f"✅ Added NFT ownership: Token {token_id} -> Owner {owner_address}")
                return True
        except Exception as e:
            print(f"❌ Error adding NFT ownership: {e}")
            return False
    
    def update_ml_confidence(self, token_id: str, confidence: float) -> bool:
        """Update ML confidence score for a token"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE surfing_woodie_images 
                    SET ml_confidence_score = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE token_id = %s
                """, (confidence, token_id))
                self.connection.commit()
                print(f"✅ Updated ML confidence for token {token_id}: {confidence}")
                return True
        except Exception as e:
            print(f"❌ Error updating ML confidence: {e}")
            return False
    
    def verify_nft_ownership(self, token_id: str, owner_address: str) -> bool:
        """Verify if an address owns a specific Surfing Woodie NFT"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    SELECT verify_nft_ownership(%s, %s)
                """, (token_id, owner_address))
                result = cursor.fetchone()
                return result[0] if result else False
        except Exception as e:
            print(f"❌ Error verifying NFT ownership: {e}")
            return False
    
    def get_surfing_woodie_nfts_for_owner(self, owner_address: str) -> List[Dict]:
        """Get all Surfing Woodie NFTs owned by an address"""
        try:
            with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("""
                    SELECT * FROM surfing_woodie_nfts 
                    WHERE owner_address = %s
                    ORDER BY token_id
                """, (owner_address,))
                return [dict(row) for row in cursor.fetchall()]
        except Exception as e:
            print(f"❌ Error fetching NFTs for owner {owner_address}: {e}")
            return []
    
    def create_training_session(self, session_name: str, model_type: str, 
                              huggingface_repo: str = None, ardrive_folder_id: str = None) -> int:
        """Create a new ML training session record"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO ml_training_sessions (
                        session_name, model_type, huggingface_repo, ardrive_folder_id, status
                    ) VALUES (%s, %s, %s, %s, 'pending')
                    RETURNING id
                """, (session_name, model_type, huggingface_repo, ardrive_folder_id))
                session_id = cursor.fetchone()[0]
                self.connection.commit()
                print(f"✅ Created training session: {session_name} (ID: {session_id})")
                return session_id
        except Exception as e:
            print(f"❌ Error creating training session: {e}")
            return None
    
    def update_training_session(self, session_id: int, status: str, 
                              accuracy: float = None, duration: int = None) -> bool:
        """Update training session status and results"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE ml_training_sessions 
                    SET status = %s, model_accuracy = %s, training_duration = %s,
                        completed_at = CASE WHEN %s = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (status, accuracy, duration, status, session_id))
                self.connection.commit()
                print(f"✅ Updated training session {session_id}: {status}")
                return True
        except Exception as e:
            print(f"❌ Error updating training session: {e}")
            return False
    
    def generate_training_data_hash(self, data: str) -> str:
        """Generate hash for training data verification"""
        return hashlib.sha256(data.encode()).hexdigest()
    
    def test_connection(self) -> bool:
        """Test database connection"""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                result = cursor.fetchone()
                return result[0] == 1
        except Exception as e:
            print(f"❌ Database connection test failed: {e}")
            return False

def main():
    """Test the database service"""
    print("🧪 Testing CarMania PILOT Database Service...")
    
    # Initialize database service
    db = PilotDatabaseService()
    
    if not db.connect():
        print("❌ Failed to connect to database")
        return
    
    # Test connection
    if db.test_connection():
        print("✅ Database connection test passed")
    else:
        print("❌ Database connection test failed")
        return
    
    # Test getting all Surfing Woodie images
    images = db.get_all_surfing_woodie_images()
    print(f"📊 Found {len(images)} Surfing Woodie images in database")
    
    # Test NFT ownership verification
    test_token = "1"
    test_owner = "0x1234567890123456789012345678901234567890"
    is_owner = db.verify_nft_ownership(test_token, test_owner)
    print(f"🔐 NFT ownership test: Token {test_token} owned by {test_owner} = {is_owner}")
    
    # Test getting Surfing Woodie data
    woodie_data = db.get_surfing_woodie_data(test_token)
    if woodie_data:
        print(f"🚗 Found Surfing Woodie data: {woodie_data['car_model']}")
    else:
        print("❌ No Surfing Woodie data found")
    
    db.disconnect()
    print("🎉 Database service test complete!")

if __name__ == "__main__":
    main()
