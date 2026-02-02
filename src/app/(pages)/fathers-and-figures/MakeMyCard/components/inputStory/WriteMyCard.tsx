import React from 'react'

const WriteMyCard = ({ myStory, setMyStory, myName, setMyName }: { myStory: string, setMyStory: (story: string) => void, myName: string, setMyName: (name: string) => void }) => {

  return (
    <>
      <textarea
            placeholder={'Tell the tale you created...'}
            name='story'
            value={myStory}
            className='flex-1 text-2xl font-handwriting placeholder:font-rajdhani bg-transparent placeholder:text-lg text-justify p-5 w-full focus:outline-none'
            onChange={(e) => setMyStory(e.target.value)}
        ></textarea>
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
    </>
  )
}

export default WriteMyCard
