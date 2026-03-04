import React, { forwardRef } from 'react';
import WritingsSnapscroll from './WritingsSnapscroll';
import { Gradient1 } from '@/components/features';

export const ArtCanvas = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className='h-full w-full'>
      <Gradient1 >
    <div ref={ref} className='flex min-h-screen w-full items-center justify-center '>
      
      <WritingsSnapscroll />
      
    </div>
    </Gradient1>
    </div>
  );
});

ArtCanvas.displayName = 'ArtCanvas';
