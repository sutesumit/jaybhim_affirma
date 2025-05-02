
import React, { useContext } from 'react'
import html2canvas from 'html2canvas'
import { StoryObjectType } from '../types' // Importing the StoryObjectType type for type checking
import { MyStoriesContext } from './MyStoriesProvider'

interface YourStoryFormProps {
  artCanvasRef: React.RefObject<HTMLDivElement | null>;
  }


// This component is responsible for rendering the form where users can submit their stories and names
const YourStoryForm: React.FC<YourStoryFormProps> = ({ artCanvasRef }) => {

  const context = useContext(MyStoriesContext)
  if (!context) {
    throw new Error('YourStoryForm must be used within a MyStoriesProvider')
  }

  const setMyStories = context.setMyStories


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Check if the story is empty and log an error if it is
    if(!formData.get('story')){
      alert('Your tale is waiting to be told! Fill the story field!')
      return
    }
    

    // Convert the FormData into a StoryObjectType
    const data: StoryObjectType = {
      id: `${Date.now() + Math.random()}`, // Generate a unique ID based on the current timestamp on the client side
      story: formData.get('story') as string,
      name: formData.get('name') as string || 'Anonymous',
      createdAt: new Date().toISOString()
    } 

    // Add the new story to local storage using the addLocalStory function
    setMyStories((prevStories) => {
      console.log('Previous stories:', prevStories)
      return [data, ...prevStories]
    })


    // Clear the form after submission
    // This is done by resetting the form element, which clears all input fields and textarea
    
    e.currentTarget.reset()
  }

  // Function to handle the screenshot functionality
  // This function uses the html2canvas library to take a screenshot of the artCanvasRef element
  const handleScreenshot = async () => {
    // Check if the artCanvasRef is not null before proceeding to take a screenshot
    if (!artCanvasRef.current){
      console.error('Artwork is not loaded yet!')
      return
    }

    try{
      // Use html2canvas to take a screenshot of the artCanvasRef element
      // The screenshot will be saved as a canvas element
      const canvas = await html2canvas(artCanvasRef.current)

      // Convert the canvas to a data URL in PNG format
      // This data URL can be used to display the screenshot or save it as an image
      const dataURL = canvas.toDataURL('image/png')
      
      // Create a link element to download the screenshot
      const link = document.createElement('a')

      // Set the href attribute of the link to the data URL
      link.href = dataURL

      // Set the download attribute of the link to specify the filename for the downloaded image
      link.download = 'fathers-and-figures-by-sumitsute-your-screenshot.png'

      // Programmatically click the link to trigger the download
      // This simulates a click event on the link, causing the browser to download the image
      link.click()

    } catch (error) {
      console.error('Screenshot failed:', error)
    }
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
