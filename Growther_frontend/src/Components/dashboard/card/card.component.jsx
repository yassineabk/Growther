import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { TimeLeftCountDown } from "../../contest/time-left-component/time-left.component"
export const CardComponent = ({element, title, description, views, entries, id, userId, status, Duplicate, Delete, timeLeft, isBrand, endDate, onMouseLeave, onMouseOver, detailsText = "", duplicateText = "", continueText = "", deleteText = "", entriesText = "", viewsText = "", pointsText = "", timeText = "", direction})=>{
    var history = useHistory()
    var openContest = ()=>{
        if(typeof(element.user === "object")){
            if(userId.toString() === element.user.id.toString() && (typeof(id) === "number" || typeof(id) === "string")){
                history.push(`/contest/${title}/${id}`, element)
            }
        }
    }
    var Continue = ()=>{
        history.push("/dashboard/My%20Contests/new/firstStep", element)
    }
    /*if(typeof(element.user === "object")){
        if(userId.toString() !== element.user.id.toString()){
            return null
        }
    }*/
    var {t} = useTranslation()
    return(
        <div dir={direction ? direction : "rtl"} className="is-flex card column">
            <div dir={direction ? direction : "rtl"} className="left-side is-flex is-flex-direction-column">
                <div className="card-views is-flex is-flex-direction-column">
                    <span className="little-title">
                        {viewsText}
                    </span>
                    <span>
                        {views && typeof(views) === "number" ? views : "0"}
                    </span>
                </div>
                <div className="card-entries is-flex is-flex-direction-column">
                    <span className="little-title">
                        {entriesText}
                    </span>
                    <span id="entries">
                        {entries && entries !== null && typeof(entries) === "object" && entries.value !== null && typeof(entries.value) === "string" ? entries.value : "0"} 
                        <span className="dateType">{entries && entries !== null && typeof(entries) === "object" && entries.key !== null && typeof(entries.key) === "string" ? ` ${entries.key}` : ""}</span>
                        {entries && entries !== null && typeof(entries) === "object" && entries.realValue !== null && typeof(entries.realValue) === "number" && entries.realValue >= 10**3 ? <div className="tooltip is-flex"><span className="tooltip-text">{entries.realValue}</span></div> : null}
                    </span>
                </div>
                <div className="card-date is-flex is-flex-direction-column">
                    <span className="little-title">
                        {timeText}
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
                        {(timeLeft && typeof(timeLeft) === "object") && (typeof(timeLeft.date) === "string" ||  typeof(timeLeft.date) === "number") ? (timeLeft.date === "Ended" ? t("Ended") : timeLeft.date) : ""} 
                        <span className="dateType">{timeLeft && typeof(timeLeft) === "object" && typeof(timeLeft.type) === "string" ? ` ${t(timeLeft.type)}` : ""}</span>
                        {endDate && typeof(endDate) === "string" ? 
                            <TimeLeftCountDown value={endDate} /> : null
                        }
                    </span>
                </div>
            </div>
            <div className="right-side is-flex is-flex-direction-column">
                <div className="card-infos is-flex is-flex-direction-column">
                    <div dir={direction ? direction : "ltr"} className="card-title">
                        <h3>{title && typeof(title) === "string" ? title : "Contest Title"}</h3>
                    </div>
                    <div dir={direction ? direction : "ltr"} className="card-description">
                        <p>{description && typeof(description) === "string" ? description.slice(0, 250) : ""}</p>
                    </div>
                </div>
                {status !== "DRAFT" ? 
                    <div className={`card-buttons is-flex ${isBrand === "true" ? "is-flex-direction-row" : "is-flex-direction-row-reverse"}`}>
                        {isBrand === "true" ? 
                            [
                                <div dir={direction ? direction : "ltr"} className={`details-button ${isBrand !== "true" ? "is-justify-self-flex-end" : ""} ${direction}`} onClick={()=> openContest()}>{detailsText}</div>,
                                <div  dir={direction ? direction : "ltr"} className="duplicate-button" onClick={Duplicate && {}.toString.call(Duplicate) === '[object Function]' ? ()=> Duplicate(id) : () => false}>{duplicateText}</div>
                            ] :  [
                                <div  dir={direction ? direction : "ltr"} className="duplicate-button" onClick={()=> openContest()}>{detailsText}</div>
                            ]}
                    </div> : 
                    <div className="card-buttons is-flex is-flex-direction-row">
                        <div dir={direction ? direction : "ltr"} className="details-button" onClick={Delete && {}.toString.call(Delete) === '[object Function]' ? ()=> Delete(id) : () => false}>{deleteText}</div>
                        <div dir={direction ? direction : "ltr"} className="duplicate-button" onClick={()=> Continue()}>{continueText}</div>
                    </div>
                }
            </div>
        </div>
    )
}