
import { StoryObjectType } from "../types"; // Import the StoryObjectType type from the YourStoryForm component


// Export the localStories array for use in other components
export const getLocalStories = () => {
    if (typeof window === 'undefined') {
        return [] // If window is undefined (e.g., during server-side rendering), return an empty array
    }
    const localStories = localStorage.getItem('localStories') // Retrieve the stories from local storage
    if (!localStories) {
        return [] // If no stories are found, return an empty array
    }
    // Parse the JSON string from local storage into an array of story objects
    // The JSON string is expected to be in the format of an array of objects
    return JSON.parse(localStories); // Return the array of stories parsed from JSON    
}

// Add a new story to the localStories array
export const addLocalStory = (story: StoryObjectType) => {
    const localStories = getLocalStories() // Retrieve the existing stories from local storage
    localStories.push(story) // Add the new story to the array
    localStorage.setItem('localStories', JSON.stringify(localStories)) // Save the updated array back to local storage
}

// Clear all stories from local storage
export const clearLocalStories = () => {
    localStorage.removeItem('localStories') // Remove the stories from local storage
}
