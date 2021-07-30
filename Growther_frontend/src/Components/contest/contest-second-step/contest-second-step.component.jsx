import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation } from "react-router-dom"
import { AddAction, NextStep, PublishContest, RemoveAction, SaveContest, UpdateAction } from "../../../redux/contest/contest-actions"
import { ActionsList } from "../actions-list/actions-list.component"
import { ContestActions } from "../contest-actions/contest-actions.component"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
export const ContestSecondStep = ()=>{
    var dispatch = useDispatch()
    var {information, isValidData, isValidActions, validActions, savedInfos, savedPrizes, user} = useSelector(state => state.contest)
    var location = useLocation()
    var history = useHistory()
    /*useEffect(()=>{
        CheckFirstStepData()
    }, [dispatch, isValidActions])
    var CheckFirstStepData = ()=>{
        NextStep(dispatch, information)
    }*/
    var addAction = (action)=>{
        AddAction(dispatch, action)
    }
    var updateAction = (provider, key, value, index) =>{
        UpdateAction(dispatch, provider, key, value, index)
    }
    var removeAction = (provider, index)=>{
        RemoveAction(dispatch, provider, index)
    }
    var Save = ()=>{
        PublishContest(dispatch, {information, actions: information.actions, id: user.idContest, savedInfos, savedPrizes}).then(value =>{
            if(value){
                history.push("/dashboard/My Contests/new/thirdStep")
            }
        })
    }
    if(location.pathname !== "/dashboard/My Contests/new/secondStep") return null
    if(!isValidData || !savedInfos || !savedPrizes) return <Redirect to="/dashboard/My Contests/new/firstStep" />
    return(
        <div className="actionsContainer is-flex is-flex-direction-column">
            <div className="is-flex is-flex-direction-column">
                <div className="containerTitle">{"Contest actions"}</div>
                <ContestActions 
                    data={information.actions} 
                    removeAction={(actionName, index)=> removeAction(actionName, index)}
                    updateAction={(actionName, key, value, index)=> updateAction(actionName, key, value, index)}
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
                        {provider: "Pinterest", actions: ["Like", "Follow", "Comment"]} ,
                        {provider: "Twitch", actions: ["Like", "Follow", "Comment"]}
                    ]} 
                    addAction={(action)=> addAction(action)} 
                    title={"List of actions"}
                />
            </div>
            <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                <ContestButton 
                    color={"#5E2691"} 
                    bgColor={"#FFFFFF"}
                    borderColor={"#5E2691"}
                    text={"Save as draft"}
                />
                <ContestButton  
                    color={"#FFFFFF"}
                    bgColor={"#5E2691"} 
                    borderColor={"#5E2691"}
                    text={"Publish"} 
                    clickEvent={(event)=> Save()} />
            </div>
        </div>
    )
}