#!/bin/bash

# Daily OnchainKit Monitor Script
# Run this script daily to check for updates

cd "$(dirname "$0")"
echo "🔍 Checking for OnchainKit updates..."
npm run monitor

# Optional: Add notification if you want
# echo "✅ Daily check complete at $(date)"
