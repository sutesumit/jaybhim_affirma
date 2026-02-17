import React, { ReactNode, useEffect, useState } from "react"


type MyCardContextType = {
    url: string | null
    myStory: string
    myName: string
    setUrl: (url: string | null) => void
    setMyStory: (story: string) => void
    setMyName: (name: string) => void
    isHydrated: boolean
}

const MyCardContext = React.createContext<MyCardContextType | null>(null)

export const MyCardProvider = ({children}: {children: ReactNode}) => {
    const [url, setUrl] = useState<string | null>(null)
    const [myStory, setMyStory] = useState<string>('')
    const [myName, setMyName] = useState<string>('')
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(localStorage.getItem('url'));
            setMyStory(localStorage.getItem('myStory') || '');
            setMyName(localStorage.getItem('myName') || '');
            setIsHydrated(true)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('myStory', myStory || '')
        localStorage.setItem('myName', myName || '')
        localStorage.setItem('url', url || '')
    }, [myStory, myName, url])

    return (
        <MyCardContext.Provider value={{url, myStory, myName, setUrl, setMyStory, setMyName, isHydrated}}>
            {children}
        </MyCardContext.Provider>
    )
}

export const useMyCardContext = () => {
    const context = React.useContext(MyCardContext)
    if (!context) {
        throw new Error('useMyCardContext must be used within a MyCardContextProvider')
    }
    return context
}

