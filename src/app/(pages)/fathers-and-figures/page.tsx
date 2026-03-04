'use client'
import React, { useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { ArtCanvas } from './ArtCanvas';
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { Submissions } from './components/Submissions';
import { MyCardProvider } from './components/MakeMyCard/context/MyCardContext';
import { MaraaSection } from './components/MaraaSection';
import { acknowledgements } from './content';

export default function Home() {
  const artCanvasRef = useRef<HTMLDivElement | null>(null);

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
      <CommentsSection pagePath="/fathers-and-figures" mode="standalone" />
      <Separator />
      <AcknowledgementSection names={acknowledgements} />
    </div>
  );
}
