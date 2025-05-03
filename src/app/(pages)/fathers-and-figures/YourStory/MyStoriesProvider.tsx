import React, { createContext, useEffect, useContext, useState } from 'react'
import { StoryObjectType } from '../types'

interface MyStoriesContextType {
  myStories: StoryObjectType[];
  setMyStories: React.Dispatch<React.SetStateAction<StoryObjectType[]>>
}


export const MyStoriesContext = createContext< MyStoriesContextType | undefined >(undefined)

export const MyStoriesProvider = ({ children }: { children: React.ReactNode }) => {

  const [myStories, setMyStories] = useState<StoryObjectType[]>(() => [])
  
  useEffect(() => {
    const localStories = localStorage.getItem('localStories')
    if (localStories) {
      try {
        const parsedStories = JSON.parse(localStories)
        if (!Array.isArray(parsedStories)) {
          throw new Error('Invalid local stories format')
        }
        setMyStories(parsedStories)
      } catch (error){
        console.error('Failed to parse local stories:', error)
      }
    }
  }, [])
  
  useEffect(() => {
    try {
      localStorage.setItem('localStories', JSON.stringify(myStories))
    } catch (error){
      console.error('Failed to save local stories:', error)
    }
  }, [myStories])

  return (
    <MyStoriesContext.Provider value= {{ myStories, setMyStories}}>
      { children }
    </MyStoriesContext.Provider>
  )
}

export const useMyStories = () => {
  const context = useContext(MyStoriesContext)
  if (!context) {
    throw new Error('useMyStories must be used within a MyStoriesProvider')
  }
  return context
}