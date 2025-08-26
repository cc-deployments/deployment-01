#!/bin/bash

# 🚨 DEPLOYMENT GUARD RAIL SCRIPT
# This script ensures ONLY master branch deployments

echo "🚨 DEPLOYMENT GUARD RAIL CHECKING..."

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if we're on master
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "❌ ERROR: You are NOT on master branch!"
    echo "🚫 Deployments are ONLY allowed from master branch"
    echo "🔄 Please switch to master: git checkout master"
    exit 1
fi

# Check if master is up to date
echo "🔄 Checking if master is up to date..."
git fetch origin
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/master)

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    echo "❌ ERROR: Local master is not up to date with remote!"
    echo "🔄 Please pull latest: git pull origin master"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ ERROR: You have uncommitted changes!"
    echo "🔄 Please commit all changes before deploying"
    exit 1
fi

echo "✅ GUARD RAIL PASSED: Ready to deploy from master branch"
echo "🚀 Proceeding with deployment..."

# Show deployment info
echo "📋 Deployment Info:"
echo "   Branch: $CURRENT_BRANCH"
echo "   Commit: $(git rev-parse --short HEAD)"
echo "   Message: $(git log -1 --pretty=%B)"
echo "   Author: $(git log -1 --pretty=%an)"
echo "   Date: $(git log -1 --pretty=%cd)"
