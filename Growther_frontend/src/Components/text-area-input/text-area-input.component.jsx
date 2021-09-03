import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const TextAreaInput=({handleChange,handleBlur,label,isError,message,placeholder, hideIcon})=>{
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    return(
        <div className="contest_textarea field mb-4">
            <label dir={direction ? direction : "ltr"} className="label">{label}</label>
            <div className="control has-icons-right has-icons-left">
            <textarea dir={direction ? direction : "ltr"} className={`textarea`} onBlur={handleBlur} onChange={handleChange} required placeholder={placeholder}></textarea>
            {hideIcon ? null : <span className={`icon is-small ${direction === "rtl" ? "is-left" : "is-right"}`}>
                    <i className={`${isError ? 'fas fa-exclamation-triangle' :'fas fa-check'}`}></i>
                </span>}
            </div>
            <p dir={direction ? direction : "ltr"} id="auth-error-message" className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{typeof(message) === "string" ? t(message.toLowerCase()) : ""}</p>
        </div>
    )
}
export default TextAreaInput;