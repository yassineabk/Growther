import React from 'react'

const FormInput=({handleChange,handleBlur,isError,message,label,placeholder})=>(

    <div class="field">
        <label class="label">{label}</label>
            <div class="control has-icons-right">
                <input class={`${isError ? 'is-danger' :'is-success'} input`} onBlur={handleBlur} onChange={handleChange} required type="text" placeholder={placeholder}/>
                <span className="icon is-small is-right">
                    <i className={`${isError ? 'fas fa-exclamation-triangle' :'fas fa-check'}`}></i>
                </span>
            </div>
            <p className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>

    </div>



)
export default FormInput;