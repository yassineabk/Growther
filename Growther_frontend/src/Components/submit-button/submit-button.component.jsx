import React from 'react'
import { Redirect, useHistory } from "react-router-dom";

const SubmitButton=({handleChange,label,placeholder})=>{
    var history = useHistory()
    /* var redirect = ()=>{
        history.push("/dashboard")
    } */
    return(
        <div className="field">
            <p className="control"/>
            <button  type="submit" className="button is-success is-fullwidth">{label}</button>
        </div>
    )
}
export default SubmitButton;