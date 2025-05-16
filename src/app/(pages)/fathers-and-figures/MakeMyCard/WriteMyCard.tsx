import React from 'react'

const WriteMyCard = ({ myStory, setMyStory, myName, setMyName }: { myStory: string, setMyStory: (story: string) => void, myName: string, setMyName: (name: string) => void }) => {

  return (
    <>
      <textarea
            placeholder={'Tell the tale you created!'}
            name='story'
            value={myStory}
            className='flex-1 placeholder:font-body placeholder:text-sm text-justify bg-white/50 p-5 w-full focus:outline-none'
            onChange={(e) => setMyStory(e.target.value)}
        ></textarea>
        <input
            type='text'
            placeholder={'Sign your name! (optional)'}
            name='name'
            value={myName}
            className='text-end uppercase placeholder:font-body placeholder:text-sm placeholder:capitalize bg-white/50 p-5 w-full focus:outline-none'
            onChange={(e) => {
                setMyName(e.target.value)
            }}
        />
    </>
  )
}

export default WriteMyCard
