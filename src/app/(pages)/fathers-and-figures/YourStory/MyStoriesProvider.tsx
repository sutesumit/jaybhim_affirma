import React, { createContext, useEffect, useContext, useState } from 'react'
import { StoryObjectType } from '../types'
import { getLocalStories, setLocalStories } from './handleLocalStories'

interface MyStoriesContextType {
  myStories: StoryObjectType[];
  setMyStories: React.Dispatch<React.SetStateAction<StoryObjectType[]>>
}

export const MyStoriesContext = createContext< MyStoriesContextType | undefined >(undefined)

export const MyStoriesProvider = ({ children }: { children: React.ReactNode }) => {

  const [myStories, setMyStories] = useState<StoryObjectType[]>(() => [])
  
  useEffect(() => {
    setMyStories(getLocalStories())
  }, [])
  
  useEffect(() => {
    setLocalStories(myStories)
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