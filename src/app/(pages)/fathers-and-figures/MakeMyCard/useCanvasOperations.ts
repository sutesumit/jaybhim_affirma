import { getCanvasUrl } from "@/_utils/html2CanvasUtils"
import { useState, useCallback } from "react"

interface UseCanvasOperationsProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
    setUrl: (url: string | null) => void
    setCanvasOn: (canvasOn: boolean | ((prev: boolean) => boolean)) => void
}

export const useCanvasOperations = ({artCanvasRef, setUrl, setCanvasOn}: UseCanvasOperationsProps) => {
    const [pendingUrl, setPendingUrl] = useState(false)

    const handleCanvasUrl = useCallback(() => {
        setCanvasOn((prev: boolean) => {
            const nextVal = !prev
            if(!nextVal){
                setUrl(null)
            }
            
            if (!artCanvasRef.current){
                return nextVal
            }
            (async () => {
                setPendingUrl(true)
                const canvasUrl = await getCanvasUrl(artCanvasRef.current!)
                setUrl(nextVal ? canvasUrl : null)
                setPendingUrl(false)
            })()
            return nextVal
        })
    }, [artCanvasRef, setUrl, setCanvasOn])
    
    return {pendingUrl, setPendingUrl, handleCanvasUrl}
}