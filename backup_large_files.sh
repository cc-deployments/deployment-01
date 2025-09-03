#!/bin/bash

# Script to move large files out of the git repository
# These files should be stored locally but not committed to git

echo "🧹 Moving large files out of git repository..."

# Create backup directory
BACKUP_DIR="$HOME/carculture/Projects/CCulture-apps-New-nft_car_system"
mkdir -p "$BACKUP_DIR"

# Move Python virtual environment
if [ -d "nft_car_system/venv" ]; then
    echo "📦 Moving Python virtual environment (801MB)..."
    mv nft_car_system/venv "$BACKUP_DIR/"
    echo "✅ Moved nft_car_system/venv to $BACKUP_DIR/"
fi

# Move ML datasets
if [ -d "nft_car_system/nft_car_dataset_final_corrected" ]; then
    echo "📦 Moving ML dataset (453MB)..."
    mv nft_car_system/nft_car_dataset_final_corrected "$BACKUP_DIR/"
    echo "✅ Moved nft_car_system/nft_car_dataset_final_corrected to $BACKUP_DIR/"
fi

if [ -d "nft_car_system/nft_car_dataset_final_with_correct_info" ]; then
    echo "📦 Moving ML dataset (9.8GB)..."
    mv nft_car_system/nft_car_dataset_final_with_correct_info "$BACKUP_DIR/"
    echo "✅ Moved nft_car_system/nft_car_dataset_final_with_correct_info to $BACKUP_DIR/"
fi

if [ -d "nft_car_system/nft_car_dataset_full_205" ]; then
    echo "📦 Moving ML dataset (7.1GB)..."
    mv nft_car_system/nft_car_dataset_full_205 "$BACKUP_DIR/"
    echo "✅ Moved nft_car_system/nft_car_dataset_full_205 to $BACKUP_DIR/"
fi

# Remove from git tracking
echo "🗑️  Removing large files from git tracking..."
git rm -r --cached nft_car_system/venv/ 2>/dev/null || true
git rm -r --cached nft_car_system/nft_car_dataset_*/ 2>/dev/null || true

echo ""
echo "✅ Cleanup complete!"
echo "📁 Large files moved to: $BACKUP_DIR"
echo "🚀 Repository is now much smaller and ready to push!"
echo ""
echo "💡 To restore these files later, just move them back from $BACKUP_DIR"
