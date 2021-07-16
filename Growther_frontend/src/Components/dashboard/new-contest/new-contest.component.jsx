import React, { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { PrizesChange, StateChange } from "../../../redux/contest/contest-actions"
import { ContestButton } from "../contest-buttons/button-component"
import { Contest_TextInput } from "../inputs/contest-input.component"
import { PrizesInputs } from "../prizes-inputs/prizes-inputs.component"
export const NewContest = ()=>{
    var dispatch = useDispatch()
    var contest = useSelector(state => state.contest)
    /*var [contest, setContest] = useState({
        contestTitle: null,
        contestDescription: null,
        contestWinnersNum: 1,
        contestStart: null,
        contestEnd: null,
        contestRunFor: null,
        contestReach: null,
        prizes: {}
    })*/
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
    return(
         <div className="column is-full is-flex list-container newContest is-size-6">
            <div className="preview is-flex-tablet is-hidden-touch-only"></div>
            <div className="is-flex is-flex-direction-column newContestFrom">
                <div className="mainInfos is-flex">
                    <div className="textInputs is-flex is-flex-direction-column">
                        <Contest_TextInput 
                            id="contestTitle"
                            name="contestTitle"
                            placeholder="Your title here"
                            label="Contest Title"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                        <Contest_TextInput 
                            id="contestDescription"
                            name="contestDescription"
                            placeholder=""
                            label="Desctiption"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                        <Contest_TextInput 
                            type={"number"}
                            id="contestWinnersNum"
                            name="contestWinnersNum"
                            placeholder="Number of winners"
                            label="There will be"
                            changeHandler={(event)=> changeHandler(event)}
                            min={1}
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
                        />
                        <Contest_TextInput 
                            type={"date"}
                            id="contestEnd"
                            name="contestEnd"
                            placeholder="dd-mm-yyyy"
                            label="End date"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                        <Contest_TextInput 
                            type={"number"}
                            id="contestRunFor"
                            name="contestRunFor"
                            placeholder="Number of days"
                            label="Or run contest for"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                        <Contest_TextInput 
                            type={"number"}
                            id="contestReach"
                            name="contestReach"
                            placeholder="Number of participants"
                            label="Or stop when we reach"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                    </div>
                </div>
                <div className="prizes is-flex is-flex-direction-column">
                    <label>{"Prizes"}</label>
                    <PrizesInputs dispatch={dispatch} label={"Prizes"} num={contest.contestWinnersNum} prizesHandler={(event)=> prizesHandler(event)} />
                </div>
                <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                    <ContestButton color={"#FF7171"} text={"Save as draft"} />
                    <ContestButton color={"#0880AE"} text={"Next"} />
                </div>
            </div>
         </div>
    )
}