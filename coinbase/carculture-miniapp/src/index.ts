/// <reference types="@cloudflare/workers-types" />

import { D1Database, KVNamespace, R2Bucket } from './types';

interface Env {
  DB: D1Database;
  CACHE: KVNamespace;
  STORAGE: R2Bucket;
}

interface Car {
  id: number;
  contract_address: string;
  car_name: string;
  date: string;
  splash_image_url?: string;
  mint_image_url?: string;
  description?: string;
  mint_type: 'ERC-721' | 'ERC-1155';
  duration: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // API Routes
      if (path === '/api/cars' && request.method === 'GET') {
        return await getCars(env, corsHeaders);
      }
      
      if (path === '/api/cars/active' && request.method === 'GET') {
        return await getActiveCar(env, corsHeaders);
      }
      
      if (path === '/api/cars' && request.method === 'POST') {
        return await createCar(request, env, corsHeaders);
      }
      
      if (path.startsWith('/api/cars/') && request.method === 'PUT') {
        const carId = path.split('/')[3];
        return await updateCar(carId, request, env, corsHeaders);
      }
      
      if (path.startsWith('/api/cars/') && request.method === 'DELETE') {
        const carId = path.split('/')[3];
        return await deleteCar(carId, env, corsHeaders);
      }
      
      if (path === '/api/mints' && request.method === 'POST') {
        return await recordMint(request, env, corsHeaders);
      }

      // Default response
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

// Get all cars
async function getCars(env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const cars = await env.DB.prepare(`
    SELECT * FROM cars 
    ORDER BY created_at DESC
  `).all<Car>();
  
  return new Response(JSON.stringify(cars.results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Get active car
async function getActiveCar(env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const car = await env.DB.prepare(`
    SELECT * FROM cars 
    WHERE is_active = 1 
    ORDER BY created_at DESC 
    LIMIT 1
  `).first<Car>();
  
  return new Response(JSON.stringify(car), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Create new car
async function createCar(request: Request, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const body = await request.json() as {
    contract_address: string;
    car_name: string;
    date?: string;
    splash_image_url?: string;
    mint_image_url?: string;
    description?: string;
    mint_type?: 'ERC-721' | 'ERC-1155';
    duration?: number;
  };
  
  // Deactivate all other cars first
  await env.DB.prepare('UPDATE cars SET is_active = 0').run();
  
  // Insert new car
  const result = await env.DB.prepare(`
    INSERT INTO cars (
      contract_address, car_name, date, splash_image_url, 
      mint_image_url, description, mint_type, duration, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `).bind(
    body.contract_address,
    body.car_name,
    body.date || new Date().toISOString().split('T')[0],
    body.splash_image_url,
    body.mint_image_url,
    body.description,
    body.mint_type || 'ERC-1155',
    body.duration || 7
  ).run();
  
  // Log admin action
  await env.DB.prepare(`
    INSERT INTO admin_logs (action, details) 
    VALUES ('CREATE_CAR', ?)
  `).bind(JSON.stringify(body)).run();
  
  return new Response(JSON.stringify({ id: result.meta.last_row_id }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Update car
async function updateCar(carId: string, request: Request, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const body = await request.json() as {
    contract_address: string;
    car_name: string;
    date: string;
    splash_image_url?: string;
    mint_image_url?: string;
    description?: string;
    mint_type: 'ERC-721' | 'ERC-1155';
    duration: number;
  };
  
  const result = await env.DB.prepare(`
    UPDATE cars SET 
      contract_address = ?, car_name = ?, date = ?, 
      splash_image_url = ?, mint_image_url = ?, description = ?,
      mint_type = ?, duration = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    body.contract_address,
    body.car_name,
    body.date,
    body.splash_image_url,
    body.mint_image_url,
    body.description,
    body.mint_type,
    body.duration,
    carId
  ).run();
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Delete car
async function deleteCar(carId: string, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  await env.DB.prepare('DELETE FROM cars WHERE id = ?').bind(carId).run();
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Record mint transaction
async function recordMint(request: Request, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  const body = await request.json() as {
    wallet_address: string;
    car_id: number;
    transaction_hash: string;
  };
  
  // Get or create user
  let user = await env.DB.prepare(`
    SELECT id FROM users WHERE wallet_address = ?
  `).bind(body.wallet_address).first<{ id: number }>();
  
  if (!user) {
    const userResult = await env.DB.prepare(`
      INSERT INTO users (wallet_address) VALUES (?)
    `).bind(body.wallet_address).run();
    user = { id: userResult.meta.last_row_id as number };
  }
  
  // Record mint
  await env.DB.prepare(`
    INSERT INTO mints (car_id, user_id, transaction_hash)
    VALUES (?, ?, ?)
  `).bind(body.car_id, user.id, body.transaction_hash).run();
  
  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
} 