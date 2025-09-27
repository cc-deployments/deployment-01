// Utility to parse NFT data from CSV and convert to gallery format

export interface NFTData {
  id: string;
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  price: string;
  currency: 'USD' | 'ETH';
  year: string;
  brand: string;
  rarity: 'common' | 'rare' | 'legendary';
  contractAddress: string;
  tokenId: string;
  platform: 'cdp' | 'manifold';
  platformName: string;
  mintUrl: string;
  status: 'published' | 'testing' | 'draft';
}

export interface CSVRow {
  publication_date: string;
  title: string;
  mint_url: string;
  status: string;
  description: string;
  make: string;
  model: string;
  year: string;
}

/**
 * Parse CSV data and convert to NFT gallery format
 */
export function parseCSVToNFTs(csvData: string): NFTData[] {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  const nfts: NFTData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < headers.length) continue;

    const row: CSVRow = {
      publication_date: values[0] || '',
      title: values[1] || '',
      mint_url: values[2] || '',
      status: values[3] || 'draft',
      description: values[4] || '',
      make: values[5] || '',
      model: values[6] || '',
      year: values[7] || ''
    };

    // Skip empty rows or rows without proper URLs
    if (!row.title || !row.mint_url) continue;

    // Extract token ID from Manifold URL
    const tokenIdMatch = row.mint_url.match(/\/id\/(\d+)/);
    const tokenId = tokenIdMatch ? tokenIdMatch[1] : '1';

    // Determine contract address based on URL format
    let contractAddress = '0x8ef0772347e0caed0119937175d7ef9636ae1aa0'; // Default Base ERC-721
    if (row.mint_url.includes('manifold.gallery/base:')) {
      const contractMatch = row.mint_url.match(/base:(0x[a-fA-F0-9]{40})/);
      if (contractMatch) {
        contractAddress = contractMatch[1];
      }
    }

    // Determine platform and currency
    const platform = row.mint_url.includes('manifold') ? 'manifold' : 'cdp';
    const currency = platform === 'manifold' ? 'USD' : 'USD'; // Default to USD for now

    // Use only images that actually exist - no thumbnails to avoid 404s
    let image = '/hero-v2.png'; // Default fallback
    let thumbnail = '/hero-v2.png'; // Always use fallback for thumbnails
    
    if (row.title.includes('CarMania Garage Testing')) {
      const testNumber = row.title.match(/\d+/)?.[0] || '1';
      image = `/preview-images/car_culture__carmania_garage_testing_${testNumber}_preview.jpg`;
      // Don't use thumbnail - it causes 404s
    } else if (row.title === 'Low Tide') {
      image = '/preview-images/low_tide_preview.png';
    } else if (row.title === 'Summertime Blues') {
      image = '/preview-images/summertime_blues_preview.png';
    } else if (row.title === 'Flat Sea') {
      image = '/preview-images/flat_sea_preview.png';
    }
    // For all other titles (Barn Fresh, etc.), use default fallback

    // Determine rarity based on status and year
    let rarity: 'common' | 'rare' | 'legendary' = 'common';
    if (row.status === 'published' && row.year && parseInt(row.year) < 2000) {
      rarity = 'legendary';
    } else if (row.status === 'published') {
      rarity = 'rare';
    }

    const nft: NFTData = {
      id: tokenId,
      name: row.title,
      description: row.description || `${row.title} - ${row.make} ${row.model} ${row.year}`.trim(),
      image,
      thumbnail,
      price: '1.00', // Default price - could be dynamic
      currency,
      year: row.year || '2025',
      brand: row.make || 'CarCulture',
      rarity,
      contractAddress,
      tokenId,
      platform,
      platformName: platform === 'manifold' ? 'Manifold Studios' : 'Coinbase Developer Platform',
      mintUrl: row.mint_url,
      status: row.status as 'published' | 'testing' | 'draft'
    };

    nfts.push(nft);
  }

  return nfts;
}

/**
 * Get CarMania Garage Testing NFTs specifically
 */
export function getCarManiaGarageNFTs(): NFTData[] {
  const csvData = `publication_date,title,mint_url,status,description,make,model,year
2025-09-01,Car Culture: CarMania Garage Testing 1,https://manifold.xyz/@carculture/id/4169111792,testing,CarMania Garage Testing 1,Nil,Nil,Nil
2025-09-02,Car Culture: CarMania Garage Testing 2,https://manifold.xyz/@carculture/id/4169128176,published,CarMania Garage Testing 2,Nil,Nil,Nil
2025-09-03,Car Culture: CarMania Garage Testing 3,https://manifold.xyz/@carculture/id/4169124080,testing,CarMania Garage Testing 3,Nil,Nil,Nil
2025-09-04,Car Culture: CarMania Garage Testing 4,https://manifold.xyz/@carculture/id/4169085168,testing,CarMania Garage Testing 4,Nil,Nil,Nil
2025-09-05,Car Culture: CarMania Garage Testing 5,https://manifold.xyz/@carculture/id/4169081072,testing,CarMania Garage Testing 5,Nil,Nil,Nil
2025-09-07,Car Culture: CarMania Garage Testing 6,https://manifold.xyz/@carculture/id/4169076976,testing,CarMania Garage Testing 6,Nil,Nil,Nil
2025-09-07,Car Culture: CarMania Garage Testing 7,https://manifold.xyz/@carculture/id/4169074928,testing,CarMania Garage Testing 7,Nil,Nil,Nil
2025-09-08,Car Culture: CarMania Garage Testing 8,https://manifold.xyz/@carculture/id/4169103600,testing,CarMania Garage Testing 8,Nil,Nil,Nil
2025-09-09,Car Culture: CarMania Garage Testing 9,https://manifold.xyz/@carculture/id/4169097456,testing,CarMania Garage Testing 9,Nil,Nil,Nil`;

  return parseCSVToNFTs(csvData);
}

/**
 * Get all published NFTs
 */
export function getPublishedNFTs(): NFTData[] {
  const csvData = `publication_date,title,mint_url,status,description,make,model,year
2025-07-03,Barn Fresh,https://manifold.xyz/@carculture/id/4195533040,published,Jaguar fresh from the barn and ready for the highest auto auction bidder,Jaguar,Jaguar XK120 Drophead Coupe,1953
2025-09-02,Car Culture: CarMania Garage Testing 2,https://manifold.xyz/@carculture/id/4169128176,published,CarMania Garage Testing 2,Nil,Nil,Nil
2025-09-06,Low Tide,https://manifold.xyz/@carculture/id/4149840112,published,Low Tide - A moment of calm reflection by the water's edge,Nil,Nil,Nil
2025-09-01 12:00 AM,Summertime Blues,https://manifold.xyz/@carculture/id/4144040176,published,Post-modern Surfing Wagon,Chevrolet,Suburban,1970
2025-09-16,Flat Sea,https://manifold.xyz/@carculture/id/4149807344,published,Flat Sea,Nil,Nil,Nil`;

  return parseCSVToNFTs(csvData);
}

