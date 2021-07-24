import React from "react"
import { ContestInput } from "../contest-input/contest-input.component";
export const PrizesInputs = ({dispatch, num, prizesHandler, label})=>{
    var result = []
    for(var i = 0; i < num; i++){
        result.push(
            <ContestInput 
                type={"text"}
                id={"prize"+i}
                name={"prize"+i}
                placeholder={"Prize " + parseInt(i+1)}
                changeHandler={(event)=> prizesHandler(event)}
            />
        )
    }
    return(
        <div className="textInputs is-flex is-flex-direction-row">
            {result}
        </div>
    )
}