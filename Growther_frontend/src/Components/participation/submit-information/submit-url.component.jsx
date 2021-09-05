import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { SetActionText } from "../../../redux/contest-card/contest-card-actions"
import { UrlValidation } from "../../../redux/contest/contest-actions"
import UrlSubmit from "../../contest/action-modal-container/action-submit-url.component"
export const SubmitUrlAction = ({valid_url_check, provider, id, index})=>{
    var [message, setMessage] = useState("")
    var dispatch = useDispatch()
    var changeHandler = (event)=>{
        var value = event.target.value
        if(UrlValidation(value) && value.includes(provider)){
            setMessage("")
            valid_url_check(true)
        }else{
            setMessage("invalid_link")
            valid_url_check(false)
        }
        SetActionText(dispatch, id, value, "link", index)
    }
    var {t} = useTranslation()
    return(
        <div id="actionQuestion">
            <UrlSubmit
                placeholder="Submit Url"
                label={t("link")}
                isError={message.length === 0 ? true : false}
                message={t(message)}
                handleChange={event => changeHandler(event)}
                hideIcon={true}
            />
        </div>
    )
}