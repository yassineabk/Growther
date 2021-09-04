import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ALERT_TYPES } from "../../../redux/alert/alert-types"
import { useTranslation } from "react-i18next";

export const VisitSocialMedia = ({link = "", action_done})=>{
    const { t } = useTranslation();
    var {direction} = useSelector(state => state.userInfos)
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
        <div dir={direction ? direction : "ltr"} className="is-flex is-flex-direction-column action-links">
            <div>
                {t("click_link-bellow")}
            </div>
            <div className="link-container">
                <div onClick={(event)=> VisitLink(event, false)}>{t("link_visit")}</div>
            </div>
        </div>
    )
}
export const OpenLink = async (link = "", dispatch) =>{
    try{
        var regex = new RegExp("^(https:\/\/|http:\/\/)")
        var result = regex.exec(link)
        if(result){
            window.open(link, "_blank")
        }else{
            window.open(`https://${link}`, "_blank")
        }
        return true
    }catch(err){
        dispatch({type: ALERT_TYPES.FAIL_ALERT, message: "cannot open link"})
        return false
    }
}