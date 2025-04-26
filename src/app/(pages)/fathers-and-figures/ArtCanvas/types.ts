import { CSSProperties } from 'react'

// Type for image style properties for the dragable photo elements
export type photoStyleProp = {
        rotate: number,
        scale: number
    }

    
// Type for the props of the draggable photo component
export type DraggablePhotoProps = {
    src: string;
    alt: string;
    animate: photoStyleProp;
    dragConstraints: React.RefObject<HTMLDivElement | null>;
}