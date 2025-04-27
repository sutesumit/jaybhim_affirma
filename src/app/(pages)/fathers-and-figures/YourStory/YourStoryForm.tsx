import React from 'react'

const YourStoryForm = () => {
  return (
    <div className='storyboard flex-1 flex flex-col gap-2 h-[80vh] md:h-full w-full'>
        <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Screeshot the story!</button>  
        <textarea defaultValue={'Describe your story here!'} className='text-center text-sm flex-1 p-5 w-full border-[1px] border-[var(--primary-blue)] rounded-sm' readOnly></textarea>
        <textarea defaultValue={'Your name (Optional)'} className='text-center text-sm p-1 w-full border-[1px] border-[var(--primary-blue)] rounded-sm' readOnly></textarea>
        <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Send me your story!</button>  
    </div> 
  )
}

export default YourStoryForm
