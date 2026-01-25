import React from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

interface ReactionCounterProps {
    pathName: string | null;
}

const ReactionCounter: React.FC<ReactionCounterProps> = ({ pathName }) => {
    return (
        <Link 
            href={pathName ?? '/'} 
            className='router-tab reaction-counter'
            onClick={(e) => e.stopPropagation()}
        >
            <span className='text-xs mr-1 border-r border-[var(--primary-blue)] pr-1'>201</span>
            <Leaf className='w-4 h-4 inline-block align-middle hover:text-green-700 transition-colors duration-300' />
        </Link>
    );
};

export default ReactionCounter;
