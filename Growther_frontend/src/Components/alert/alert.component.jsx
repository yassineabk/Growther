import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { HideAlert } from "../../redux/alert/alert-actions"
export const AlertComponent = ({alerts})=>{
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    var dispatch = useDispatch()
    if(!alerts || alerts === null || !Array.isArray(alerts) || (Array.isArray(alerts) && alerts.length === 0)) return null
    return(
        <div id="alerts-container" className="is-flex is-flex-direction-column">
            {alerts.map((item, index) =>{
                if(item && item !== null && typeof(item) === "object"){
                    if(item.message && item.show){
                        if(item.isSuccess){
                            return(
                                <div dir={direction ? direction : "ltr"} key={`alert-${index}}`} id="alert-success" className="alert is-flex">
                                    <span onClick={()=> HideAlert(dispatch, item.timeout)} dir={direction ? direction : "ltr"} className={"closeAlert"}>
                                        <img src={require("../../assets/icons/close2.png").default}/>
                                    </span>
                                    <span>{t(item.message)}</span>
                                </div>
                            )
                        }
                        if(item.isFail){
                            return(
                                <div dir={direction ? direction : "ltr"} key={`alert-${index}}`} id="alert-fail" className="alert is-flex">
                                    <span onClick={()=> HideAlert(dispatch, item.timeout)} dir={direction ? direction : "ltr"} className={"closeAlert"}>
                                        <img src={require("../../assets/icons/close2.png").default}/>
                                    </span>
                                    <span>{t(item.message)}</span>
                                </div>
                            )
                        }
                    }
                }
                return null
            })}
        </div>

    )
}