"use client"

import React from 'react'
import CardImagePreview from '../CardImagePreview';
import { MenuItem } from '../hooks/useMenuFilter';

interface ImagePreviewsProps {
    items: MenuItem[];
    hoveredCard: number | null;
    x: number;
    y: number;
}

const ImagePreviews: React.FC<ImagePreviewsProps> = ({ items, hoveredCard, x, y }) => {
    return (
        <>
            {items.map((object) => (
                <CardImagePreview
                    key={object.id}
                    object={object}
                    hoveredCard={hoveredCard}
                    x={x}
                    y={y}
                />
            ))}
        </>
    )
}

export default ImagePreviews;
