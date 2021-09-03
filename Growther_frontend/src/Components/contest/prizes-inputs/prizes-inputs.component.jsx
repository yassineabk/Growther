import React from "react"
import { useTranslation } from "react-i18next";
import { ContestInput } from "../contest-input/contest-input.component";
export const PrizesInputs = ({dispatch, num, prizesHandler, label, data, validData, placeholder})=>{
    var result = []
    var {t} = useTranslation()
    for(var i = 0; i < num; i++){
        const j = i
        result.push(
            <ContestInput 
                type={"text"}
                id={"prize"+i}
                name={"prize"+i}
                validData={validData && Array.isArray(validData) && typeof(validData[j]) === "object"  ? {isValid: validData[j].description, message: t("invalid_prize")} : undefined}
                placeholder={`${placeholder} ${parseInt(i+1)}`}
                changeHandler={(event)=> {
                    prizesHandler(event, j)
                }}
                value={data && Array.isArray(data) && data[i] ? data[i].description : ""}
            />
        )
    }
    return(
        <div className="textInputs is-flex is-flex-direction-row">
            {result}
        </div>
    )
}