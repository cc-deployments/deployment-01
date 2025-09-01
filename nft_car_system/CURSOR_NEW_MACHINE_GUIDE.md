# NFT Car Recognition System - Cursor New Machine Guide

## 🎯 **Quick Start for Cursor IDE**

### 📁 **File Structure Overview**

```
/Volumes/LEWIS/nft_car_system/           # Main project directory
├── 🤖 MODELS/
│   ├── car_recognition_model_local/     # Trained car brand classifier (944MB)
│   │   ├── config.json                  # Model configuration
│   │   ├── model.safetensors           # Trained weights
│   │   ├── preprocessor_config.json    # Image processing config
│   │   └── training_metadata.json      # Training details
│   └── simple_car_chat_model/          # Trained conversational AI (475MB)
│       ├── config.json                 # Model configuration
│       ├── model.safetensors          # Trained weights
│       └── tokenizer files             # Text processing
│
├── 📊 DATASETS/
│   ├── nft_car_dataset_final_with_correct_info/  # ⭐ PRIMARY DATASET (9.8GB)
│   │   ├── dataset_dict.json          # Dataset structure
│   │   ├── train/                     # Training data (188 corrected images)
│   │   └── validation/                # Validation split
│   └── nft_car_dataset_full_205/      # Complete dataset (20GB, all 205 images)
│
├── 🗂️ SOURCE DATA/
│   └── data/                          # Original source files (11GB)
│       ├── images/                    # 208 original TIFF images
│       │   ├── BKSPCL0100399-fin_wm.TIF
│       │   ├── CAR56FOO08079299_ME_wm.TIF
│       │   └── ... (206 more images)
│       ├── annotations_corrected_2025-06-15.json  # ⭐ CORRECTED batch 2 data
│       └── final_corrected_2025-06-08.json        # ⚠️ Batch 1 (needs fixing)
│
├── 💻 APPLICATIONS/
│   ├── enhanced_car_chat_final.py      # ⭐ MAIN CHAT INTERFACE
│   ├── enhanced_car_chat_with_correct_info.py  # Chat with data status
│   └── test_trained_model.py          # Model testing utility
│
├── 🗺️ MAPPING FILES/
│   ├── batch1-uuid-mapping.tsv        # UUID corrections for batch 1
│   ├── batch2_uuid_mapping.tsv        # UUID corrections for batch 2
│   ├── car_chat_llm_dataset.csv       # Conversational training data
│   └── car_database_export.csv        # PostgreSQL export format
│
└── 📚 DOCUMENTATION/
    ├── PROGRESS_SUMMARY.md             # Complete project history
    ├── PILOT_ARCHITECTURE.md           # System architecture
    └── TRANSFER_STATUS.md              # What was/wasn't transferred
```

## 🔍 **How to Access Trained Data**

### **1. Image Recognition Model**
```python
# Load your trained car brand classifier
from transformers import BlipProcessor, BlipForConditionalGeneration

processor = BlipProcessor.from_pretrained("./car_recognition_model_local")
model = BlipForConditionalGeneration.from_pretrained("./car_recognition_model_local")

# Use with images
outputs = model.generate(**processor(image, return_tensors="pt"))
caption = processor.decode(outputs[0], skip_special_tokens=True)
```

### **2. Chat Model**
```python
# Load your trained conversational AI
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("./simple_car_chat_model")
model = AutoModelForCausalLM.from_pretrained("./simple_car_chat_model")

# Generate responses
inputs = tokenizer("What is this car?", return_tensors="pt")
outputs = model.generate(**inputs, max_length=100)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
```

### **3. Corrected Dataset**
```python
# Load your corrected NFT car dataset
from datasets import load_from_disk

dataset = load_from_disk('nft_car_dataset_final_with_correct_info')
print(f"Dataset size: {len(dataset['train'])} images")

# Access individual samples
sample = dataset['train'][0]
print(f"Image: {sample['image']}")
print(f"Car: {sample['vehicle_year']} {sample['vehicle_manufacturer']} {sample['vehicle_model']}")
print(f"UUID: {sample['uuid']}")
print(f"Original filename: {sample['original_filename']}")
```

## 📍 **Source Files Location**

### **Original Images (Source)**
- **Location:** `data/images/`
- **Format:** TIFF files (~40MB each, some >50MB)
- **Count:** 208 original high-resolution images
- **Naming:** Original filenames preserved (e.g., `BKSPCL0100399-fin_wm.TIF`)

### **Corrected Annotations (Source)**
- **Batch 2 (GOOD):** `data/annotations_corrected_2025-06-15.json`
  - ✅ 164 images with correct car information
  - ✅ Proper filename-to-UUID mapping
- **Batch 1 (NEEDS FIX):** `data/final_corrected_2025-06-08.json`
  - ⚠️ 24 images, some with incorrect mappings
  - ❗ Known issue: Contains wrong car info for some vehicles

### **UUID Mapping Files (Source)**
- **batch1-uuid-mapping.tsv:** Correct filename→UUID mappings for batch 1
- **batch2_uuid_mapping.tsv:** Correct filename→UUID mappings for batch 2

## 🚀 **Quick Setup in Cursor**

### **1. Open Project**
```bash
# In Cursor IDE, open the project folder
cd /Volumes/LEWIS/nft_car_system
```

### **2. Create Virtual Environment**
```bash
# Terminal in Cursor
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install torch transformers datasets gradio pillow pandas numpy
```

### **3. Test System**
```bash
# Verify models work
python3 test_trained_model.py

# Start main chat interface
python3 enhanced_car_chat_final.py
```

## 🎯 **Key Files for Development**

### **Start Here:**
1. **`enhanced_car_chat_final.py`** - Main working chat interface
2. **`test_trained_model.py`** - Verify your models work
3. **`PROGRESS_SUMMARY.md`** - Full project history and context

### **Important Data:**
1. **`nft_car_dataset_final_with_correct_info/`** - Your primary corrected dataset
2. **`data/images/`** - Original source images
3. **`batch2_uuid_mapping.tsv`** - Correct UUID mappings

### **Architecture:**
1. **`PILOT_ARCHITECTURE.md`** - System design and components
2. **`car_recognition_model_local/training_metadata.json`** - Model training details

## 🔧 **Development Workflow**

### **To modify/improve the system:**
1. **Load dataset:** Use `load_from_disk('nft_car_dataset_final_with_correct_info')`
2. **Test models:** Run `test_trained_model.py`
3. **Edit interface:** Modify `enhanced_car_chat_final.py`
4. **Add new images:** Process through `data/images/` → dataset creation scripts

### **To fix batch 1 data issues:**
1. **Source mapping:** `batch1-uuid-mapping.tsv` has correct mappings
2. **Current issue:** Some UUIDs in `final_corrected_2025-06-08.json` are wrong
3. **Fix script:** Create script using mapping file to correct JSON

## 📊 **Data Quality Status**

- **✅ Batch 2 (2025-06-15):** 164 images - CORRECT car info and UUID mappings
- **⚠️ Batch 1 (2025-06-08):** 24 images - Some incorrect mappings need fixing
- **🎯 Total working:** 164 fully correct + models + chat interface = FUNCTIONAL SYSTEM

## 🎉 **You're Ready!**

Your NFT Car Recognition System is fully functional with:
- ✅ Trained models for car recognition and chat
- ✅ Corrected dataset with proper car information  
- ✅ Working chat interface
- ✅ All source data for further development

**Open `enhanced_car_chat_final.py` in Cursor and start exploring!** 🚗💬
