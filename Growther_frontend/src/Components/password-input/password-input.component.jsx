import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const PasswordInput=({handleChange,handleBlur,label,isError,value,message,placeholder})=>{
    
    const [showPassword, setshowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
      };
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div className="field authInput">
            <label dir={direction ? direction : "ltr"} className="label">{typeof(label) === "string" ? t(label.toLowerCase()) : ""}</label>
            <div className="control has-icons-left has-icons-right input_container">
                <input 
                    dir={direction ? direction : "ltr"} 
                    className={`${isError ? 'is-danger' : 'form-input-color'} input`} 
                    value={value} 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                />
                <span className={`icon is-small ${direction === "rtl" ? "is-right" : "is-left" }`}>
                    <i className="fas fa-lock"></i>
                </span>
                <span id="eye" className={`icon click-icon is-small ${direction === "rtl" ? "is-left" : "is-right" }`}>
                    <i onClick={handleClickShowPassword}  className={`${showPassword ? 'fas fa-eye-slash' :'fas fa-eye'}`}></i>
                </span>
            </div>
            <p dir={direction ? direction : "ltr"} id="auth-error-message" className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{typeof(message) === "string" ? t(message.toLowerCase()) : ""}</p>
        </div>
    )
}
export default PasswordInput;