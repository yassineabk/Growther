import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { ContestButton } from "../../Components/contest/contest-buttons/contest-buttons.component"
import { ContestDescription } from "../../Components/contest/contest-description-input/contest-description-input.component"
import { ContestInput } from "../../Components/contest/contest-input/contest-input.component"
import { Spinner } from "../../Components/spinner/spinner.component"
import { FailAlert } from "../../redux/alert/alert-actions"
import { SendEmail } from "../../services/send-email"
const SupportPage = ()=>{
    var checkEmail = (mail)=>{
        if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(mail)){
            return true
        }
        return false
    
    }
    var dispatch = useDispatch()
    var history = useHistory()
    var { name, email } = useSelector(state => state.userInfos)
    var [userInfos, setInfos] = useState({
        name: name && name !== null && typeof(name) === "string" ? name : "",
        email: email && email !== null && typeof(email) === "string" && checkEmail(email) ? email : ""
    })
    var [error, setError] = useState({
        subject: {isValid: false, message: ""},
        message: {isValid: false, message: ""}
    })
    var [isLoading, setLoading] = useState(false)
    var {direction} = useSelector(state => state.userInfos)
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
                [key]: {isValid: false, message: t("This field is invalid")}
            })
        }
        if(key === "message" && value.length < 50){
            return setError({
                ...error,
                [key]: {isValid: false, message: t("Message should contain more than 50 charachter")}
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
        setLoading(true)
        SendEmail(dispatch, userInfos.email, userInfos.subject, userInfos.message, name).then(value =>{
            setLoading(false)
        })
    }
    var {t} = useTranslation()
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <div className={`is-flex bottomContainer ${direction ? (direction === "rtl" ? "is-flex-direction-row-reverse" : "") : ""}`}>
                <div className="is-flex is-flex-direction-column generalInfosForm is-justify-content-center is-align-items-center">
                    <div className="generalInfos">
                        <img alt="" src={require("../../../src/assets/icons/support.png").default} />
                    </div>
                </div>
                <div className="is-flex is-flex-direction-column newContestFrom">
                    <div className="mainInfos is-flex">
                        <div className="textInputs is-flex is-flex-direction-column">
                            <Spinner show={isLoading} />
                            <ContestInput 
                                type="text"
                                label={t("name")}
                                placeholder={t("name_placeholder")}
                                value={name}
                                changeHandler={(event)=> changeHandler(event)}
                                validData={error.name}
                                id="name"
                            />
                            <ContestInput 
                                type="email"
                                label={t("email")}
                                placeholder={t("email_placeholder")}
                                value={userInfos.email}
                                changeHandler={event => changeHandler(event)}
                                validData={error.email}
                                id="email"
                            />
                            <ContestInput 
                                type="text"
                                label={t("subject")}
                                placeholder={t("subject_placeholder")}
                                value={userInfos.subject}
                                changeHandler={event => changeHandler(event)}
                                validData={error.subject}
                                id="subject"
                            />
                            <ContestDescription
                                value={userInfos.message}
                                label={t("message")}
                                placeholder={t("message_placeholder")}
                                changeHandler={event => changeHandler(event)}
                                validData={error.message}
                                id="message"
                            />
                        </div>
                    </div>
                    <div dir={direction ? direction : "ltr"} className={`contestButtons is-flex is-justify-content-flex-end ${direction === "rtl" ? "is-flex-direction-row-reverse" : "is-flex-direction-row"}`}>
                        <ContestButton 
                            color={"#FFFFFF"}
                            bgColor={"#5E2691"} 
                            borderColor={"#5E2691"}
                            text={t("send_message")} 
                            clickEvent={CanSend() ? ()=> SendMessage() : ()=> FailAlert(dispatch, "can't_send_email") }
                        />
                        <ContestButton 
                            color={"#5E2691"} 
                            bgColor={"#FFFFFF"}
                            borderColor={"#5E2691"}
                            text={t("cancel")}
                            clickEvent={()=> history.push("/dashboard")}
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default SupportPage;