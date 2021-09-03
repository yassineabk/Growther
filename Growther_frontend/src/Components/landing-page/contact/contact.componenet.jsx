import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FailAlert } from '../../../redux/alert/alert-actions';
import { SendEmail } from '../../../services/send-email';
import { useTranslation } from "react-i18next";

const Contact = ()=> {
    const { t } = useTranslation();

    var checkEmail = (mail)=>{
        if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(mail)){
            return true
        }
        return false
    
    }
    var dispatch = useDispatch()
    var [userInfos, setInfos] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    var [error, setError] = useState({
        name: {isValid: false, message: ""},
        email: {isValid: false, message: ""},
        subject: {isValid: false, message: ""},
        message: {isValid: false, message: ""}
    })
    var changeHandler = (event)=>{
        var key = event.target.id
        var value = event.target.value
        setInfos({
            ...userInfos,
            [key]: value
        })
        if(value.length === 0){
            return setError({
                ...error,
                [key]: {isValid: false, message: "This field is invalid"}
            })
        }
        if(key === "name" && value.length < 3){
            return setError({
                ...error,
                [key]: {isValid: false, message: "Name should contain more than 3 characters"}
            })
        }
        if(key === "email" && !checkEmail(value)){
            return setError({
                ...error,
                [key]: {isValid: false, message: "Enter a valid email"}
            })
        }
        if(key === "message" && value.length < 50){
            return setError({
                ...error,
                [key]: {isValid: false, message: "Message should contain more than 50 charachter"}
            })
        }
        setError({
            ...error,
            [key]: {isValid: true, message: ""}
        })
    }
    var CanSend = ()=>{
        var result = []
        if(error && typeof(error) === "object"){
            Object.keys(error).map(key =>{
                if(error && typeof(error) === "object"){
                    if(error[key] && typeof(error[key]) === "object"){
                        if(!error[key].isValid){
                            result.push(false)
                        }
                    }
                }
                return true
            })
        }
        return result.length === 0
    }
    var SendMessage = ()=>{
        SendEmail(dispatch, userInfos.email, userInfos.subject, userInfos.message, userInfos.name).then(value =>{
        })
    }
    var {direction} = useSelector(state => state.userInfos)
  	return (
        <section dir={direction ? direction : "ltr"} className="section" id="contact">
            <div className="container">
                <div className="columns is-vcentered is-centered">
                    <div className="column is-8-desktop has-text-centered">
                        <h1 dir={direction ? direction : "ltr"} className="section-title has-text-centered">{t("get_in_touch")}</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p dir={direction ? direction : "ltr"} className="section-subtitle pt-4 text-muted text-center font-secondary padding-t-30">{t("contact_paragraph")}</p>
                    </div>
                </div>
                <div className="columns center-contact">
                    <div className="column is-8-desktop">
                        <div className="form mt-4 mt-1-mobile pt-4">
                            <div id="message"></div>
                            <form onSubmit={(event) => event.preventDefault()} name="contact-form" id="contact-form">
                                <div className="columns">
                                    <div className="column is-6-desktop">
                                        <div className="form-group mt-2 pr-2">
                                            <input onChange={(event)=> changeHandler(event)} name="name" id="name" type="text" className="form-control" placeholder={t("your_name_placeholder")} />
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop">
                                        <div className="form-group mt-2">
                                            <input onChange={(event)=> changeHandler(event)} name="email" id="email" type="email" className="form-control" placeholder={t("email_placeholder")} />
                                        </div>
                                    </div>                                
                                </div>
                                <div className="columns">
                                    <div className="column is-12-desktop">
                                        <div className="form-group mt-2">
                                            <input onChange={(event)=> changeHandler(event)} type="text" className="form-control" id="subject" placeholder={t("subject_placeholder")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-12-desktop ">
                                        <div className="form-group mt-2">
                                            <textarea onChange={(event)=> changeHandler(event)} name="comments" id="comments" rows="4" className="form-control" placeholder={t("message_placeholder")}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-12-desktop has-text-centered">
                                        <input onClick={CanSend() ? ()=> SendMessage() : ()=> FailAlert(dispatch, "Can't Send Email")} type="submit" id="submit" name="send" className="btn btn-primary" value={t("send_message")} />
                                        <div id="simple-msg"></div>
                                    </div>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </div>
        </section> 
  	);
}
export default Contact;