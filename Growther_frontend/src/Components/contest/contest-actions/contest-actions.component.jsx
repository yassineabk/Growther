import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ChangeActionPlace, ChangeOrder } from "../../../redux/contest/contest-actions"
import { DISCROD_BOT_URL } from "../../../services/links"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data, removeAction, updateAction, validActions})=>{
    var {t} = useTranslation()
    var dispatch = useDispatch()
    var [dragged, setDragged] = useState(null)
    var [draggedId, setDraggedId] = useState("")
    var dragEvent = (event, order, id)=>{
        setDragged(order)
        setDraggedId(id)
    }
    var dragOverEvent = (event, id)=>{
        var target = document.getElementById(id)
        if(target && target !== null){
            target.classList.add("dragOver")
            target.classList.remove("dragOverEnd")
        }
        event.preventDefault();
    }
    var dragLeave = (event, id)=>{
        var target = document.getElementById(id)
        if(target && target !== null){
            target.classList.add("dragOverEnd")
            target.classList.remove("dragOver")
        }
    }
    var dropEvent = (event, order2, id)=>{
        var target = document.getElementById(id)
        if(target && target !== null){
            target.classList.add("dragOverEnd")
            target.classList.remove("dragOver")
        }
        ChangeOrder(dispatch, dragged, order2)
        event.dataTransfer.clearData();
    }
    var changePlaceDragOver = (event, order)=>{
        event.target.style.backgroundColor = ""
        if(order !== dragged + 1 && order !== dragged){
            event.target.classList.add("resize")
            event.target.classList.remove("reduce")
            event.preventDefault();
        }
    }
    var changePlaceDragLeave = (event)=>{
        event.target.style.backgroundColor = ""
        event.target.classList.add("reduce")
        event.target.classList.remove("resize")
    }
    var changePlaceDrop = (event, newIndex) => {
        event.target.style.backgroundColor = ""
        if(newIndex > dragged){
            newIndex -= 1
        }
        ChangeActionPlace(dispatch, newIndex, dragged).then(value =>{
            event.target.classList.add("reduce")
            event.target.classList.remove("resize")
            var droped = document.getElementById(`${draggedId}-${parseInt(newIndex  - 1)}`)
            if(droped && droped !== null){
                droped.classList.add("droped")
                setTimeout(()=>{
                    droped.classList.remove("droped")
                }, 500)
            }
        })
    }
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div id="newContestActions" className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                return(
                    [
                        index === 0 ? 
                        <div
                            onDragOver={(event)=> changePlaceDragOver(event, 1)} 
                            onDragLeave={(event)=> changePlaceDragLeave(event)}
                            onDrop={(event)=> changePlaceDrop(event, 1)} 
                            className="is-flex is-flex-direction-row empty-action"
                            >
                        </div> : null,
                        <ContestAction 
                            data={element} 
                            removeAction={(provider)=> removeAction(provider, index)} 
                            updateAction={(provider, key, value)=> updateAction(provider, key, value, index)}
                            validAction={validActions && validActions[index] ? validActions[index]: undefined}
                            id={`${element.provider}-${index}`}
                            dragEvent={(event, order)=> dragEvent(event, order, `${element.provider}`)}
                            dragOverEvent={(event) => dragOverEvent(event, `${element.provider}-${index}`)}
                            dropEvent={(event, order)=> dropEvent(event, order, `${element.provider}-${index}`)}
                            dragLeaveEvent={(event) => dragLeave(event, `${element.provider}-${index}`)}
                        />,
                        element.isDiscord ? 
                            <div className="is-flex is-flex-direction-column">
                                <p dir={direction ? direction : "ltr"} className={`discordBotLink ${validActions && validActions[index] ? "is-danger" : ""}`}>
                                    {t("Please add our Bot to your")} <a href={DISCROD_BOT_URL} target="_blank" rel="noreferrer">{t("server")}</a>
                                </p> 
                            </div> : null,
                        <div
                            onDragOver={(event)=> changePlaceDragOver(event, element.ordre + 1)} 
                            onDragLeave={(event)=> changePlaceDragLeave(event)}
                            onDrop={(event)=> changePlaceDrop(event, element.ordre + 1)} 
                            className="is-flex is-flex-direction-row empty-action"
                            id={`${element.provider}-${index}-empty`}
                        >
                        </div>
                    ]
            )}) : null}
        </div>
    )
}