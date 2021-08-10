import React from 'react'

const UrlSubmit=({handleChange,handleBlur,label,isError,value,message,placeholder, hideIcon})=>(

    <div className="field authInput">
        <label className="label">{label}</label>
        <div className="control input_container">
            <input className={`${isError ? 'is-danger' :'form-input-color'} input`} value={value} onBlur={handleBlur} onChange={event => handleChange(event)} type="email" placeholder={placeholder}/>
        </div>
        <p className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>
</div>



)
export default UrlSubmit;