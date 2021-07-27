import React from 'react'

const FormInput = ({handleChange,type,value,handleBlur,label,isError,message,placeholder})=>{
    return(
        <div className="contest_input is-flex is-flex-direction-column">
            <label >{label ? label : ""}</label>
            <input 
                required
                type={type ? type : "text"} 
                placeholder={placeholder ? placeholder : "Type something here"}
                onChange={handleChange && {}.toString.call(handleChange) === '[object Function]' ? (event)=> handleChange(event) : (event) => false}
                value={value}
                onBlur={handleBlur}
            />
            { isError === true ? <div className="inputError">{message}</div> : null}
        </div>
    )
}



export default FormInput;