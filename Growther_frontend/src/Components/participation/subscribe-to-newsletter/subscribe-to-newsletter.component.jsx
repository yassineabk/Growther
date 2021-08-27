import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { SetActionText } from "../../../redux/contest-card/contest-card-actions"
import UrlSubmit from "../../contest/action-modal-container/action-submit-url.component"
export const SubscribeToNewsLetter = ({valid_url_check, id, index})=>{
    var [nameMessage, setNameMessage] = useState("")
    var [emailMessage, setEmailMessage] = useState("")
    var [name, setName] = useState("")
    var [email, setEmail] = useState("")
    var dispatch = useDispatch()
    var nameHandler = (event)=>{
        var value = event.target.value
        if(value !== null && typeof(value) === "string"){
            setName(value)
            if(value.length > 3){
                setNameMessage("")
            }else{
                setNameMessage("Name should contain more than 3 characters")
            }
            if(value.length > 3 && checkEmail(email)){
                valid_url_check(true)
            }else{
                valid_url_check(false)
            }
        }
        SetActionText(dispatch, id, value, "username", index)
    }
    var emailHandler = (event)=>{
        var value = event.target.value
        if(value !== null && typeof(value) === "string"){
            setEmail(value)
            if(checkEmail(value)){
                setEmailMessage("")
            }else{
                setEmailMessage("Enter a valid Email")
            }
            if(checkEmail(value) && name.length > 3){
                valid_url_check(true)
            }else{
                valid_url_check(false)
            }
        }
        SetActionText(dispatch, id, value, "email", index)
    }
    var checkEmail = (mail)=>{
        if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(mail)){
            return true
        }
        return false

    }
    return(
        <div id={"actionQuestion"} className={"is-flex is-flex-direction-column"}>
            <UrlSubmit 
                handleChange={(event)=> nameHandler(event)}
                label={"Your Name:"}
                placeholder={"Enter you Name"}
                isError={nameMessage.length === 0 ? true : false}
                message={nameMessage}
            />
            <UrlSubmit
                handleChange={(event)=> emailHandler(event)}
                label={"Your Email:"}
                placeholder={"Enter you Email"}
                isError={emailMessage.length === 0 ? true : false}
                message={emailMessage}
            />
        </div>
    )
}