import React from 'react';
import type { Metadata } from 'next';
import { DocumentaryGallery } from './components/DocumentaryGallery';
import { getImageList } from './imageList';
import { buildStaticMetadata } from '@/lib/metadata/builders';
import { getPageBySlug } from '@/lib/metadata';
import { buildProjectPageSchema, renderJsonLd } from '@/lib/metadata/schema';

export const metadata: Metadata = buildStaticMetadata('documentary-portfolio');

export default function DocumentaryPortfolio() {
  const images = getImageList();
  const pageData = getPageBySlug('documentary-portfolio');

  return (
    <section className="flex flex-col items-center justify-center h-screen w-full isolate">
      {pageData && renderJsonLd(buildProjectPageSchema(pageData))}
      <DocumentaryGallery images={images} />
    </section>
  );
}