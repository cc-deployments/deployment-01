#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Configuration
const PREVIEW_WIDTH = 800;
const PREVIEW_HEIGHT = 800;
const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 400;
const QUALITY = 85;

// Input and output paths
const CSV_INPUT = 'sql_carculture_public_local/carculture_content_schedule.csv';
const CSV_OUTPUT = 'sql_carculture_public_local/carculture_content_schedule_with_previews.csv';
const PREVIEW_DIR = 'public/preview-images';
const THUMBNAIL_DIR = 'public/thumbnail-images';

// Ensure directories exist
if (!fs.existsSync(PREVIEW_DIR)) {
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });
}
if (!fs.existsSync(THUMBNAIL_DIR)) {
  fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

// Function to download image from URL
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Function to resize image
async function resizeImage(inputPath, outputPath, width, height) {
  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: QUALITY })
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.error(`Error resizing image ${inputPath}:`, error);
    throw error;
  }
}

// Function to process a single image
async function processImage(arweaveUrl, title, index) {
  try {
    console.log(`Processing ${title} (${index + 1}/9)...`);
    
    // Create safe filename
    const safeTitle = title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const tempPath = path.join(__dirname, 'temp', `${safeTitle}_temp.jpg`);
    const previewPath = path.join(__dirname, PREVIEW_DIR, `${safeTitle}_preview.jpg`);
    const thumbnailPath = path.join(__dirname, THUMBNAIL_DIR, `${safeTitle}_thumbnail.jpg`);
    
    // Ensure temp directory exists
    const tempDir = path.dirname(tempPath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Download original image
    console.log(`  Downloading from: ${arweaveUrl}`);
    await downloadImage(arweaveUrl, tempPath);
    
    // Generate preview (800x800)
    console.log(`  Generating preview (${PREVIEW_WIDTH}x${PREVIEW_HEIGHT})...`);
    await resizeImage(tempPath, previewPath, PREVIEW_WIDTH, PREVIEW_HEIGHT);
    
    // Generate thumbnail (400x400)
    console.log(`  Generating thumbnail (${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT})...`);
    await resizeImage(tempPath, thumbnailPath, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    
    // Clean up temp file
    fs.unlinkSync(tempPath);
    
    return {
      previewUrl: `/preview-images/${safeTitle}_preview.jpg`,
      thumbnailUrl: `/thumbnail-images/${safeTitle}_thumbnail.jpg`,
      originalUrl: arweaveUrl
    };
    
  } catch (error) {
    console.error(`Failed to process ${title}:`, error);
    return {
      previewUrl: arweaveUrl, // Fallback to original
      thumbnailUrl: arweaveUrl, // Fallback to original
      originalUrl: arweaveUrl
    };
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting preview image generation...\n');
    
    // Read CSV
    const csvContent = fs.readFileSync(CSV_INPUT, 'utf8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    // Find the testing images (CarMania Garage Testing 1-9)
    const testingImages = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('CarMania Garage Testing')) {
        const columns = line.split(',');
        const title = columns[1]?.replace(/"/g, '') || '';
        const mintUrl = columns[2]?.replace(/"/g, '') || '';
        
        if (title && mintUrl && mintUrl.startsWith('https://')) {
          testingImages.push({ title, mintUrl, lineIndex: i });
        }
      }
    }
    
    console.log(`Found ${testingImages.length} testing images to process\n`);
    
    // Process each image
    const processedImages = [];
    for (let i = 0; i < testingImages.length; i++) {
      const { title, mintUrl, lineIndex } = testingImages[i];
      const result = await processImage(mintUrl, title, i);
      processedImages.push({ ...result, title, lineIndex });
      console.log(`✅ Completed: ${title}\n`);
    }
    
    // Update CSV with new image URLs
    console.log('📝 Updating CSV with preview URLs...');
    const updatedLines = [...lines];
    
    // Add new columns to header
    const newHeaders = [...headers, 'image_url_preview', 'image_url_thumbnail'];
    updatedLines[0] = newHeaders.join(',');
    
    // Update each testing image line
    processedImages.forEach(({ title, previewUrl, thumbnailUrl, lineIndex }) => {
      const line = updatedLines[lineIndex];
      const columns = line.split(',');
      
      // Add preview and thumbnail URLs
      columns.push(`"${previewUrl}"`);
      columns.push(`"${thumbnailUrl}"`);
      
      updatedLines[lineIndex] = columns.join(',');
    });
    
    // Write updated CSV
    fs.writeFileSync(CSV_OUTPUT, updatedLines.join('\n'));
    
    console.log('✅ Preview image generation complete!');
    console.log(`📁 Preview images saved to: ${PREVIEW_DIR}`);
    console.log(`📁 Thumbnail images saved to: ${THUMBNAIL_DIR}`);
    console.log(`📄 Updated CSV saved to: ${CSV_OUTPUT}`);
    
    // Clean up temp directory
    const tempDir = path.join(__dirname, 'temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { processImage, downloadImage, resizeImage };
