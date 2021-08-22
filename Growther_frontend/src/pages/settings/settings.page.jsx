import axios from "axios"
import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ContestButton } from "../../Components/contest/contest-buttons/contest-buttons.component"
import { ContestDescription } from "../../Components/contest/contest-description-input/contest-description-input.component"
import { ContestInput } from "../../Components/contest/contest-input/contest-input.component"
import { SelectInput } from "../../Components/contest/select-input/select-input.component"
import { Spinner } from "../../Components/spinner/spinner.component"
import { UrlValidation } from "../../redux/contest/contest-actions"
import { setUserInfos } from "../../redux/user-infos/user-infos-actions"
import { SettingsModal } from "./settings-modal.component"
export const SettingsComponent = ()=>{
    const language = localStorage.getItem("lang")
    var infos = useSelector(state => state.userInfos)
    var dispatch = useDispatch()
    var [show, showModal] = useState(false)
    var [userInfos, setInfos] = useState(infos)
    var [error, setError] = useState({
        name: {isValid: true, message: ""},
        url: {isValid: true, message: ""},
        activities: {isValid: true, message: ""}
    })
    var [save, canSave] = useState(false)
    var [isLoading, setLoading] = useState(false)
    var [lang, setLang] = useState(language !== null && typeof(language) === "string" ? language : "English")
    useEffect(()=>{
        var token = localStorage.getItem("accessToken")
        var decodedToken = decode(token)
        if(decodedToken !== null && typeof(decodedToken) === "object"){
            var sub = decodedToken.sub
            var config = {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                } 
            }
            if(!infos || infos === null || typeof(infos) !== "object" || infos.id !== parseInt(sub)){
                setLoading(true)
                axios.get(`https://staging-backendapp.herokuapp.com/api/users/${sub}`, config)
                    .then(response =>{
                        setInfos(response.data)
                        setLoading(false)
                    }).catch(err => {
                        setLoading(false)
                    })
            }
            
        }
    }, [setInfos, setLoading])
    var changeHandler = (event)=>{
        canSave(false)
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
        if(key === "url" && !UrlValidation(value)){
            return setError({
                ...error,
                [key]: {isValid: false, message: "Enter a valid Url"}
            })
        }
        if(key === "activities" && value.length < 50){
            return setError({
                ...error,
                [key]: {isValid: false, message: "Description should contain more than 50 charachter"}
            })
        }
        setError({
            ...error,
            [key]: {isValid: true, message: ""}
        })
    }
    var CanSave = ()=>{
        var canSave = []
        if(userInfos && typeof(userInfos) === "object"){
            Object.keys(userInfos).map(key =>{
                if(error && typeof(error) === "object"){
                    if(error[key] && typeof(error[key]) === "object"){
                        if(!error[key].isValid){
                            canSave.push(false)
                        }
                    }
                }
            })
        }
        return canSave.length === 0
    }
    var Save = ()=>{
        var token = localStorage.getItem("accessToken")
        var config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            } 
        }
        setLoading(true)
        axios.put(`https://staging-backendapp.herokuapp.com/api/users/update/${userInfos.id}`, userInfos ,config)
            .then(response =>{
                setLoading(false)
                setUserInfos(dispatch, userInfos)
            }).catch(err => {
                setLoading(false)
            })
    }
    var setLanguage = (event)=>{
        setLang(event.target.value)
        localStorage.setItem("lang", event.target.value)
    }
    return(
        <div className="column is-full is-flex is-flex-direction-column list-container newContest is-size-6 mb-4">
            <div className="is-flex bottomContainer">
                <div className="is-flex is-flex-direction-column generalInfosForm is-justify-content-center is-align-items-center">
                    <div className="generalInfos">
                        <img src={require("../../../src/assets/icons/security.png").default} />
                    </div>
                </div>
                <div className="is-flex is-flex-direction-column newContestFrom">
                    <div className="mainInfos is-flex">
                        <div className="textInputs is-flex is-flex-direction-column">
                            <Spinner show={isLoading} />
                            <SettingsModal show={show} closeModal={()=> showModal(false)} />
                            <SelectInput 
                                data={["Arabic", "English", "French"]}
                                placeholder="Choose Language"
                                value={lang}
                                changeHandler={(event)=> setLanguage(event)}
                            />
                            <ContestInput 
                                type="text"
                                label="Username"
                                placeholder="Username"
                                value={userInfos.name}
                                id="name"
                                changeHandler={event => changeHandler(event)}
                                validData={error.name}
                            />
                            <ContestInput 
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value={userInfos.email}
                                readonly={true}
                                id="email"
                            />
                            <ContestInput 
                                type="password"
                                label="Password"
                                placeholder="Password"
                                value="***********"
                                changeHandler={event => changeHandler(event)}
                                readonly={true}
                            />
                            {userInfos.isBrand === "true" ? 
                                [
                                    <ContestInput 
                                        type="url"
                                        label="Url"
                                        placeholder="Your Url"
                                        value={userInfos.url}
                                        changeHandler={event => changeHandler(event)}
                                        id="url"
                                        validData={error.url}
                                    />,
                                    <ContestDescription 
                                        label="Activities"
                                        value={userInfos.activities}
                                        placeholder="Your Activities"
                                        changeHandler={event => changeHandler(event)}
                                        id="activities"
                                        validData={error.activities}
                                    /> 
                                ] : null
                            }
                        </div>
                    </div>
                    <div className="contestButtons is-flex is-flex-direction-row is-justify-content-flex-end">
                        {infos.authProvider.toLowerCase() === "local" ? <ContestButton 
                            color={"#5E2691"} 
                            bgColor={"#FFFFFF"}
                            borderColor={"#5E2691"}
                            text={"Edit Password"} 
                            clickEvent={()=> showModal(true)}/> : null}
                        <ContestButton 
                            color={"#FFFFFF"}
                            bgColor={"#5E2691"} 
                            borderColor={"#5E2691"}
                            text={"Save"} 
                            clickEvent={ CanSave() ? ()=> Save() : ()=> false}
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}