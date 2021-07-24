import React from "react"
import { Link } from "react-router-dom"
import { ShowMoreButton } from "../show-more/show-more.component"
export const CardTitle = ({title, addNew, showMore})=>{
    return(
        <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
            <span className="list-title">{title ? title : "No Title"}</span>
            <div className="is-flex is-flex-direction-row is-align-items-center">
                {addNew ? <div className="addNew">
                    <Link to={addNew}>+ Add New</Link>
                </div> : null}
                <ShowMoreButton id="addNewButton" showMore={addNew} icon={require("../../../assets/icons/plus.png").default} />
                <ShowMoreButton showMore={showMore} icon={require("../../../assets/icons/right-arrow.png").default} />
            </div>
        </div>
    )
}