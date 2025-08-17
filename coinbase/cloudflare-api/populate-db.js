// Script to populate CarMania database with CSV data
// Run this after deploying your schema

const carsData = [
  {
    title: 'Light Bulb Moment',
    description: 'When I was four-years-old my father put me on his lap and let me drive our Volkswagen Beetle. My mother screamed. My father shifted the gears. I concentrated on keeping our precious bug on the road. This was my Light Bulb Moment: I morphed into what I am today the Drivr.',
    make: 'Volkswagen',
    model: 'Beetle',
    year: 1964,
    vehicle_type: 'Coupe',
    image_url: 'https://assets.manifold.xyz/optimized/9506c8005f134daeb4c9eb06e80fff99f42bb5b71467549e1ad8639ee906139f/w_1024.jpg',
    mint_url: 'https://app.manifold.xyz/c/light-bulb-moment',
    contract_type: 'BASE 1155',
    contract_address: '0x1c6d27a76f4f706cccb698acc236c31f886c5421',
    edition_size: 10,
    metadata_url: 'https://assets.manifold.xyz/optimized/9506c8005f134daeb4c9eb06e80fff99f42bb5b71467549e1ad8639ee906139f/w_1024.jpg',
    status: 'published',
    is_active: 1
  },
  {
    title: 'Barn Fresh',
    description: 'Jaguar fresh from the "barn" and ready for the highest auto auction bidder',
    make: 'Jaguar',
    model: 'Jaguar XK120 Drophead Coupe',
    year: 1953,
    vehicle_type: 'Drophead Coupe Sports Car',
    image_url: 'https://arweave.net/qCO_kXgLaXhaVP8DqmTddFOW86YsLWnmU0hJA6S5fws',
    mint_url: 'https://manifold.xyz/@carculture/id/4195533040',
    contract_type: 'BASE 1155',
    contract_address: '0x1c6d27a76f4f706cccb698acc236c31f886c5421',
    edition_size: 1,
    metadata_url: 'https://arweave.net/qCO_kXgLaXhaVP8DqmTddFOW86YsLWnmU0hJA6S5fws',
    status: 'published',
    is_active: 0
  },
  {
    title: 'The Thing',
    description: 'Billboards along the highway are the original interactive entertainment for travelers',
    make: '',
    model: '',
    year: 2025,
    vehicle_type: '',
    image_url: 'https://app.ardrive.io/#/file/c82a3988-4e5d-46e7-b089-23d7e951c6c4/view?fileKey=HFf56LQ8MBwJVekzSpGwErDHavV1HXmKv874rywaARs,e_ttWmzA7TET2mvmKIYnYglm0yt2PGmdNVb2OIlRxXM',
    mint_url: 'https://app.manifold.xyz/c/man-driving-car',
    contract_type: 'BASE 1155',
    contract_address: '0x1c6d27a76f4f706cccb698acc236c31f886c5421',
    edition_size: 1,
    metadata_url: '',
    status: 'published',
    is_active: 0
  },
  {
    title: 'Teenyosaurus',
    description: '',
    make: 'Nash',
    model: 'Metropolitan',
    year: 1955,
    vehicle_type: 'Economy Car',
    image_url: 'https://arweave.net/W4HXhc_KU9hBJw1L2geJ3CLuUK7111Hv05el0NpFe2g',
    mint_url: 'https://app.manifold.xyz/c/teenyosaurus',
    contract_type: 'BASE 721',
    contract_address: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    edition_size: 25,
    metadata_url: 'https://6csb6mgwl4pxku7fjel5ojgmaguesili247mlgeambylpf34ui5q.arweave.net/8KQfMNZfH3VT5UkX1yTMAahJIWjXPsWYgGBwt5d8ojs',
    status: 'draft',
    is_active: 0
  }
];

// Instructions for manual population:
console.log('🚗 CarMania Database Population Script');
console.log('=====================================');
console.log('');
console.log('To populate your database, run these SQL commands:');
console.log('');

carsData.forEach((car, index) => {
  if (index === 0) {
    console.log('-- First, clear any existing data');
    console.log('DELETE FROM cars;');
    console.log('');
  }
  
  console.log(`-- Inserting: ${car.title}`);
  console.log(`INSERT INTO cars (title, description, make, model, year, vehicle_type, image_url, mint_url, contract_type, contract_address, edition_size, metadata_url, status, is_active) VALUES (`);
  console.log(`  '${car.title}',`);
  console.log(`  '${car.description.replace(/'/g, "''")}',`);
  console.log(`  '${car.make}',`);
  console.log(`  '${car.model}',`);
  console.log(`  ${car.year},`);
  console.log(`  '${car.vehicle_type}',`);
  console.log(`  '${car.image_url}',`);
  console.log(`  '${car.mint_url}',`);
  console.log(`  '${car.contract_type}',`);
  console.log(`  '${car.contract_address}',`);
  console.log(`  ${car.edition_size},`);
  console.log(`  '${car.metadata_url}',`);
  console.log(`  '${car.status}',`);
  console.log(`  ${car.is_active}`);
  console.log(`);`);
  console.log('');
});

console.log('-- Verify the data');
console.log('SELECT * FROM cars;');
console.log('');
console.log('-- Check active car');
console.log('SELECT * FROM cars WHERE is_active = 1;');
