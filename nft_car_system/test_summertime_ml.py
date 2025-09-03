#!/usr/bin/env python3
"""
Test ML API with Summertime Blues image
"""
import requests
import base64
import json
from PIL import Image
import io

def image_to_base64(image_path):
    """Convert image to base64 for API"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def test_summertime_blues():
    """Test ML analysis on Summertime Blues"""
    
    # Image path
    image_path = "./data/images/2025-06-15/CAR05CHH09025142-Summertime Blues_wm.TIF"
    
    print("🚗 Testing Summertime Blues with ML API...")
    print(f"📁 Image: {image_path}")
    
    try:
        # Convert image to base64
        print("🔄 Converting image to base64...")
        image_base64 = image_to_base64(image_path)
        
        # Prepare API request
        api_url = "http://localhost:8000/analyze-nft"
        payload = {
            "image_base64": image_base64,
            "token_id": "summertime_blues_test",
            "collection_address": "0x1c6d27a76f4f706cccb698acc236c31f886c5421",
            "user_question": "Tell me about this car and its story"
        }
        
        print("🧠 Sending request to ML API...")
        response = requests.post(api_url, json=payload, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ ML Analysis Successful!")
            print("\n" + "="*50)
            print("🚗 SUMMERTIME BLUES ML ANALYSIS")
            print("="*50)
            
            print(f"🎯 Car Recognition: {result.get('car_recognition', 'N/A')}")
            print(f"📝 Story Generation: {result.get('story_generation', 'N/A')}")
            print(f"💬 Chat Response: {result.get('chat_response', 'N/A')}")
            print(f"🏷️  Detected Traits: {result.get('detected_traits', 'N/A')}")
            print(f"📊 Confidence: {result.get('confidence_score', 'N/A')}")
            
            if 'metadata' in result:
                print(f"\n📋 Metadata: {json.dumps(result['metadata'], indent=2)}")
                
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    test_summertime_blues()


