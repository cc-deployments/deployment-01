import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS_URL = 'https://auth.privy.io/api/v1/apps/cmb7c28sv002fky0lwb0ty6k3/keys';
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    const { payload } = await jwtVerify(token, JWKS);
    return NextResponse.json({ valid: true, payload });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ valid: false, error: message }, { status: 401 });
  }
} 