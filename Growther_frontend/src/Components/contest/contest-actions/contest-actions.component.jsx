import React from "react"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data, removeAction, updateAction, validActions})=>{
    return(
        <div className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                return(
                    <ContestAction 
                        data={element} 
                        removeAction={(provider)=> removeAction(provider)} 
                        updateAction={(provider, key, value)=> updateAction(provider, key, value)}
                        validAction={validActions && validActions[index] && validActions[index].actions ? validActions[index].actions : undefined}
                    />
            )}) : null}
        </div>
    )
}