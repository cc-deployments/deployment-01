import Image from 'next/image';

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
];

export default function CarManiaGallery() {
  return (
    <div className="w-full flex flex-col items-center py-8 px-2 bg-black">
      {/* Car of the Day Label */}
      <div className="mb-4 w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Car of the Day</h2>
      </div>

      {/* Car of the Day Card */}
      <div className="w-full max-w-5xl bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col items-center mx-auto">
        <div className="w-full flex flex-col items-center">
          <Image
            src={carOfTheDay.image}
            alt={carOfTheDay.title}
            width={900}
            height={500}
            className="rounded-lg object-contain mb-4 w-full h-auto"
            priority
            style={{ maxHeight: '400px', objectFit: 'contain', background: '#111' }}
          />
          <h3 className="text-2xl font-bold text-white mb-2 text-center">{carOfTheDay.title}</h3>
          <button
            className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
            onClick={() => window.open(carOfTheDay.mintUrl, '_blank')}
            disabled={!carOfTheDay.mintActive}
          >
            Mint on Manifold
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="w-full max-w-5xl">
        <h3 className="text-xl text-white mb-4 font-semibold">Previous Cars of the Day</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {previousCars.length === 0 ? (
            <div className="col-span-full text-zinc-400 text-center">No previous cars yet. Stay tuned!</div>
          ) : (
            previousCars.map((car, idx) => (
              <div key={idx} className="bg-zinc-800 rounded-lg p-3 flex flex-col items-center">
                <Image
                  src={car.image}
                  alt={car.title}
                  width={180}
                  height={120}
                  className="rounded mb-2 object-cover"
                />
                <div className="text-white font-medium text-center mb-1">{car.title}</div>
                <button
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  onClick={() => window.open(car.mintUrl, '_blank')}
                  disabled={!car.mintActive}
                >
                  Mint on Manifold
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 