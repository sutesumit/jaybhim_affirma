'use client'
import React, { useEffect } from "react"

const useMousePosition = (imageRef: React.RefObject<HTMLImageElement | null> = {current: null}) => {
    const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})
    useEffect(()=>{
        const updateMouseCords = (event: MouseEvent) => {
            setMouseCords({x: event.clientX, y: event.clientY})
        }
        window.addEventListener('mousemove', updateMouseCords)
        return () => {
            window.removeEventListener('mousemove', updateMouseCords)
        }
    }, [imageRef?.current]) // Stabilize dependency by tracking the ref value, not the ref object itself
    return mouseCords
}

export default useMousePosition