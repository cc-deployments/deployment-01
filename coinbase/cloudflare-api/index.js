// Cloudflare Worker for CarMania API
// Based on CLOUDFLARE_SETUP.md specifications
// GitHub Actions Test - 2025-07-26
// Updated with MANIFOLD Gallery Discussion integration

import ManifoldGalleryDiscussionAPI from './manifold-discussions.js';

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
      } else if (path === '/api/latest-mint') {
        return handleLatestMint(request, env, corsHeaders);
      } else if (path.startsWith('/api/manifold-discussions')) {
        return handleManifoldDiscussions(request, env, corsHeaders);
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
      
      if (!activeCar) {
        return new Response(JSON.stringify({
          success: false,
          message: 'No active car found'
        }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        data: {
          id: activeCar.id,
          title: activeCar.title,
          description: activeCar.description,
          make: activeCar.make,
          model: activeCar.model,
          year: activeCar.year,
          vehicle_type: activeCar.vehicle_type,
          image_url: activeCar.image_url,
          mint_url: activeCar.mint_url,
          contract_type: activeCar.contract_type,
          contract_address: activeCar.contract_address,
          edition_size: activeCar.edition_size
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } else if (request.method === 'POST') {
    // Create new car
    const data = await request.json();
    
    // If this car should be active, deactivate all others first
    if (data.is_active) {
      await env.DB.prepare('UPDATE cars SET is_active = 0').run();
    }
    
    const result = await env.DB.prepare(`
      INSERT INTO cars (title, description, make, model, year, vehicle_type, image_url, mint_url, contract_type, contract_address, edition_size, metadata_url, status, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.title,
      data.description,
      data.make,
      data.model,
      data.year,
      data.vehicle_type,
      data.image_url,
      data.mint_url,
      data.contract_type,
      data.contract_address,
      data.edition_size,
      data.metadata_url,
      data.status || 'draft',
      data.is_active || 0
    ).run();

    return new Response(JSON.stringify({ 
      success: true,
      id: result.lastRowId 
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } else if (request.method === 'PUT') {
    // Update car (for activating/deactivating)
    const pathParts = path.split('/');
    const carId = pathParts[pathParts.length - 1];
    
    if (path === `/api/cars/${carId}`) {
      const data = await request.json();
      
      // If activating this car, deactivate all others first
      if (data.is_active) {
        await env.DB.prepare('UPDATE cars SET is_active = 0').run();
      }
      
      const result = await env.DB.prepare(`
        UPDATE cars 
        SET title = ?, description = ?, make = ?, model = ?, year = ?, 
            vehicle_type = ?, image_url = ?, mint_url = ?, contract_type = ?, 
            contract_address = ?, edition_size = ?, metadata_url = ?, 
            status = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        data.title,
        data.description,
        data.make,
        data.model,
        data.year,
        data.vehicle_type,
        data.image_url,
        data.mint_url,
        data.contract_type,
        data.contract_address,
        data.edition_size,
        data.metadata_url,
        data.status,
        data.is_active,
        carId
      ).run();

      return new Response(JSON.stringify({ 
        success: true,
        message: 'Car updated successfully' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
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

// Handle latest mint endpoint - returns current day's car based on CSV data
async function handleLatestMint(request, env, corsHeaders) {
  if (request.method === 'GET') {
    try {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Return the current active car (Low Tide)
      // Updated to use Manifold mint page for proper user flow
      const currentCar = {
        title: 'Low Tide',
        publication_date: '2025-09-06',
        mint_url: 'https://manifold.xyz/@carculture/id/4149840112'
      };
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          mint_url: currentCar.mint_url,
          title: currentCar.title,
          publication_date: currentCar.publication_date
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Error in handleLatestMint:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Error fetching latest mint',
        error: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
  
  return new Response('Method not allowed', { status: 405 });
}

// Handle MANIFOLD Gallery Discussion endpoints
async function handleManifoldDiscussions(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Extract collection ID from path: /api/manifold-discussions/{collectionId}
  const pathParts = path.split('/');
  const collectionId = pathParts[pathParts.length - 1] || '@carculture';
  
  const manifoldAPI = new ManifoldGalleryDiscussionAPI(env);
  
  if (request.method === 'GET') {
    // Get discussions for collection
    const result = await manifoldAPI.getDiscussions(collectionId);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } else if (request.method === 'POST') {
    // Post new discussion
    const data = await request.json();
    const result = await manifoldAPI.postDiscussion(collectionId, data);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 201 : 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } else if (request.method === 'GET' && path.includes('/analytics')) {
    // Get discussion analytics
    const result = await manifoldAPI.getDiscussionAnalytics(collectionId);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Method not allowed', { status: 405 });
} 