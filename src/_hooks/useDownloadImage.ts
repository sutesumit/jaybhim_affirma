import { getCanvasUrl } from "@/_utils/html2CanvasUtils"
import { useCallback, useState } from "react"


interface UseDownloadImageProps {
    downloadRef: React.RefObject<HTMLDivElement | null>
    filename?: string
}

export const useDownloadImage = ({
    downloadRef,
    filename = `artdotsumitsutedotcom_fathersandfigures_card`
}: UseDownloadImageProps) => {
    const [loading, setLoading] = useState(false)

    const downloadImage = useCallback(async()=>{
        if (!downloadRef.current) return
        setLoading(true)
        try {
            const canvasUrl = await getCanvasUrl(downloadRef.current)
            const link = document.createElement("a")
            link.href = canvasUrl!
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error(`Failed to Download your card, try again!`, error)
        } finally {
            setLoading(false)
        }
    }, [downloadRef, filename])

    return { downloadImage, loading}
}