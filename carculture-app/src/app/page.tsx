import CardFeed from '@/components/CardFeed';
// import { CrossDomainDRIVRAgent } from '@cculture/shared-auth';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* DRIVR Agent Integration */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* <CrossDomainDRIVRAgent 
            onAuthStateChange={(state) => {
              console.log('Cross-domain auth state changed:', state);
            }}
          /> */}
          <div className="text-center py-4 text-gray-600">
            DRIVR Agent Integration Coming Soon
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <CardFeed />
    </div>
  );
}
