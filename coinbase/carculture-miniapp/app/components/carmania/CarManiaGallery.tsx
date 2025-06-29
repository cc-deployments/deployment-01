import Image from 'next/image';
import { useState } from 'react';

type Car = {
  title: string;
  image: string;
  mintUrl: string;
  mintActive: boolean;
};

const carOfTheDay: Car = {
  title: 'Man Driving Car',
  image: 'https://arweave.net/mMJs74owoJPCVhufYBxcBUl0dGpVDsTT3BG6hNKi56s', // Updated to actual NFT image
  mintUrl: 'https://app.manifold.xyz/c/man-driving-car',
  mintActive: true, // You can use this to disable the button after Sept 21
};

const previousCars: Car[] = [
  {
    title: 'Barn Fresh',
    image: 'https://arweave.net/qCO_kXgLaXhaVP8DqmTddFOW86YsLWnmU0hJA6S5fws',
    mintUrl: 'https://manifold.gallery/base:0x1c6d27a76f4f706cccb698acc236c31f886c5421?utm_source=collector_app&utm_medium=claim&utm_campaign=info_section',
    mintActive: true,
  },
  {
    title: 'Light Bulb Moment',
    image: 'https://assets.manifold.xyz/optimized/9506c8005f134daeb4c9eb06e80fff99f42bb5b71467549e1ad8639ee906139f/w_1024.jpg',
    mintUrl: 'https://app.manifold.xyz/c/light-bulb-moment',
    mintActive: true,
  },
  {
    title: 'Teenyosaurus',
    image: 'https://arweave.net/W4HXhc_KU9hBJw1L2geJ3CLuUK7111Hv05el0NpFe2g',
    mintUrl: '', // No mint URL yet
    mintActive: false
  },
];

export default function CarManiaGallery() {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 bg-black">
      {/* Car of the Day Label */}
      <div className="mb-6 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Car of the Day
        </h2>
        <p className="text-gray-400 text-center text-lg">
          Today's featured CarMania NFT
        </p>
      </div>

      {/* Car of the Day Card */}
      <div className="w-full max-w-5xl bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-center mx-auto border border-zinc-700">
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-2xl mb-6">
            {imageLoading && (
              <div className="absolute inset-0 bg-zinc-800 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}
            <Image
              src={carOfTheDay.image}
              alt={carOfTheDay.title}
              width={900}
              height={500}
              className={`rounded-xl object-contain w-full h-auto transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              priority
              style={{ maxHeight: '400px', objectFit: 'contain', background: '#111' }}
              onLoad={() => setImageLoading(false)}
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">{carOfTheDay.title}</h3>
          <button
            className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => window.open(carOfTheDay.mintUrl, '_blank')}
            disabled={!carOfTheDay.mintActive}
          >
            {carOfTheDay.mintActive ? 'Mint on Manifold' : 'Minting Closed'}
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="w-full max-w-6xl mt-12">
        <h3 className="text-2xl md:text-3xl text-white mb-6 font-bold text-center">Previous Cars of the Day</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {previousCars.length === 0 ? (
            <div className="col-span-full text-zinc-400 text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <p className="text-xl">No previous cars yet. Stay tuned!</p>
            </div>
          ) : (
            previousCars.map((car, idx) => (
              <div key={idx} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 flex flex-col items-center border border-zinc-700 hover:border-zinc-600 transition-all duration-200 hover:shadow-lg">
                <div className="relative w-full mb-4">
                  <Image
                    src={car.image}
                    alt={car.title}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <div className="text-white font-semibold text-center mb-3 text-lg">{car.title}</div>
                <button
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => window.open(car.mintUrl, '_blank')}
                  disabled={!car.mintActive}
                >
                  {car.mintActive ? 'Mint on Manifold' : 'Minting Closed'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 