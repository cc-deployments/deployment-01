
import os
import json

def upload_to_arweave():
    # This would use the ArDrive Python SDK
    # For now, we'll create a manifest of what needs to be uploaded
    dataset_path = 'nft_car_system/proper_minimal_dataset'
    
    files_to_upload = []
    
    # Walk through the directory
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, dataset_path)
            file_size = os.path.getsize(file_path)
            
            files_to_upload.append({
                'path': relative_path,
                'size': file_size,
                'type': 'model' if 'model' in relative_path else 'metadata'
            })
    
    # Save upload manifest
    with open('arweave_upload_manifest.json', 'w') as f:
        json.dump(files_to_upload, f, indent=2)
    
    print(f'Found {len(files_to_upload)} files to upload')
    total_size = sum(f['size'] for f in files_to_upload)
    print(f'Total size: {total_size / (1024*1024*1024):.2f} GB')
    
    return files_to_upload

if __name__ == '__main__':
    upload_to_arweave()
