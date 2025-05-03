import React, { createContext, useEffect, useState } from 'react'
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
      setMyStories(JSON.parse(localStories))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('localStories', JSON.stringify(myStories))
  }, [myStories])

  return (
    <MyStoriesContext.Provider value= {{ myStories, setMyStories}}>
      { children }
    </MyStoriesContext.Provider>
  )
}