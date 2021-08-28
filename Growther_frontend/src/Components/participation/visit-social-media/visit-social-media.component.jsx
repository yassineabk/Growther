import React from "react"
export const VisitSocialMedia = ({link = "", action_done})=>{
    var VisitLink = (event, bool)=>{
        var regex = new RegExp("^(https:\/\/|http:\/\/)")
        var result = regex.exec(link)
        if(result){
            window.open(link)
        }else{
            window.open(`https://${link}`)
        }
        if(bool){
            action_done(event, true)
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