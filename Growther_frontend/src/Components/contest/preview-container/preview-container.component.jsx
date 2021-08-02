import React from "react"
import { PreviewCard } from "../preview-card/preview-card.component"
export const PreviewContainer = ({information, actions, previewActions, changeHandler, isPreview})=>{
    var TimeLeft = (d)=>{
        var currentDate = new Date()
        var currentDay = ("0"+currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+parseInt(currentDate.getMonth()+ 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var current_date = currentYear + "-" + currentMonth + "-" + currentDay
        currentDate = new Date(current_date)
        var daysDiff = Math.ceil(Math.abs(currentDate - new Date(d))/(1000*60*60*24))
        var weeksDiff = Math.ceil(Math.abs(currentDate - new Date(d))/(1000*60*60*24*7))
        var monthsDiff = Math.ceil(Math.abs(currentDate - new Date(d))/(1000*60*60*24*30))
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
    return(
        <div className="is-flex is-flex-direction-column preview is-justify-content-center is-align-items-center">
            <PreviewCard
                title={information.title}
                description={information.description}
                timeLeft={information.endDate ? TimeLeft(information.endDate.split("T")[0]).date : ""}
                dateType={TimeLeft(information.endDate.split("T")[0]).type}
                actions={actions}
                prizes={information.prizes}
                previewActions={previewActions}
                changeHandler={(event, provider) => changeHandler(event, provider)}
                isPreview={isPreview}
            />
        </div>
    )
}