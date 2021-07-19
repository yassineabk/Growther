import React from "react"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data, removeAction, updateAction})=>{
    return(
        <div className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                return(
                    <ContestAction 
                        data={element} 
                        removeAction={(provider)=> removeAction(provider)} 
                        updateAction={(provider, key, value)=> updateAction(provider, key, value)}
                        url={element.actionUrl}
                        points={element.points}
                    />
            )}) : null}
        </div>
    )
}