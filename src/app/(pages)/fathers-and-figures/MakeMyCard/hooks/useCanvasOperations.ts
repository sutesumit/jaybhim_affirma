import { getCanvasUrl } from "@/_utils/html2CanvasUtils"
import { useState, useCallback } from "react"
import { useMyCardContext } from "../context/MyCardContext"
import { useToast } from "@/hooks/use-toast"

interface UseCanvasOperationsProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

export const useCanvasOperations = ({artCanvasRef}: UseCanvasOperationsProps) => {
    const { url, setUrl } = useMyCardContext()
    const [pendingUrl, setPendingUrl] = useState(false)
    const { toast } = useToast()

    const handleCanvasUrl = useCallback(() => {
        if (!artCanvasRef.current) {
            toast({
                title: "Canvas not found",
                description: "We couldn't find the story card to capture. Please try refreshing.",
                variant: "destructive",
            })
            return
        }

        if (url) {
            setUrl(null)
            return
        }

        (async () => {
            setPendingUrl(true)
            try {
                const canvasUrl = await getCanvasUrl(artCanvasRef.current!)
                if (canvasUrl) {
                    setUrl(canvasUrl)
                } else {
                    toast({
                        title: "Capture failed",
                        description: "We couldn't capture your backdrop. This might happen on some browsers if images are still loading.",
                        variant: "destructive",
                    })
                }
            } catch (error) {
                console.error(`Failed to pull your backdrop`, error)
                toast({
                    title: "Application Error",
                    description: "An unexpected error occurred while capturing your backdrop.",
                    variant: "destructive",
                })
            } finally {
                setPendingUrl(false)
            }
        })()
    }, [artCanvasRef, url, setUrl, toast])
    
    return {pendingUrl, handleCanvasUrl}
}
