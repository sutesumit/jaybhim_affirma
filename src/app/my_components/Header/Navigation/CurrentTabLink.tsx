import React from 'react';
import Link from 'next/link';

import { useMenuContext } from '../menuContext/useMenuContext';
import { useNotFound } from '@/app/context/NotFoundContext';

interface CurrentTabLinkProps {
    pathName: string | null;
    tabName: string | undefined;
}

const CurrentTabLink: React.FC<CurrentTabLinkProps> = ({ pathName, tabName }) => {
    const { setMenuOpen } = useMenuContext();
    const { isNotFound } = useNotFound();

    if (!tabName) return null;

    return (
        <Link 
            href={pathName ?? '/'} 
            className={`router-tab capitalize truncate ${isNotFound ? 'line-through' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
            }}
        >
            {tabName}
        </Link>
    );
};

export default CurrentTabLink;
