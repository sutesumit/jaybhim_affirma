import React from 'react'

const SubmitCards = () => {
  return (
    <div>
      <div className='relative isolate p-5'>
        <div className=" text-container my-1 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
        </div>
        <div className='stories flex flex-row snap-mandatory snap-x text-center text-container gap-2 !px-0 !py-4 !overflow-x-auto'>
          <div className='story-container snap-center w-full flex-shrink-0 p-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, perspiciatis? Ea facere cum tenetur perferendis iure eos, maxime esse eaque error unde, fugiat debitis natus laborum sunt perspiciatis nulla iusto!</p>
            <p className='opacity-65 italic'>- <span>Name</span></p>
          </div>
          <div className='story-container snap-center w-full flex-shrink-0 p-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm'>
            <p className=''>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, perspiciatis? Ea facere cum tenetur perferendis iure eos, maxime esse eaque error unde, fugiat debitis natus laborum sunt perspiciatis nulla iusto!</p>
            <p className='opacity-65 italic'>- <span>Name</span></p>
          </div>
          <div className='story-container snap-center w-full flex-shrink-0 p-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, perspiciatis? Ea facere cum tenetur perferendis iure eos, maxime esse eaque error unde, fugiat debitis natus laborum sunt perspiciatis nulla iusto!</p>
            <p className='opacity-65 italic'>- <span>Name</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitCards
