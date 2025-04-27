import Seperator from '@/app/my_components/shared/Seperator'
import React from 'react'
import InstructionReel from './InstructionReel'
import YourStoryForm from './YourStoryForm'

const YourStory = () => {
  return (
    <>
        <div className="relative isolate text-container grid md:grid-cols-2 my-2 md:flex-row flex-col items-center justify-center gap-5">
            <InstructionReel />
            <YourStoryForm />    
        </div>

        <div className="relative">
            <Seperator />
        </div>

        
    </>
  )
}

export default YourStory
