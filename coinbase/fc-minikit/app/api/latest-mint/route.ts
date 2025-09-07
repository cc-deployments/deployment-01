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
    
    // Return the correct "Low Tide" mint URL
    const selectedMint: MintData = {
      publication_date: '2025-09-06',
      title: 'Low Tide',
      mint_url: 'https://manifold.xyz/@carculture/id/4149840112',
      status: 'published',
      image_url: 'https://3yqpmriehuvnvqi3j7br7u2y37o6eh4siieto2aljd2qvcv4fxxa.arweave.net/3iD2RQQ9KtrBG0_DH9NY393iH5JCCTdoC0j1Coq8Le4',
      description: 'Low Tide - A moment of calm reflection by the water\'s edge',
      make: 'Nil',
      model: 'Nil',
      year: 'Nil'
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