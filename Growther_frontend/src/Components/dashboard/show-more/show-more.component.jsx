import React from "react"
import { Link, useLocation } from "react-router-dom"
export const ShowMoreButton = ({title})=>{
    var location = useLocation()
    var locations = ["/dashboard/My Contests", "/dashboard/Templates"]
    if(locations.includes(location.pathname)) return null
    return(
        <div className="arrow-button-container is-flex is-justify-content-flex-end">
            <div className="arrow-button">
                <Link to={"/dashboard" + `${title ? "/"+title : ""}`} >
                    <img src={require("../../../assets/icons/right-arrow.png").default}/>
                </Link>
            </div>
        </div>
    )
}