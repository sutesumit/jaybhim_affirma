
import { useMyStories } from "./MyStoriesProvider"
import { StoryObjectType } from "../types"

const useStoryForm = () => {

    const { setMyStories } = useMyStories()

    const submitStory = (formData: FormData): boolean => {
        if(!formData.get('story')){
            alert('Your tale is waiting to be told! Fill the story field!')
            return false
        }
    
        // Convert the FormData into a StoryObjectType
        const data: StoryObjectType = {
            id: `${Date.now() + Math.random()}`, // Generate a unique ID based on the current timestamp on the client side
            story: formData.get('story') as string,
            name: formData.get('name') as string || 'Anonymous',
            createdAt: new Date().toISOString()
        } 
    
        setMyStories((prevStories) => [data, ...prevStories])

        return true
    }

    return { submitStory }
}


export default useStoryForm
