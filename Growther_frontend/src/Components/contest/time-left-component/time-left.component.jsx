import React from "react"
export const TimeLeftCountDown = ({value})=>{    
    return(
        <div className="tooltip is-flex">
            <span className="tooltip-text">{value}</span>
        </div>
    )
}