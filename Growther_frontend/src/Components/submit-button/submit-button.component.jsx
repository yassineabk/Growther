import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const SubmitButton=({handleChange,label,type,placeholder,isError,message,onClick, className, id})=>{
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div className="field">
            <p className="control"/>
            <button 
                onClick={onClick} 
                id={`${id ? id : ""}`} 
                type={type} 
                dir={direction ? direction : "ltr"}
                className={`${className ? className : ""} 
                button is-success is-fullwidth`}
            >
                {typeof(label) === "string" ? t(label.toLowerCase()) : ""}
            </button>
            <p dir={direction ? direction : "ltr"} id="auth-error-message" className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{typeof(message) === "string" ? t(message.toLowerCase()) : ""}</p>
        </div>
        
    )
}
export default SubmitButton;