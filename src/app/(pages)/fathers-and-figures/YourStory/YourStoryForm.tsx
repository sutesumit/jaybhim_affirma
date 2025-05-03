
import React, { useContext } from 'react'
import { MyStoriesContext } from './MyStoriesProvider'
import captureScreenshot from './captureScreenshot'
import useStoryForm from './useStoryForm'

interface YourStoryFormProps {
  artCanvasRef: React.RefObject<HTMLDivElement | null>;
  }


// This component is responsible for rendering the form where users can submit their stories and names
const YourStoryForm: React.FC<YourStoryFormProps> = ({ artCanvasRef }) => {

  const context = useContext(MyStoriesContext)
  if (!context) {
    throw new Error('YourStoryForm must be used within a MyStoriesProvider')
  }

  const { submitStory } = useStoryForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const success = submitStory(formData)
    if (success) e.currentTarget.reset()
  }

  // Function to handle the screenshot functionality
  // This function uses the html2canvas library to take a screenshot of the artCanvasRef element
  const handleScreenshot = async () => {
    // Check if the artCanvasRef is not null before proceeding to take a screenshot
    if (!artCanvasRef.current){
      console.error('Artwork is not loaded yet!')
      return
    }

    captureScreenshot(artCanvasRef.current, 'fathers-and-figures-screenshot.png')
  }

  
  return (
    <>
    <form onSubmit={handleSubmit} className='storyboard flex-1 flex flex-col gap-2 h-[80vh] md:h-full w-full'>
        
        <button 
          type='button' 
          onClick={() => handleScreenshot()} 
          className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'
        >
          Save your collage snapshot!
        </button>  
        
        <textarea 
          placeholder={'Tell the tale you created!'} 
          name='story' 
          className='text-justify placeholder:justify-center text-xs flex-1 p-5 w-full border-[1px] border-[var(--primary-blue)] rounded-sm'
        ></textarea>
        
        <input 
          type='text' 
          placeholder={'Sign your name! (optional)'} 
          name='name' 
          className='text-center text-xs p-2 border-[1px] border-[var(--primary-blue)] rounded-sm'
        ></input>
        
        <button 
          type='submit' 
          className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'
        >
          Craft your draft below!
        </button>
    </form>
    </>
  )
}

export default YourStoryForm
