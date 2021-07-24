import React from "react"
export const ContestButton = ({text, bgColor, color, borderColor, clickEvent})=> {
    return(
        <div 
            onClick={clickEvent && {}.toString.call(clickEvent) === '[object Function]' ? 
                ()=> clickEvent() : ()=> false
            } 
            style={{
                backgroundColor: bgColor ? bgColor : "grey",
                border: borderColor ? `${"2px solid " + borderColor}` : "1px solid black"
            }} 
            className={"buttonContainer is-flex is-justify-content-center is-align-items-center"}>
            <div className={"Button"} style={{color: color ? color : "black"}}>{text}</div>
        </div>
    )
}