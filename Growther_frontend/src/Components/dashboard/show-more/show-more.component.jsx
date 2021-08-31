import React from "react"
import { Link } from "react-router-dom"
export const ShowMoreButton = ({showMore, icon, id, direction})=>{
    if(!showMore) return null
    return(
        <div id={id ? id : ""} dir={direction ? direction : "ltr"} className="arrow-button-container is-flex is-justify-content-flex-end">
            <div className="arrow-button">
                <Link to={showMore} >
                    <img alt="" src={icon ? icon : ""}/>
                </Link>
            </div>
        </div>
    )
}