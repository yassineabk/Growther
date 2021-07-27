import React from 'react'

const TextAreaInput=({handleChange,handleBlur,label,isError,message,placeholder})=>(

    <div className="field ">
        <label className="label">{label}</label>
            <div className="control has-icons-right">
            <textarea className={` textarea mb-4`} onBlur={handleBlur} onChange={handleChange} required placeholder={placeholder}></textarea>
            <span className="icon is-small is-right">
                    <i className={`${isError ? 'fas fa-exclamation-triangle' :'fas fa-check'}`}></i>
                </span>
            </div>
            <p className={`${isError ? 'help is-danger mb-4' :'help is-sucess'}`}>{message}</p>
    </div>



)
export default TextAreaInput;