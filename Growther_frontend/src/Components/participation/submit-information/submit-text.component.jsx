import React, { useState } from "react"
import TextAreaInput from "../../text-area-input/text-area-input.component"
export const SubmitTextAction = ({text, valid_answer_check})=>{
    var [message, setMessage] = useState("")
    var changeHandler = (event)=>{
        var value = event.target.value
        if(value.length < 100){
            setMessage("The answer should be more than 100 character")
        }else{
            setMessage("")
        }
        valid_answer_check(value)
    }
    return(
        <div id="actionQuestion">
            <TextAreaInput 
                placeholder="Answer Question Here"
                label={text}
                isError={message.length === 0 ? true : false}
                message={message}
                handleChange={event => changeHandler(event)}
                hideIcon={true}
            />
        </div>
    )
}