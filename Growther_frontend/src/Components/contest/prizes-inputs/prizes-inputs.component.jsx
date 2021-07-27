import React from "react"
import { ContestInput } from "../contest-input/contest-input.component";
export const PrizesInputs = ({dispatch, num, prizesHandler, label, data, validData})=>{
    var result = []
    for(var i = 0; i < num; i++){
        result.push(
            <ContestInput 
                type={"text"}
                id={"prize"+i}
                name={"prize"+i}
                validData={validData && typeof(validData) === "object" && Object.keys(validData).includes("prize"+i) ? {isValid: validData["prize"+i], message: "Please, Enter a valid Prize"} : undefined}
                placeholder={"Prize " + parseInt(i+1)}
                changeHandler={(event)=> prizesHandler(event)}
                value={data  && typeof(data) === "object" ? data["prize"+i] : ""}
            />
        )
    }
    return(
        <div className="textInputs is-flex is-flex-direction-row">
            {result}
        </div>
    )
}