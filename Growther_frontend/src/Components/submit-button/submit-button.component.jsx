import React from 'react'
import { Redirect, useHistory } from "react-router-dom";

const SubmitButton=({handleChange,label,placeholder})=>{
    var history = useHistory()
    /* var redirect = ()=>{
        history.push("/dashboard")
    } */
    return(
        <div class="field">
            <p class="control"/>
            <button onClick={()=> {}} id="submitButton" type="submit" class="button is-success is-fullwidth">{label}</button>
        </div>
    )
}
export default SubmitButton;