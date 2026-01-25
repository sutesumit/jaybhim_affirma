import React from 'react';
import ReactionCounter from './ReactionCounter';
import CurrentTabLink from './CurrentTabLink';

interface PageNavigationStatusProps {
    pathName: string | null;
    tabName: string | undefined;
}

const PageNavigationStatus: React.FC<PageNavigationStatusProps> = ({ pathName, tabName }) => {
    return (
        <span className='col-span-1 text-right hidden md:inline-block isolate'>
            <ReactionCounter pathName={pathName} />
            <CurrentTabLink pathName={pathName} tabName={tabName} />
        </span>
    );
};

export default PageNavigationStatus;
