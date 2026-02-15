import React from 'react';
import Link from 'next/link';

import { useMenuContext } from '../menuContext/useMenuContext';

interface CurrentTabLinkProps {
    pathName: string | null;
    tabName: string | undefined;
}

const CurrentTabLink: React.FC<CurrentTabLinkProps> = ({ pathName, tabName }) => {
    const { setMenuOpen } = useMenuContext();
    if (!tabName) return null;

    return (
        <Link 
            href={pathName ?? '/'} 
            className='router-tab capitalize truncate'
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
