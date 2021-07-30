import React from "react"
import { useHistory } from "react-router-dom"
export const CardComponent = ({element, title, description, date, dateType, views, entries, id})=>{
    var history = useHistory()
    var openContest = ()=>{
        if(typeof(id) === "number" || typeof(id) === "string"){
            history.push(`/contest/${id}`, element)
        }
    }
    return(
        <div className="is-flex card column">
            <div className="left-side is-flex is-flex-direction-column">
                <div className="card-views is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total views
                    </span>
                    <span>
                        {views && typeof(views) === "number" ? views : "xxxx"}
                    </span>
                </div>
                <div className="card-entries is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total entries
                    </span>
                    <span>
                        {entries && typeof(entries) === "number" ? entries : "xxxx"}
                    </span>
                </div>
                <div className="card-date is-flex is-flex-direction-column">
                    <span className="little-title">
                        Time left
                    </span>
                    <span>
                        {(date && typeof(date) === "string") ||  typeof(date) === "number" ? date : "xx"} <span className="dateType">{dateType && typeof(dateType) === "string"? dateType : "days"}</span>
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
                <div className="card-buttons is-flex is-flex-direction-row">
                    <div className="details-button" onClick={()=> openContest()}>Details</div>
                    <div className="duplicate-button">Duplicate</div>
                </div>
            </div>
        </div>
    )
}