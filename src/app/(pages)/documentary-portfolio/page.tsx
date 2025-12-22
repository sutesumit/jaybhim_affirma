import React from 'react';
import DocumentaryGallery from './DocumentaryGallery';


export default function DocumentaryPortfolio() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full isolate">
      <DocumentaryGallery />
    </section>
  );
}