import React from "react"
import { useHistory } from "react-router-dom"
export const CardComponent = ({element, title, description, date, dateType, views, entries, id, userId, status, Duplicate, Delete})=>{
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
                    <span>
                        {entries && typeof(entries) === "number" ? entries : "0"}
                    </span>
                </div>
                <div className="card-date is-flex is-flex-direction-column">
                    <span className="little-title">
                        Time left
                    </span>
                    <span>
                        {(date && typeof(date) === "string") ||  typeof(date) === "number" ? date : ""} <span className="dateType">{dateType && typeof(dateType) === "string" ? dateType : ""}</span>
                    </span>
                </div>
            </div>
            <div className="right-side is-flex is-flex-direction-column">
                <div className="card-infos is-flex is-flex-direction-column">
                    <div className="card-title">
                        {title && typeof(title) === "string" ? title : "Contest Title"}
                    </div>
                    <div className="card-description">
                        {description && typeof(description) === "string" ? description.slice(0, 250) : ""}
                    </div>
                </div>
                {status !== "DRAFT" ? 
                    <div className="card-buttons is-flex is-flex-direction-row">
                        <div className="details-button" onClick={()=> openContest()}>Details</div>
                        <div className="duplicate-button" onClick={Duplicate && {}.toString.call(Duplicate) === '[object Function]' ? ()=> Duplicate(id) : () => false}>Duplicate</div>
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