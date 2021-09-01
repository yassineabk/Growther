import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { HideErrorModal } from "../../redux/errors/errors-actions"
import { useTranslation } from "react-i18next";

const ErrorsModal = ()=>{
    const { t } = useTranslation();

    var errors = useSelector(state => state.errors)
    var dispatch = useDispatch()
    var history = useHistory()
    useEffect(()=>{
        document.addEventListener("click", event=>{
            var container = document.getElementById("errorContainer")
            if(container && container !== null && typeof(container) === "object"){
                if(!container.contains(event.target)){
                    HideErrorModal(dispatch)
                }
            }
        })
    })
    if(!errors.isError) return null
    return(
        <div id={"errorModal"} className="Modal">
            <div id={"errorContainer"} className="is-flex is-flex-direction-column">
                <div className="errorHead is-flex is-flex-direction-row">
                    <div>{t("error")}</div>
                    <div>
                        <img alt="" onClick={()=> HideErrorModal(dispatch)} src={require("../../assets/icons/close.png").default} />
                    </div>
                </div>
                <div className="errorBody is-flex">
                    <p>{errors.errorMessage}</p>
                </div>
                <div onClick={()=> history.goBack()} className="errorBackButton is-flex">
                    <span>{t("go_back")}</span>
                </div>
                <div onClick={()=> HideErrorModal(dispatch)} className="errorCancelButton is-flex">
                    <span>{t("cancel")}</span>
                </div>
            </div>
        </div>
    )
}
export default ErrorsModal;