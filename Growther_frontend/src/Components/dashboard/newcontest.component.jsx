import React, { useState } from "react"
import { Contest_TextInput } from "./newContest_textInput.component"
export const NewContest = ()=>{
    var [contest, setContest] = useState({
        contestTitle: null,
        contestDescription: null,
        contestWinnersNum: null,
        contestStart: null,
        contestEnd: null,
        contestRunFor: null,
        contestReach: null,
        prize1: null,
        prize2: null,
        prize3: null
    })
    var changeHandler = (event)=>{
        var id = event.target.id
        var result = contest
        if(id in result){
            result[id] = event.target.value
        }
        console.log(result)
        setContest(result)
    }
    return(
         <div className="is-flex is-flex-direction-column list-container newContest is-size-6">
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
                    <div className="textInputs is-flex is-flex-direction-column">
                        <Contest_TextInput 
                            type={"number"}
                            id="prize1"
                            name="prize1"
                            placeholder="First prize"
                            label="Prizes"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                        <Contest_TextInput 
                            type={"number"}
                            id="prize2"
                            name="prize2"
                            placeholder="Second prize"
                            label="Prizes"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                        <Contest_TextInput 
                            type={"number"}
                            id="prize3"
                            name="prize3"
                            placeholder="Third prize"
                            label="Prizes"
                            changeHandler={(event)=> changeHandler(event)}
                        />
                    </div>
                </div>
            </div>
         </div>
    )
}