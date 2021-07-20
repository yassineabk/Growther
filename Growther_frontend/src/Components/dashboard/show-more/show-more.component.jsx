import React from "react"
import { Link } from "react-router-dom"
export const ShowMoreButton = ({showMore})=>{
    if(!showMore) return null
    return(
        <div className="arrow-button-container is-flex is-justify-content-flex-end">
            <div className="arrow-button">
                <Link to={showMore} >
                    <img src={require("../../../assets/icons/right-arrow.png").default}/>
                </Link>
            </div>
        </div>
    )
}