import { useContext } from "react";
import { StoryObjectType } from "../types"; // Import the StoryObjectType type from the YourStoryForm component
import { MyStoriesContext } from "./MyStoriesProvider";


// Export the localStories array for use in other components
export const getLocalStories = (): StoryObjectType[] => {
     
}

// Add a new story to the localStories array
export const addLocalStory = async (story: StoryObjectType) => {

    const setMyStories = useContext(MyStoriesContext)?.setMyStories

    setMyStories?.((prevStories) => [story, ...prevStories])
}

// Clear all stories from local storage
export const clearLocalStories = () => {
    localStorage.removeItem('localStories') // Remove the stories from local storage
}
