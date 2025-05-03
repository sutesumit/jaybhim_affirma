import React, { createContext, useEffect, useState } from 'react'
import { StoryObjectType } from '../types'

interface MyStoriesContextType {
  myStories: StoryObjectType[];
  setMyStories: React.Dispatch<React.SetStateAction<StoryObjectType[]>>
}


export const MyStoriesContext = createContext< MyStoriesContextType | undefined >(undefined)

export const MyStoriesProvider = ({ children }: { children: React.ReactNode }) => {

  const [myStories, setMyStories] = useState<StoryObjectType[]>(() => {
    const localStories = localStorage.getItem('localStories')
    return localStories ? JSON.parse(localStories) : []
  })
  // Initialize the state with stories from local storage when the component mounts
  useEffect(() => {
    localStorage.setItem('localStories', JSON.stringify(myStories))
  }, [myStories])

  return (
    <MyStoriesContext.Provider value= {{ myStories, setMyStories}}>
      { children }
    </MyStoriesContext.Provider>
  )
}