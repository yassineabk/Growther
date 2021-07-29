import React from 'react'
import { Redirect, useHistory } from "react-router-dom";

const SubmitButton=({handleChange,label,type,placeholder,isError,message,onClick, className, id})=>{
    var history = useHistory()
    /* var redirect = ()=>{
        history.push("/dashboard")
    } */
    return(
        <div className="field">
            <p className="control"/>
            <button onClick={onClick} id={`${id ? id : ""}`} type={type} className={`${className ? className : ""} button is-success is-fullwidth`}>{label}</button>
            <p className={`${message ? 'help is-danger' :'help is-sucess'}`}>{message}</p>

        </div>
        
    )
}
export default SubmitButton;