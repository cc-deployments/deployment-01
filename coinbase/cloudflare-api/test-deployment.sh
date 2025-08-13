#!/bin/bash

# Test Cloudflare API Token for GitHub Actions Deployment
echo "🔍 Testing Cloudflare API Token..."

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN environment variable not set"
    echo "Please set it with: export CLOUDFLARE_API_TOKEN='your-token-here'"
    exit 1
fi

echo "✅ CLOUDFLARE_API_TOKEN is set"

# Test authentication
echo "🔐 Testing authentication..."
wrangler whoami

# Test deployment (dry-run)
echo "🚀 Testing deployment (dry-run)..."
wrangler deploy --dry-run

echo "✅ Test completed successfully!"
echo "If both commands succeeded, the token has correct permissions" 