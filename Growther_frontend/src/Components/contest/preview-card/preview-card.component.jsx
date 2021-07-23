import React from "react"
import { PreviewActionsList } from "../preview-actions-list/preview-actions-list.component"
export const PreviewCard = ({title, description, date, dateType, views, entries, actions})=>{
    return(
        <div className="is-flex previewCard">
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
                        {date ? date : "xx"} <span className="dateType">{dateType ? dateType : " days"}</span>
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
                <PreviewActionsList actions={actions} />
            </div>
        </div>
    )
}