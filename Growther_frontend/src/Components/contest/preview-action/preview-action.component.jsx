import React from "react"
import { Contest } from "../../../pages/contest/contest.page"
import { ActionIcon } from "../actions-icons/actions-icons.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const PreviewAction = ({provider, links, points, selected, changeHandler})=>{
    return(
        <div className="is-flex is-flex-direction-row">
            {provider && typeof(provider) === "string" ? 
                <div id={provider.toLowerCase()} className="actionProvider">
                    <ActionIcon
                        provider={provider} 
                    />
                </div> : null
            }
            <ContestInput 
                value={links} 
                placeholder={"Action Link"} 
                min={1}
                readonly={"readonly"}
                changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event) => changeHandler(event, provider) : ()=> false}
            />
            {typeof(parseInt(points)) === "number" ? 
                <div className="actionPoints">
                    +{points}
                </div> : null
            }
        </div>
    )
}