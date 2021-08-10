import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"
import { ActionModal } from "../../Components/contest/action-modal/action-modal.component"
import { PreviewCard } from "../../Components/contest/preview-card/preview-card.component"
import { Spinner } from "../../Components/spinner/spinner.component"
import { ActionDone, OpenActionModal, SelectAction, SetData, SetDataFromLocation } from "../../redux/contest-card/contest-card-actions"
export const Contest = ({currentUser})=>{
    var dispatch = useDispatch()
    var params = useParams()
    var location = useLocation()
    var [userId, setId] = useState("")
    var {information, selected, isLoading, error} = useSelector(state => state.contest_card)
    useEffect(()=>{
        var token = localStorage.getItem("accessToken")
        token = decode(token)
        var sub = token !== null && typeof(token) === "object" ? token.sub : ""
        setId(sub)
            if(location.state){
                SetDataFromLocation(dispatch, location.state)
            }else{
                SetData(dispatch, params.title, params.description, params.id)
            }
    }, [dispatch, location])
    var changeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        SelectAction(dispatch, provider, index)
    }
    var TimeLeft = (d, endTime)=>{
        if(d && endTime){
            var currentDate = new Date()
            var currentDay = ("0"+currentDate.getDate()).slice(-2)
            var currentMonth = ("0"+parseInt(currentDate.getMonth() + 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
            var currentYear = currentDate.getFullYear()
            var currentHour = currentDate.getHours()
            var currentMin = currentDate.getMinutes()
            var date = new Date(`${currentYear}-${currentMonth}-${currentDay}`)
            var daysDiff = Math.ceil(Math.abs(date - new Date(d))/(1000*60*60*24))
            var weeksDiff = Math.ceil(Math.abs(date - new Date(d))/(1000*60*60*24*7))
            var monthsDiff = Math.ceil(Math.abs(date - new Date(d))/(1000*60*60*24*30))
            if(daysDiff === 0){
                endTime = endTime.split(":")
                if(parseInt(endTime[0]) === parseInt(currentHour)){
                    var timeDiff = parseInt(endTime[1]) - parseInt(currentMin)
                    if(timeDiff > 1) return {date: timeDiff, type: "minutes"}
                    if(timeDiff === 1) return {date: timeDiff, type: "minute"}
                    if(timeDiff < 1) return {date: "Ended", type: ""}
                }
                var timeDiff = parseInt(endTime[1]) - parseInt(currentHour)
                if(timeDiff > 1) return {date: timeDiff, type: "hours"}
                return {date: timeDiff, type: "hour"}
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
    var hasStarted = (d)=>{
        var currentDate = new Date()
        var currentDay = ("0" + currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+ parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var date = currentYear + "-" + currentMonth + "-" + currentDay
        var daysDiff = Math.ceil((new Date(date) - new Date(d))/(1000*60*60*24))
        if(daysDiff >= 0) return true
        return false
    }
    var hasEnded = (d)=>{
        var currentDate = new Date()
        var currentDay = ("0" + currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+ parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var date = currentYear + "-" + currentMonth + "-" + currentDay
        var daysDiff = Math.ceil((new Date(date) - new Date(d))/(1000*60*60*24))
        if(daysDiff < 0) return true
        return false
    }
    var DoAction = (index, element)=>{
        OpenActionModal(dispatch, index, element)
    }
    return(
        <div className="is-flex is-flex-direction-column contest is-justify-content-center is-align-items-center">
            <Spinner show={isLoading} />
            {information !== null && typeof(information) === "object" && !error && !isLoading && typeof(information.user) === "object" ? 
                <PreviewCard
                    element={information}
                    title={information.title}
                    id={information.idContest}
                    description={information.description}
                    timeLeft={information.endDate ? TimeLeft(information.endDate, information.endTime).date : ""}
                    dateType={TimeLeft(information.endDate, information.endTime).type}
                    actions={Array.isArray(information.actions) ? information.actions : []}
                    prizes={information.prizes}
                    previewActions={selected}
                    changeHandler={(event, provider)=> changeHandler(event, provider)}
                    buttons={typeof(information.user) === "object" && information.user !== null && typeof(information.user) === "object" && information.user.isBrand === "true" ? userId.toString() === information.user.id.toString() : false}
                    hasStarted={typeof(information.startDate) === "string" ? hasStarted(information.startDate.split("T")[0]) : false}
                    hasEnded={typeof(information.endDate) === "string" ? hasEnded(information.endDate.split("T")[0]) : true}
                    user_id={typeof(information.user) === "object" ? information.user.id.toString() : ""}
                    isPublished={information.status !== "DRAFT" ? true  : false}
                    immediately={information.immediately === "true" || information.immediately === true ? true : false}
                    error={error}
                    DoAction={(index, element)=> DoAction(index, element)}
                /> 
            : null}
        </div>
    )
}