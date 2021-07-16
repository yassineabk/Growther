import React from "react"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data, removeAction, updateAction})=>{
    return(
        <div className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                console.log(element)
                return(
                    <ContestAction 
                        data={element} 
                        removeAction={(actionName)=> removeAction(actionName)} 
                        updateAction={(actionName, key, value)=> updateAction(actionName, key, value)}
                        url={element.actionUrl}
                        points={element.points}
                    />
            )}) : null}
        </div>
    )
}