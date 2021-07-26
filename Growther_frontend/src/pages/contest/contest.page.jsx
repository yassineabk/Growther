import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PreviewCard } from "../../Components/contest/preview-card/preview-card.component"
import { SelectAction, SetData } from "../../redux/contest-card/contest-card-actions"
export const Contest = ()=>{
    var dispatch = useDispatch()
    var {information, actions, selected} = useSelector(state => state.contest_card)
    
    var changeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        SelectAction(dispatch, provider, index)
    }
    var TimeLeft = (d)=>{
        var currentDate = new Date()
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
        <div className="is-flex is-flex-direction-column contest is-justify-content-center is-align-items-center">
            <PreviewCard
                title={information.title}
                description={information.description}
                timeLeft={information.endDate ? TimeLeft(information.endDate).date : ""}
                dateType={TimeLeft(information.endDate).type}
                actions={actions}
                previewActions={selected}
                changeHandler={(event, provider)=> changeHandler(event, provider)}
            />
        </div>
    )
}