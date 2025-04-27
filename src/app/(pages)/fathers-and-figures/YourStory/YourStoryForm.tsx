import React from 'react'

const YourStoryForm = () => {

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
  
  return (
    <form onSubmit={handleSubmit} className='storyboard flex-1 flex flex-col gap-2 h-[80vh] md:h-full w-full'>
        <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Screeshot the story!</button>  
        <textarea placeholder={'Describe your story here!'} name='story' className='text-justify placeholder:justify-center text-xs flex-1 p-5 w-full border-[1px] border-[var(--primary-blue)] rounded-sm'></textarea>
        <textarea placeholder={'Your name (Optional)'} name='name' className='text-center text-xs p-1 border-[1px] border-[var(--primary-blue)] rounded-sm'></textarea>
        <button type='submit' className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Save your story!</button>
        {/* <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Save your story!</button> */}
    </form> 
  )
}

export default YourStoryForm
