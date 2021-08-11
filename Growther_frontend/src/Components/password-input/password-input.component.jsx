import React, { useState } from 'react'
import { useEffect } from 'react';


const PasswordInput=({handleChange,handleBlur,label,isError,value,message,placeholder})=>{
    
    const [showPassword, setshowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
      };
      
     
    return(
    
    <div className="field authInput">
        <label className="label">{label}</label>
        <div className="control has-icons-left has-icons-right input_container">
            <input className={`${isError ? 'is-danger' :'form-input-color'} input`} 
                    value={value} 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}/>
            <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
            </span>
            <span id="eye" className="icon click-icon is-small is-right">
                <i onClick={handleClickShowPassword}  className={`${showPassword ? 'fas fa-eye-slash' :'fas fa-eye'}`}></i>
            </span>
        </div>
        <p className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>
    </div>



)}
export default PasswordInput;