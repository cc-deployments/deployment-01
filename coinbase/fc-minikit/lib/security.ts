import { NextRequest } from 'next/server';

// Security configuration for Coinbase Onramp compliance
export const SECURITY_CONFIG = {
  // Allowed origins for CORS (supports both mobile and desktop)
  ALLOWED_ORIGINS: [
    'https://carmania.carculture.com',
    // Add additional approved web origins here if needed
  ],
  
  // CDP Project configuration
  CDP_PROJECT_ID: process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a',
  CDP_API_KEY: process.env.CDP_API_KEY,
  
  // Security headers
  CORS_HEADERS: {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24 hours
  }
};

/**
 * Get client IP address from request headers
 * Supports various proxy configurations (Cloudflare, Vercel, etc.)
 */
export function getClientIP(request: NextRequest): string {
  // Check various headers for client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  if (vercelIP) {
    return vercelIP;
  }
  
  // Fallback to connection remote address
  return request.ip || 'unknown';
}

/**
 * Validate origin for CORS security
 * For mobile-only integrations, block unauthorized web origins
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const userAgent = request.headers.get('user-agent');
  
  // For mobile-only integrations, block web origins
  if (origin && !SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
    console.log('🚫 Blocked unauthorized origin:', origin);
    return false;
  }
  
  // Allow requests without origin (mobile apps, server-to-server)
  if (!origin) {
    return true;
  }
  
  // Allow requests from approved origins
  return SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin);
}

/**
 * Create CORS headers for approved origins
 */
export function createCORSHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get('origin');
  const headers: HeadersInit = {};
  
  // Only add CORS headers for approved origins
  if (origin && SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    Object.assign(headers, SECURITY_CONFIG.CORS_HEADERS);
  }
  
  return headers;
}

/**
 * Handle preflight OPTIONS requests with security validation
 */
export function handleOPTIONS(request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');
  
  // Only allow preflight for approved origins
  if (!origin || !SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      ...SECURITY_CONFIG.CORS_HEADERS,
    },
  });
}

/**
 * Security middleware for API routes
 * Validates origin and extracts client IP
 */
export function securityMiddleware(request: NextRequest) {
  const clientIP = getClientIP(request);
  console.log('🔍 Client IP:', clientIP);
  
  if (!validateOrigin(request)) {
    console.log('🚫 CORS validation failed');
    return {
      error: NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      ),
      clientIP
    };
  }
  
  return {
    clientIP,
    headers: createCORSHeaders(request)
  };
}
