import axios from "axios"
import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { ContestButton } from "../../Components/contest/contest-buttons/contest-buttons.component"
import { ContestInput } from "../../Components/contest/contest-input/contest-input.component"
import { BACKEND_API } from "../../services/links"
export const SettingsModal = ({show, closeModal})=>{
    var [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confrimPassword: ""
    })
    var [error, setError] = useState({
        oldPassword: {isValid: false, message: ""},
        newPassword: {isValid: false, message: ""},
        confrimPassword: {isValid: false, message: ""}
    })
    var [updateSuccess, successMessage] = useState({
        success: false,
        message: ""
    })
    var CloseModal = ()=>{
        if(closeModal && {}.toString.call(closeModal) === '[object Function]'){
            closeModal()
        }
    }
    useEffect(()=> 
        document.addEventListener("click", event=>{
        var container = document.getElementById("settingContainer")
        if(container && container !== null && typeof(container) === "object"){
            if(!container.contains(event.target) && event.target.id === "settingModal"){
                CloseModal()
            }
        }
    }))
    var changeHandler = (event, key)=>{
        var value = event.target.value
        setPassword({
            ...password,
            [key]: value
        })
        if(value.length < 8){
            return setError({
                ...error, 
                [key]: {isValid: false, message: "Password must contain more than 8 charachters"},
            })
        }
        if(key === "confirmPassword"){
            if(value !== password.newPassword){
                return setError({
                    ...error, 
                    [key]: {isValid: false, message: "This filed should be the same as the one before"},
                })
            }
        }
        if(value.length > 7){
            return setError({
                ...error, 
                [key]: {isValid: true, message: ""},
            })
        }
    }
    var CanSave = ()=>{
        var result = []
        Object.keys(error).map(key =>{
            if(!error[key]){
                result.push(false)
            }
        })
        return result.length === 0
    }
    var UpdatePassword = ()=>{
        var token = localStorage.getItem("accessToken")
        var config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            } 
        }
        axios.put(`${BACKEND_API}/api/users/update/password`, password, config)
            .then(response =>{
                successMessage({success: true, message: "Successfully Updated"})
            }).catch(err =>{
                successMessage({success: false, message: "Cannot update your password please check data you entred"})
            })
    }
    if(!show) return null
    return(
        <div className="Modal" id="settingModal">
            <div id="settingContainer" className="is-flex is-flex-direction-column">
                <div className="is-flex is-flex-direction-column">
                    <ContestInput 
                        type="password"
                        label="Edit Password"
                        placeholder="Old Password"
                        changeHandler={event => changeHandler(event, "oldPassword")}
                        validData={error.oldPassword}
                    />
                    <ContestInput 
                        type="password"
                        placeholder="New Password"
                        changeHandler={event => changeHandler(event, "newPassword")}
                        validData={error.newPassword}
                    />
                    <ContestInput 
                        type="password"
                        placeholder="Confirm New Password"
                        changeHandler={event => changeHandler(event, "confirmPassword")}
                        validData={error.confirmPassword}
                    />
                    <div className={`password-update-message ${updateSuccess.success ? "has-text-success" : "has-text-danger"}`}>
                        {updateSuccess.message}
                    </div>
                </div>
                <div className="contestButtons is-flex is-flex-direction-column is-justify-content-flex-end">
                    <ContestButton
                        color={"#5E2691"} 
                        bgColor={"#FFFFFF"}
                        borderColor={"#5E2691"}
                        text={"Cancel"} 
                        clickEvent={()=> CloseModal()}/>
                    <ContestButton 
                        color={"#FFFFFF"}
                        bgColor={"#5E2691"} 
                        borderColor={"#5E2691"}
                        text={"Save"} 
                        clickEvent={CanSave() ? ()=>  UpdatePassword() : ()=> false }
                    />
                </div>
            </div>
        </div>
    )
}