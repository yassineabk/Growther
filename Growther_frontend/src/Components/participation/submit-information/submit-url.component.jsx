import React, { useState } from "react"
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
            setMessage("Enter a valid url")
            valid_url_check(false)
        }
        SetActionText(dispatch, id, value, "link", index)
    }
    return(
        <div id="actionQuestion">
            <UrlSubmit
                placeholder="Submit Url"
                label={"Link"}
                isError={message.length === 0 ? true : false}
                message={message}
                handleChange={event => changeHandler(event)}
                hideIcon={true}
            />
        </div>
    )
}