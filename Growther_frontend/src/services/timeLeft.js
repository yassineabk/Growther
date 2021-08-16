export const TimeLeft = (endDate, endTime)=>{
    if(endDate && endTime){
        var currentDate = new Date()
        var currentDay = ("0"+currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+parseInt(currentDate.getMonth() + 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var currentHour = currentDate.getHours()
        var currentMin = currentDate.getMinutes()
        var date = new Date(`${currentYear}-${currentMonth}-${currentDay}`)
        var daysDiff = Math.ceil((new Date(endDate) - date)/(1000*60*60*24))
        var weeksDiff = Math.ceil(Math.abs(date - new Date(endDate))/(1000*60*60*24*7))
        var monthsDiff = Math.ceil(Math.abs(date - new Date(endDate))/(1000*60*60*24*30))
        if(daysDiff < 0){
            return {date: "Ended", type: ""}
        }
        if(daysDiff === 0){
            endTime = endTime.split(":")
            var minsDiff = Math.abs(parseInt(endTime[1]) - parseInt(currentDate.getMinutes()))
            var hoursDiff = ((parseInt(endTime[0]) - parseInt(currentDate.getHours()) - (minsDiff/60))).toFixed(0)
            if(hoursDiff < 0){
                return {date: "Ended", type: ""}
            }
            if(hoursDiff < 1){
                if(hoursDiff === 0){
                    return {date: minsDiff, type: "minute"}
                }
                if(minsDiff === 1){
                    return {date: minsDiff, type: "minute"}
                }
                if(minsDiff < 0){
                    return {date: "Ended", type: ""}
                }
                return {date: minsDiff, type: "minutes"}
            }
            if(hoursDiff === 1){
                return {date: hoursDiff, type: "hour"}
            }
            return {date: hoursDiff, type: "hours"}
        }
        if(daysDiff % 30 === 0){
            if(monthsDiff > 1) return {date: monthsDiff, type: "months"}
            return {date: monthsDiff, type: "month"}
        }
        if(daysDiff % 7 === 0){
            if(weeksDiff > 1) return {date: weeksDiff, type: "weeks"}
            return {date: weeksDiff, type: "week"}
        }
        if(daysDiff > 1) return {date: daysDiff, type: "days"}
        return {date: daysDiff, type: "day"}
    }
    return {date: "", type: ""}
}