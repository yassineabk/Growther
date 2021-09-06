import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { FailAlert, SuccessAlert } from "../../../redux/alert/alert-actions"
import { ContestCardWinners } from "../../../redux/contest-card/contest-card-actions"
import { PreviewActionsList } from "../preview-actions-list/preview-actions-list.component"
import { PreviewPrizesList } from "../preview-prizes-list/preview-prizes-list.component"
import { TimeLeftCountDown } from "../time-left-component/time-left.component"
export const PreviewCard = ({title, description, timeLeft, dateType, views, points, entries, status, actions, previewActions, changeHandler, prizes, buttons, hasStarted, hasEnded, canParticipate, isPublished, id, element, isPreview, user_id, error, immediately, DoAction, DoBonus, showLoginForm, contestDone, endDate, onMouseLeave, onMouseOver, winners})=>{
    var history = useHistory()
    var dispatch = useDispatch()
    var hoverCard = (event)=>{
        document.getElementById("card").classList.toggle("backface")
    }
    var editContest = (event)=>{
        if(buttons && id !== undefined && element.participationId === undefined){
            if(onMouseLeave && {}.toString.call(onMouseLeave) === '[object Function]'){
                onMouseLeave()
            }
            history.push(`/dashboard/My Contests/edit/${id}`, element)
        }
    }
    var [userId, setId] = useState(true)
    useEffect(()=>{
        window.onpopstate = ()=>{
            if(onMouseLeave && {}.toString.call(onMouseLeave) === '[object Function]'){
                onMouseLeave()
            }
        }
        if(!buttons && !isPreview){
            var token = decode(localStorage.getItem("accessToken"))
            if(token !== null && typeof(token) === "object"){
                var sub = token.sub
                if(sub.toString() === user_id){
                    setId(true)
                }else{
                    setId(false)
                }
            }
        }
    }, [userId])
    var timeleft = ()=>{
        var time = endDate, timeValue = timeLeft, timeType = dateType
        if(time && typeof(time) === "string" && time.length > 0 && !isPreview){
            time = time.split(":")
            if(Array.isArray(time) && time.length === 3){
                if(parseInt(time[0]) > 0){
                    if(parseInt(time[0]) === 1){
                        return {timeLeft: parseInt(time[0]), timeType: "hour"}
                    }
                    return {timeLeft: parseInt(time[0]), timeType: "hours"}
                }
                if(parseInt(time[1]) > 0){
                    if(parseInt(time[1]) === 1){
                        return {timeLeft: parseInt(time[1]), timeType: "minute"}
                    }
                    return {timeLeft: parseInt(time[1]), timeType: "minutes"}
                }
                if(parseInt(time[2]) > 0){
                    if(parseInt(time[2]) === 1){
                        return {timeLeft: parseInt(time[2]), timeType: "second"}
                    }
                    return {timeLeft: parseInt(time[2]), timeType: "seconds"}
                }else{
                    return {timeLeft: "Ended", timeType: ""}
                }
            }
        }
        return {timeLeft: timeValue, timeType: timeType}
    }
    var getWinners = ()=>{
        ContestCardWinners(dispatch, id).then(value =>{
            if(value){
                if(Array.isArray(value)){
                    if(value.length > 0){
                        return SuccessAlert(dispatch, "get_winners_successufully")
                    }
                }
            }
            FailAlert(dispatch, "no_winners_yet")
        })
    }
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    if(hasStarted || (buttons && element.participationId === undefined) || isPreview || userId || isPublished || error || immediately){
        return(
            <div dir={direction ? direction : "ltr"} id="card" className={`is-flex previewCard`}>
                <div dir={direction ? direction : "ltr"} className="left-side is-flex is-flex-direction-column">
                    <div className="card-views is-flex is-flex-direction-column">
                        {userId && element.participationId === undefined ? [<span className="little-title">
                            {t("views")}
                        </span>, 
                        <span>
                            {views !== undefined && views !== null && typeof(parseInt(views)) === "number" ? views : 0}
                        </span>,
                        ]
                        : [<span className="little-title">
                            {t("points")}
                        </span>,
                        <span>
                            {points !== undefined && points !== null && typeof(points) === "number" ? points : "0"}
                        </span> ]}
                    </div>
                    <div className="card-entries is-flex is-flex-direction-column">
                        <span className="little-title">
                            {t("entries")}
                        </span>
                        <span id="entries">
                            {entries && entries !== null && typeof(entries) === "object" && entries.value !== null && typeof(entries.value) === "string" ? entries.value : "0"} 
                            <span className="dateType">{entries && entries !== null && typeof(entries) === "object" && entries.key !== null && typeof(entries.key) === "string" ? ` ${entries.key}` : ""}</span>
                            {entries && entries !== null && typeof(entries) === "object" && entries.realValue !== null && typeof(entries.realValue) === "number" && entries.realValue >= 10**3 ? <div className="tooltip is-flex"><span className="tooltip-text">{entries.realValue}</span></div> : null}
                        </span>
                    </div>
                    <div className="card-date is-flex is-flex-direction-column">
                        <span className="little-title">
                            {t("time")}
                        </span>
                        <span 
                            onMouseOver={onMouseOver && {}.toString.call(onMouseOver) === '[object Function]' ? ()=> {
                                onMouseOver(element)
                            } : ()=> false}
                            id="entries">
                            {!isPreview ? (timeleft(endDate, timeLeft, dateType).timeLeft === "Ended" ? t("Ended") : timeleft(endDate, timeLeft, dateType).timeLeft) : (timeLeft === "Ended" ? t("Ended") : timeLeft) } <span className="dateType">{!isPreview ? t(timeleft(endDate, timeLeft, dateType).timeType) : t(dateType)}</span>
                            {endDate && typeof(endDate) === "string" && !isPreview ? 
                                <TimeLeftCountDown value={endDate} /> : null
                            }
                        </span>
                    </div>
                </div>
                <div className="right-side is-flex is-flex-direction-column">
                    <div className="card-infos is-flex is-flex-direction-column">
                        <div dir={direction ? direction : "ltr"} className="card-title is-flex is-justify-content-space-between">
                            <div>
                                <h3>{title ? title : ""}</h3>
                            </div>
                            <div className="is-flex is-flex-direction-row headButtons">
                                {!isPreview ? <div onClick={()=> history.push("/dashboard")}>
                                    <img alt="" src={require("../../../assets/icons/dashboard.png").default} width={"20px"} /> 
                                </div> : null}
                                {buttons && element.participationId === undefined ? 
                                    [<div onClick={(event)=> editContest(event)}>
                                        <img alt="" src={require("../../../assets/icons/edit.png").default} width={"20px"} /> 
                                    </div>,]
                                : null }
                                 {!isPreview && element.participationId !== undefined && (timeleft(endDate, timeLeft, dateType).timeLeft === "Ended" || (typeof(status) === "string" && status.toLowerCase() === "done")) ? 
                                    <div onClick={()=> getWinners()}>
                                        <img alt="" src={require("../../../assets/icons/winners.png").default} width={"20px"} />
                                    </div>
                                : null}
                                <div>
                                    <img alt="" onClick={()=> hoverCard()} src={require("../../../assets/icons/trophy2.png").default} width={"20px"} />
                                </div>
                            </div>
                        </div>
                        <div dir={direction ? direction : "ltr"} className="card-description">
                            <p>{description ? description : ""}</p>
                        </div>
                    </div>
                    <PreviewActionsList 
                        isPreview={isPreview}
                        previewActions={previewActions} 
                        actions={actions} 
                        changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event, provider) => changeHandler(event, provider) : ()=> false}
                        DoAction={DoAction && {}.toString.call(DoAction) === '[object Function]' ? (index, element)=> DoAction(index, element) : ()=> false}
                        DoBonus={DoBonus && {}.toString.call(DoBonus) === '[object Function]' ? (index, element) => DoBonus(index, element) : ()=> false}
                        isOwner={buttons}
                        showLoginForm={showLoginForm && {}.toString.call(showLoginForm) === '[object Function]' ? (value)=> showLoginForm(value) : ()=> false}
                        canParticipate={canParticipate}
                        status={status}
                        contestDone={contestDone}
                    />
                    {((!buttons || element.participationId) && (points < element.minPoints || !points)) && !isPreview ? <div dir={direction ? direction : "ltr"} id="min-points-alert">
                        {`*${t("Minimum points to enter in the draw is")} ${element.minPoints}`}
                    </div> : null}
                </div>
                <div className="is-flex is-flex-column is-align-items-center back previewPrizes">
                    <div onClick={()=> hoverCard()} dir={direction ? direction : "ltr"} className="prizesTitle is-flex is-flex-direction-row is-justify-content-space-between">
                        <div>{t("prizes")}</div>
                        <div>
                            <img alt="" src={require("../../../assets/icons/back.png").default} width={"20px"} />
                        </div>
                    </div>
                    <div id="previewPrizes" className="is-flex is-flex-direction-column">
                        <PreviewPrizesList prizes={prizes} winners={winners}  />
                    </div>
                </div>
            </div>
        )
    }else{
        return <Redirect to="/dashboard"/>
    }
}