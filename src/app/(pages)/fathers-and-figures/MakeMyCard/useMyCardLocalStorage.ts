
import { useEffect, useState } from 'react'

export const useMyCardLocalStorage= () =>{
    const [url, setUrl] = useState<string | null>(null);
    const [myStory, setMyStory] = useState<string>('');
    const [myName, setMyName] = useState<string>('');
    const [canvasOn, setCanvasOn] = useState<boolean>(false);
    
    // clear local storage
    // useEffect(() => {
    //   localStorage.clear();
    // }, [])
  
    // Load data from localStorage after component mounts
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setUrl(localStorage.getItem('url'));
        setMyStory(localStorage.getItem('myStory') || '');
        setMyName(localStorage.getItem('myName') || '');
        setCanvasOn(localStorage.getItem('canvasOn') === 'true');
      }
    }, []);
        
        useEffect(() => {
          localStorage.setItem('myStory', myStory || '')
          localStorage.setItem('myName', myName || '')
          localStorage.setItem('url', url || '')
          localStorage.setItem('canvasOn', canvasOn.toString())
        }, [myStory, myName, url, canvasOn])
        
        return {
            url,
            myStory,
            myName,
            canvasOn,
            setUrl,
            setMyStory,
            setMyName,
            setCanvasOn,
        }
    }