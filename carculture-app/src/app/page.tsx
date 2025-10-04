import CardFeed from '@/components/CardFeed';
import { BaseAccountProvider } from '@/components/BaseAccountProvider';
import { CrossDomainDRIVRAgent } from '@shared/auth';

export default function Home() {
  return (
    <BaseAccountProvider>
      <div className="min-h-screen bg-gray-50">
        {/* DRIVR Agent Integration */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <CrossDomainDRIVRAgent 
              onAuthStateChange={(state) => {
                console.log('Cross-domain auth state changed:', state);
              }}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <CardFeed />
      </div>
    </BaseAccountProvider>
  );
}
