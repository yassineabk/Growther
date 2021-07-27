import React from 'react'

const PasswordInput=({handleChange,handleBlur,label,isError,value,message,placeholder})=>(

    <div className="field authInput">
        <label className="label">{label}</label>
        <div className="control has-icons-left has-icons-right input_container">
            <input className={`${isError ? 'is-danger' :'form-input-color'} input`} value={value} onBlur={handleBlur} onChange={handleChange} type="password" placeholder={placeholder}/>
            <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
            </span>
        </div>
        <p className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>
    </div>



)
export default PasswordInput;