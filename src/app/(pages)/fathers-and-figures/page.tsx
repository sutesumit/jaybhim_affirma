'use client'
import React, { useRef } from 'react';
import { HeroSection, Submissions, MyCardProvider, MaraaSection } from './components'
import { ArtCanvas } from './ArtCanvas';
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata';

export default function Home() {
  const artCanvasRef = useRef<HTMLDivElement | null>(null);
  const { acknowledgements, pagePath } = usePageMetadata();

  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <ArtCanvas ref={artCanvasRef} />
      <MyCardProvider>
        <Submissions artCanvasRef={artCanvasRef} />
      </MyCardProvider>
      <Separator />
      <MaraaSection />
      <Separator />
      <CommentsSection pagePath={pagePath} mode="standalone" />
      <Separator />
      {acknowledgements.length > 0 && <AcknowledgementSection names={acknowledgements} />}
    </div>
  );
}
