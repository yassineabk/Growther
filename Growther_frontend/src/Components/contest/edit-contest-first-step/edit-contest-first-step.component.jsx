import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { CheckEdits, EditDuration, EditState, SetStateToEdit } from "../../../redux/contest-edit/contest-edit-actions"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
import { ContestDescription } from "../contest-description-input/contest-description-input.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { PrizesInputs } from "../prizes-inputs/prizes-inputs.component"
import { SelectInput } from "../select-input/select-input.component"
export const EditContestFirstStep = ()=>{
    var dispatch = useDispatch()
    var location = useLocation()
    var {information, actions, isValidData, validData} = useSelector(state => state.contest_edit)
    useEffect(()=>{
        var data = {
            "information": {
                "title": "Yassine Hijazi",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure do",
                "winnersNbr": 1,
                "startDate": "2021-07-27",
                "endDate": "2021-08-13",
                "duration": {
                    "value": 17,
                    "type": "days"
                },
                "maxReach": 8,
                "actions": [
                    {
                        "provider": "Youtube",
                        "type": "View",
                        "url": "https://www.youtube.com/id5",
                        "points": 3,
                        "listOfActions": [
                            "View",
                            "Like",
                            "Subscribe"
                        ]
                    },
                    {
                        "provider": "Youtube",
                        "type": "View",
                        "url": "https://www.youtube.com/id6",
                        "points": 1,
                        "listOfActions": [
                            "View",
                            "Like",
                            "Subscribe"
                        ]
                    },
                    {
                        "provider": "Youtube",
                        "type": "View",
                        "url": "https://www.youtube.com/id8",
                        "points": 5,
                        "listOfActions": [
                            "View",
                            "Like",
                            "Subscribe"
                        ]
                    }
                ],
                "prizes": [
                    {
                        id: 1,
                        description: "PS5"
                    }
                ]
            },
        }
        SetStateToEdit(dispatch, data)
    }, [dispatch])
    var changeHandler = (event)=>{
        var id = event.target.id
        var result = information
        var numIds = ["duration", "maxParticipants"]
        if(id in result){
            result[id] = numIds.includes(id) ?  parseInt(event.target.value) : event.target.value
            EditState(dispatch, result)
        }
    }
    var dateHandler = (event)=>{
        if(event !== undefined){
            changeHandler(event)
            EditDuration()
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
                return EditDuration(dispatch, "months", diffMonths, information.startDate, information.endDate)
            }
            if(diffDays % 7 === 0){
                return EditDuration(dispatch, "weeks", diffWeeks, information.startDate, information.endDate)
            }
            EditDuration(dispatch, "days", diffDays, information.startDate, information.endDate)
        }else{
            var startDate = dateConvert(information.startDate)
            var endDate = addDaystoDate(startDate, parseInt(event.target.value), information.duration.type)
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
        EditDuration(dispatch, event.target.value, information.duration.value, startDate, endDate)
    }
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
                    clickEvent={()=> CheckEdits(dispatch, information)}
                />
            </div>
        </div>
    )
}