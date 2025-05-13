'use client';

import PageHeader from '@/components/PageHeader';
import URLTable from '@/components/URLTable';

export default function URLList() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-64 bg-hero-glow -z-10"></div>

          <PageHeader
            title="Your Shortened Links"
            description="View and manage all your shortened URLs"
            className="mb-12"
          />

          <URLTable />
        </div>
      </div>
    </div>
  );
};