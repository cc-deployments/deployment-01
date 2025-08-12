import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface MintData {
  content_type: string;
  Filename: string;
  publication_date: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: string;
  vehicle_type: string;
  image_url: string;
  mint_url: string;
  contract_type: string;
  contract_address: string;
  edition_size: string;
  metadata_url: string;
  status: string;
  notes: string;
  [key: string]: string; // For any additional fields
}

export async function GET() {
  try {
    // Read the CSV file
    const csvPath = path.join(process.cwd(), '../../sql_carculture_public_local/carculture_content_schedule.csv');
    const csvData = fs.readFileSync(csvPath, 'utf-8');
    
    // Parse CSV data
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    
    // Find the latest published car_of_the_day
    let latestMint: MintData | null = null;
    
    for (let i = lines.length - 1; i > 0; i--) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      const values = line.split(',');
      const row: MintData = {} as MintData;
      
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || '';
      });
      
      // Look for published car_of_the_day entries
      if (row.content_type === 'car_of_the_day' && row.status === 'published') {
        latestMint = row;
        break;
      }
    }
    
    if (!latestMint) {
      return NextResponse.json({ 
        error: 'No published car_of_the_day found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: latestMint
    });
    
  } catch (error) {
    console.error('Error fetching latest mint:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch latest mint data' 
    }, { status: 500 });
  }
} 