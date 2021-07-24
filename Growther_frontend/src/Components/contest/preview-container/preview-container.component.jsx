import React from "react"
import { PreviewCard } from "../preview-card/preview-card.component"
export const PreviewContainer = ({information, actions})=>{
    var timeDiff = (d1, d2)=>{
        var daysDiff = Math.ceil(Math.abs(new Date(d1) - new Date(d2))/(1000*60*60*24))
        var weeksDiff = Math.ceil(Math.abs(new Date(d1) - new Date(d2))/(1000*60*60*24*7))
        var monthsDiff = Math.ceil(Math.abs(new Date(d1) - new Date(d2))/(1000*60*60*24*30))
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
                date={information.startDate && information.endDate ? 
                    timeDiff(information.startDate, information.endDate).date : ""}
                dateType={timeDiff(information.startDate, information.endDate).type}
                actions={actions}
            />
        </div>
    )
}