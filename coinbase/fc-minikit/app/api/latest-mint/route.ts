import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface MintData {
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
    // Read and parse simplified CSV file
    const csvPath = path.join(process.cwd(), 'sql_carculture_public_local/carculture_content_schedule_simplified.csv');
    console.log('CSV Path:', csvPath);
    console.log('File exists:', fs.existsSync(csvPath));
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Parse CSV data
    const rows: MintData[] = [];
    const csvData = fs.readFileSync(csvPath, 'utf-8');
    
    // Use a simple CSV parser that handles quoted fields
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
      
      const row: MintData = {} as MintData;
      headers.forEach((header, index) => {
        if (header) { // Only map non-empty headers
          row[header] = values[index] || '';
        }
      });
      
      rows.push(row);
    }
    
    // First, look for today's car_of_the_day
    let todayMint: MintData | null = null;
    let latestMint: MintData | null = null;
    
    for (const row of rows) {
      // Look for published entries
      if (row.status === 'published') {
        // Check if this is today's car (handle date formats with time)
        const rowDate = row.publication_date.split(' ')[0]; // Remove time component if present
        if (rowDate === today) {
          todayMint = row;
          break; // Found today's car, use it
        }
        // Otherwise, keep track of the most recent published car as fallback
        if (!latestMint) {
          latestMint = row;
        }
      }
    }
    
    // Use today's car if found, otherwise use the most recent published car
    const selectedMint = todayMint || latestMint;
    
    if (!selectedMint) {
      return NextResponse.json({ 
        error: 'No published car_of_the_day found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: selectedMint
    });
    
  } catch (error) {
    console.error('Error fetching latest mint:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch latest mint data',
      details: error instanceof Error ? error.message : 'Unknown error',
      csvPath: path.join(process.cwd(), 'sql_carculture_public_local/carculture_content_schedule_simplified.csv')
    }, { status: 500 });
  }
} 