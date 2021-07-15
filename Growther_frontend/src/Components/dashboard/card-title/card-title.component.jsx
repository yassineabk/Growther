import React from "react"
import { Link } from "react-router-dom"
export const CardTitle = ({title})=>{
    return(
        <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
            <span className="list-title">{title ? title : "No Title"}</span>
            <span className="addNew">
                <Link to={"/dashboard" + `${title ? "/"+title : ""}` + "/new"}>+ Add New</Link>
            </span>
        </div>
    )
}