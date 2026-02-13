import React from 'react'
import { MAX_FATHER_SON_STORY_LENGTH } from '@/lib/constants'


const WriteMyCard = ({ myStory, setMyStory, myName, setMyName }: { myStory: string, setMyStory: (story: string) => void, myName: string, setMyName: (name: string) => void }) => {

  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex-1 flex flex-col relative'>
        <textarea
              placeholder={'Tell the tale you created...'}
              name='story'
              value={myStory}
              className='flex-1 text-2xl font-handwriting placeholder:font-rajdhani bg-transparent placeholder:text-lg text-justify p-5 w-full focus:outline-none'
              onChange={(e) => setMyStory(e.target.value)}
          ></textarea>
        
        {/* Character Counter */}
        <div 
          className={`absolute bottom-2 right-5 text-sm font-rajdhani pointer-events-none select-none transition-colors duration-300 ${
            myStory.length > MAX_FATHER_SON_STORY_LENGTH ? 'text-red-500 font-bold' : 'text-[--primary-blue]/40'
          }`}
        >
          {myStory.length}/{MAX_FATHER_SON_STORY_LENGTH}
        </div>
      </div>

      <input
          type='text'
          placeholder={'Sign your name... (optional)'}
          name='name'
          value={myName}
          className='text-end uppercase text-xl font-handwriting placeholder:font-rajdhani bg-transparent placeholder:text-lg placeholder:capitalize p-5 w-full focus:outline-none'
          onChange={(e) => {
              setMyName(e.target.value)
          }}
      />
    </div>
  )
}

export default WriteMyCard
