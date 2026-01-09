'use client'
import { useState } from 'react';
import Seperator from '../shared/Seperator';
import { getHistoryMonthCount, currentYear } from './getHistoryMonthCount';
import useSessionTime from './useSessionTimer';
import { useAuthContext } from '@/auth/useAuthContext';
import AccountBadge from './AccountBadge';
import ArtistBioPopup from '../shared/ArtistBioPopup';

const Footer: React.FC = () => {

    const sessionClock: string = useSessionTime();
    const dalitHistoryStr: string = getHistoryMonthCount()
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className='separator-container relative'>
                <Seperator />
            </div>
            <footer className='relative flex justify-between items-center m-2 px-4 h-10 overflow-hidden rounded-sm text-[var(--primary-blue)] font-title text-xs cursor-pointer border-[1px] opacity-40 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-all duration-1000 ease-in-out'>
                
                <span className='router-tab' onClick={() => setIsPopupOpen(true)}>&copy; {currentYear} sumit sute</span>
                <span className='router-tab'>{dalitHistoryStr}</span>
                <AccountBadge />
            </footer>
            <ArtistBioPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
};

export default Footer

