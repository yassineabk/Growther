import React from "react"
import { Contest_TextInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestAction = ({data, removeAction, updateAction, url, points})=>{
    if(typeof(data) !== "object") return null
    return(
        <div className="contestAction is-flex is-flex-direction-row">
            <div className="actionTitle">{data.name}</div>
            <div className="actionSelect">
                <SelectInput data={
                    Array.isArray(data.actions) ? data.actions : ["Like", "View", "Subscribe"]
            }/>
            </div>
            <div className="actionUrl">
                <Contest_TextInput
                    type={"url"}
                    id="actionUrl"
                    name="actionUrl"
                    placeholder="Link here"
                    changeHandler={(event)=> updateAction(data.name, "actionUrl", event.target.value)}
                    value={url}
                />
            </div>
            <div className="actionPoints">
                <Contest_TextInput 
                    type={"number"}
                    id="actionPoints"
                    name="actionPoints"
                    placeholder="Points"
                    readonly="readonly"
                    value={points}
                />
            </div>
            <div className="removeAction">
                <img onClick={()=> removeAction(data.name)} src={require("../../../assets/icons/close.png").default} />
            </div>
        </div>
    )
}