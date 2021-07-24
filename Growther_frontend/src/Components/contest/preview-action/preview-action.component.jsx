import React from "react"
import { ActionIcon } from "../actions-icons/actions-icons.component"
import { ContestInput } from "../contest-input/contest-input.component"
export const PreviewAction = ({provider, link, points})=>{
    console.log(typeof(link), link)
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
                value={link} 
                placeholder={"Action Link"} 
                min={1}
                readonly={"readonly"}
            />
            {points && (typeof(points) === "string" || typeof(points) === "number") ? 
                <div className="actionPoints">
                    +{points}
                </div> : null
            }
        </div>
    )
}