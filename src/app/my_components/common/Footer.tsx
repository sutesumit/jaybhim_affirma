'use client'
import React, { useState, useEffect } from 'react'
import Seperator from '../shared/Seperator';
import { Tornado } from 'lucide-react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const getDaysUntilDalitHistoryMonth = (): number => {
        const today: Date = new Date();
        const currentYear: number = today.getFullYear();
        
        let targetDate: Date = new Date(`April 1, ${currentYear}`);
        
        if (today > targetDate) {
            targetDate = new Date(`April 1, ${currentYear + 1}`);
        }
        
        const timeRemaining: number = targetDate.getTime() - today.getTime();
        return Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    };

    const getDalitHistoryMonthDay = (): number => {
        const currentMonth: number = new Date().getMonth() + 1;
        return currentMonth === 4 ? new Date().getDate() : 0;
    };

    useEffect(() => {
        const timer: NodeJS.Timeout = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (totalSeconds: number): string => {
        const minutes: string = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds: string = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <>
            <div className='separator-container relative'>
                <Seperator />
            </div>
            <footer className='flex justify-between items-center m-2 px-4 py-2 rounded-sm text-[var(--primary-blue)] font-title text-xs cursor-pointer border-[1px] opacity-40 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-all duration-1000 ease-in-out'>
                <div className=''>You are reading this page for the last <span className=''>{formatTime(elapsedTime)}</span></div>
                <div className=''>&copy; {new Date().getFullYear()} <a href='https://sumitsute.com' target='_blank' rel='noopener noreferrer'>sumit sute</a></div>
                <div className=''><span className=''>{getDalitHistoryMonthDay()}</span>th day of Dalit History Month!</div>
            </footer>
        </>
    );
};

export default Footer
