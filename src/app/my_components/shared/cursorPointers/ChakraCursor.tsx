"use client";
import React from 'react';
import useMousePosition from '@/_hooks/useMousePosition';
import Image from 'next/image';

const ChakraCursor = () => {
    const { x, y } = useMousePosition();

    return (
        <div
            className="fixed pointer-events-none cursor-none z-[9999] flex items-center justify-center pointer-events-none"
            style={{
                top: y,
                left: x,
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
            }}
        >
            <Image
                src="/ashoka-chakra.svg"
                alt="Ashok Chakra Cursor"
                width={20}
                height={20}
                className="animate-spin [animation-duration:5s]"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
        </div>
    );
};

export default ChakraCursor;
