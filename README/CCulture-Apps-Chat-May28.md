# CCulture-Apps Architecture Discussion - May 28, 2024

## Asset Management & AI/ML Integration

### 1. Project Structure Overview
```
Projects/
├── CCulture-Apps-Core/           # Core infrastructure
├── CCulture-Apps/                # Application implementations
└── CCulture-Assets/             # Asset Management Project
```

### 2. Key Decisions & Considerations

#### Asset Format
- **TIFF vs DNG:**
  - TIFF chosen for better compatibility
  - Open format (ISO 12639)
  - Easier metadata handling
  - Better tooling support

#### Metadata Management
- **Lightroom Integration:**
  - Export metadata from Lightroom catalog
  - Sync changes to Arweave
  - Track modifications
  - Handle different metadata subsets (minimal, full, AI)

#### AI/ML Training
- **Image Requirements:**
  - Resolution: 4000-6000 pixels (longest side)
  - Bit Depth: 16-bit
  - Color Space: Adobe RGB/ProPhoto RGB
  - Compression: LZW (lossless)
  - File Size: 50-100MB per image

- **Required Views:**
  - Front (3/4)
  - Side (both)
  - Rear (3/4)
  - Interior (dashboard)
  - Interior (seats)
  - Engine bay
  - Detail shots (wheels, lights, badges)
  - Context shots

#### Local Training Strategy
- Process locally first
- Train models locally
- Select best-performing images
- Upload only final selections to Arweave
- Include model metadata and training results

### 3. Integration Points

#### Local ML Processing
- Process TIFFs locally
- Train models
- Select final assets
- Generate metadata subsets

#### Arweave Storage
- Store selected assets
- Maintain metadata
- Serve to apps
- Handle public/private access

#### App Integration
- Use processed assets
- Integrate with LLM
- Generate outputs
- Handle different use cases (Farcaster, Coinbase, Web)

### 4. Next Steps

1. **Implementation:**
   - Set up local ML processing pipeline
   - Implement TIFF processing
   - Create metadata extraction
   - Develop training pipeline

2. **Integration:**
   - Connect with Lightroom
   - Set up Arweave storage
   - Implement app integration
   - Develop LLM integration

3. **Testing:**
   - Test processing pipeline
   - Validate model training
   - Verify asset selection
   - Check integration points

### 5. Questions to Consider

1. **Asset Management:**
   - How to handle version control?
   - What's the backup strategy?
   - How to manage access control?

2. **Training:**
   - How many images per car?
   - What's the minimum viable dataset?
   - How to validate model performance?

3. **Integration:**
   - How to handle real-time updates?
   - What's the sync strategy?
   - How to manage different metadata requirements?

### 6. Resources

- [TIFF Specification](https://www.iso.org/standard/34342.html)
- [Arweave Documentation](https://docs.arweave.org)
- [Lightroom SDK](https://www.adobe.com/products/photoshop-lightroom-classic.html)
- [ML Training Best Practices](https://developers.google.com/machine-learning/guides/rules-of-ml)

---
*Last Updated: May 28, 2024* 