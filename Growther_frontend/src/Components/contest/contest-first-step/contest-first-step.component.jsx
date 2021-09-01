import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation } from "react-router-dom"
import { EditDraft, InitState, NextStep, PrizesChange, RemovePrize, ResestNewContest, SaveDraft, SetDuration, SetImmediately, StateChange, WinnersNumChange } from "../../../redux/contest/contest-actions"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
import { ContestCheckBox } from "../contest-checkbox/contest-checkbox.component"
import { ContestDescription } from "../contest-description-input/contest-description-input.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { PrizesInputs } from "../prizes-inputs/prizes-inputs.component"
const ContestFirstStep = ()=>{
    var dispatch = useDispatch()
    var location = useLocation()
    var history = useHistory()
    var {information, isValidData, validData, isPublished} = useSelector(state => state.contest)
    var { isBrand, direction } = useSelector(state => state.userInfos)
    var [userId, setId] = useState("")
    useEffect(()=>{
        if(location.state !== null && location.state !== undefined && typeof(location.state) === "object"){
            if(location.state.clear){
                ResestNewContest(dispatch)
            }else{
                StateChange(dispatch, location.state)
            }
        }else if(information === null || information === undefined || typeof(information) !== "object"){
            InitState(dispatch)
        }else if(information !== null && information !== undefined &&  typeof(information) === "object"){
            if(isPublished === true){
                ResestNewContest(dispatch)
            }
        }else{
            ResestNewContest(dispatch)
        }
        var token = decode(localStorage.getItem("accessToken"))
        var sub = token !== null && typeof(token) === "object" ? token.sub : ""
        setId(sub)
    }, [dispatch])
    var changeHandler = (event)=>{
        var id = event.target.id
        var value = event.target.value
        var result = information
        var numIds = ["winnersNbr", "duration", "minPoints"]
        if(id in result){
            if(id === "minPoints" && value < 1){
                return false
            }
            result[id] = numIds.includes(id) ?  parseInt(value) : value
            StateChange(dispatch, result, id)
        }
    }
    var dateHandler = (event)=>{
        if(event !== undefined){
            var id = event.target.id
            var startTime = information.startTime.split(":")
            var endTime = information.endTime.split(":")
            var currentDate = new Date()
            var currentDay = ("0"+currentDate.getDate()).slice(-2)
            var currentMonth = ("0"+parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1)).slice(-2)
            var currentYear = currentDate.getFullYear()
            currentDate = currentYear + "-" + currentMonth + "-" + currentDay
            var date, date2, endMin, endHour, endHourInt, endMinInt, newEndTime, data;
            if(id === "startDate"){
                date = Math.ceil((new Date(event.target.value) - new Date(currentDate))/(100*60*60*24))
                date2 = Math.ceil((new Date(information.endDate.split("T")[0]) - new Date(event.target.value))/(100*60*60*24))
                if(date >= 0 && date2 >= 0){
                    if(date2 === 0){
                        if(parseInt(startTime[0]) > parseInt(endTime[0]) || (parseInt(startTime[0]) === parseInt(endTime[0]) && parseInt(startTime[1]) > parseInt(endTime[1]))){
                            endMinInt = parseInt(startTime[1])
                            endHourInt = endMinInt + 10 > 59 ? parseInt(startTime[0]) + 1 : parseInt(startTime[0])
                            endMin = endMinInt + 10 > 59 ? (endMinInt - 60 + 10) : endMinInt + 10
                            endHour =   endHourInt > 23 ? (endHourInt - 24) : endHourInt
                            newEndTime = ("0"+endHour).slice(-2) + ":" + ("0"+endMin).slice(-2)
                            data = information
                            data.endTime = `${newEndTime}`
                            StateChange(dispatch, data)
                        }
                    }
                    changeHandler(event)
                    return durationHandler()
                }
            }
            if(id === "endDate"){
                date = Math.ceil((new Date(event.target.value) - new Date(information.startDate.split("T")[0]))/(100*60*60*24))
                date2 = Math.ceil((new Date(event.target.value) - new Date(currentDate))/(100*60*60*24))
                if(date >= 0 && date2 >= 0){
                    if(date2 === 0){
                        if(parseInt(startTime[0]) > parseInt(endTime[0]) || (parseInt(startTime[0]) === parseInt(endTime[0]) && parseInt(startTime[1]) > parseInt(endTime[1]))){
                            endMinInt = parseInt(startTime[1])
                            endHourInt = endMinInt + 10 > 59 ? parseInt(startTime[0]) + 1 : parseInt(startTime[0])
                            endMin = endMinInt + 10 > 59 ? (endMinInt - 60 + 10) : endMinInt + 10
                            endHour =   endHourInt > 23 ? (endHourInt - 24) : endHourInt
                            newEndTime = ("0"+endHour).slice(-2) + ":" + ("0"+endMin).slice(-2)
                            data = information
                            data.endTime = newEndTime
                            StateChange(dispatch, data)
                        }
                    }
                    changeHandler(event)
                    return durationHandler()
                }
            }
        }
    }
    var timeHandler = (event)=>{
        var id = event.target.id
        var time = event.target.value.split(":")
        var startTime = information.startTime
        var endTime = information.endTime
        var currentDate = new Date()
        var currentHour = currentDate.getHours()
        var currentMin = currentDate.getMinutes()
        var currentDay = ("0"+currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+parseInt(currentDate.getMonth() + 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var fulldate = `${currentYear}-${currentMonth}-${currentDay}`
        var date = Math.ceil((new Date(information.endDate.split("T")[0]) - new Date(information.startDate.split("T")[0]))/(1000*60*60*24))
        var date2 = Math.ceil((new Date(information.startDate.split("T")[0]) - new Date(fulldate))/(1000*60*60*24))
        var date3 = Math.ceil((new Date(information.endDate.split("T")[0]) - new Date(fulldate))/(1000*60*60*24))
        var data;
        if(id === "startTime"){
            endTime = endTime.split(":")
            if(date2 === 0){
                if(parseInt(time[0]) < currentHour){
                    data = information
                    data.startTime = `${currentHour}:${currentMin}`
                    return StateChange(dispatch, data)
                }
                if(parseInt(time[0]) === currentHour && parseInt(time[1]) < currentMin){
                    data = information
                    data.startTime = `${currentHour}:${currentMin}`
                    return StateChange(dispatch, data)
                }
            }
            if(date === 0){
                if(parseInt(time[0]) === parseInt(endTime[0]) && parseInt(time[1]) < parseInt(endTime[1]) - 10 /*parseInt(time[0]) === currentHour && parseInt(time[1]) > currentMin ||*/ ){
                    return changeHandler(event)
                }
                if(parseInt(time[0]) < parseInt(endTime[0])){
                    return changeHandler(event)
                }
                return false
            }
            return changeHandler(event)
        }
        if(id === "endTime"){
            startTime = startTime.split(":")
            if(date3 === 0){
                if(parseInt(time[0]) < currentHour){
                    data = information
                    data.startTime = `${currentHour}:${currentMin}`
                    return StateChange(dispatch, data)
                }
                if(parseInt(time[0]) === currentHour && parseInt(time[1]) < currentMin){
                    data = information
                    data.startTime = `${currentHour}:${currentMin}`
                    return StateChange(dispatch, data)
                }
            }
            if(date === 0){
                if( parseInt(time[0]) === parseInt(startTime[0]) && (parseInt(time[1]) - 10 > parseInt(startTime[1]))){
                    return changeHandler(event)
                }
                if(parseInt(time[0]) > parseInt(startTime[0])){
                    return changeHandler(event)
                }
                return false
            }
            return changeHandler(event)
        }
    }
    var durationHandler = (event)=>{
        var startDate, endDate;
        if(event === undefined){
            startDate = information.startDate.split("T")[0]
            endDate = information.endDate.split("T")[0]
            var startTime = information.startTime.split(":")
            var endTime = information.endTime.split(":")
            var date1 = new Date(startDate)
            var date2 = new Date(endDate)
            var diff = Math.abs(date1 - date2)
            var diffDays = Math.ceil(diff / (1000*60*60*24))
            var diffWeeks = Math.ceil(diff / (1000*60*60*24*7))
            var diffMonths = Math.ceil(diff / (1000*60*60*24*30))
            if(diffDays === 0){
                var diffHours = Math.abs(parseInt(endTime[0]) - parseInt(startTime[0]))
                var diffMins = Math.abs(parseInt(endTime[1]) - parseInt(startTime[1]))
                if(diffHours === 0){
                    return SetDuration(dispatch, "minutes", diffMins, information.startDate, information.endDate)
                }
                return SetDuration(dispatch, "hours", diffHours, information.startDate, information.endDate)
            }
            if(diffDays % 30 === 0){
                return SetDuration(dispatch, "months", diffMonths, information.startDate, information.endDate)
            }
            if(diffDays % 7 === 0){
                return SetDuration(dispatch, "weeks", diffWeeks, information.startDate, information.endDate)
            }
            SetDuration(dispatch, "days", diffDays, information.startDate, information.endDate)
        }else{
            startDate = dateConvert(information.startDate)
            endDate = addDaystoDate(startDate, parseInt(event.target.value), information.duration.type)
            SetDuration(dispatch, information.duration.type, parseInt(event.target.value), startDate, endDate)
        }
        
    }
    var dateConvert = (date)=>{
        var day, month, year = ""
        if(typeof(date) === "string" && date.length > 0){
            date = new Date(date)
        }else{
            date = new Date()
        }
        day = ("0" + date.getDate()).slice(-2)
        month = date.getMonth()+1 === 13 ? 1 : date.getMonth()+1
        month = ("0" + month).slice(-2)
        year = date.getFullYear()
        return year + "-" + month + "-" + day
    }
    var addDaystoDate = (date, days, type)=>{
        if(type === "months"){
            days = 30*days
        }
        if(type === "weeks"){
            days = 7*days
        }
        date = new Date(new Date().setDate(new Date(date).getDate() + days))
        var day = ("0" + date.getDate()).slice(-2)
        var month = date.getMonth()+1 === 13 ? 1 : date.getMonth()+1
        month = ("0" + month).slice(-2)
        var year = date.getFullYear()
        return year + "-" + month + "-" + day
    }
    var numWinnersHandler = (event)=>{
        var newValue = parseInt(event.target.value)
        var oldValue = parseInt(information.winnersNbr)
        var i;
        if(newValue > 10){
            newValue = 10
        }
        if(newValue < 1){
            newValue = 1
        }
        if(oldValue > newValue){
            for(i = newValue; i < oldValue; i++){
                RemovePrize(dispatch, i, newValue)
            }
        }else{
            for(i = oldValue; i < newValue; i++){
                WinnersNumChange(dispatch, i, newValue)
            }
        }
    }
    var prizesHandler = (event, id)=>{
        var newValue = event.target.value
        PrizesChange(dispatch, id, newValue)
    }
    var nextStep = ()=>{
        var isValid = NextStep(dispatch, information)
        if(isValid){
            history.push("/dashboard/My Contests/new/secondStep")
        }
    }
    var saveDraft = ()=>{
        if(information.status !== null && typeof(information.status) === "string" && information.status === "DRAFT"){
            return EditDraft(dispatch, information, information.idContest)
        }
        SaveDraft(dispatch, information, userId)
    }
    var CheckBoxHandler = (event)=>{
        SetImmediately(dispatch, information.immediately)
    }
    var {t} = useTranslation()
    if(isBrand !== "true") return <Redirect to="/" />
    if(location.pathname !== "/dashboard/My Contests/new/firstStep") return null
    return(
        <div className="is-flex is-flex-direction-column newContestFrom">
            <div className="mainInfos is-flex">
                <div className="textInputs is-flex is-flex-direction-column">
                    <ContestInput 
                        id="title"
                        name="title"
                        placeholder={t("title_placeholder")}
                        label={t("contest_title")}
                        changeHandler={(event)=> changeHandler(event)}
                        value={information ? information.title : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.title,
                                message: t("invalid_title")
                            } : undefined}
                    />
                    <ContestDescription 
                        id="description"
                        name="description"
                        placeholder={t("description_placeholder")}
                        label={t("description")}
                        changeHandler={(event)=> changeHandler(event)}
                        value={information ? information.description : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.description,
                                message: t("invalid_description")
                            } : undefined}
                    />
                    <ContestInput 
                        type={"number"}
                        id="winnersNbr"
                        name="winnersNbr"
                        placeholder="Number of winners"
                        label={t("there_will_be")}
                        changeHandler={(event)=> numWinnersHandler(event)}
                        min={1}
                        max={20}
                        value={information ? information.winnersNbr : 1}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.winnersNbr,
                                message: "Please, Your contest should have at least one winner"
                            }: undefined}
                    />
                </div>
                <div className="otherInputs is-flex is-flex-direction-column">
                    <ContestCheckBox 
                        id="immediately"
                        name="immediately"
                        value={information.immediately}
                        label={t("start_date")}
                        placeholder={t("start_immediately")}
                        changeHandler={(event)=> CheckBoxHandler(event)}
                        direction={direction}
                    />
                    {information.immediately ? null : [<ContestInput 
                        type={"date"}
                        id="startDate"
                        name="startDate"
                        placeholder="dd-mm-yyyy"
                        changeHandler={(event)=> dateHandler(event)}
                        value={information ? information.startDate.split("T")[0] : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.startDate,
                                message: t("invalid_date")
                            } : undefined
                        }
                    />,
                    <ContestInput 
                        type={"time"}
                        id="startTime"
                        name="startTime"
                        placeholder="hh-mm-ss"
                        changeHandler={(event)=> timeHandler(event)}
                        value={information ? information.startTime : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.startTime,
                                message: t("invalid_time")
                            } : undefined
                        }
                    />]}
                    <ContestInput 
                        type={"date"}
                        id="endDate"
                        name="endDate"
                        placeholder="dd-mm-yyyy"
                        label={t("end_date")}
                        changeHandler={(event)=> dateHandler(event)}
                        value={information ? information.endDate.split("T")[0] : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.endDate,
                                message: t("invalid_date")
                            } : undefined
                        }
                    />
                    <ContestInput 
                        type={"time"}
                        id="endTime"
                        name="endTime"
                        placeholder="hh-mm-ss"
                        changeHandler={(event)=> timeHandler(event)}
                        min={new Date().getHours() + ":" + new Date().getMinutes()}
                        value={information ? information.endTime : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.endTime,
                                message: t("invalid_time")
                            } : undefined
                        }
                    />
                    <ContestInput 
                        type={"number"}
                        id="minPoints"
                        name="minPoints"
                        placeholder={t("min_points_to_win")}
                        label={t("min_points")}
                        changeHandler={(event)=> changeHandler(event)}
                        min={1}
                        value={information ? information.minPoints : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.endTime,
                                message: t("invalid_min_points")
                            } : undefined
                        }
                    />
                </div>
            </div>
            <div className="prizes is-flex is-flex-direction-column">
                <label>{t("prizes")}</label>
                <PrizesInputs  
                    num={information ? information.winnersNbr : 1} 
                    prizesHandler={(event, id)=> prizesHandler(event, id)} 
                    validData={typeof(validData) === "object"  && Object.keys(validData).includes("prizes") ? validData.prizes : undefined}
                    data={information && typeof(information) === "object" ? information.prizes : undefined}
                    placeholder={t("prize")}
                />
            </div>
            <div dir={direction ? direction : "ltr"} className={`contestButtons is-flex ${direction === "rtl" ? "is-flex-direction-row-reverse" : "is-flex-direction-row"} is-justify-content-flex-end`}>
                <ContestButton 
                    color={"#5E2691"} 
                    bgColor={"#FFFFFF"}
                    borderColor={"#5E2691"}
                    text={information.status !== null && typeof(information.status) === "string" && information.status.toLowerCase() === "draft" ? t("edit") : t("save_as_draft")} 
                    clickEvent={()=> saveDraft()}/>
                <ContestButton 
                    color={"#FFFFFF"}
                    bgColor={"#5E2691"} 
                    borderColor={"#5E2691"}
                    text={t("next")} 
                    clickEvent={()=> nextStep()}
                />
            </div>
        </div>
    )
}
export default ContestFirstStep;