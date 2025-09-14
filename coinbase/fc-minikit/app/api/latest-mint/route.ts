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
        // TEMPORARY: Hardcode the correct URL while debugging CSV issue
        const today = new Date().toISOString().split('T')[0];
        
        // Return the correct "Flat Sea" mint URL
        const selectedMint: MintData = {
          publication_date: '2025-09-10',
          title: 'Flat Sea',
          mint_url: 'https://manifold.xyz/@carculture/id/4149807344',
          status: 'published',
          image_url: '',
          description: 'Ocean Breeze Woodie',
          make: 'Chevrolet',
          model: 'Woodie',
          year: '1948'
        };
    
    return NextResponse.json({
      success: true,
      data: selectedMint
    });
    
    // TODO: Re-enable CSV reading once deployment issue is resolved
    
  } catch (error) {
    console.error('Error fetching latest mint:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch latest mint data' 
    }, { status: 500 });
  }
} 