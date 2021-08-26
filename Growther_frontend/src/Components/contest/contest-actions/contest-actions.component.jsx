import React from "react"
import { DISCROD_BOT_URL } from "../../../services/links"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data, removeAction, updateAction, validActions})=>{
    return(
        <div className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                return(
                    [
                        <ContestAction 
                            data={element} 
                            removeAction={(provider)=> removeAction(provider, index)} 
                            updateAction={(provider, key, value)=> updateAction(provider, key, value, index)}
                            validAction={validActions && validActions[index] ? validActions[index]: undefined}
                        />,
                        element.isDiscord ? 
                            <div className="is-flex is-flex-direction-column">
                                <p className={`discordBotLink ${validActions && validActions[index] ? "is-danger" : ""}`}>
                                    Please add our Bot to your <a href={DISCROD_BOT_URL} target="_blank" rel="noreferrer">server</a>
                                </p> 
                            </div> : null
    
                    ]
            )}) : null}
        </div>
    )
}