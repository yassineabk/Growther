import React from "react"
import {useDispatch, useSelector} from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { NextStep, PrizesChange, RemovePrize, SetDuration, StateChange, WinnersNumChange } from "../../../redux/contest/contest-actions"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { PrizesInputs } from "../prizes-inputs/prizes-inputs.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestFirstStep = ()=>{
    var dispatch = useDispatch()
    var location = useLocation()
    var history = useHistory()
    var {information, actions, isValidData, validData} = useSelector(state => state.contest)
    
    var changeHandler = (event)=>{
        var id = event.target.id
        console.log(id)
        var result = information
        var numIds = ["winnersNbr", "duration", "maxParticipants"]
        if(id in result){
            result[id] = numIds.includes(id) ?  parseInt(event.target.value) : event.target.value
            StateChange(dispatch, result)
        }
    }
    var dateHandler = (event)=>{
        changeHandler(event)
        durationHandler()
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
                return SetDuration(dispatch, "months", diffMonths)
            }
            if(diffDays % 7 === 0){
                return SetDuration(dispatch, "weeks", diffWeeks)
            }
            SetDuration(dispatch, "days", diffDays)
        }else{
            SetDuration(dispatch, information.duration.type, parseInt(event.target.value))
        }
        
    }
    var durationTypeHandler = (event) =>{
        SetDuration(dispatch, event.target.value, information.duration.value)
    }
    var numWinnersHandler = (event)=>{
        var newValue = event.target.value
        var oldValue = information.winnersNbr
        if(oldValue > newValue){
            RemovePrize(dispatch, "prize"+parseInt(oldValue-1), parseInt(newValue))
        }else{
            WinnersNumChange(dispatch, "prize"+parseInt(newValue-1), parseInt(newValue))
        }
    }
    var prizesHandler = (event)=>{
        var newValue = event.target.value
        var id = event.target.id
        PrizesChange(dispatch, id, newValue)
    }
    var GoToSecondStep = ()=>{
        if(isValidData === true){
            history.push("/dashboard/My Contests/new/secondStep")
        }
    }
    var nextStep = ()=>{
        NextStep(dispatch)
        GoToSecondStep()
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
                        value={information.title}
                        validData={isValidData === false ? 
                            {
                                isValid: validData.title,
                                message: "Please, Enter the title of your contest"
                            } : undefined}
                    />
                    <ContestInput 
                        id="description"
                        name="description"
                        placeholder=""
                        label="Desctiption"
                        changeHandler={(event)=> changeHandler(event)}
                        value={information.description}
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
                        value={information.winnersNbr}
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
                        value={information.startDate}
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
                        value={information.endDate}
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
                                value={information.duration.type}
                                changeHandler={(event)=> durationTypeHandler(event)}
                            />
                        ]}
                        value={information.duration.value}
                    />
                    <ContestInput 
                        type={"number"}
                        id="maxParticipants"
                        name="maxParticipants"
                        placeholder="Number of participants"
                        label="Or stop when we reach"
                        changeHandler={(event)=> changeHandler(event)}
                        value={information.maxParticipants}
                    />
                </div>
            </div>
            <div className="prizes is-flex is-flex-direction-column">
                <label>{"Prizes"}</label>
                <PrizesInputs 
                    dispatch={dispatch} 
                    label={"Prizes"} 
                    num={information.winnersNbr} 
                    prizesHandler={(event)=> prizesHandler(event)} 
                />
            </div>
            <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                <ContestButton color={"#FF7171"} text={"Save as draft"} />
                <ContestButton 
                    color={"#0880AE"} 
                    text={"Next"} 
                    clickEvent={()=> nextStep()}
                />
            </div>
        </div>
    )
}