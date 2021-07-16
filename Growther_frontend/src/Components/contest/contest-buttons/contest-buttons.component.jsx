import React from "react"
import { useHistory, useLocation } from "react-router-dom"
export const ContestButton = ({text, color, url})=> {
    var history = useHistory()
    var location = useLocation()
    var GoTo = ()=>{
        console.log(url)
        if(url) history.push(url)
    }
    return(
        <div style={{backgroundColor: color}} className={"buttonContainer is-flex is-justify-content-center is-align-items-center"}>
            <div className={"Button"} style={{color: "white"}} onClick={()=>GoTo()}>{text}</div>
        </div>
    )
}