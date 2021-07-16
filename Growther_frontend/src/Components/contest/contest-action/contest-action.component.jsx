import React from "react"
import { Contest_TextInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const ContestAction = ({data})=>{
    if(typeof(data) !== "object") return null
    return(
        <div className="contestAction is-flex is-flex-direction-row is-flex-wrap-wrap">
            <div className="actionTitle">{data.title}</div>
            <div className="actionSelect">
                <SelectInput data={
                    Array.isArray(data.actions) ? data.actions : ["Like", "View", "Subscribe"]
            }/>
            </div>
            <div className="actionTitle">
                <Contest_TextInput
                    type={"url"}
                    id="actionUrl"
                    name="actionUrl"
                    placeholder="Link here"
                />
            </div>
            <div className="">

            </div>
            <div className="removeAction">

            </div>
        </div>
    )
}