import axios from "axios"
import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ContestButton } from "../../Components/contest/contest-buttons/contest-buttons.component"
import { ContestDescription } from "../../Components/contest/contest-description-input/contest-description-input.component"
import { ContestInput } from "../../Components/contest/contest-input/contest-input.component"
import { SelectInput } from "../../Components/contest/select-input/select-input.component"
import { Spinner } from "../../Components/spinner/spinner.component"
import { FailAlert, SuccessAlert } from "../../redux/alert/alert-actions"
import { UrlValidation } from "../../redux/contest/contest-actions"
import { EditUserInfos, setUserInfos } from "../../redux/user-infos/user-infos-actions"
import { BACKEND_API } from "../../services/links"
import { SettingsModal } from "./settings-modal.component"
const SettingsComponent = ()=>{
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
                axios.get(`${BACKEND_API}/api/users/${sub}`, config)
                    .then(response =>{
                        setInfos(response.data)
                        setLoading(false)
                        SuccessAlert(dispatch, "Get Infos Successfully")
                    }).catch(err => {
                        setLoading(false)
                        FailAlert(dispatch, "Get Infos Failure")
                    })
            }
            
        }
    }, [dispatch])
    var changeHandler = (event)=>{
        var key = event.target.id
        var value = event.target.value
        setInfos({
            ...userInfos,
            [key]: value
        })
        EditUserInfos(dispatch, key, value)
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
                return true
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
        axios.put(`${BACKEND_API}/api/users/update/${userInfos.id}`, userInfos ,config)
            .then(response =>{
                setLoading(false)
                return true
            }).catch(err => {
                setLoading(false)
                return false
            }).then(value =>{
                if(value){
                    SuccessAlert(dispatch, "Succesfully Updated")
                }else{
                    FailAlert(dispatch, "Update Failure")
                }
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
                        <img alt="" src={require("../../../src/assets/icons/security.png").default} />
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
                                value={infos.name}
                                id="name"
                                changeHandler={event => changeHandler(event)}
                                validData={error.name}
                            />
                            <ContestInput 
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value={infos.email}
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
                            {infos.isBrand === "true" ? 
                                [
                                    <ContestInput 
                                        type="url"
                                        label="Url"
                                        placeholder="Your Url"
                                        value={infos.url}
                                        changeHandler={event => changeHandler(event)}
                                        id="url"
                                        validData={error.url}
                                    />,
                                    <ContestDescription 
                                        label="Activities"
                                        value={infos.activities}
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
                            clickEvent={ CanSave() ? ()=> Save() : ()=> FailAlert(dispatch, "Update Failure")}
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default SettingsComponent;