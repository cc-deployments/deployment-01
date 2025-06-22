import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add CORS headers for frame requests
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/api/frame/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 