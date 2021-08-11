import React from "react"
import { Contest } from "../../../pages/contest/contest.page"
import { ActionIcon } from "../actions-icons/actions-icons.component"
import { ContestInput } from "../contest-input/contest-input.component"
import { SelectInput } from "../select-input/select-input.component"
export const PreviewAction = ({provider, links, points, selected, changeHandler, DoAction, done})=>{
    return(
        <div className="is-flex is-flex-direction-row prev-action">
            {provider && typeof(provider) === "string" ? 
                <div id={provider.toLowerCase()} className="actionProvider">
                    <ActionIcon
                        provider={provider} 
                    />
                </div> : null
            }
            <ContestInput 
                value={links} 
                placeholder={"Action"} 
                min={1}
                readonly={"readonly"}
                changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event) => changeHandler(event, provider) : ()=> false}
            />
            {points !== null && typeof(parseInt(points)) === "number" && done !== true? 
                <div onClick={DoAction && {}.toString.call(DoAction) === '[object Function]' && done !== true ? ()=> DoAction() : ()=> false} className="actionPoints">
                    +{points}
                </div> : <div className="actionPoints">
                    <img src={require("../../../assets/icons/done.png").default} width={25} />
                </div>
            }
        </div>
    )
}