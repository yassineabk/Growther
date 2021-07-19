import React from "react"
import { ContestInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestAction = ({data, removeAction, updateAction, url, points})=>{
    if(typeof(data) !== "object") return null
    return(
        <div className="contestAction is-flex is-flex-direction-row">
            <div className="actionTitle">{data.provider}</div>
            <div className="actionSelect">
                <SelectInput 
                data={
                    Array.isArray(data.actions) ? data.actions : ["Like", "View", "Subscribe"]
                    }
                changeHandler={(event)=> updateAction(data.provider, "action", event.target.value)}/>
            </div>
            <div className="actionUrl">
                <ContestInput
                    type={"url"}
                    id="actionUrl"
                    name="actionUrl"
                    placeholder="Link here"
                    changeHandler={(event)=> updateAction(data.provider, "actionUrl", event.target.value)}
                    value={url}
                />
            </div>
            <div className="actionPoints">
                <ContestInput 
                    type={"number"}
                    id="actionPoints"
                    name="actionPoints"
                    placeholder="Points"
                    value={points}
                    min={1}
                    changeHandler={(event)=> updateAction(data.provider, "points", parseInt(event.target.value))}
                />
            </div>
            <div className="removeAction">
                <img onClick={()=> removeAction(data.provider)} src={require("../../../assets/icons/close.png").default} />
            </div>
        </div>
    )
}