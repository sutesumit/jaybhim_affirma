import SubmitDrawer from '../submitDrawer/SubmitDrawer'
import { FatherSonStory } from '@/types/stories'
import { Pencil } from 'lucide-react'



const SubmitStoryButton = ({
  artCanvasRef, 
  userStory, 
  onEditStart,
  onSuccess
}: {
  artCanvasRef: React.RefObject<HTMLDivElement | null>,
  userStory?: FatherSonStory,
  onEditStart?: (id: string) => void,
  onSuccess?: () => void
}) => {
    
  return (
    <div className='p-0 flex-1 justify-between h-full'>
       {userStory ? (
         <button 
           onClick={() => onEditStart?.(userStory.id)}
           className="w-full button-style h-full m-auto text-sm flex items-center justify-center gap-2"
         >
           <Pencil className="w-3 h-3" />
           Edit your story
         </button>
       ) : (
         <SubmitDrawer artCanvasRef={artCanvasRef} onSuccess={onSuccess}/>
       )}
    </div>
  )
}

export default SubmitStoryButton
