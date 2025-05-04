
import { StoryObjectType } from "../types"



const STORAGE_KEY = 'sumitsute_fathersandfigures'

export const setLocalStories = (stories: StoryObjectType[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories))
}

export const getLocalStories = () => {
    const localStories = localStorage.getItem(STORAGE_KEY)
    if (localStories) {
        try {
            const parsedStories = JSON.parse(localStories)
            if (!Array.isArray(parsedStories)) {
                throw new Error('Invalid local stories format')
            }
            return parsedStories
        } catch (error){
            console.error('Failed to parse local stories:', error)
        }
    }
    return []
}

export const addLocalStory = (story: StoryObjectType) => {
    const localStories = getLocalStories()
    setLocalStories([...localStories, story])
}

export const clearLocalStories = () => {
    localStorage.removeItem(STORAGE_KEY)
}