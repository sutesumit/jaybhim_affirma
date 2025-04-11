'use client'
const dalitHistoryStr: string = `April is Dalit History Month!`
const today: Date = new Date()
const currentDate: number = today.getDate()
const currentMonth: number = today.getMonth()
const currentYear: number = today.getFullYear()
const bhimJayanti: Date = new Date(`${currentYear}, 04, 14`)

const daysBetween = (d1: Date, d2: Date) => {
    return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

const getHistoryMonthCount = () => {
    // On Bhim Jayanti Every Year
    if (today.getTime() == bhimJayanti.getTime()){
        return `Happy ${currentYear-1891}th Bhim Jayanti, Everyone!`
    }

    // Before Dalit History Month Starts in the current year.
    if (currentMonth < 3){
        const aprilFirst: Date = new Date(`${currentYear}, 04, 01`)
        return `${daysBetween(today, aprilFirst)} days till Dalit History Month!`
    }

    // During Dalit History Month in April
    if (currentMonth == 3 ){   
        const getDateSuffix = () => {
            const suffixes: { [key: number]: string } = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd' };
            return suffixes[currentDate] || 'th';
        };
        return `${currentDate}${getDateSuffix()} Day of Dalit History Month!`;
    }

    // After Dalit History Month Ends in the current year, count for the next year starts.
    if (currentMonth > 3){
        const nextAprilFirst = new Date(`${currentYear+1}, 04, 01`)
        return `${daysBetween(today, nextAprilFirst)} days till Dalit History Month!`
    }
    return dalitHistoryStr
}

export { getHistoryMonthCount, currentYear }
