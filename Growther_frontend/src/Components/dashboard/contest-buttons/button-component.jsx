import React from "react"
export const ContestButton = ({text, color})=> {
    return(
        <div style={{backgroundColor: color}} className={"buttonContainer is-flex is-justify-content-center is-align-items-center"}>
            <div className={"Button"} style={{color: "white"}}>{text}</div>
        </div>
    )
}