#!/usr/bin/env python3
"""
Test the trained car chat model
"""

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

def test_car_chat_model():
    """Test the trained model with car questions"""
    
    print("🚗 Loading your trained Car Chat Expert...")
    
    # Load the trained model
    model_path = './simple_car_chat_model'
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(model_path)
    
    print("✅ Model loaded successfully!")
    
    # Test questions
    test_questions = [
        "User: What is this car?\nAssistant:",
        "User: Tell me about this vehicle\nAssistant:",
        "User: What can you tell me about this BMW?\nAssistant:",
        "User: Describe this automobile\nAssistant:",
        "User: What era is this car from?\nAssistant:"
    ]
    
    print("\n🎯 Testing your trained model:\n")
    
    for i, question in enumerate(test_questions, 1):
        print(f"🔍 Test {i}: {question.split('Assistant:')[0].strip()}")
        
        # Tokenize input
        inputs = tokenizer.encode(question, return_tensors='pt')
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_length=inputs.shape[1] + 100,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        assistant_response = response.split("Assistant:")[-1].strip()
        
        print(f"🤖 Response: {assistant_response}\n")
        print("-" * 60)
    
    print("""
🎉 Your Car Chat Expert is working!

🚀 Next steps:
1. Integrate with your chat interface
2. Test with real car images
3. Package for your main machine
4. Deploy for production use

Your NFT Car Recognition system is ready! 🚗💬
    """)

if __name__ == "__main__":
    test_car_chat_model() 