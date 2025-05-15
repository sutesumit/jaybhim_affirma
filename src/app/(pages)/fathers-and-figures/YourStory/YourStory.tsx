'use client'
import Seperator from '@/app/my_components/shared/Seperator'
import React from 'react'
import InstructionReel from './InstructionReel'
import YourStoryForm from './YourStoryForm'
import StoryCardSetWrapper from '../StoryCards/StoryCardSetWrapper'
import { MyStoriesProvider } from './MyStoriesProvider'


interface YourStoryProps {
  artCanvasRef: React.RefObject<HTMLDivElement | null>;
}

const YourStory: React.FC<YourStoryProps> = ({ artCanvasRef }) => {


  return (
    <MyStoriesProvider >
      <> 
        <div className="relative isolate text-container grid md:grid-cols-2 my-2 md:flex-row flex-col items-center justify-center gap-5">
            <InstructionReel />
            {/* <YourStoryForm artCanvasRef={artCanvasRef} /> */}
        </div>
        {/* <StoryCardSetWrapper /> */}
        <div className="relative">
            <Seperator />
        </div>
      </>
    </MyStoriesProvider>
  )
}

export default YourStory
