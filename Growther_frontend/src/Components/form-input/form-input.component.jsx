import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const FormInput = ({handleChange,type,value,handleBlur,label,isError,message,placeholder})=>{
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    console.log(message)
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            <label dir={direction ? direction : "ltr"} >{typeof(label) === "string" ? t(label.toLowerCase()) : ""}</label>
            <input 
                required
                type={type ? type : "text"} 
                placeholder={placeholder ? placeholder : ""}
                onChange={handleChange && {}.toString.call(handleChange) === '[object Function]' ? (event)=> handleChange(event) : (event) => false}
                value={value}
                onBlur={handleBlur}
                dir={direction ? direction : "ltr"}
            />
            { isError === true ? <p dir={direction ? direction : "ltr"} id="auth-error-message" className="inputError">{typeof(message) === "string" ? t(message.toLowerCase()) : ""}</p> : null}
        </div>
    )
}



export default FormInput;