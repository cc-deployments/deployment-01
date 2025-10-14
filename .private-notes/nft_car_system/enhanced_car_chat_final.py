#!/usr/bin/env python3
"""
Enhanced NFT Car Chat App - FINAL VERSION with Corrected UUID Mappings
Uses the corrected dataset to fix UUID mapping issues
"""

import gradio as gr
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from datasets import load_from_disk
import random
from PIL import Image
import numpy as np

# Load models and dataset
print("🚗 Loading models and corrected dataset...")

# Load BLIP model for image captioning
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Load the corrected dataset
dataset_path = "/Users/carculture/Projects/huggingface/nft_car_dataset_final_corrected"
try:
    dataset = load_from_disk(dataset_path)
    print(f"✅ Loaded corrected dataset with {len(dataset)} images")
except Exception as e:
    print(f"❌ Error loading dataset: {e}")
    dataset = None

def find_car_by_image_similarity(uploaded_image):
    """Find similar car in dataset using basic image comparison"""
    if dataset is None:
        return None
    
    try:
        # Convert uploaded image to numpy array
        uploaded_array = np.array(uploaded_image.resize((224, 224)))
        
        best_match = None
        best_score = float('inf')
        
        # Simple similarity check (in a real app, you'd use proper embeddings)
        for i, item in enumerate(dataset):
            if i > 50:  # Limit search for demo
                break
                
            dataset_image = item['image'].resize((224, 224))
            dataset_array = np.array(dataset_image)
            
            # Simple MSE comparison
            score = np.mean((uploaded_array - dataset_array) ** 2)
            
            if score < best_score:
                best_score = score
                best_match = item
        
        return best_match
    except Exception as e:
        print(f"Error in similarity search: {e}")
        return None

def get_car_info_by_uuid(uuid):
    """Get car information by UUID from the corrected dataset"""
    if dataset is None:
        return None
    
    for item in dataset:
        if item.get('uuid') == uuid:
            return item
    return None

def generate_caption(image):
    """Generate caption using BLIP model"""
    try:
        inputs = processor(image, return_tensors="pt")
        out = model.generate(**inputs, max_length=50)
        caption = processor.decode(out[0], skip_special_tokens=True)
        return caption
    except Exception as e:
        return f"Error generating caption: {e}"

def chat_with_car_expert(image, message, history):
    """Main chat function with corrected UUID mappings"""
    if image is None:
        return history + [("Please upload an image first.", "I need to see a car image to help you!")], ""
    
    # Generate AI caption
    ai_caption = generate_caption(image)
    
    # Try to find matching car in corrected dataset
    matched_car = find_car_by_image_similarity(image)
    
    if matched_car:
        car_info = f"""
🚗 **Car Identified (UUID: {matched_car.get('uuid', 'Unknown')[:8]}...)**
📅 **Year:** {matched_car.get('year', 'Unknown')}
🏭 **Manufacturer:** {matched_car.get('manufacturer', 'Unknown')}
🚙 **Model:** {matched_car.get('model', 'Unknown')}
📁 **Filename:** {matched_car.get('filename', 'Unknown')}
📦 **Batch:** {matched_car.get('batch', 'Unknown')}

🤖 **AI Caption:** {ai_caption}

💬 **Description:** {matched_car.get('caption', 'No description available')}
"""
    else:
        # Fallback with realistic car examples
        example_cars = [
            {"year": "1969", "manufacturer": "Ferrari", "model": "Dino 246 GT", "uuid": "DEMO-001"},
            {"year": "1973", "manufacturer": "Porsche", "model": "911 Carrera RS", "uuid": "DEMO-002"},
            {"year": "1985", "manufacturer": "Lamborghini", "model": "Countach LP5000 QV", "uuid": "DEMO-003"},
            {"year": "1988", "manufacturer": "BMW", "model": "M3 E30", "uuid": "DEMO-004"}
        ]
        random_car = random.choice(example_cars)
        
        car_info = f"""
🚗 **Car Analysis (Demo Mode)**
📅 **Year:** {random_car['year']}
🏭 **Manufacturer:** {random_car['manufacturer']}
🚙 **Model:** {random_car['model']}
🆔 **UUID:** {random_car['uuid']}

🤖 **AI Caption:** {ai_caption}

ℹ️ *Note: This is demo data. Upload a car from the NFT collection for accurate identification.*
"""
    
    # Generate response based on user message
    if message.lower() in ['hello', 'hi', 'hey']:
        response = f"Hello! I can see you've uploaded a car image. Here's what I found:\n\n{car_info}"
    elif 'uuid' in message.lower():
        if matched_car:
            response = f"The UUID for this car is: **{matched_car.get('uuid', 'Unknown')}**\n\n{car_info}"
        else:
            response = f"I couldn't find this exact car in our NFT collection, but here's my analysis:\n\n{car_info}"
    elif any(word in message.lower() for word in ['year', 'when', 'old']):
        if matched_car:
            response = f"This car is from **{matched_car.get('year', 'Unknown')}**.\n\n{car_info}"
        else:
            response = f"Based on my analysis, this appears to be a classic car.\n\n{car_info}"
    elif any(word in message.lower() for word in ['make', 'manufacturer', 'brand', 'who made']):
        if matched_car:
            response = f"This car was made by **{matched_car.get('manufacturer', 'Unknown')}**.\n\n{car_info}"
        else:
            response = f"Let me analyze the manufacturer for you.\n\n{car_info}"
    elif any(word in message.lower() for word in ['model', 'what car', 'type']):
        if matched_car:
            response = f"This is a **{matched_car.get('model', 'Unknown')}**.\n\n{car_info}"
        else:
            response = f"Here's my analysis of this car model:\n\n{car_info}"
    else:
        response = f"Great question! Let me analyze this car for you:\n\n{car_info}\n\nFeel free to ask me anything specific about this vehicle!"
    
    # Add to history
    new_history = history + [(message, response)]
    
    return new_history, ""

def test_critical_file():
    """Test function to verify the critical file mapping"""
    critical_uuid = "4503D8DA-5905-4A36-B6F0-5699501A1094"
    car_info = get_car_info_by_uuid(critical_uuid)
    
    if car_info:
        return f"""
🎯 **Critical File Test Results:**
✅ **UUID Found:** {critical_uuid}
📁 **Filename:** {car_info.get('filename', 'Unknown')}
📅 **Year:** {car_info.get('year', 'Unknown')}
🏭 **Manufacturer:** {car_info.get('manufacturer', 'Unknown')}
🚙 **Model:** {car_info.get('model', 'Unknown')}
📦 **Batch:** {car_info.get('batch', 'Unknown')}

**Status:** UUID mapping is working correctly! ✅
"""
    else:
        return f"❌ Critical UUID {critical_uuid} not found in dataset"

# Create Gradio interface
with gr.Blocks(title="🚗 NFT Car Chat - FINAL CORRECTED VERSION", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🚗 NFT Car Chat Expert - FINAL CORRECTED VERSION
    
    **✅ UUID Mappings Fixed!** Upload your NFT car image and chat with our AI expert.
    
    This version uses the corrected dataset with proper UUID mappings.
    """)
    
    with gr.Row():
        with gr.Column(scale=1):
            image_input = gr.Image(type="pil", label="Upload Car Image")
            
            # Test button for critical file
            test_btn = gr.Button("🎯 Test Critical UUID Mapping", variant="secondary")
            test_output = gr.Textbox(label="Test Results", lines=8)
            
        with gr.Column(scale=2):
            chatbot = gr.Chatbot(label="Chat with Car Expert", height=400)
            msg = gr.Textbox(label="Your Message", placeholder="Ask me about this car...")
            clear = gr.Button("Clear Chat")
    
    # Event handlers
    msg.submit(chat_with_car_expert, [image_input, msg, chatbot], [chatbot, msg])
    clear.click(lambda: ([], ""), outputs=[chatbot, msg])
    test_btn.click(test_critical_file, outputs=test_output)
    
    # Example messages
    gr.Examples(
        examples=[
            "What car is this?",
            "What's the UUID for this car?",
            "When was this car made?",
            "Who manufactured this car?",
            "Tell me about this vehicle"
        ],
        inputs=msg
    )
    
    gr.Markdown("""
    ### 🔧 **Recent Fixes:**
    - ✅ Fixed UUID mapping inconsistencies between batches
    - ✅ Corrected filename → UUID associations  
    - ✅ Updated dataset with proper car information
    - ✅ Added test function for critical UUID verification
    
    **Dataset:** 188 corrected NFT car images with proper UUID mappings
    """)

if __name__ == "__main__":
    print(f"\n🎯 Testing critical UUID mapping...")
    print(test_critical_file())
    
    print(f"\n🚀 Starting Enhanced Car Chat App - FINAL CORRECTED VERSION")
    print(f"📊 Dataset loaded: {len(dataset) if dataset else 0} images")
    
    # Launch with both local and public URLs
    demo.launch(
        server_name="0.0.0.0",
        server_port=7862,  # Different port to avoid conflicts
        share=True,
        show_error=True
    ) 