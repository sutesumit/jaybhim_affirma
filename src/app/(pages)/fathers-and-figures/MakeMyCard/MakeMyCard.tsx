import React from 'react'
import { syntheticStories } from '../Submissions/synthetic-stories'
import { getCanvasUrl } from '../YourStory/captureScreenshot'
import { InstructionReel } from '../YourStory'

const story = syntheticStories[0]

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

const MakeMyCard = ({ artCanvasRef }: MakeMyCardProps) => {

    const [url, setUrl] = React.useState<string | null>(null)
    const [myStory, setMyStory] = React.useState<string | null>(localStorage.getItem('myStory') || null)
    const [name, setName] = React.useState<string | null>(localStorage.getItem('name') || null)
    

    const handleCanvasUrl = async () => {
        if (!artCanvasRef.current){
          return
        }
        const url = await getCanvasUrl(artCanvasRef.current)
        setUrl(url)
      }

    const handleSubmit = () => {
      if (!myStory) {
        return
      }
      localStorage.setItem('myStory', myStory)
      localStorage.setItem('name', name || '')
    }

    return (
    <div className='m-5 p-5 text-container h-[25rem] flex flex-col items-center justify-center shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm'>
        <div className='relative font-handwriting text-xl w-full h-full overflow-hidden submission-card border-[1px] border-[var(--primary-blue)] rounded-sm flex flex-col items-center justify-center'>
            {url && <img src={url} alt="My card" className='z-[-1] isolate w-full h-full object-cover absolute opacity-50' />}
            <textarea
                placeholder={'Tell the tale you created!'}
                name='story'
                value={myStory || ''}
                className='flex-1 placeholder:font-body placeholder:text-sm text-justify bg-white/50 p-5 w-full focus:outline-none'
                onChange={(e) => setMyStory(e.target.value)}
            ></textarea>
            <input
                type='text'
                placeholder={'Sign your name! (optional)'}
                name='name'
                value={name || ''}
                className='text-end placeholder:font-body placeholder:text-sm bg-white/50 p-5 w-full focus:outline-none'
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className='flex w-full text-xs my-1'>
            <button className='button-style' onClick={handleCanvasUrl}>
                Add my canvas background
            </button>
            <button className='button-style' onClick={handleSubmit}>
                Save my card
            </button>
        </div>
    </div>
  )
}

export default MakeMyCard
