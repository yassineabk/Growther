import React from "react"
import { useDispatch } from "react-redux"
import { ALERT_TYPES } from "../../../redux/alert/alert-types"
import { useTranslation } from "react-i18next";

export const VisitSocialMedia = ({link = "", action_done})=>{
    const { t } = useTranslation();

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
                {t("click_link-bellow")}
                
            </div>
            <div className="link-container">
                <div onClick={(event)=> VisitLink(event, false)}>{t("link_visit")}</div>
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
        dispatch({type: ALERT_TYPES.FAIL_ALERT, message: "Cannot Open Link"})
    }
}