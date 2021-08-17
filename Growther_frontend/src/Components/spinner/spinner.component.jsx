import React from "react"
export const Spinner = ({show})=>{
    if(!show) return null
    return(
        <div id="splash" className="splash d-flex flex-column">
            {/*<div id="preloader"></div>
            <div id="loader"></div>*/}
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}