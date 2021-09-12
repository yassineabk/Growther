export const TimeLeft = (endDate, endTime)=>{
    try{
        if(endDate && endTime && typeof(endDate) === "string" &&  typeof(endTime) === "string" ){
            endDate = endDate.trim().replace(" ", "T").split("T")[0]+"T"+endTime
            var realSeconds = parseInt(new Date(endDate) - new Date())
            //endDate = Array.isArray(endDate) ? endDate[0] : endDate.split("T")[0]
            if(realSeconds <= 0){
                return {date: "Ended", type: ""}
            }
            var seconds = parseInt(realSeconds/1000)
            if(seconds < 60){
                if(parseInt(seconds) > 0){
                    if(parseInt(seconds) === 1){
                        return {date: ("0"+parseInt(seconds)).slice(-2), type: "second"}
                    }
                    return {date: ("0"+parseInt(seconds)).slice(-2), type: "seconds"}
                }
                return {date: "Ended", type: ""}
            }
            var years = ("0"+parseInt(seconds / 31104000))
            seconds = seconds % 31104000
            var months = ("0"+parseInt(seconds / 2592000))
            seconds = seconds % (2592000)
            var days = ("0"+parseInt(seconds / 86400)).slice(-2)
            seconds = seconds % (86400)
            var hours = ("0"+parseInt(seconds / 3600)).slice(-2)
            seconds = seconds % 3600
            var minutes = ("0"+parseInt(seconds / 60)).slice(-2)
            seconds = ("0" + parseInt(seconds % 60)).slice(-2)
            
            if(parseInt(years) > 0){
                if(parseInt(years) === 1){
                    return {date: parseInt(years), type: "year"}
                }
                return {date: parseInt(years), type: "years"}
            }
            if(parseInt(months) > 0){
                if(parseInt(months) === 1){
                    return {date: parseInt(months), type: "month"}
                }
                return {date: ("0"+parseInt(months)), type: "months"}
            }
            if(parseInt(days) > 0){
                if(parseInt(days) === 1){
                    return {date: parseInt(days), type: "day"}
                }
                return {date: parseInt(days), type: "days"}
            }
            if(parseInt(hours) > 0){
                if(parseInt(hours) === 1){
                    return {date: parseInt(hours), type: "hour"}
                }
                return {date: parseInt(hours), type: "hours"}
            }
            if(parseInt(minutes) > 0){
                if(parseInt(minutes) === 1){
                    return {date: parseInt(minutes), type: "minute"}
                }
                return {date: parseInt(minutes), type: "minutes"}
            }
            if(parseInt(seconds) > 0){
                if(parseInt(seconds) === 1){
                    return {date: ("0"+parseInt(seconds)).slice(-2), type: "second"}
                }
                return {date: ("0"+parseInt(seconds)).slice(-2), type: "seconds"}
            }
            return {date: "Ended", type: ""}
        }
        return {date: "", type: ""}
    }catch (err){
        return {date: "", type: ""}
    }
}
export const TimeZone = (timezone)=>{
    var sign = timezone < 0 ? "+" : "-"
    var timezoneHours = ("0"+parseInt(Math.abs(timezone/60))).slice(-2)
    var timezoneMins = Math.abs(timezone/60).toString().split(".")
    timezoneMins = timezoneMins && timezoneMins.length === 2 ? (parseFloat("0."+timezoneMins[1])*60).toFixed(0) : "00"
    return `${sign}${timezoneHours}:${timezoneMins}`
}