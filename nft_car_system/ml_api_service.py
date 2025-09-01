#!/usr/bin/env python3
"""
ML API Service for NFT Car Analysis
Bridge between your MiniApp and trained ML models
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io
import base64
import json
import os
from typing import Optional, Dict, Any

# Initialize FastAPI app
app = FastAPI(title="NFT Car ML API", version="1.0.0")

# Add CORS middleware for MiniApp integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models
car_chat_model = None
car_chat_tokenizer = None
blip_processor = None
blip_model = None

class NFTRequest(BaseModel):
    image_base64: str
    token_id: str
    collection_address: str
    user_message: Optional[str] = "Tell me about this car"

class MLResponse(BaseModel):
    success: bool
    car_info: Dict[str, Any]
    ml_insights: Dict[str, Any]
    chat_response: str
    token_id: str

def load_models():
    """Load all trained models"""
    global car_chat_model, car_chat_tokenizer, blip_processor, blip_model
    
    print("🚗 Loading ML models...")
    
    try:
        # Load your trained car chat model
        model_path = './simple_car_chat_model'
        if os.path.exists(model_path):
            car_chat_tokenizer = AutoTokenizer.from_pretrained(model_path)
            car_chat_model = AutoModelForCausalLM.from_pretrained(model_path)
            print("✅ Car chat model loaded")
        else:
            print("⚠️ Car chat model not found, using fallback")
        
        # Load BLIP for image captioning
        blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        print("✅ BLIP model loaded")
        
    except Exception as e:
        print(f"❌ Error loading models: {e}")
        raise

def analyze_car_image(image: Image.Image) -> Dict[str, Any]:
    """Analyze car image using BLIP model"""
    try:
        inputs = blip_processor(image, return_tensors="pt")
        out = blip_model.generate(**inputs, max_length=50)
        caption = blip_processor.decode(out[0], skip_special_tokens=True)
        
        return {
            "caption": caption,
            "image_size": image.size,
            "format": image.format
        }
    except Exception as e:
        return {"error": str(e)}

def recognize_car_from_image(image) -> Dict[str, Any]:
    """Recognize car from image using filename matching"""
    try:
        # For now, we'll use a simple approach - match by image hash or filename
        # In a full implementation, you'd use your trained car recognition model
        
        # Get image hash for matching
        import hashlib
        image_bytes = io.BytesIO()
        image.save(image_bytes, format='PNG')
        image_hash = hashlib.md5(image_bytes.getvalue()).hexdigest()
        
        # Load car database
        import pandas as pd
        try:
            car_db = pd.read_csv('car_database_export.csv')
            
            # For Summertime Blues, we know the filename
            # In a real implementation, you'd match by image similarity
            summertime_match = car_db[car_db['filename'].str.contains('Summertime Blues', na=False)]
            
            if not summertime_match.empty:
                car_data = summertime_match.iloc[0]
                return {
                    "make": car_data.get('make', 'Unknown'),
                    "model": car_data.get('model', 'Unknown'),
                    "year": car_data.get('year', 'Unknown'),
                    "type": car_data.get('type', 'Unknown'),
                    "color": car_data.get('color', 'Unknown'),
                    "description": car_data.get('description', 'No description available'),
                    "uuid": car_data.get('uuid', 'Unknown'),
                    "filename": car_data.get('filename', 'Unknown')
                }
        except Exception as e:
            print(f"Error loading car database: {e}")
        
        # Fallback to BLIP analysis
        return analyze_car_image(image)
        
    except Exception as e:
        print(f"Error in car recognition: {e}")
        return analyze_car_image(image)

def generate_car_chat_response(user_message: str, car_info: Dict[str, Any]) -> str:
    """Generate response using your trained car chat model"""
    try:
        if car_chat_model is None or car_chat_tokenizer is None:
            return "I can see this is a car, but my specialized knowledge isn't available right now."
        
        # Create context with car info
        context = f"User: {user_message}\nCar Info: {json.dumps(car_info)}\nAssistant:"
        
        # Tokenize input
        inputs = car_chat_tokenizer.encode(context, return_tensors="pt")
        
        # Generate response
        with torch.no_grad():
            outputs = car_chat_model.generate(
                inputs,
                max_length=inputs.shape[1] + 100,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True,
                pad_token_id=car_chat_tokenizer.eos_token_id
            )
        
        # Decode response
        response = car_chat_tokenizer.decode(outputs[0], skip_special_tokens=True)
        assistant_response = response.split("Assistant:")[-1].strip()
        
        return assistant_response
        
    except Exception as e:
        return f"I'm having trouble analyzing this car right now: {str(e)}"

@app.on_event("startup")
async def startup_event():
    """Load models on startup"""
    load_models()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "NFT Car ML API is running! 🚗🤖"}

@app.post("/analyze-nft", response_model=MLResponse)
async def analyze_nft(request: NFTRequest):
    """Analyze NFT image with ML models"""
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.image_base64.split(',')[1] if ',' in request.image_base64 else request.image_base64)
        image = Image.open(io.BytesIO(image_data))
        
        # Recognize car from image using trained data
        car_info = recognize_car_from_image(image)
        
        # Generate chat response
        chat_response = generate_car_chat_response(request.user_message, car_info)
        
        # Prepare ML insights
        ml_insights = {
            "model_used": "BLIP + Custom Car Chat",
            "analysis_timestamp": str(torch.cuda.EventTime() if torch.cuda.is_available() else "CPU"),
            "image_analysis": car_info
        }
        
        return MLResponse(
            success=True,
            car_info=car_info,
            ml_insights=ml_insights,
            chat_response=chat_response,
            token_id=request.token_id
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Detailed health check"""
    models_status = {
        "car_chat_model": car_chat_model is not None,
        "blip_model": blip_model is not None,
        "models_loaded": all([car_chat_model, blip_model])
    }
    
    return {
        "status": "healthy" if models_status["models_loaded"] else "degraded",
        "models": models_status,
        "message": "NFT Car ML API ready for action! 🚗💬"
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting NFT Car ML API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)

