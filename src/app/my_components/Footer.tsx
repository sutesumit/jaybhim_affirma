'use client'

import React, { useState, useEffect } from 'react'

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
        <footer className='bg-[--primary-blue] text-[--primary-white] p-4 
        flex flex-wrap gap-4 justify-between align-baseline
        font-title text-[0.6rem]'>
            <div className='timer'>You are reading this page for the last <span className='text-base px-1'>{formatTime(elapsedTime)}</span></div>
            <div className='days-to-april'><span className='text-base px-1'>{getDaysUntilDalitHistoryMonth()}</span> days until Dalit History Month!</div>
            <div className='tech-stack'>&copy; {new Date().getFullYear()} <a href='https://sumitsute.com' target='_blank' rel='noopener noreferrer'>Sumit Sute</a></div>
        </footer>
    );
};

export default Footer
