import React, { createContext, useEffect, useState } from 'react'
import { StoryObjectType } from '../types'
import { getLocalStories } from './handleMyStories'

interface MyStoriesContextType {
  myStories: StoryObjectType[];
  setMyStories: React.Dispatch<React.SetStateAction<StoryObjectType[]>>
}


export const MyStoriesContext = createContext< MyStoriesContextType | undefined >(undefined)

export const MyStoriesProvider = ({ children }: { children: React.ReactNode }) => {

  const [myStories, setMyStories] = useState<StoryObjectType[]>([])
  // Initialize the state with stories from local storage when the component mounts

  return (
    <MyStoriesContext.Provider value= {{ myStories, setMyStories}}>
      { children }
    </MyStoriesContext.Provider>
  )
}