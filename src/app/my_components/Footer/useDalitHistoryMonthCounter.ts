const useDalitHistoryMonthCounter = () => {
    var DalitHistoryStr = `April is Dalit History Month!`

    const today: Date = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const bhimJayanti = new Date(`${currentYear}-04-14`)

    if (today.getTime() == bhimJayanti.getTime()){
        return `Happy ${currentYear-1891}th Bhim Jayanti, Everyone!`
    }

    if (currentMonth < 3){
        const aprilDay: Date = new Date(`${currentYear}-04-01`)
        let dayDiff = Math.floor((aprilDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        return `${dayDiff} days till Dalit History Month!`
    }

    if (currentMonth == 3 ){
        return `${currentDate}th Day of Dalit History Month!`
    }

    if (currentMonth > 3){
        const aprilDay = new Date(`${currentYear+1}-04-01`)
        let dayDiff = Math.floor((aprilDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        return `${dayDiff} days till Dalit History Month!`
    }

    return DalitHistoryStr
}


export default useDalitHistoryMonthCounter
