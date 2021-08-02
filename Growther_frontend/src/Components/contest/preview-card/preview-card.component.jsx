import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { PreviewActionsList } from "../preview-actions-list/preview-actions-list.component"
import { PreviewPrizesList } from "../preview-prizes-list/preview-prizes-list.component"
export const PreviewCard = ({title, description, timeLeft, dateType, views, points, entries, actions, previewActions, changeHandler, prizes, buttons, hasStarted, hasEnded, id, element, isPreview, user_id})=>{
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
        if(!buttons && !isPreview){
            var token = decode(localStorage.getItem("accessToken"))
            if(typeof(token) === "object"){
                var sub = token.sub
                if(sub.toString() === user_id){
                    setId(true)
                }else{
                    setId(false)
                }
                
            }
        }
    })
    console.log(hasStarted, "||", buttons, "||", isPreview, "||", userId)
    if(hasStarted || buttons || isPreview || userId){
        return(
            <div id="card" className="is-flex previewCard">
                <div className="left-side is-flex is-flex-direction-column">
                    <div className="card-views is-flex is-flex-direction-column">
                        {userId ? [<span className="little-title">
                            Total views
                        </span>, 
                        <span>
                            {views ? views : "0"}
                        </span>]
                        : [<span className="little-title">
                            Your Points
                        </span>,
                        <span >
                            {points ? points : "0"}
                        </span> ]}
                    </div>
                    <div className="card-entries is-flex is-flex-direction-column">
                        <span className="little-title">
                            Total entries
                        </span>
                        <span>
                            {entries ? entries : "0"}
                        </span>
                    </div>
                    <div className="card-date is-flex is-flex-direction-column">
                        <span className="little-title">
                            Time left
                        </span>
                        <span>
                            {timeLeft ? timeLeft : ""} <span className="dateType">{dateType ? dateType : ""}</span>
                        </span>
                    </div>
                </div>
                <div className="right-side is-flex is-flex-direction-column">
                    <div className="card-infos is-flex is-flex-direction-column">
                        <div className="card-title is-flex is-justify-content-space-between">
                            <div>{title ? title : ""}</div>
                            <div className="is-flex is-flex-direction-row headButtons">
                                {buttons ? 
                                    [<div onClick={(event)=> editContest(event)}>
                                        <img src={require("../../../assets/icons/edit.png").default} width={"20px"} /> 
                                    </div>,
                                    <div>
                                        <img src={require("../../../assets/icons/ending.png").default} width={"20px"} /> 
                                    </div>]
                                : null }
                                <div>
                                    <img onClick={()=> hoverCard()} src={require("../../../assets/icons/trophy2.png").default} width={"20px"} />
                                </div>
                            </div>
                        </div>
                        <div className="card-description">
                            {description ? description : ""}
                        </div>
                    </div>
                    <PreviewActionsList previewActions={previewActions} actions={actions} changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event, provider) => changeHandler(event, provider) : ()=> false}/>
                </div>
                <div className="is-flex is-flex-row is-align-items-center back previewPrizes">
                    <div onClick={()=> hoverCard()} className="backButton">
                        <img src={require("../../../assets/icons/back.png").default} width={"20px"} />
                    </div>
                    <PreviewPrizesList prizes={prizes}  />
                </div>
            </div>
        )
    }else{
        return <Redirect to="/dashboard"/>
    }
}