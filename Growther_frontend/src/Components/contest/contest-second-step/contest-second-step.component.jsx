import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation } from "react-router-dom"
import { AddAction, EditDraft, PublishContest, RemoveAction, SaveDraft, UpdateAction } from "../../../redux/contest/contest-actions"
import { AppendContest } from "../../../redux/contests/contests-actions"
import { actions } from "../../../services/actions"
import { ActionsList } from "../actions-list/actions-list.component"
import { ContestActions } from "../contest-actions/contest-actions.component"
import { ContestButton } from "../contest-buttons/contest-buttons.component"
const ContestSecondStep = ()=>{
    var dispatch = useDispatch()
    var {information, isValidData, validActions, isLoading} = useSelector(state => state.contest)
    var location = useLocation()
    var history = useHistory()
    var { isBrand, direction } = useSelector(state => state.userInfos)
    var [userId, setId] = useState("")
    useEffect(()=>{
        var token = decode(localStorage.getItem("accessToken"))
        var sub = token !== null && typeof(token) === "object" ? token.sub : ""
        setId(sub)
    }, [userId])
    var addAction = (action)=>{
        AddAction(dispatch, action).then(value =>{
            if(value){
                var target = document.getElementById("newContestActions")
                if(target && target !== null){
                    target.scrollTop = target.scrollHeight
                }
            }
        })
    }
    var updateAction = (provider, key, value, index) =>{
        UpdateAction(dispatch, provider, key, value, index)
    }
    var removeAction = (provider, index)=>{
        RemoveAction(dispatch, provider, index)
    }
    var Save = ()=>{
        if(isLoading) return false
        PublishContest(dispatch, {information, actions: information.actions}).then(value =>{
            if(value){
                history.push("/dashboard/My Contests/new/thirdStep")
                var token = decode(localStorage.getItem("accessToken"))
                var sub = token !== null && typeof(token) === "object" ? token.sub : ""
                information.idContest = value.idContest
                information.status = value.status
                information.user = {id: sub, isBrand: "true"}
                AppendContest(dispatch, information)
            }
        })
    }
    var saveDraft = ()=>{
        if(information.status !== null && typeof(information.status) === "string" && information.status === "DRAFT"){
            return EditDraft(dispatch, information, information.idContest)
        }
        SaveDraft(dispatch, information, userId)
    }
    var {t} = useTranslation()
    var scrollActionsList = (event)=>{
        var target = document.getElementById("newContestActions")
        if(target && target !== null){
            if(!target.contains(event.target)){
                if(event.target.id === "contestActionsTitle"){
                    return target.scrollTo({top: target.scrollTop - 10, behavior: 'smooth'})
                }
                if(event.target.id === "ActionsList" || document.getElementById("ActionsList").contains(event.target)){
                    return target.scrollTo({top: target.scrollTop + 10, behavior: 'smooth'})
                }
            }
        }
    }
    if(isBrand !== "true") return <Redirect to="/dashboard" />
    if(location.pathname !== "/dashboard/My Contests/new/secondStep") return null
    if(!isValidData) return <Redirect to="/dashboard/My Contests/new/firstStep" />
    return(
        <div onDragOver={(event)=> scrollActionsList(event)} className="actionsContainer is-flex is-flex-direction-column">
            <div className="is-flex is-flex-direction-column">
                <div id="contestActionsTitle" className="containerTitle">{t("contest_actions")}</div>
                <ContestActions 
                    data={information.actions} 
                    removeAction={(actionName, index)=> removeAction(actionName, index)}
                    updateAction={(actionName, key, value, index)=> updateAction(actionName, key, value, index)}
                    title={"Contest actions"}
                    validActions={validActions ? validActions : undefined}
                />
            </div>
            <div id="ActionsList" className="is-flex is-flex-direction-column">
                <div className={"containerTitle"}>{t("list_of_actions")}</div>
                <ActionsList 
                    actions={actions} 
                    addAction={(action)=> addAction(action)} 
                    title={"List of actions"}
                />
            </div>
            <div dir={direction ? direction : "ltr"} className={`contestButtons is-flex is-justify-content-flex-end ${direction === "rtl" ? "is-flex-direction-row-reverse" : "is-flex-direction-row"}`}>
                <ContestButton 
                    color={"#5E2691"} 
                    bgColor={"#FFFFFF"}
                    borderColor={"#5E2691"}
                    text={information.status !== null && typeof(information.status) === "string" && information.status === "DRAFT" ? t("edit") : t("save_as_draft")}
                    clickEvent={()=> saveDraft()}
                />
                <ContestButton  
                    color={"#FFFFFF"}
                    bgColor={"#5E2691"} 
                    borderColor={"#5E2691"}
                    text={t("publish")} 
                    clickEvent={(event)=> Save()} />
            </div>
        </div>
    )
}
export default ContestSecondStep;