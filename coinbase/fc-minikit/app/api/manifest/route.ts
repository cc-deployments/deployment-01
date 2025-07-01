import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const filePath = join(process.cwd(), 'public', '.well-known', 'farcaster.json');
  const json = readFileSync(filePath, 'utf8');
  return new NextResponse(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 