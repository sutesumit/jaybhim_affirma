    import { useState, useEffect } from "react"
    import { photoStyleProp } from "./types"

    const usePhotoStyle = () => {
        // State to store the style properties for the draggable photo elements
        const [photoStyle, setPhotoStyle] = useState<photoStyleProp[]>([])

        // useEffect hook to set the initial style properties for the dragable photo elements upon component mount
        useEffect(() => {
            setPhotoStyle(Array.from({ length: 23}, (_, i)=>{
                return {
                    rotate: Math.random() * 60 - 30,
                    scale: Math.random() * .6 + .8
                }
            }))
        }, [])

        return photoStyle
    }

    export { usePhotoStyle }