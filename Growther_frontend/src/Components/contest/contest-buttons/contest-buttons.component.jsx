import React from "react"
export const ContestButton = ({text, color, clickEvent})=> {
    return(
        <div 
            onClick={clickEvent && {}.toString.call(clickEvent) === '[object Function]' ? 
                ()=> clickEvent() : ()=> false
            } 
            style={{backgroundColor: color}} 
            className={"buttonContainer is-flex is-justify-content-center is-align-items-center"}>
            <div className={"Button"} style={{color: "white"}}>{text}</div>
        </div>
    )
}