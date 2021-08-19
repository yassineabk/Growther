import React from "react"
import { ActionIcon } from "../actions-icons/actions-icons.component"
import { ContestInput } from "../contest-input/contest-input.component"
export const PreviewAction = ({provider, links, points, status, selected, changeHandler, DoAction, done, index, isOwner, canParticipate, showLoginForm})=>{
    var showLogin = (value)=>{
        if(showLoginForm && {}.toString.call(DoAction) === '[object Function]' && typeof(status) === "string" && status.toLowerCase() === "published"){
            showLoginForm(value)
        }
    }
    var doAction = ()=>{
        if(DoAction && {}.toString.call(DoAction) === '[object Function]' && done !== true && typeof(status) === "string" && status.toLowerCase() === "published"){
            DoAction()
        }
    }
    return(
        <div key={`previewAction-${provider}-${index}`} className="is-flex is-flex-direction-row prev-action">
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
                <div onClick={!isOwner && canParticipate && status !== null ? ()=> doAction() : ()=> showLogin(!isOwner && !canParticipate)} className="actionPoints">
                    +{points}
                </div> : <div className="actionPoints">
                    <img src={require("../../../assets/icons/done.png").default} width={25} />
                </div>
            }
        </div>
    )
}