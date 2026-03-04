'use client';
import React, { useRef } from 'react';
import { HeroSection } from './components';
import { ArtCanvas } from './ArtCanvas';
import { Separator, AcknowledgementSection } from '@/components/features/shared';
import { CommentsSection } from '@/components/features/comments';
import { acknowledgements } from './content';

export default function MarathiShortStories() {
  const artCanvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      
      <ArtCanvas ref={artCanvasRef} />
      
      <Separator />
      <CommentsSection pagePath="/marathi-short-stories" mode="standalone" />
      {/* <Separator />
      <AcknowledgementSection names={acknowledgements} /> */}
    </div>
  );
}
