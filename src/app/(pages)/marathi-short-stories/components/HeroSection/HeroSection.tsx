'use client'

import React, { useState } from 'react';
import { TitleDiscription } from '@/components/features/page-title';
import { usePageMetadata } from '@/lib/hooks/use-page-metadata';
import Background from './Background';

export function HeroSection() {
  const [isBgOn, setIsBgOn] = useState(false);
  const { title, description, startDate, finishDate } = usePageMetadata();

  return (
    <div 
      onMouseEnter={() => setIsBgOn(true)} 
      onMouseLeave={() => setIsBgOn(false)}
      className='relative h-full w-full overflow-hidden'
    >
      <TitleDiscription
        title={title}
        description={description}
        background={isBgOn ? <Background /> : undefined}
        startDate={startDate}
        finishDate={finishDate}
      />
    </div>
  );
}
