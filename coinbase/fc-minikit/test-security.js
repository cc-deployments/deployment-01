#!/usr/bin/env node

/**
 * Security Implementation Test Script
 * Tests CORS blocking and client IP detection
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'https://carmania.carculture.com';
const LOCAL_URL = 'http://localhost:3000';

// Test configuration
const tests = [
  {
    name: '✅ Authorized Origin Test',
    origin: 'https://carmania.carculture.com',
    expectedStatus: 200,
    description: 'Should allow requests from approved origin'
  },
  {
    name: '🚫 Unauthorized Origin Test',
    origin: 'https://malicious-site.com',
    expectedStatus: 403,
    description: 'Should block requests from unauthorized origin'
  },
  {
    name: '📱 Mobile App Test (No Origin)',
    origin: null,
    expectedStatus: 200,
    description: 'Should allow requests without origin (mobile apps)'
  }
];

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function runTest(test) {
  console.log(`\n🧪 Running: ${test.name}`);
  console.log(`📝 ${test.description}`);
  
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Security-Test-Script/1.0'
  };
  
  if (test.origin) {
    headers['Origin'] = test.origin;
  }
  
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      amount: '0.01',
      currency: 'ETH',
      destinationAddress: '0x048a22DAB92f2c1e7Deb3847Ca151B888aAbOF1C',
      blockchain: 'base',
      productName: 'Security Test NFT'
    })
  };
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/onramp/token`, options);
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`🎯 Expected: ${test.expectedStatus}`);
    
    if (response.status === test.expectedStatus) {
      console.log(`✅ PASS: Status matches expected`);
    } else {
      console.log(`❌ FAIL: Status ${response.status} does not match expected ${test.expectedStatus}`);
    }
    
    // Check CORS headers
    const corsOrigin = response.headers['access-control-allow-origin'];
    if (test.origin && test.expectedStatus === 200) {
      if (corsOrigin === test.origin) {
        console.log(`✅ PASS: CORS header correctly set to ${corsOrigin}`);
      } else {
        console.log(`❌ FAIL: CORS header ${corsOrigin} does not match origin ${test.origin}`);
      }
    } else if (test.expectedStatus === 403) {
      if (!corsOrigin) {
        console.log(`✅ PASS: No CORS header for blocked request`);
      } else {
        console.log(`❌ FAIL: CORS header present for blocked request: ${corsOrigin}`);
      }
    }
    
    // Parse response data
    try {
      const data = JSON.parse(response.data);
      if (data.clientIp) {
        console.log(`🔍 Client IP detected: ${data.clientIp}`);
      }
    } catch (e) {
      // Response might not be JSON for error cases
    }
    
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Coinbase Onramp Security Compliance Tests');
  console.log('=' .repeat(60));
  
  for (const test of tests) {
    await runTest(test);
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('🏁 Security tests completed');
  console.log('\n📋 Next Steps:');
  console.log('1. Review test results above');
  console.log('2. Deploy to production if all tests pass');
  console.log('3. Notify Coinbase at onrampsupport@coinbase.com');
  console.log('4. Monitor security logs in production');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests, runTest };


