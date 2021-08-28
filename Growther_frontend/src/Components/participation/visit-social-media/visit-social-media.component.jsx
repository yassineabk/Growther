import React from "react"
import { useDispatch } from "react-redux"
import { ALERT_TYPES } from "../../../redux/alert/alert-types"
export const VisitSocialMedia = ({link = "", action_done})=>{
    var dispatch = useDispatch()
    var VisitLink = (event, bool)=>{
        OpenLink(link, dispatch)
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
export const OpenLink = (link = "", dispatch) =>{
    try{
        var regex = new RegExp("^(https:\/\/|http:\/\/)")
        var result = regex.exec(link)
        if(result){
            window.open(link)
        }else{
            window.open(`https://${link}`)
        }
    }catch(err){
        dispatch({type: ALERT_TYPES.FAIL_ALERT, message: "Cannot open link"})
    }
}