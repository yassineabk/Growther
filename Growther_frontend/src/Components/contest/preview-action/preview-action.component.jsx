import { decode } from "jsonwebtoken"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { ActionIcon } from "../actions-icons/actions-icons.component"
import { ContestInput } from "../contest-input/contest-input.component"
export const PreviewAction = ({provider, links, points, status, changeHandler, DoAction, DoBonus, done, index, isOwner, canParticipate, showLoginForm, contestDone})=>{
    var showLogin = (value)=>{
        if(showLoginForm && {}.toString.call(DoAction) === '[object Function]' && typeof(status) === "string" && status.toLowerCase() === "published"){
            showLoginForm(value)
        }
    }
    var doAction = ()=>{
        var token = localStorage.getItem("accessToken")
        token = token !== null && typeof(token) === "string" ? token.trim() : token
        if(token === null || !token){
            return showLogin(true)
        }
        var decodedToken = decode(token)
        if(!decodedToken || decodedToken === null || typeof(decodedToken) !== "object"){
            return showLogin(true)
        }
        if(provider.toLowerCase() === "bonus"){
            if(!contestDone){
                if(DoBonus && {}.toString.call(DoBonus) === '[object Function]' && done !== true && typeof(status) === "string" && status.toLowerCase() === "published"){
                    DoBonus()
                }
            }
        }else{
            if(DoAction && {}.toString.call(DoAction) === '[object Function]' && done !== true && typeof(status) === "string" && status.toLowerCase() === "published"){
                DoAction()
            }
        }
        
    }
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
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
                value={t(links)} 
                placeholder={"Action"} 
                min={1}
                readonly={"readonly"}
                changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event) => changeHandler(event, provider) : ()=> false}
            />
            {points !== null && typeof(parseInt(points)) === "number" && done !== true? 
                <div onClick={(!isOwner || canParticipate) && status === "Published" ? ()=> doAction() : ()=> showLogin(!isOwner && !canParticipate)} className={`actionPoints is-flex ${direction === "rtl" ? "is-flex-direction-row-reverse" : ""}`}>
                    <span>
                        +
                    </span>
                    <span>
                        {points}
                    </span>
                </div> : <div className="actionPoints">
                    <img alt="" src={require("../../../assets/icons/done.png").default} width={25} />
                </div>
            }
        </div>
    )
}