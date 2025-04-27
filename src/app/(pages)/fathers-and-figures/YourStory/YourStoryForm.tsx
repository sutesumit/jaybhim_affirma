import React from 'react'

interface YourStoryFormProps {
  artCanvasRef: React.RefObject<HTMLDivElement | null>;
}

// This component is responsible for rendering the form where users can submit their stories and names
// It includes a textarea for the story, an optional name field, and a submit button
const YourStoryForm: React.FC<YourStoryFormProps> = ({ artCanvasRef }) => {

  // Reference tag to the .art-canvas div container where dragable photo elements live
  // This ref is used to access the DOM element directly, allowing for manipulation or measurement of the element


  const submissions: Object[] = []

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    if (data.story === '') {
      alert('Please enter a story!')
      return
    }
    submissions.push(data)
    console.log(submissions)
  }


  const handleScreenshot = () => {
    console.log('Screenshot taken!')
    console.log(artCanvasRef.current)
  }

  
  return (
    <>
    <form onSubmit={handleSubmit} className='storyboard flex-1 flex flex-col gap-2 h-[80vh] md:h-full w-full'>
        <button type='button' onClick={() => handleScreenshot()} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'>Screeshot the story!</button>  
        <textarea placeholder={'Describe your story here!'} name='story' className='text-justify placeholder:justify-center text-xs flex-1 p-5 w-full border-[1px] border-[var(--primary-blue)] rounded-sm'></textarea>
        <input type='text' placeholder={'Your name (Optional)'} name='name' className='text-center text-xs p-2 border-[1px] border-[var(--primary-blue)] rounded-sm'></input>
        <button type='submit' className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Save your story!</button>
    </form>
    </>
  )
}

export default YourStoryForm
