import { getCanvasUrl } from "@/_utils/html2CanvasUtils"
import { useState, useCallback } from "react"
import { useMyCardContext } from "../context/MyCardContext"

interface UseCanvasOperationsProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

export const useCanvasOperations = ({artCanvasRef}: UseCanvasOperationsProps) => {
    const { url, setUrl } = useMyCardContext()
    const [pendingUrl, setPendingUrl] = useState(false)

    const handleCanvasUrl = useCallback(() => {
        if (!artCanvasRef.current) return
        if (url) {
            setUrl(null)
            return
        }
        (async () => {
            setPendingUrl(true)
            try {
                const canvasUrl = await getCanvasUrl(artCanvasRef.current!)
                setUrl(canvasUrl)
            } catch (error) {
                console.error(`Failed to pull your backdrop`, error)
            } finally {
                setPendingUrl(false)
            }
        })()
    }, [artCanvasRef, url, setUrl])
    
    return {pendingUrl, handleCanvasUrl}
}