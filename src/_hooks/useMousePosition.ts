import React, { useState, useEffect } from "react"

const useMousePostion = () => {
    const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})
    useEffect(()=>{
        const updateMouseCords = (event: MouseEvent) => {
            setMouseCords({x: event.clientX, y: event.clientY})
        }
        window.addEventListener('mousemove', updateMouseCords)
        return () => {
            window.removeEventListener('mousemove', updateMouseCords)
        }
    }, [])
    return mouseCords
}

export default useMousePostion