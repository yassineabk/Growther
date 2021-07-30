import React from "react"
export const Spinner = ({show})=>{
    if(!show) return null
    return(
        <div id="splash" className="splash d-flex flex-column w-100 h-100">
            <div id="preloader"></div>
            <div id="loader"></div>
        </div>
    )
}