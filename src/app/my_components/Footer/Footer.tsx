'use client'
import Seperator from '../shared/Seperator';
import getHistoryMonthCount from './getHistoryMonthCount';
import useSessionTime from './useSessionTimer';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {

    const sessionClock = useSessionTime();
    const dalitHistoryStr = getHistoryMonthCount()

    const getDalitHistoryMonthDay = (): number => {
        const currentMonth: number = new Date().getMonth() + 1;
        return currentMonth === 4 ? new Date().getDate() : 0;
    };


    return (
        <>
            <div className='separator-container relative'>
                <Seperator />
            </div>
            <footer className='flex justify-between items-center m-2 px-4 py-2 rounded-sm text-[var(--primary-blue)] font-title text-xs cursor-pointer border-[1px] opacity-40 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-all duration-1000 ease-in-out'>
                <div className=''>You are reading this page for the last <span className=''>{sessionClock}</span></div>
                <div className=''>&copy; {new Date().getFullYear()} <a href='https://sumitsute.com' target='_blank' rel='noopener noreferrer'>sumit sute</a></div>
                <div className=''>{dalitHistoryStr}</div>
            </footer>
        </>
    );
};

export default Footer
