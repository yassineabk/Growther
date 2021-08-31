import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Redirect, useHistory } from "react-router-dom"
import { PreviewActionsList } from "../preview-actions-list/preview-actions-list.component"
import { PreviewPrizesList } from "../preview-prizes-list/preview-prizes-list.component"
import { TimeLeftCountDown } from "../time-left-component/time-left.component"
export const PreviewCard = ({title, description, timeLeft, dateType, views, points, entries, status, actions, previewActions, changeHandler, prizes, buttons, hasStarted, hasEnded, canParticipate, isPublished, id, element, isPreview, user_id, error, immediately, DoAction, DoBonus, showLoginForm, contestDone, endDate, onMouseLeave, onMouseOver})=>{
    var history = useHistory()
    var hoverCard = (event)=>{
        document.getElementById("card").classList.toggle("backface")
    }
    var editContest = (event)=>{
        if(buttons && id !== undefined){
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
    var {t} = useTranslation()
    if(hasStarted || buttons || isPreview || userId || isPublished || error || immediately){
        return(
            <div id="card" className="is-flex previewCard">
                <div className="left-side is-flex is-flex-direction-column">
                    <div className="card-views is-flex is-flex-direction-column">
                        {userId ? [<span className="little-title">
                            {t("views")}
                        </span>, 
                        <span>
                            {views !== undefined && views !== null && typeof(parseInt(views)) === "number" ? views : 0}
                        </span>,
                        ]
                        : [<span className="little-title">
                            {t("points")}
                        </span>,
                        <span >
                            {points !== undefined && points !== null && typeof(points) === "number" ? points : ""}
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
                            {t("timeleft")}
                        </span>
                        <span 
                            onMouseLeave={onMouseLeave && {}.toString.call(onMouseLeave) === '[object Function]' ? ()=> {
                                onMouseLeave(element)
                            } : ()=> false} 
                            onMouseOver={onMouseOver && {}.toString.call(onMouseOver) === '[object Function]' ? ()=> {
                                onMouseOver(element)
                            } : ()=> false} 
                            onMouseOut={onMouseLeave && {}.toString.call(onMouseLeave) === '[object Function]' ? ()=> {
                                onMouseLeave(element)
                            } : ()=> false}
                            id="entries">
                            {!isPreview ? timeleft(endDate, timeLeft, dateType).timeLeft : timeLeft } <span className="dateType">{!isPreview ? timeleft(endDate, timeLeft, dateType).timeType : dateType}</span>
                            {endDate && typeof(endDate) === "string" && !isPreview ? 
                                <TimeLeftCountDown value={endDate} /> : null
                            }
                        </span>
                    </div>
                </div>
                <div className="right-side is-flex is-flex-direction-column">
                    <div className="card-infos is-flex is-flex-direction-column">
                        <div className="card-title is-flex is-justify-content-space-between">
                            <div>
                                <h3>{title ? title : ""}</h3>
                            </div>
                            <div className="is-flex is-flex-direction-row headButtons">
                                {buttons ? 
                                    [<div onClick={(event)=> editContest(event)}>
                                        <img alt="" src={require("../../../assets/icons/edit.png").default} width={"20px"} /> 
                                    </div>,
                                    <div>
                                        <img alt="" src={require("../../../assets/icons/ending.png").default} width={"20px"} /> 
                                    </div>]
                                : null }
                                <div>
                                    <img alt="" onClick={()=> hoverCard()} src={require("../../../assets/icons/trophy2.png").default} width={"20px"} />
                                </div>
                            </div>
                        </div>
                        <div className="card-description">
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
                </div>
                <div className="is-flex is-flex-column is-align-items-center back previewPrizes">
                    <div onClick={()=> hoverCard()} className="prizesTitle is-flex is-flex-direction-row is-justify-content-space-between">
                        <div>{t("prizes")}</div>
                        <div>
                            <img alt="" src={require("../../../assets/icons/back.png").default} width={"20px"} />
                        </div>
                    </div>
                    <div id="previewPrizes" className="is-flex is-flex-direction-column">
                        <PreviewPrizesList prizes={prizes}  />
                    </div>
                </div>
            </div>
        )
    }else{
        return <Redirect to="/dashboard"/>
    }
}