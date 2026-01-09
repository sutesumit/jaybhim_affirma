import { useEffect, useState } from "react";

export const randomInRange = (min: number, max: number) => 
    Math.random() * (max - min) + min;


export const useRandomRotation = () => {
    const [rotation, setRotation] = useState(0)
    useEffect(() => {
        const rotation = Math.random() * 5 - 2.5
        setRotation(rotation)
    }, [])
    const randomRotation = () => setRotation(Math.random() * 5 - 2.5)
    return { rotation, setRotation, randomRotation }
}