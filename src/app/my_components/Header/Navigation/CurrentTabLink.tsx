import React from 'react';
import Link from 'next/link';

interface CurrentTabLinkProps {
    pathName: string | null;
    tabName: string | undefined;
}

const CurrentTabLink: React.FC<CurrentTabLinkProps> = ({ pathName, tabName }) => {
    if (!tabName) return null;

    return (
        <Link 
            href={pathName ?? '/'} 
            className='router-tab capitalize'
            onClick={(e) => e.stopPropagation()}
        >
            {tabName}
        </Link>
    );
};

export default CurrentTabLink;
