import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ContestButton } from "../../Components/contest/contest-buttons/contest-buttons.component"
import { ContestDescription } from "../../Components/contest/contest-description-input/contest-description-input.component"
import { ContestInput } from "../../Components/contest/contest-input/contest-input.component"
import { Spinner } from "../../Components/spinner/spinner.component"
const SupportPage = ()=>{
    var checkEmail = (mail)=>{
        if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(mail)){
            return true
        }
        return false
    
    }
    var { name, email } = useSelector(state => state.userInfos)
    var [userInfos, setInfos] = useState({
        name: name && name !== null && typeof(name) === "string" !== null ? name : "",
        email: email && email !== null && typeof(email) === "string" && checkEmail(email) ? email : ""
    })
    var [error, setError] = useState({
        name: {isValid: true, message: ""},
        email: {isValid: true, message: ""},
        subject: {isValid: true, message: ""},
        message: {isValid: true, message: ""}
    })
    var [save, canSend] = useState(false)
    var [isLoading, setLoading] = useState(false)
    var changeHandler = (event)=>{
        canSend(false)
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
            })
        }
        return result.length === 0
    }
    var SendMessage = ()=>{
        console.log("sent")
    }
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <div className="is-flex bottomContainer">
                <div className="is-flex is-flex-direction-column generalInfosForm is-justify-content-center is-align-items-center">
                    <div className="generalInfos">
                        <img src={require("../../../src/assets/icons/support.png").default} />
                    </div>
                </div>
                <div className="is-flex is-flex-direction-column newContestFrom">
                    <div className="mainInfos is-flex">
                        <div className="textInputs is-flex is-flex-direction-column">
                            <Spinner show={isLoading} />
                            <ContestInput 
                                type="text"
                                label="Name"
                                placeholder="Your name"
                                value={userInfos.name}
                                changeHandler={(event)=> changeHandler(event)}
                                validData={error.name}
                                id="name"
                            />
                            <ContestInput 
                                type="email"
                                label="Email"
                                placeholder="Your email"
                                value={userInfos.email}
                                changeHandler={event => changeHandler(event)}
                                validData={error.email}
                                id="email"
                            />
                            <ContestInput 
                                type="text"
                                label="Subject"
                                placeholder="Your subject"
                                value={userInfos.subject}
                                changeHandler={event => changeHandler(event)}
                                validData={error.subject}
                                id="subject"
                            />
                            <ContestDescription
                                label="Message"
                                placeholder="Your message" 
                                value={userInfos.message}
                                changeHandler={event => changeHandler(event)}
                                validData={error.message}
                                id="message"
                            />
                        </div>
                    </div>
                    <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                        <ContestButton 
                            color={"#5E2691"} 
                            bgColor={"#FFFFFF"}
                            borderColor={"#5E2691"}
                            text={"Cancel"} 
                        />
                        <ContestButton 
                            color={"#FFFFFF"}
                            bgColor={"#5E2691"} 
                            borderColor={"#5E2691"}
                            text={"Send Message"} 
                            clickEvent={CanSend() ? ()=> SendMessage() : ()=> false }
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default SupportPage;