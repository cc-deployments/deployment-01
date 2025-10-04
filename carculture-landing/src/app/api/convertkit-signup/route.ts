// carculture-landing/src/app/api/convertkit-signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { kit } from '../../lib/kit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      first_name, 
      interests = [], 
      wallet_address, 
      utm_source, 
      utm_medium, 
      utm_campaign 
    } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Prepare ConvertKit subscriber data
    const subscriber = {
      email: email.toLowerCase().trim(),
      first_name: first_name?.trim(),
      fields: {
        wallet_address: wallet_address?.trim(),
        interests: interests.join(', '),
        source: 'carculture-landing',
        utm_source,
        utm_medium,
        utm_campaign
      },
      tags: kit.generateTags(interests)
    };

    // Subscribe to Kit
    const result = await kit.subscribeToForm(subscriber);

    // Also store in your Cloudflare D1 database for backup
    await storeInCloudflareD1({
      email: subscriber.email,
      name: subscriber.first_name,
      source: 'landing_page',
      interests,
      wallet_address: subscriber.fields.wallet_address,
      convertkit_id: result.subscription.subscriber.id,
      utm_source,
      utm_medium,
      utm_campaign,
      ip_address: getClientIP(request),
      user_agent: request.headers.get('user-agent') || 'unknown'
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscriber_id: result.subscription.subscriber.id,
      redirect_url: 'https://carculture.com/thank-you'
    });

  } catch (error) {
    console.error('Kit signup error:', error);
    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         request.headers.get('cf-connecting-ip') ||
         'unknown';
}

async function storeInCloudflareD1(data: any) {
  try {
    // This would store in your Cloudflare D1 database
    // For now, we'll just log it
    console.log('📝 Storing in Cloudflare D1:', {
      email: data.email,
      convertkit_id: data.convertkit_id,
      interests: data.interests.length,
      source: data.source
    });
    
    return { success: true };
  } catch (error) {
    console.error('Cloudflare D1 storage error:', error);
    return { success: false, error };
  }
}
