import React from 'react'
import { useSelector } from 'react-redux';

const UrlSubmit=({handleChange,handleBlur,label,isError,value,message,placeholder, hideIcon})=>{
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div className="field authInput">
            <label dir={direction ? direction : "ltr"} className="label">{label}</label>
            <div className="control input_container">
                <input dir={direction ? direction : "ltr"} className={`${isError ? 'is-danger' :'form-input-color'} input`} 
                    value={value} onBlur={handleBlur} 
                    onChange={event => handleChange(event)} 
                    type="email" 
                    placeholder={placeholder}/>
            </div>
            <p dir={direction ? direction : "ltr"} className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>
        </div>
    )
}
export default UrlSubmit;