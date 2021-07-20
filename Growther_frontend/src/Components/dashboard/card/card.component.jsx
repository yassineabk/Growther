import React from "react"
export const CardComponent = ({title, description, date, views, entries})=>{
    return(
        <div className="is-flex is-flex-direction-row card column">
            <div className="left-side is-flex is-flex-direction-column">
                <div className="card-views is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total views
                    </span>
                    <span>
                        {views ? views : "xxxx"}
                    </span>
                </div>
                <div className="card-entries is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total entries
                    </span>
                    <span>
                        {entries ? entries : "xxxx"}
                    </span>
                </div>
                <div className="card-date is-flex is-flex-direction-column">
                    <span className="little-title">
                        Time left
                    </span>
                    <span>
                        {date ? date : "xx days"}
                    </span>
                </div>
            </div>
            <div className="right-side is-flex is-flex-direction-column">
                <div className="card-infos is-flex is-flex-direction-column">
                    <div className="card-title">
                        {title ? title : "Nothing"}
                    </div>
                    <div className="card-description">
                        {description ? description : ""}
                    </div>
                </div>
                <div className="card-buttons is-flex is-flex-direction-row">
                    <div className="details-button">Details</div>
                    <div className="duplicate-button">Duplicate</div>
                </div>
            </div>
        </div>
    )
}