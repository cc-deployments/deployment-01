import { NextResponse } from 'next/server';
export const dynamic = 'force-static';
import fs from 'fs';
import path from 'path';

interface DrivePostData {
  publication_date: string;
  title: string;
  mint_url: string;
  status: string;
  image_url: string;
  description: string;
  make: string;
  model: string;
  year: string;
}

export async function GET() {
  try {
    // Read your existing CSV data
    const csvPath = path.join(process.cwd(), '../../sql_carculture_public_local/carculture_content_schedule.csv');
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Parse CSV data
    const rows: DrivePostData[] = [];
    const csvData = fs.readFileSync(csvPath, 'utf-8');
    
    // Simple CSV parsing
    const lines = csvData.split('\n').map(line => line.replace(/\r$/, ''));
    const headers = lines[0].split(',').map(h => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      // Simple CSV parsing that handles quoted fields
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const row: DrivePostData = {} as DrivePostData;
      headers.forEach((header, index) => {
        if (header) {
          row[header] = values[index] || '';
        }
      });
      
      rows.push(row);
    }
    
    // Find today's post
    let todayPost: DrivePostData | null = null;
    let latestPost: DrivePostData | null = null;
    
    for (const row of rows) {
      if (row.status === 'published') {
        // Check if this is today's post
        const rowDate = row.publication_date.split(' ')[0];
        if (rowDate === today) {
          todayPost = row;
          break;
        }
        // Keep track of most recent published post as fallback
        if (!latestPost) {
          latestPost = row;
        }
      }
    }
    
    // Use today's post if found, otherwise use the most recent published post
    const selectedPost = todayPost || latestPost;
    
    if (!selectedPost) {
      return NextResponse.json({ 
        error: 'No published $DRIVE post found' 
      }, { status: 404 });
    }
    
    // Format for Zora $DRIVE template
    const drivePost = {
      id: selectedPost.title.replace(/\s+/g, '-').toLowerCase(),
      title: selectedPost.title,
      description: selectedPost.description,
      image: selectedPost.image_url || '/andy-warhol-bmw-m1-optimized.jpg',
      price: '0.001', // Default SPARKS price
      currency: 'SPARKS',
      year: selectedPost.year || '2025',
      brand: selectedPost.make || 'CarCulture',
      rarity: 'legendary' as const,
      contractAddress: '0xefd1c2167a386e598e8cd5963b564e0ba60f1396',
      tokenId: Math.floor(Math.random() * 1000).toString(), // Generate token ID
      platform: 'zora' as const,
      platformName: 'Zora Network',
      mintUrl: selectedPost.mint_url || `https://zora.co/collect/zora:0xefd1c2167a386e598e8cd5963b564e0ba60f1396`,
      content: `Today's $DRIVE post: ${selectedPost.description}. This is part of the daily CarCulture content series on Zora Network.`,
      publicationDate: selectedPost.publication_date,
      status: selectedPost.status
    };
    
    return NextResponse.json({
      success: true,
      data: drivePost
    });
    
  } catch (error) {
    console.error('Error fetching daily $DRIVE post:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch daily $DRIVE post data' 
    }, { status: 500 });
  }
}


