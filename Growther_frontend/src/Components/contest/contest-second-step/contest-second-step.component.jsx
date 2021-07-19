import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { AddAction, RemoveAction, UpdateAction } from "../../../redux/contest/contest-actions"
import { ActionsList } from "../actions-list/actions-list.component"
import { ContestActions } from "../contest-actions/contest-actions.component"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
export const ContestSecondStep = ()=>{
    var dispatch = useDispatch()
    var contest = useSelector(state => state.contest)
    var location = useLocation()
    var history = useHistory()
    var addAction = (action)=>{
        AddAction(dispatch, action)
    }
    var updateAction = (provider, key, value) =>{
        UpdateAction(dispatch, provider, key, value)
    }
    var removeAction = (provider)=>{
        RemoveAction(dispatch, provider)
    }
    var Save = ()=>{
        history.push("/dashboard/My Contests/new/thirdStep")
    }
    if(location.pathname !== "/dashboard/My Contests/new/secondStep") return null
    return(
        <div className="actionsContainer is-flex is-flex-direction-column">
            <div className="is-flex is-flex-direction-column">
                <div className="containerTitle">{"Contest actions"}</div>
                <ContestActions 
                    data={contest.actions} 
                    removeAction={(actionName)=> removeAction(actionName)}
                    updateAction={(actionName, key, value)=> updateAction(actionName, key, value)}
                    title={"Contest actions"}
                />
            </div>
             <div className="is-flex is-flex-direction-column">
                <div className={"containerTitle"}>{"List of actions"}</div>
                <ActionsList 
                    actions={[
                        "Youtube", 
                        "Facebook",  
                        "Instagram", 
                        "Twitter",
                        "Pintrest", 
                        "Twitch",
                    ]} 
                    addAction={(action)=> addAction(action)} 
                    title={"List of actions"}/>
            </div>
            <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                <ContestButton color={"#FF7171"} text={"Save as draft"} />
                <ContestButton 
                    color={"#0880AE"} 
                    text={"Save"} 
                    clickEvent={(event)=> Save()} />
            </div>
        </div>
    )
}