import React from "react"
import { useHistory } from "react-router-dom"
export const CardComponent = ({element, title, description, views, entries, id, userId, status, Duplicate, Delete, timeLeft, isBrand})=>{
    var history = useHistory()
    var openContest = ()=>{
        if(typeof(element.user === "object")){
            if(userId.toString() === element.user.id.toString() &&(typeof(id) === "number" || typeof(id) === "string")){
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
    return(
        <div className="is-flex card column">
            <div className="left-side is-flex is-flex-direction-column">
                <div className="card-views is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total views
                    </span>
                    <span>
                        {views && typeof(views) === "number" ? views : "0"}
                    </span>
                </div>
                <div className="card-entries is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total entries
                    </span>
                    <span id="entries">
                        {entries && entries !== null && typeof(entries) === "object" && entries.value !== null && typeof(entries.value) === "string" ? entries.value : "0"} 
                        <span className="dateType">{entries && entries !== null && typeof(entries) === "object" && entries.key !== null && typeof(entries.key) === "string" ? ` ${entries.key}` : ""}</span>
                        {entries && entries !== null && typeof(entries) === "object" && entries.realValue !== null && typeof(entries.realValue) === "number" && entries.realValue >= 10**3 ? <div className="tooltip is-flex"><span className="tooltip-text">{entries.realValue}</span></div> : null}
                    </span>
                </div>
                <div className="card-date is-flex is-flex-direction-column">
                    <span className="little-title">
                        Time left
                    </span>
                    <span>
                        {(timeLeft && typeof(timeLeft) === "object" && typeof(timeLeft.date) === "string") ||  typeof(timeLeft.date) === "number" ? timeLeft.date : ""} 
                        <span className="dateType">{timeLeft && typeof(timeLeft) === "object" && typeof(timeLeft.type) === "string" ? ` ${timeLeft.type}` : ""}</span>
                    </span>
                </div>
            </div>
            <div className="right-side is-flex is-flex-direction-column">
                <div className="card-infos is-flex is-flex-direction-column">
                    <div className="card-title">
                        <h3>{title && typeof(title) === "string" ? title : "Contest Title"}</h3>
                    </div>
                    <div className="card-description">
                        <p>{description && typeof(description) === "string" ? description.slice(0, 250) : ""}</p>
                    </div>
                </div>
                {status !== "DRAFT" ? 
                    <div className={`card-buttons is-flex ${isBrand === "true" ? "is-flex-direction-row" : "is-flex-direction-row-reverse"}`}>
                        {isBrand === "true" ? 
                            [
                                <div className={`details-button ${isBrand !== "true" ? "is-justify-self-flex-end" : ""}`} onClick={()=> openContest()}>Details</div>,
                                <div className="duplicate-button" onClick={Duplicate && {}.toString.call(Duplicate) === '[object Function]' ? ()=> Duplicate(id) : () => false}>Duplicate</div>
                            ] :  [
                                <div className="duplicate-button" onClick={()=> openContest()}>Details</div>
                            ]}
                    </div> : 
                    <div className="card-buttons is-flex is-flex-direction-row">
                        <div className="details-button" onClick={Delete && {}.toString.call(Delete) === '[object Function]' ? ()=> Delete(id) : () => false}>Delete</div>
                        <div className="duplicate-button" onClick={()=> Continue()}>Continue</div>
                    </div>
                }
            </div>
        </div>
    )
}