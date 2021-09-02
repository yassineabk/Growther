import React from "react"
import { useSelector } from "react-redux"
export const TimeLeftCountDown = ({value})=>{    
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
            <span className="tooltip-text">{value}</span>
        </div>
    )
}