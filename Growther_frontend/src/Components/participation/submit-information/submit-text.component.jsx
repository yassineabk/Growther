import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { SetActionText } from "../../../redux/contest-card/contest-card-actions"
import TextAreaInput from "../../text-area-input/text-area-input.component"
export const SubmitTextAction = ({text, valid_answer_check, id, index})=>{
    var [message, setMessage] = useState("")
    var dispatch = useDispatch()
    var changeHandler = (event)=>{
        var value = event.target.value
        if((typeof(value) === "string" && value.trim().length < 10) || typeof(value) !== "string"){
            setMessage("The answer should be more than 10 character")
        }else{
            setMessage("")
        }
        valid_answer_check(value)
        SetActionText(dispatch, id, value, "text", index)
    }
    var {t} = useTranslation()
    return(
        <div id="actionQuestion">
            <TextAreaInput 
                placeholder={t("Answer Question Here")}
                label={t(text)}
                isError={message.length === 0 ? true : false}
                message={t(message)}
                handleChange={event => changeHandler(event)}
                hideIcon={true}
            />
        </div>
    )
}