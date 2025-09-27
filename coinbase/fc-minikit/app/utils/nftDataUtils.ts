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
  image_url: string;
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
      image_url: values[4] || '',
      description: values[5] || '',
      make: values[6] || '',
      model: values[7] || '',
      year: values[8] || ''
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

    // Use the actual image URL from the database
    let image = row.image_url || '/hero-v2.png'; // Use database image or fallback
    let thumbnail = '/hero-v2.png'; // Always use fallback for thumbnails

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
  const csvData = `publication_date,title,mint_url,status,image_url,description,make,model,year
2025-09-01,Car Culture: CarMania Garage Testing 1,https://manifold.xyz/@carculture/id/4169111792,testing,https://hlwk6ht7i3v7hnrmrouv4jhwjss4ztuibm5ey7qii6ou7eq2ye5a.arweave.net/OuyvHn9G6_O2LIupXiT2TKXMzogLOkx-CEedT5IawTo,CarMania Garage Testing 1,Nil,Nil,Nil
2025-09-02,Car Culture: CarMania Garage Testing 2,https://manifold.xyz/@carculture/id/4169128176,published,https://56k43jlbc26cs47a6lg6srqv77epwa2uibctqtg5jmedtrg6gfoq.arweave.net/75XNpWEWvClz4PLN6UYV_8j7A1RARThM3UsIOcTeMV0,CarMania Garage Testing 2,Nil,Nil,Nil
2025-09-03,Car Culture: CarMania Garage Testing 3,https://manifold.xyz/@carculture/id/4169124080,testing,https://kl5lgl3bvujomrzo5noe35jw6yxws5whnw53zogrhbaz73edu6kq.arweave.net/UvqzL2GtEuZHLutcTfU29i9pdsdtu7y40ThBn-yDp5U,CarMania Garage Testing 3,Nil,Nil,Nil
2025-09-04,Car Culture: CarMania Garage Testing 4,https://manifold.xyz/@carculture/id/4169085168,testing,https://iragqon5jdtmlmb64usi3ec3du4fdgxodx3zqw3r5ctdsc3ej7xa.arweave.net/REBoOb1I5sWwPuUkjZBbHThRmu4d95hbceimOQtkT-4,CarMania Garage Testing 4,Nil,Nil,Nil
2025-09-05,Car Culture: CarMania Garage Testing 5,https://manifold.xyz/@carculture/id/4169081072,testing,https://f5d2zie2k6s545nphdhdnpmdufvfccbevim2bu4ziewakwsmm6wa.arweave.net/L0esoJpXpd51rzjONr2DoWpRCCSqGaDTmUEsBVpMZ6w,CarMania Garage Testing 5,Nil,Nil,Nil
2025-09-06,Car Culture: CarMania Garage Testing 6,https://manifold.xyz/@carculture/id/4169076976,testing,https://3yqpmriehuvnvqi3j7br7u2y37o6eh4siieto2aljd2qvcv4fxxa.arweave.net/3iD2RQQ9KtrBG0_DH9NY393iH5JCCTdoC0j1Coq8Le4,CarMania Garage Testing 6,Nil,Nil,Nil
2025-09-07,Car Culture: CarMania Garage Testing 7,https://manifold.xyz/@carculture/id/4169074928,testing,https://3z23cykd5cjsmvt3ion3ubfsqpmkrhslmg3cx3e4gzlnjjmswknq.arweave.net/3nWxYUPokyZWe0ObugSyg9ionkthtivsnDZW1KWSsps,CarMania Garage Testing 7,Nil,Nil,Nil
2025-09-08,Car Culture: CarMania Garage Testing 8,https://manifold.xyz/@carculture/id/4169103600,testing,https://s7427qxzu2ggghmvczxiftg44ew4j2fjisfh3yq47yucx5y32rna.arweave.net/l_mvwvmmjGMdlRZugszc4S3E6KlEin3iHP4oK_cb1Fo,CarMania Garage Testing 8,Nil,Nil,Nil
2025-09-09,Car Culture: CarMania Garage Testing 9,https://manifold.xyz/@carculture/id/4169097456,testing,https://bzf6clfbkqqztyf5wscbtktorbzpq5syuoq4sdtzlpwpudqkk3nq.arweave.net/DkvhLKFUIZngvbSEGapuiHL4dlijockOeVvs-g4KVts,CarMania Garage Testing 9,Nil,Nil,Nil
2025-09-01,Summertime Blues,https://manifold.xyz/@carculture/id/4144040176,First test with ai chat,https://ur4re6uytbzkxhvamuzhxaugfrpsfywiukkeabahnvddaumlcama.arweave.net/pHkSepiYcqueoGUye4KGLF8i4siilEAEB21GMFGLEBg,Post-modern Surfing Wagon,Chevrolet,Suburban,1970`;

  return parseCSVToNFTs(csvData);
}

/**
 * Get all published NFTs
 */
export function getPublishedNFTs(): NFTData[] {
  const csvData = `publication_date,title,mint_url,status,description,make,model,year
2025-07-03,Barn Fresh,https://manifold.xyz/@carculture/id/4195533040,published,Jaguar fresh from the barn and ready for the highest auto auction bidder,Jaguar,Jaguar XK120 Drophead Coupe,1953
2025-09-16,Flat Sea,https://manifold.xyz/@carculture/id/4149807344,published,Flat Sea,Nil,Nil,Nil`;

  return parseCSVToNFTs(csvData);
}

