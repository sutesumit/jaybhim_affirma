import React, { useState } from 'react';
import { TitleDiscription } from '@/components/features/page-title';
import { content } from '../../content';
import Background from './Background';

export function HeroSection() {
  const [isBgOn, setIsBgOn] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsBgOn(true)} 
      onMouseLeave={() => setIsBgOn(false)}
      className='relative h-full w-full overflow-hidden'
    >
      <TitleDiscription
        title={content.title}
        description={content.description}
        background={isBgOn ? <Background /> : undefined}
      />
    </div>
  );
}
