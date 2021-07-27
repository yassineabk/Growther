import React from "react"
import { ActionIcon } from "../actions-icons/actions-icons.component"
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
            <SelectInput 
                data={links}
                value={links[typeof(selected) === "object" && typeof(selected.index) === "number" ? selected.index : 0]} 
                placeholder={"Action Link"} 
                min={1}
                changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event) => changeHandler(event, provider) : ()=> false}
            />
            {points && Array.isArray(points) && typeof(selected) === "object" && typeof(selected.index) === "number" ? 
                <div className="actionPoints">
                    +{points[selected.index]}
                </div> : null
            }
        </div>
    )
}