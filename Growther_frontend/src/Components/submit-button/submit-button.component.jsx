import React from 'react'
import { Redirect, useHistory } from "react-router-dom";

const SubmitButton=({handleChange,label,type,placeholder,onClick, className, id})=>{
    var history = useHistory()
    /* var redirect = ()=>{
        history.push("/dashboard")
    } */
    return(
        <div className="field">
            <p className="control"/>
            <button onClick={onClick} id={`${id ? id : ""}`} type={type} className={`${className ? className : ""} button is-success is-fullwidth`}>{label}</button>
        </div>
    )
}
export default SubmitButton;