import React from 'react'

const EmailInput=({handleChange,handleBlur,label,isError,message,placeholder})=>(

    <div className="field authInput">
        <label className="label">{label}</label>
        <div className="control has-icons-left has-icons-right input_container">
            <input className={`${isError ? 'is-danger' :'form-input-color'} input`} onBlur={handleBlur} onChange={handleChange} type="email" placeholder={placeholder}/>
            <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
                <i className={`${isError ? 'fas fa-exclamation-triangle' :'fas fa-check'}`}></i>
            </span>
        </div>
        <p className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>
</div>



)
export default EmailInput;