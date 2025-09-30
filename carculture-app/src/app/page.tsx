import CardFeed from '@/components/CardFeed';
import { BaseAccountProvider } from '@/components/BaseAccountProvider';

export default function Home() {
  return (
    <BaseAccountProvider>
      <CardFeed />
    </BaseAccountProvider>
  );
}
