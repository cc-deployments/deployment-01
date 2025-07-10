#!/bin/bash

# List of allowed env vars (edit this to match your actual needs)
ALLOWED_VARS=(
  "NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME"
  "FARCASTER_HEADER"
  "FARCASTER_PAYLOAD"
  "FARCASTER_SIGNATURE"
  # Add any other secrets or true env-specific vars here
)

# Get all current env vars from Vercel
echo "Fetching current Vercel environment variables..."
vercel env ls > .vercel_envs.txt

echo ""
echo "Allowed variables:"
printf '%s\n' "${ALLOWED_VARS[@]}"
echo ""

echo "Variables found in Vercel:"
cat .vercel_envs.txt | grep -E '^[A-Z0-9_]+ ' | awk '{print $1}' | sort | uniq > .vercel_envs_keys.txt
cat .vercel_envs_keys.txt

echo ""
echo "Variables NOT in allowed list (candidates for deletion):"
grep -vxFf <(printf '%s\n' "${ALLOWED_VARS[@]}") .vercel_envs_keys.txt

echo ""
echo "Review the above list. You can delete unused variables in the Vercel dashboard or with:"
echo "vercel env rm <VAR_NAME> <environment>" 