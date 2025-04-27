import Seperator from '@/app/my_components/shared/Seperator'
import React from 'react'
import InstructionReel from './InstructionReel'
import YourStoryForm from './YourStoryForm'
import { StoryCardSet } from '../StoryCards'
import { getLocalStories } from './localStories'
import { StoryObjectType } from '../types' // Importing the StoryObjectType type for type checking


interface YourStoryProps {
  artCanvasRef: React.RefObject<HTMLDivElement | null>;
}

// This component is responsible for rendering the YourStory section of the page
// It includes the InstructionReel and YourStoryForm components, which are used to display instructions and a form for users to submit their stories
// The artCanvasRef prop is passed down to the YourStoryForm component, allowing it to access the ArtCanvas element directly

const YourStory: React.FC<YourStoryProps> = ({ artCanvasRef }) => {

  // State to hold the local stories after the component mounts
  const [localStories, setLocalStories] = React.useState<StoryObjectType[]>([])

  // Effect to retrieve local stories when the component mounts
  React.useEffect(() => {
    const pastStories = getLocalStories();
    setLocalStories(pastStories); // Update the localStories state with the retrieved stories
  }, []);

  return (
    <>  
        
        <div className="relative isolate text-container grid md:grid-cols-2 my-2 md:flex-row flex-col items-center justify-center gap-5">
            <InstructionReel />
            <YourStoryForm artCanvasRef={artCanvasRef} />
        </div>

        <div className="relative">
            <Seperator />
        </div>
        { localStories.length > 0 && <StoryCardSet storyObject={localStories}  />}
        
    </>
  )
}

export default YourStory
