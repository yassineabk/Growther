import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { InitState, NextStep, PrizesChange, RemovePrize, SaveContestFirstStep, SaveContestPrizes, SetDuration, StateChange, WinnersNumChange } from "../../../redux/contest/contest-actions"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
import { ContestDescription } from "../contest-description-input/contest-description-input.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { PrizesInputs } from "../prizes-inputs/prizes-inputs.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestFirstStep = ()=>{
    var dispatch = useDispatch()
    var location = useLocation()
    var history = useHistory()
    var {information, isValidData, validData, savedInfos} = useSelector(state => state.contest)
    useEffect(()=>{
        if(typeof(information) !== "object"){
            InitState(dispatch)
        }
    }, [dispatch, isValidData])
    var changeHandler = (event)=>{
        var id = event.target.id
        var result = information
        var numIds = ["winnersNbr", "duration", "maxParticipants"]
        if(id in result){
            result[id] = numIds.includes(id) ?  parseInt(event.target.value) : event.target.value
            StateChange(dispatch, result)
        }
    }
    var dateHandler = (event)=>{
        if(event !== undefined){
            var id = event.target.id
            var currentDate = new Date()
            var currentDay = ("0"+currentDate.getDate()).slice(-2)
            var currentMonth = ("0"+parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1)).slice(-2)
            var currentYear = currentDate.getFullYear()
            currentDate = currentYear + "-" + currentMonth + "-" + currentDay
            if(id === "startDate"){
                var date = Math.ceil((new Date(event.target.value) - new Date(currentDate))/(100*60*60*24))
                var date2 = Math.ceil((new Date(information.endDate) - new Date(event.target.value))/(100*60*60*24))
                console.log(date)
                if(date > 0 && date2 > 0){
                    changeHandler(event)
                    return durationHandler()
                }
            }
            if(id === "endDate"){
                var date = Math.ceil((new Date(event.target.value) - new Date(information.startDate))/(100*60*60*24))
                var date2 = Math.ceil((new Date(event.target.value) - new Date(currentDate))/(100*60*60*24))
                console.log(date, date2)
                if(date > 0 && date2 > 0){
                    changeHandler(event)
                    return durationHandler()
                }
            }
            
        }
    }
    var durationHandler = (event)=>{
        if(event === undefined){
            var startDate = information.startDate
            var endDate = information.endDate
            var date1 = new Date(startDate)
            var date2 = new Date(endDate)
            var diff = Math.abs(date1 - date2)
            var diffDays = Math.ceil(diff / (1000*60*60*24))
            var diffWeeks = Math.ceil(diff / (1000*60*60*24*7))
            var diffMonths = Math.ceil(diff / (1000*60*60*24*30))
            if(diffDays % 30 === 0){
                return SetDuration(dispatch, "months", diffMonths, information.startDate, information.endDate)
            }
            if(diffDays % 7 === 0){
                return SetDuration(dispatch, "weeks", diffWeeks, information.startDate, information.endDate)
            }
            SetDuration(dispatch, "days", diffDays, information.startDate, information.endDate)
        }else{
            var startDate = dateConvert(information.startDate)
            var endDate = addDaystoDate(startDate, parseInt(event.target.value), information.duration.type)
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
    var durationTypeHandler = (event) =>{
        var startDate = dateConvert(information.startDate)
        var endDate = addDaystoDate(startDate, information.duration.value, event.target.value)
        SetDuration(dispatch, event.target.value, information.duration.value, startDate, endDate)
    }
    var numWinnersHandler = (event)=>{
        var newValue = parseInt(event.target.value)
        var oldValue = parseInt(information.winnersNbr)
        if(oldValue > newValue){
            for(var i = newValue; i < oldValue; i++){
                RemovePrize(dispatch, i, newValue)
            }
        }else{
            for(var i = oldValue; i < newValue; i++){
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

            /*SaveContestFirstStep(dispatch, information, isValid).then(id =>{
                if(typeof(id) === "number"){
                    SaveContestPrizes(dispatch, information.prizes, isValid, id).then(value =>{
                        if(value){
                            history.push("/dashboard/My Contests/new/secondStep")
                        }
                    })
                }
            })*/
        }
    }
    if(location.pathname !== "/dashboard/My Contests/new/firstStep") return null
    return(
        <div className="is-flex is-flex-direction-column newContestFrom">
            <div className="mainInfos is-flex">
                <div className="textInputs is-flex is-flex-direction-column">
                    <ContestInput 
                        id="title"
                        name="title"
                        placeholder="Your title here"
                        label="Contest Title"
                        changeHandler={(event)=> changeHandler(event)}
                        value={information ? information.title : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.title,
                                message: "Please, Enter the title of your contest"
                            } : undefined}
                    />
                    <ContestDescription 
                        id="description"
                        name="description"
                        placeholder="Description Here"
                        label="Description"
                        changeHandler={(event)=> changeHandler(event)}
                        value={information ? information.description : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.description,
                                message: "Please, Describe your contest in few lines"
                            } : undefined}
                    />
                    <ContestInput 
                        type={"number"}
                        id="winnersNbr"
                        name="winnersNbr"
                        placeholder="Number of winners"
                        label="There will be"
                        changeHandler={(event)=> numWinnersHandler(event)}
                        min={1}
                        value={information ? information.winnersNbr : 1}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.winnersNbr,
                                message: "Please, Your contest should have at least one winner"
                            }: undefined}
                    />
                </div>
                <div className="otherInputs is-flex is-flex-direction-column">
                    <ContestInput 
                        type={"date"}
                        id="startDate"
                        name="startDate"
                        placeholder="dd-mm-yyyy"
                        label="Start date"
                        changeHandler={(event)=> dateHandler(event)}
                        value={information ? information.startDate : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.startDate,
                                message: "Please, Pick a valid date"
                            } : undefined
                        }
                    />
                    <ContestInput 
                        type={"date"}
                        id="endDate"
                        name="endDate"
                        placeholder="dd-mm-yyyy"
                        label="End date"
                        changeHandler={(event)=> dateHandler(event)}
                        value={information ? information.endDate : ""}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.endDate,
                                message: "Please, Pick a valid date"
                            } : undefined
                        }
                    />
                    <ContestInput 
                        type={"number"}
                        id="duration"
                        name="duration"
                        placeholder="Number of days"
                        label="Or run contest for"
                        changeHandler={(event)=> durationHandler(event)}
                        child={[
                            <SelectInput 
                                data={["days", "weeks", "months"]} 
                                value={typeof(information) === "object" && typeof(information.duration) === "object" && typeof(information.duration.type) === "string" ? information.duration.type : "days"}
                                changeHandler={(event)=> durationTypeHandler(event)}
                            />
                        ]}
                        min={1}
                        value={information ? information.duration.value : 1}
                    />
                    <ContestInput 
                        type={"number"}
                        id="maxReach"
                        name="maxReach"
                        placeholder="Number of participants"
                        label="Or stop when we reach"
                        changeHandler={(event)=> changeHandler(event)}
                        min={1}
                        value={typeof(information) === "object" ? information.maxReach : 0}
                    />
                </div>
            </div>
            <div className="prizes is-flex is-flex-direction-column">
                <label>{"Prizes"}</label>
                <PrizesInputs  
                    num={information ? information.winnersNbr : 1} 
                    prizesHandler={(event, id)=> prizesHandler(event, id)} 
                    validData={typeof(validData) === "object"  && Object.keys(validData).includes("prizes") ? validData.prizes : undefined}
                    data={information && typeof(information) === "object" ? information.prizes : undefined}
                />
            </div>
            <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                <ContestButton 
                    color={"#5E2691"} 
                    bgColor={"#FFFFFF"}
                    borderColor={"#5E2691"}
                    text={"Save as draft"} />
                <ContestButton 
                    color={"#FFFFFF"}
                    bgColor={"#5E2691"} 
                    borderColor={"#5E2691"}
                    text={"Next"} 
                    clickEvent={()=> nextStep()}
                />
            </div>
        </div>
    )
}