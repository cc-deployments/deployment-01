// Cloudflare Worker for CarMania API
// Based on CLOUDFLARE_SETUP.md specifications

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // API Routes
      if (path.startsWith('/api/cars')) {
        return handleCars(request, env, corsHeaders);
      } else if (path.startsWith('/api/mints')) {
        return handleMints(request, env, corsHeaders);
      } else {
        // Health check
        return new Response(JSON.stringify({
          status: 'ok',
          message: 'CarMania API is running',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

// Handle car-related endpoints
async function handleCars(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === 'GET') {
    if (path === '/api/cars') {
      // Get all cars
      const cars = await env.DB.prepare('SELECT * FROM cars ORDER BY created_at DESC').all();
      return new Response(JSON.stringify(cars.results), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else if (path === '/api/cars/active') {
      // Get active car
      const activeCar = await env.DB.prepare('SELECT * FROM cars WHERE is_active = 1 LIMIT 1').first();
      return new Response(JSON.stringify(activeCar), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } else if (request.method === 'POST') {
    // Create new car
    const data = await request.json();
    const result = await env.DB.prepare(`
      INSERT INTO cars (title, description, make, model, year, vehicle_type, image_url, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.title,
      data.description,
      data.make,
      data.model,
      data.year,
      data.vehicle_type,
      data.image_url,
      data.is_active || 0
    ).run();

    return new Response(JSON.stringify({ id: result.lastRowId }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not found', { status: 404 });
}

// Handle mint-related endpoints
async function handleMints(request, env, corsHeaders) {
  if (request.method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(`
      INSERT INTO mints (car_id, user_fid, transaction_hash, mint_date)
      VALUES (?, ?, ?, ?)
    `).bind(
      data.car_id,
      data.user_fid,
      data.transaction_hash,
      new Date().toISOString()
    ).run();

    return new Response(JSON.stringify({ id: result.lastRowId }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
} 