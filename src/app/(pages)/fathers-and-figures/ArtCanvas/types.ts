import { CSSProperties } from 'react'

// Type for image style properties for the dragable photo elements
export type photoStyleProp = Partial<CSSProperties> & {
        transform?: string;
    }

    
// Type for the props of the draggable photo component
export type DraggablePhotoProps = {
    src: string;
    alt: string;
    style: photoStyleProp;
    dragConstraints: React.RefObject<HTMLDivElement | null>;
}