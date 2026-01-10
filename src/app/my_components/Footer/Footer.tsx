'use client'
import { useState } from 'react';
import Seperator from '../shared/Seperator';
import { getHistoryMonthCount, currentYear } from './getHistoryMonthCount';
import AccountBadge from './AccountBadge';
import ArtistBioPopup from '../shared/ArtistBioPopup';

const Footer: React.FC = () => {

    const dalitHistoryStr: string = getHistoryMonthCount()
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className='separator-container relative'>
                <Seperator />
            </div>
            <footer className='relative grid grid-cols-1 md:grid-cols-3 justify-between items-center m-2 px-4 h-10 overflow-hidden rounded-sm text-[var(--primary-blue)] font-rajdhani font-medium text-sm cursor-pointer border-[1px] opacity-40 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-all duration-1000 ease-in-out'>
                
                <span 
                    className='router-tab col-span-1 md:inline-block hidden justify-self-start' 
                    onClick={() => setIsPopupOpen(true)}
                >
                    <span className='font-title'>©</span> {currentYear} sumit sute
                </span>
                <span 
                    className='router-tab col-span-1 text-center md:inline-block hidden justify-self-center' 
                >
                    {dalitHistoryStr}
                </span>
                <span 
                    className='col-span-1 md:justify-self-end justify-self-center' 
                >
                    <AccountBadge />
                </span>
            </footer>
            <ArtistBioPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
};

export default Footer

