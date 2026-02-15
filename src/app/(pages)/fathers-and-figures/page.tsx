'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from './HeroSection';
import { ArtCanvas } from './ArtCanvas';
import Seperator from '@/app/my_components/shared/Seperator';
import { Submissions } from './Submissions';
import { CommentsSection } from '@/app/my_components/CommentsSection/CommentsSection';
import { MyCardProvider } from './MakeMyCard/context/MyCardContext';
import { MaraaSection } from './MaraaSection';
import AcknowledgementSection from '@/app/my_components/AcknowledgementSection/AcknowledgementSection';

export default function Home() {
  const artCanvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <HeroSection />
      <ArtCanvas ref={artCanvasRef} />
      <MyCardProvider>
      <Submissions artCanvasRef={artCanvasRef} />
      </MyCardProvider>
      <div className="relative w-full">
        <Seperator />
      </div>

      <MaraaSection />
      <div className='relative w-full'>
        <Seperator />
      </div>
      <CommentsSection pagePath="/fathers-and-figures" mode="standalone" />
      <div className='relative w-full'>
        <Seperator />
      </div>
      <AcknowledgementSection names={["Digambar Sute", "Angarika", "Geetanjali Sharma", "Debottam"]} />
    </>
  );
}