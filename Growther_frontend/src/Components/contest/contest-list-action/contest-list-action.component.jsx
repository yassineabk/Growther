import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { ActionIcon } from "../actions-icons/actions-icons.component"
export const ListAction = ({element, addAction, index})=>{
    var {t} = useTranslation()
    var newAction = ()=>{
        var isDiscord = false
        if(Array.isArray(element.actions)){
            if(element.provider.toLowerCase() === "discord"){
                isDiscord = true
            }
            addAction({provider: element.provider, url: "", points: 1, type: element.actions[0], listOfActions: element.actions, isDiscord})
        }
    }
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div 
            onClick={()=> newAction()} 
            dir={direction ? direction : "ltr"}
            id={element.provider.toLowerCase()} 
            className="actionsListItem is-flex is-justify-content-center is-align-items-center">
            <ActionIcon provider={element.provider} />
            <div>{t(element.provider.toLowerCase())}</div>
        </div>
    )
}