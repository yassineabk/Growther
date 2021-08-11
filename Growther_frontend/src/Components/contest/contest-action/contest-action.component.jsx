import React from "react"
import { actions } from "../../../services/actions"
import { ContestInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestAction = ({data, removeAction, updateAction, validAction})=>{
    if(typeof(data) !== "object") return null
    return(
        <div className="contestAction is-flex is-flex-direction-row">
            <div className="actionTitle">{data.provider}</div>
            <div className="actionSelect">
                <SelectInput 
                    data={
                        Array.isArray(data.listOfActions) ? data.listOfActions : actions.filter(action=> {
                            if(action.provider === data.provider){
                                return action.actions
                            }})
                    }
                    changeHandler={(event)=> updateAction(data.provider, "type", event.target.value)}
                    value={data.type}
                />
            </div>
            <div className="actionUrl">
                <ContestInput
                    type={"url"}
                    id="actionUrl"
                    name="actionUrl"
                    placeholder="Link here"
                    changeHandler={(event)=> updateAction(data.provider, "url", event.target.value)}
                    value={typeof(data) === "object" && typeof(data.url) === "string" ? data.url : ""}
                    validData={typeof(validAction) === "object" ? {isValid: validAction.url, message: "Please, Enter a valid link"} : false}
                />
            </div>
            <div className="actionPoints">
                <ContestInput 
                    type={"number"}
                    id="actionPoints"
                    name="actionPoints"
                    placeholder="Points"
                    value={typeof(data) === "object" && typeof(data.points) === "number" ? data.points : 1}
                    min={1}
                    max={5}
                    changeHandler={(event)=> updateAction(data.provider, "points", parseInt(event.target.value))}
                    validData={typeof(validAction) === "object" ? 
                        {
                            isValid: validAction.points, 
                            message:"Please, Enter a number between 1 and 5"
                        } : false}
                />
            </div>
            <div className="removeAction">
                <img onClick={()=> removeAction(data.provider)} src={require("../../../assets/icons/close.png").default} />
            </div>
        </div>
    )
}