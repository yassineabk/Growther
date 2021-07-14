import React from 'react'

const PasswordInput=({handleChange,handleBlur,label,isError,message,placeholder})=>(

    <div className="field">
        <label className="label">{label}</label>
            <div className="control has-icons-left has-icons-right">
                <input className={`${isError ? 'is-danger' :'is-success'} input`} onBlur={handleBlur} onChange={handleChange} type="password" placeholder={placeholder}/>
                <span className="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </div>
        <p className={`${isError ? 'help is-danger' :'help is-sucess'}`}>{message}</p>
</div>



)
export default PasswordInput;