'use client'
import { useState } from 'react';
import Seperator from '../shared/Seperator';
import { getHistoryMonthCount, currentYear } from './getHistoryMonthCount';
import AccountBadge from './AccountBadge';
import ArtistBioPopup from '../shared/ArtistBioPopup';
import Gradient1 from '../gradients/Gradient1';

const Footer: React.FC = () => {

    const dalitHistoryStr: string = getHistoryMonthCount()
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className='separator-container relative'>
                <Seperator />
            </div>
            <footer className='relative m-2 overflow-hidden rounded-sm text-[var(--primary-blue)] font-rajdhani font-medium text-sm cursor-pointer glass-hover card-bg card-shadow'>
                <Gradient1 className='grid grid-cols-1 md:grid-cols-3 justify-between items-center px-4 h-10 w-full' hoverOn={true}>
                    <span 
                        className='router-tab z-20 col-span-1 md:inline-block hidden justify-self-start' 
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
                </Gradient1>
            </footer>
            <ArtistBioPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
};

export default Footer

