'use client'
import Seperator from '../shared/Seperator';
import { getHistoryMonthCount, currentYear } from './getHistoryMonthCount';
import useSessionTime from './useSessionTimer';

const Footer: React.FC = () => {

    const sessionClock: string = useSessionTime();
    const dalitHistoryStr: string = getHistoryMonthCount()

    return (
        <>
            <div className='separator-container relative'>
                <Seperator />
            </div>
            <footer className='flex justify-between items-center m-2 px-4 py-2 rounded-sm text-[var(--primary-blue)] font-title text-xs cursor-pointer border-[1px] opacity-40 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-all duration-1000 ease-in-out'>
                <div className=''>You are reading this page for the last <span className=''>{sessionClock}</span></div>
                <div className=''>&copy; {currentYear} <a href='https://sumitsute.com' target='_blank' rel='noopener noreferrer'>sumit sute</a></div>
                <div className=''>{dalitHistoryStr}</div>
            </footer>
        </>
    );
};

export default Footer
