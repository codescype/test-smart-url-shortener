import { appTitle, appDescription } from '@/configs/app';
import PageHeader from '@/components/PageHeader';
import URLTransformCard from '@/components/URLTransformCard';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-64 from-purple-100/30 to-transparent -z-10"></div>

          <PageHeader
            title={appTitle}
            description={appDescription}
            className="mb-8"
          />

          <URLTransformCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
