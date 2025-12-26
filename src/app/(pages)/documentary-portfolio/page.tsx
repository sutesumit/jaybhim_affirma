import React from 'react';
import DocumentaryGallery from './DocumentaryGallery';
import { getImageList } from './imageList';

export default function DocumentaryPortfolio() {
  const images = getImageList();

  return (
    <section className="flex flex-col items-center justify-center h-screen w-full isolate">
      <DocumentaryGallery images={images} />
    </section>
  );
}