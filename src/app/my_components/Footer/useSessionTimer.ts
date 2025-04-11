import { useEffect, useState } from 'react'

const useSessionTime = () => {
    const [sessionTime, setSessionTime] = useState<number>(0)

    useEffect(()=> {
        const timer = setInterval(()=> {
            setSessionTime(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formattedTime = (totalSeconds: number): string => {
        const minutes: string = Math.floor(totalSeconds/60).toString().padStart(2, '0')
        const seconds: string = Math.floor(totalSeconds%60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`;
    };

    return formattedTime(sessionTime)
}

export default useSessionTime


