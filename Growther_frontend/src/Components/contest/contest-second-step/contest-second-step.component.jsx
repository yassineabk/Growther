import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation } from "react-router-dom"
import { AddAction, NextStep, RemoveAction, SaveContest, UpdateAction } from "../../../redux/contest/contest-actions"
import { ActionsList } from "../actions-list/actions-list.component"
import { ContestActions } from "../contest-actions/contest-actions.component"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
export const ContestSecondStep = ()=>{
    var dispatch = useDispatch()
    var {actions, isValidData, isValidActions, validActions} = useSelector(state => state.contest)
    var location = useLocation()
    var history = useHistory()
    useEffect(()=>{
        CheckFirstStepData()
    }, [dispatch, isValidActions])
    var CheckFirstStepData = ()=>{
        NextStep(dispatch)
    }
    var addAction = (action)=>{
        AddAction(dispatch, action)
    }
    var updateAction = (provider, key, value) =>{
        UpdateAction(dispatch, provider, key, value)
    }
    var removeAction = (provider)=>{
        RemoveAction(dispatch, provider)
    }
    var GoToThirdStep = ()=>{
        if(isValidData && isValidActions){
            history.push("/dashboard/My Contests/new/thirdStep")
        }
    }
    var Save = ()=>{
        SaveContest(dispatch)
        NextStep(dispatch)
        GoToThirdStep()
    }
    if(location.pathname !== "/dashboard/My Contests/new/secondStep") return null
    if(isValidData !== true) return <Redirect to="/dashboard/My Contests/new/firstStep" />
    return(
        <div className="actionsContainer is-flex is-flex-direction-column">
            <div className="is-flex is-flex-direction-column">
                <div className="containerTitle">{"Contest actions"}</div>
                <ContestActions 
                    data={actions} 
                    removeAction={(actionName)=> removeAction(actionName)}
                    updateAction={(actionName, key, value)=> updateAction(actionName, key, value)}
                    title={"Contest actions"}
                    validActions={validActions ? validActions : undefined}
                />
            </div>
            <div className="is-flex is-flex-direction-column">
                <div className={"containerTitle"}>{"List of actions"}</div>
                <ActionsList 
                    actions={[
                        {provider: "Youtube", actions:["View", "Like", "Subscribe"]}, 
                        {provider: "Facebook", actions:["Like", "Follow", "Comment"]},
                        {provider: "Instagram", actions:["Like", "Follow", "Comment"]},  
                        {provider: "Twitter", actions: ["Like", "Follow", "Comment"]} ,
                        {provider: "Pintrest", actions: ["Like", "Follow", "Comment"]} ,
                        {provider: "Twitch", actions: ["Like", "Follow", "Comment"]}
                    ]} 
                    addAction={(action)=> addAction(action)} 
                    title={"List of actions"}
                />
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