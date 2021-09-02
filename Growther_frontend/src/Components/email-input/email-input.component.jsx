import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const EmailInput=({handleChange,handleBlur,label,isError,value,message,placeholder, hideIcon})=>{
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    return (    
        <div className="field authInput">
            <label dir={direction ? direction : "ltr"} className="label">{typeof(label) === "string" ? t(label.toLowerCase()) : ""}</label>
            <div className="control has-icons-left has-icons-right input_container">
                <input dir={direction ? direction : "ltr"} className={`${isError ? 'is-danger' :'form-input-color'} input`} value={value} onBlur={handleBlur} onChange={handleChange} type="email" placeholder={placeholder}/>
                {hideIcon ? null : <span className={`icon is-small ${direction === "rtl" ? "is-right" : "is-left"}`}>
                    <i className="fas fa-envelope"></i>
                </span>}
                {hideIcon ? null : <span className={`icon is-small ${direction === "rtl" ? "is-left" : "is-right"}`}>
                    <i className={`${isError ? 'fas fa-exclamation-triangle' :'fas fa-check'}`}></i>
                </span>}
            </div>
            <p dir={direction ? direction : "ltr"} id="auth-error-message" className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{typeof(message) === "string" ? t(message.toLowerCase()) : "" }</p>
        </div>
    )
}




export default EmailInput;