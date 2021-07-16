import React, { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { useLocation } from "react-router-dom"
import { PrizesChange, StateChange } from "../../../redux/contest/contest-actions"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
import { Contest_TextInput } from "../contest-input/contest-input.component"
import { PrizesInputs } from "../prizes-inputs/prizes-inputs.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestFirstStep = ()=>{
    var dispatch = useDispatch()
    var location = useLocation()
    var contest = useSelector(state => state.contest)
    var isValidDates = (d1, d2)=>{
        var date1 = new Date(d1)
        var date2 = new Date(d2)
        if(date1 >= date2) return false
        return true
    }
    var changeHandler = (event)=>{
        var id = event.target.id
        var result = contest
        var numIds = ["contestWinnersNum", "contestRunFor", "contestReach"]
        if(id in result){
            result[id] = numIds.includes(id) ?  parseInt(event.target.value) : event.target.value
            if(id === "contestStart" || id === "contestEnd"){
                if(result.contestEnd !== null && result.contestStart !== null){
                    if(!isValidDates(result.contestStart, result.contestEnd)){
                        document.getElementById("contestStart").value = ""
                        document.getElementById("contestEnd").value = ""
                        return false
                    }
                }
            }
            StateChange(dispatch, result)
        }
    }
    var prizesHandler = (event)=>{
        var id = event.target.id
        var prize = event.target.value
        PrizesChange(dispatch, id, prize)
    }
    if(location.pathname !== "/dashboard/My Contests/new/firstStep") return null
    return(
        <div className="is-flex is-flex-direction-column newContestFrom">
            <div className="mainInfos is-flex">
                <div className="textInputs is-flex is-flex-direction-column">
                    <Contest_TextInput 
                        id="contestTitle"
                        name="contestTitle"
                        placeholder="Your title here"
                        label="Contest Title"
                        changeHandler={(event)=> changeHandler(event)}
                        value={contest.contestTitle}

                    />
                    <Contest_TextInput 
                        id="contestDescription"
                        name="contestDescription"
                        placeholder=""
                        label="Desctiption"
                        changeHandler={(event)=> changeHandler(event)}
                        value={contest.contestDescription}
                    />
                    <Contest_TextInput 
                        type={"number"}
                        id="contestWinnersNum"
                        name="contestWinnersNum"
                        placeholder="Number of winners"
                        label="There will be"
                        changeHandler={(event)=> changeHandler(event)}
                        min={1}
                        value={contest.contestWinnersNum}
                    />
                </div>
                <div className="otherInputs is-flex is-flex-direction-column">
                    <Contest_TextInput 
                        type={"date"}
                        id="contestStart"
                        name="contestStart"
                        placeholder="dd-mm-yyyy"
                        label="Start date"
                        changeHandler={(event)=> changeHandler(event)}
                        value={contest.contestStart}
                    />
                    <Contest_TextInput 
                        type={"date"}
                        id="contestEnd"
                        name="contestEnd"
                        placeholder="dd-mm-yyyy"
                        label="End date"
                        changeHandler={(event)=> changeHandler(event)}
                        value={contest.contestEnd}
                    />
                    <Contest_TextInput 
                        type={"number"}
                        id="contestRunFor"
                        name="contestRunFor"
                        placeholder="Number of days"
                        label="Or run contest for"
                        changeHandler={(event)=> changeHandler(event)}
                        value={contest.contestRunFor}
                    />
                    <Contest_TextInput 
                        type={"number"}
                        id="contestReach"
                        name="contestReach"
                        placeholder="Number of participants"
                        label="Or stop when we reach"
                        changeHandler={(event)=> changeHandler(event)}
                        child={[<SelectInput data={["days", "weeks", "months"]} />]}
                        value={contest.contestReach}
                    />
                </div>
            </div>
            <div className="prizes is-flex is-flex-direction-column">
                <label>{"Prizes"}</label>
                <PrizesInputs dispatch={dispatch} label={"Prizes"} num={contest.contestWinnersNum} prizesHandler={(event)=> prizesHandler(event)} />
            </div>
            <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                <ContestButton color={"#FF7171"} text={"Save as draft"} />
                <ContestButton color={"#0880AE"} text={"Next"} url={"/dashboard/My Contests/new/secondStep"} />
            </div>
        </div>
    )
}