'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useMenuContext } from '../menuContext/useMenuContext';

interface HoverLinkProps {
    href: string;
    target?: string;
    className?: string;
    children: React.ReactNode;
    hoverContent?: React.ReactNode;
}

const HoverLink: React.FC<HoverLinkProps> = ({ href, target, className, children, hoverContent }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { setMenuOpen } = useMenuContext();

    return (
        <Link 
            href={href} 
            target={target}
            className={className}
            onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="inline-flex items-center justify-center overflow-hidden align-middle">
                    {!isHovered ? (
                        <span
                            key="default"
                            className="flex items-center"
                        >
                            {children}
                        </span>
                    ) : (
                        <span
                            key="hover"
                            className="flex items-center whitespace-nowrap"
                        >
                            {hoverContent || children}
                        </span>
                    )}
            </span>
        </Link>
    );
};

export default HoverLink;
