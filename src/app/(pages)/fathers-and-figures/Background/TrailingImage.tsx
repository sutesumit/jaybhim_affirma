import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface TrailingImageProps {
    trail: {
        id: number;
        src: string;
        x: number;
        y: number;
    };
}

const TrailingImage: React.FC<TrailingImageProps> = ({ trail }) => {

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.style.opacity = "0";
            }
        }, 2000);
        return () => clearTimeout(timeOut);
    }, []);



  return (
    <Image
        ref={imgRef}
        src={trail.src}
        alt="Trail Image"
        width={300}
        height={300}
        className="absolute rounded-sm object-cover shadow-[1px_1px_5px_0px_var(--primary-blue)]"
        style={{
            left: trail.x,
            top: trail.y,
            pointerEvents: "none",
            opacity: 1,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
        }}
        onLoad={(e) => {
        setTimeout(() => {
            (e.target as HTMLImageElement).style.opacity = "0";
        }, 2000);
        }}
    />
  )
}

export default TrailingImage
