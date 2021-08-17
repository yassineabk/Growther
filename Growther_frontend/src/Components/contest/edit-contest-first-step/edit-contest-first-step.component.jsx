import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"
import { CheckEdits, Edit, EditDuration, EditState, SetStateToEdit, SetStateToEditFromLocation } from "../../../redux/contest-edit/contest-edit-actions"
import { Spinner } from "../../spinner/spinner.component"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
import { ContestDescription } from "../contest-description-input/contest-description-input.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { PreviewContainer } from "../preview-container/preview-container.component"
import { SelectInput } from "../select-input/select-input.component"
export const EditContestFirstStep = ()=>{
    var { information, actions, isValidData, validData, isLoading, error } = useSelector(state => state.contest_edit)
    var dispatch = useDispatch()
    var location = useLocation()
    var params = useParams()
    var history = useHistory()
    var [userId, setId] = useState("")
    useEffect(()=>{
        var token = decode(localStorage.getItem("accessToken"))
        var id = token !== null && typeof(token) === "object" ? token.sub : ""
        setId(id)
        if(typeof(location.state) === "object"){
            SetStateToEditFromLocation(dispatch, location.state, id).then(value =>{
                if(!value){
                    history.push("/landing-page")
                }
            })
        }else{
            SetStateToEdit(dispatch, params.id, id).then(value=>{
                if(!value){
                    history.push("/landing-page")
                }
            })
        }
    }, [dispatch])
    var dispatch = useDispatch()
    var changeHandler = (event)=>{
        var id = event.target.id
        var result = information
        var numIds = ["duration", "maxParticipants"]
        if(id in result){
            result[id] = numIds.includes(id) ?  parseInt(event.target.value) : event.target.value
            EditState(dispatch, result, undefined, id)
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
            if(id === "endDate"){
                var date = Math.ceil((new Date(event.target.value) - new Date(currentDate))/(1000*60*60*24))
                var date2 = Math.ceil((new Date(event.target.value) - new Date(information.startDate))/(1000*60*60*24))
                if(date >= 0 && date2 >= 0){
                    changeHandler(event)
                    durationHandler()
                } 
            }
            //EditDuration(dispatch, information.duration.type, event.target.value, information.startDate.split("T")[0], information.endDate.split("T")[0]^!mlp845)
        }
    }
    var durationHandler = (event)=>{
        if(event === undefined){
            var startDate = information.startDate.split("T")[0]
            var endDate = information.endDate.split("T")[0]
            var date1 = new Date(startDate)
            var date2 = new Date(endDate)
            var diff = Math.abs(date1 - date2)
            var diffDays = Math.ceil(diff / (1000*60*60*24))
            var diffWeeks = Math.ceil(diff / (1000*60*60*24*7))
            var diffMonths = Math.ceil(diff / (1000*60*60*24*30))
            if(diffDays % 30 === 0){
                return EditDuration(dispatch, "months", diffMonths, information.startDate, information.endDate)
            }
            if(diffDays % 7 === 0){
                return EditDuration(dispatch, "weeks", diffWeeks, information.startDate, information.endDate)
            }
            EditDuration(dispatch, "days", diffDays, information.startDate, information.endDate)
        }else{
            var startDate = dateConvert(information.startDate.split("T")[0])
            var endDate = addDaystoDate(startDate, information.endDate.split("T")[0], parseInt(event.target.value), information.duration.type)
            EditDuration(dispatch, information.duration.type, parseInt(event.target.value), startDate, endDate)
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
    var addDaystoDate = (date, date2, days, type)=>{
        if(type === "months"){
            days = 30*days
        }
        if(type === "weeks"){
            days = 7*days
        }
        date = new Date(new Date().setDate(new Date(date).getDate() + days))
        date2 = new Date(new Date().setDate(new Date(date2).getDate() + days))
        var day = ("0" + date.getDate()).slice(-2)
        var month = date.getMonth() + 1 === 13 ? 1 : date.getMonth() + 1
        month = ("0" + month).slice(-2)
        var year = date.getFullYear()
        return year + "-" + month + "-" + day
    }
    var checkEdits = ()=>{
        var validEdits = CheckEdits(dispatch, information)
        if(validEdits){
            Edit(dispatch, information, information.idContest, userId)
        }
    }
    var endTimeHandler = (event)=>{
        var time = event.target.value.split(":")
        var startTime = information.startTime
        var currentDate = new Date()
        var currentHour = currentDate.getHours()
        var currentMin = currentDate.getMinutes()
        var currentDay = ("0"+currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+parseInt(currentDate.getMonth() + 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var fulldate = `${currentYear}-${currentMonth}-${currentDay}`
        var date = Math.ceil((new Date(information.endDate.split("T")[0]) - new Date(information.startDate.split("T")[0]))/(1000*60*60*24))
        var date2 = Math.ceil((new Date(information.endDate.split("T")[0]) - new Date(fulldate))/(1000*60*60*24))
        startTime = startTime.split(":")
        if(date2 === 0){
            console.log(parseInt(time[0]), currentHour, currentMin, time[1])
            if(parseInt(time[0]) === currentHour && parseInt(time[1]) > currentMin){
                return changeHandler(event)
            }
            if(parseInt(time[0]) > currentHour){
                return changeHandler(event)
            }
            return false
        }
        if(date === 0){
            if(parseInt(time[0]) === parseInt(startTime[0]) && (parseInt(time[1]) - 10 > parseInt(startTime[1]))){
                return changeHandler(event)
            }
            if(parseInt(time[0]) > parseInt(startTime[0])){
                return changeHandler(event)
            }
            return false
        }
        return changeHandler(event)
    }
    if(typeof(information) !== "object") return <Redirect to={"/dashboard"} />
    return(
        [
            <PreviewContainer 
                information={information} 
                actions={information.actions} 
                isPreview={true}
            />,
            <Spinner show={isLoading} />,
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
                            label="Desctiption"
                            changeHandler={(event)=> changeHandler(event)}
                            value={information ? information.description : ""}
                            validData={isValidData === false ? 
                                {
                                    isValid: validData.description,
                                    message: "Please, Describe your contest in few lines"
                                } : undefined}
                        />
                    </div>
                    <div className="otherInputs is-flex is-flex-direction-column">
                        <ContestInput 
                            type={"date"}
                            id="endDate"
                            name="endDate"
                            placeholder="dd-mm-yyyy"
                            label="End date"
                            changeHandler={(event)=> dateHandler(event)}
                            value={typeof(information.endDate) === "string" ? information.endDate.split("T")[0] : ""}
                            validData={isValidData === false ? 
                                {
                                    isValid: validData.endDate,
                                    message: "Please, Pick a valid date"
                                } : undefined
                            }
                        />
                        <ContestInput 
                            type={"time"}
                            id="endTime"
                            name="endTime"
                            placeholder="hh-mm-ss"
                            changeHandler={(event)=> endTimeHandler(event)}
                            min={new Date().getHours() + ":" + new Date().getMinutes()}
                            value={information ? information.endTime : ""}
                            validData={isValidData === false ? 
                                {
                                    isValid: validData.endTime,
                                    message: "Please, Pick a valid date"
                                } : undefined
                            }
                        />
                        <ContestInput 
                            type={"number"}
                            id="maxReach"
                            name="maxReach"
                            placeholder="Number of participants"
                            label="Or stop when we reach"
                            changeHandler={(event)=> changeHandler(event)}
                            min={1}
                            value={information ? information.maxReach : 0}
                        />
                    </div>
                </div>
                <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                    <ContestButton 
                        color={"#5E2691"} 
                        bgColor={"#FFFFFF"}
                        borderColor={"#5E2691"}
                        text={"Cancel"} />
                    <ContestButton 
                        color={"#FFFFFF"}
                        bgColor={"#5E2691"} 
                        borderColor={"#5E2691"}
                        text={"Edit"} 
                        clickEvent={()=> checkEdits()}
                    />
                </div>
            </div>
        ]
    )
}