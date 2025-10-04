// carculture-landing/src/app/api/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Cloudflare D1 Database Schema for Signups
interface SignupData {
  email: string;
  name?: string;
  source: 'landing_page' | 'miniapp' | 'social' | 'referral';
  interests: string[];
  wallet_address?: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, interests = [], wallet_address, utm_source, utm_medium, utm_campaign } = body;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const signupData: SignupData = {
      email: email.toLowerCase().trim(),
      name: name?.trim(),
      source: 'landing_page',
      interests: Array.isArray(interests) ? interests : [],
      wallet_address,
      created_at: new Date().toISOString(),
      ip_address: ip,
      user_agent: userAgent,
      utm_source,
      utm_medium,
      utm_campaign
    };

    // Store in Cloudflare D1 Database
    const result = await storeSignupData(signupData);
    
    if (result.success) {
      // Send welcome email (optional)
      await sendWelcomeEmail(email, name);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully signed up!',
        id: result.id
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to store signup data' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function storeSignupData(data: SignupData) {
  try {
    // This would connect to your Cloudflare D1 database
    // For now, we'll simulate the database operation
    
    const query = `
      INSERT INTO signups (
        email, name, source, interests, wallet_address, 
        created_at, ip_address, user_agent, utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // Simulate database insert
    const id = Math.random().toString(36).substr(2, 9);
    
    console.log('📝 Signup data stored:', {
      id,
      email: data.email,
      source: data.source,
      interests: data.interests.length,
      timestamp: data.created_at
    });
    
    return { success: true, id };
    
  } catch (error) {
    console.error('Database storage error:', error);
    return { success: false, error };
  }
}

async function sendWelcomeEmail(email: string, name?: string) {
  try {
    // Integration with email service (SendGrid, Mailgun, etc.)
    console.log(`📧 Welcome email sent to: ${email}`);
    
    // You could integrate with:
    // - SendGrid
    // - Mailgun  
    // - ConvertKit
    // - Mailchimp
    
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

