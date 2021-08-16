import React, { useState } from "react"
import { Link } from "react-router-dom"
export const VisitSocialMedia = ({link, action_done})=>{
    var [count, setCount] = useState(false)
    var VisitLink = (event, bool)=>{
        window.open(link)
        if(bool){
            action_done(event)
        }else{
            VisitLink(event, true)
        }
    }
    return(
        <div className="is-flex is-flex-direction-column action-links">
            <div>
                To complete this action, click on the link below:
            </div>
            <div className="link-container">
                <div onClick={(event)=> VisitLink(event, false)}>Link to visit</div>
            </div>
        </div>
    )
}