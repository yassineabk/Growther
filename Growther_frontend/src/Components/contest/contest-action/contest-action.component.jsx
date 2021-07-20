import React from "react"
import { ContestInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestAction = ({data, removeAction, updateAction, validAction})=>{
    console.log(data)
    if(typeof(data) !== "object") return null
    return(
        <div className="contestAction is-flex is-flex-direction-row">
            <div className="actionTitle">{data.provider}</div>
            <div className="actionSelect">
                <SelectInput 
                    data={
                        Array.isArray(data.listOfActions) ? data.listOfActions : []
                    }
                    changeHandler={(event)=> updateAction(data.provider, "action", event.target.value)}
                    value={data.active}
                />
            </div>
            <div className="actionUrl">
                <ContestInput
                    type={"url"}
                    id="actionUrl"
                    name="actionUrl"
                    placeholder="Link here"
                    changeHandler={(event)=> updateAction(data.provider, "link", event.target.value)}
                    value={data.actions[data.active] ? data.actions[data.active].link : ""}
                    validData={validAction && validAction[data.active] ? {isValid: validAction[data.active].link, message: "Please, Enter a valid link"} : false}
                />
            </div>
            <div className="actionPoints">
                <ContestInput 
                    type={"number"}
                    id="actionPoints"
                    name="actionPoints"
                    placeholder="Points"
                    value={data.actions[data.active] ? data.actions[data.active].points : 1}
                    min={1}
                    changeHandler={(event)=> updateAction(data.provider, "points", parseInt(event.target.value))}
                    validData={validAction && validAction[data.active] ? {isValid: validAction[data.active].points, message: "Please, Enter a number greather than 0"} : false}
                />
            </div>
            <div className="removeAction">
                <img onClick={()=> removeAction(data.provider)} src={require("../../../assets/icons/close.png").default} />
            </div>
        </div>
    )
}