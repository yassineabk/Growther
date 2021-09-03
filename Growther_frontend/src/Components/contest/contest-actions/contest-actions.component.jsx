import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ChangeOrder } from "../../../redux/contest/contest-actions"
import { DISCROD_BOT_URL } from "../../../services/links"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data, removeAction, updateAction, validActions})=>{
    var {t} = useTranslation()
    var dispatch = useDispatch()

    var dragEvent = (event, order)=>{
        event.dataTransfer.setData('text/plain', order);
    }
    var dragOverEvent = (event)=>{
        event.preventDefault();
    }
    var dropEvent = (event, order2)=>{
        var order1 = parseInt(event.dataTransfer.getData("text"))
        ChangeOrder(dispatch, order1, order2)
        event.dataTransfer.clearData();
    }
    var dragLeave = (event)=>{
        event.target.style.backgroundColor = ""
    }
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div id="newContestActions" className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                return(
                    [
                        <ContestAction 
                            data={element} 
                            removeAction={(provider)=> removeAction(provider, index)} 
                            updateAction={(provider, key, value)=> updateAction(provider, key, value, index)}
                            validAction={validActions && validActions[index] ? validActions[index]: undefined}
                            id={`${element.provider}-${index}`}
                            dragEvent={(event, order)=> dragEvent(event, order)}
                            dragOverEvent={(event) => dragOverEvent(event)}
                            dropEvent={(event, order)=> dropEvent(event, order)}
                            dragLeaveEvent={(event) => dragLeave(event)}
                        />,
                        element.isDiscord ? 
                            <div className="is-flex is-flex-direction-column">
                                <p dir={direction ? direction : "ltr"} className={`discordBotLink ${validActions && validActions[index] ? "is-danger" : ""}`}>
                                    {t("Please add our Bot to your")} <a href={DISCROD_BOT_URL} target="_blank" rel="noreferrer">{t("server")}</a>
                                </p> 
                            </div> : null
    
                    ]
            )}) : null}
        </div>
    )
}