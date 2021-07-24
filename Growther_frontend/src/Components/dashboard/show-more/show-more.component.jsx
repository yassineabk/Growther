import React from "react"
import { Link } from "react-router-dom"
export const ShowMoreButton = ({showMore, icon, id})=>{
    if(!showMore) return null
    return(
        <div id={id ? id : ""} className="arrow-button-container is-flex is-justify-content-flex-end">
            <div className="arrow-button">
                <Link to={showMore} >
                    <img src={icon ? icon : ""}/>
                </Link>
            </div>
        </div>
    )
}