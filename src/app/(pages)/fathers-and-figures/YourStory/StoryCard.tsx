import React from 'react'

const StoryCard = () => {

    const placeholderStory = {
        id: 1,
        story: "As I near the age my father was when he had me, I feel the same silence forming in our bond. I see how generations of caste-patriarchal trauma have numbed us, making vulnerability a distant memory. In his absence, I found father figures in books, movements, and idols, but I wonder—can I unlearn this inherited distance? As I near the age my father was when he had me, I feel the same silence forming in our bond. I see how generations of caste-patriarchal trauma have numbed us, making vulnerability a distant memory. In his absence, I found father figures in books, movements, and idols, but I wonder—can I unlearn this inherited distance?",
        name: "Rahul",
        screenshop: "001.png"
      }

  return (
    <div
        className='all-stories h-[25rem] text-container overflow-x-auto scroll-smooth'
    >
        <div 
            key={placeholderStory.id} 
            className={`story-container h-full sticky card-bg flex flex-col snap-center px-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm transition-all duration-300`}
            style={{ top: 0 }}
        >
            <div className='card flex flex-col h-full items-center justify-center overflow-y-auto'>
                <p className='m-auto text-lg font-semibold p-4 font-handwriting'>
                    {placeholderStory.story}
                    <span  
                        className='mx-2 opacity-50 italic uppercase before:content-["-"]'>
                            {placeholderStory.name}
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default StoryCard
